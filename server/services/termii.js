// server/services/termii.js
const axios = require("axios");

const TERMII_BASE = "https://v3.api.termii.com/api";

/**
 * Send a 6-digit OTP via Termii Token API
 * Returns the Termii pinId needed to verify later
 */
const sendOTP = async (phoneNumber) => {
  const payload = {
    api_key:      process.env.TERMII_API_KEY,
    message_type: "NUMERIC",
    to:           phoneNumber,
    from:         process.env.TERMII_SENDER_ID || "N-Alert",
    channel:      "dnd",          // uses DND-bypass route
    pin_attempts:  3,
    pin_time_to_live: 10,         // OTP expires in 10 minutes
    pin_length:    6,
    pin_placeholder: "< 1234 >",
    message_text:  "Your RealEstate verification code is < 1234 >. Valid for 10 minutes. Do not share.",
    pin_type:      "NUMERIC",
  };

  const response = await axios.post(`${TERMII_BASE}/sms/otp/send`, payload, {
    headers: { "Content-Type": "application/json" },
  });

  if (!response.data?.pinId) {
    throw new Error(response.data?.message || "Failed to send OTP");
  }

  return response.data.pinId;
};

/**
 * Verify the OTP the user entered against Termii
 * Returns true if correct, throws if wrong/expired
 */
const verifyOTP = async (pinId, pin) => {
  const payload = {
    api_key: process.env.TERMII_API_KEY,
    pin_id:  pinId,
    pin:     String(pin),
  };

  const response = await axios.post(`${TERMII_BASE}/sms/otp/verify`, payload, {
    headers: { "Content-Type": "application/json" },
  });

  // Termii returns "Verified" in the verified field on success
  if (response.data?.verified !== "True" && response.data?.verified !== true) {
    throw new Error(response.data?.message || "Invalid or expired OTP");
  }

  return true;
};

module.exports = { sendOTP, verifyOTP };