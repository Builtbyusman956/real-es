// src/pages/VerifyOTP.jsx
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { ShieldCheck, RefreshCw, LogOut, CheckCircle2, Phone } from "lucide-react";

const API = import.meta.env.VITE_API_URL || "http://localhost:5001";

const VerifyOTP = () => {
  const { user, logout, refreshUserVerification } = useAuth();
  const navigate = useNavigate();

  const [otp, setOtp]           = useState(["", "", "", "", "", ""]);
  const [loading, setLoading]   = useState(false);
  const [resending, setResending] = useState(false);
  const [error, setError]       = useState("");
  const [success, setSuccess]   = useState(false);
  const [cooldown, setCooldown] = useState(0);
  const inputRefs               = useRef([]);

  // Cooldown timer
  useEffect(() => {
    if (cooldown <= 0) return;
    const t = setInterval(() => setCooldown((c) => c - 1), 1000);
    return () => clearInterval(t);
  }, [cooldown]);

  // Send OTP on mount
  useEffect(() => {
    if (user?.uid && user?.phone) sendOTP();
  }, []);

  const sendOTP = async () => {
    try {
      setResending(true);
      setError("");
      const res = await fetch(`${API}/api/auth/send-otp`, {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({ uid: user.uid, phone: user.phone }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setCooldown(60);
    } catch (err) {
      setError(err.message || "Failed to send OTP. Please try again.");
    } finally {
      setResending(false);
    }
  };

  const handleInput = (index, value) => {
    // Only allow digits
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value.slice(-1); // take last digit if pasted
    setOtp(newOtp);
    setError("");

    // Auto-advance
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }

    // Auto-submit when all 6 filled
    if (newOtp.every((d) => d !== "") && newOtp.join("").length === 6) {
      handleVerify(newOtp.join(""));
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    if (pasted.length === 6) {
      setOtp(pasted.split(""));
      handleVerify(pasted);
    }
  };

  const handleVerify = async (code) => {
    const otpCode = code || otp.join("");
    if (otpCode.length !== 6) {
      setError("Please enter the full 6-digit code.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const res = await fetch(`${API}/api/auth/verify-otp`, {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({ uid: user.uid, otp: otpCode }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      // Tell AuthContext to refresh user from Firestore
      await refreshUserVerification();

      setSuccess(true);
      setTimeout(() => {
        navigate(user?.role === "agent" ? "/dashboard/agent" : "/dashboard/buyer");
      }, 1500);
    } catch (err) {
      setError(err.message || "Invalid OTP. Please try again.");
      setOtp(["", "", "", "", "", ""]);
      inputRefs.current[0]?.focus();
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  // Mask phone: +2348012345678 → +234 *** ***5678
  const maskPhone = (phone = "") => {
    if (phone.length < 6) return phone;
    return phone.slice(0, 4) + " *** ***" + phone.slice(-4);
  };

  return (
    <section className="min-h-screen bg-[#0A1628] flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-[#F7F4EF] rounded-3xl shadow-2xl overflow-hidden">

        {/* Header */}
        <div className="bg-[#0A1628] px-6 pt-8 pb-6 text-center">
          <div className="w-16 h-16 bg-[#C9A84C]/15 border border-[#C9A84C]/30 rounded-2xl flex items-center justify-center mx-auto mb-4">
            {success
              ? <CheckCircle2 size={30} className="text-green-400" />
              : <ShieldCheck size={30} className="text-[#C9A84C]" />
            }
          </div>
          <h2 className="text-[#F7F4EF] text-2xl font-bold">
            {success ? "Phone Verified!" : "Verify Your Phone"}
          </h2>
          <p className="text-[#8A9BB5] text-sm mt-2">
            {success
              ? "Redirecting you to your dashboard..."
              : "We sent a 6-digit code to"
            }
          </p>
          {!success && (
            <div className="flex items-center justify-center gap-2 mt-1">
              <Phone size={14} className="text-[#C9A84C]" />
              <p className="text-[#C9A84C] font-semibold text-sm">
                {maskPhone(user?.phone || "")}
              </p>
            </div>
          )}
        </div>

        {/* Body */}
        <div className="px-6 py-6 flex flex-col gap-4">

          {!success && (
            <>
              {/* OTP inputs */}
              <div className="flex justify-center gap-2.5" onPaste={handlePaste}>
                {otp.map((digit, i) => (
                  <input
                    key={i}
                    ref={(el) => (inputRefs.current[i] = el)}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleInput(i, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(i, e)}
                    className={`w-12 h-14 text-center text-xl font-bold rounded-xl border-2 bg-white text-[#0A1628] outline-none transition
                      ${error
                        ? "border-red-400 ring-1 ring-red-300"
                        : digit
                          ? "border-[#C9A84C] ring-1 ring-[#C9A84C]/30"
                          : "border-[#E0D9CF] focus:border-[#C9A84C] focus:ring-1 focus:ring-[#C9A84C]/30"
                      }`}
                  />
                ))}
              </div>

              {/* Error */}
              {error && (
                <p className="text-center text-sm text-red-500">{error}</p>
              )}

              {/* Verify button */}
              <button
                onClick={() => handleVerify()}
                disabled={loading || otp.some((d) => d === "")}
                className="w-full bg-[#C9A84C] hover:bg-[#b8943d] text-[#0A1628] font-bold py-3 rounded-xl text-sm transition-all active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {loading ? (
                  <div className="w-4 h-4 border-2 border-[#0A1628] border-t-transparent rounded-full animate-spin" />
                ) : (
                  <ShieldCheck size={16} />
                )}
                Verify Code
              </button>

              {/* Resend */}
              <button
                onClick={sendOTP}
                disabled={resending || cooldown > 0}
                className="w-full border border-[#E0D9CF] hover:border-[#C9A84C]/50 bg-white text-[#0A1628] font-medium py-3 rounded-xl text-sm transition-all active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2"
              >
                <RefreshCw size={15} className={resending ? "animate-spin" : ""} />
                {cooldown > 0 ? `Resend in ${cooldown}s` : "Resend Code"}
              </button>

              <div className="flex items-center gap-3">
                <div className="flex-1 h-px bg-[#E0D9CF]" />
                <span className="text-[10px] text-[#6B7280] uppercase tracking-widest">or</span>
                <div className="flex-1 h-px bg-[#E0D9CF]" />
              </div>

              <button
                onClick={handleLogout}
                className="w-full flex items-center justify-center gap-2 text-sm text-[#6B7280] hover:text-red-500 transition-colors py-2"
              >
                <LogOut size={15} />
                Sign out and use a different account
              </button>

              <p className="text-center text-[10px] text-[#9CA3AF]">
                Code expires in 10 minutes. Make sure your phone number is correct.
              </p>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default VerifyOTP;