// server/routes/auth.js
const express  = require("express");
const router   = express.Router();
const { sendOTP, verifyOTP } = require("../services/termii");
const { db }   = require("../services/firebase");

// In-memory OTP store: { [uid]: { pinId, phone, expiresAt } }
// For production you'd use Redis, but this works perfectly for now
const otpStore = new Map();

// ── POST /api/auth/send-otp ───────────────────────────────────────────────
// Called right after Firebase signup — sends OTP to the user's phone
router.post("/send-otp", async (req, res) => {
  const { uid, phone } = req.body;

  if (!uid || !phone) {
    return res.status(400).json({ error: "uid and phone are required" });
  }

  // Normalize phone — ensure it starts with + (international format)
  const normalizedPhone = phone.startsWith("+") ? phone : `+${phone}`;

  try {
    // Rate limit — prevent spam: 1 OTP per 60 seconds per uid
    const existing = otpStore.get(uid);
    if (existing && Date.now() < existing.cooldownUntil) {
      const secondsLeft = Math.ceil((existing.cooldownUntil - Date.now()) / 1000);
      return res.status(429).json({
        error: `Please wait ${secondsLeft} seconds before requesting another OTP.`,
      });
    }

    const pinId = await sendOTP(normalizedPhone);

    // Store pinId mapped to uid with 10min expiry + 60s cooldown
    otpStore.set(uid, {
      pinId,
      phone: normalizedPhone,
      expiresAt:     Date.now() + 10 * 60 * 1000,
      cooldownUntil: Date.now() + 60 * 1000,
    });

    return res.json({ success: true, message: "OTP sent successfully" });
  } catch (err) {
    console.error("Send OTP error:", err.message);
    return res.status(500).json({ error: err.message || "Failed to send OTP" });
  }
});

// ── POST /api/auth/verify-otp ─────────────────────────────────────────────
// Verifies the OTP, then marks user as verified in Firestore
router.post("/verify-otp", async (req, res) => {
  const { uid, otp } = req.body;

  if (!uid || !otp) {
    return res.status(400).json({ error: "uid and otp are required" });
  }

  const stored = otpStore.get(uid);

  if (!stored) {
    return res.status(400).json({ error: "No OTP found. Please request a new one." });
  }

  if (Date.now() > stored.expiresAt) {
    otpStore.delete(uid);
    return res.status(400).json({ error: "OTP has expired. Please request a new one." });
  }

  try {
    await verifyOTP(stored.pinId, otp);

    // ✅ Mark user as verified in Firestore
    await db.collection("users").doc(uid).update({
      phoneVerified: true,
      verifiedAt:    new Date().toISOString(),
    });

    // Clean up OTP store
    otpStore.delete(uid);

    return res.json({ success: true, message: "Phone verified successfully" });
  } catch (err) {
    console.error("Verify OTP error:", err.message);
    return res.status(400).json({ error: err.message || "Invalid OTP" });
  }
});

module.exports = router;