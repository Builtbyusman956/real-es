// src/pages/VerifyEmail.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { MailCheck, RefreshCw, LogOut, CheckCircle2 } from "lucide-react";

const VerifyEmail = () => {
  const { user, logout, resendVerificationEmail, refreshUser } = useAuth();
  const navigate = useNavigate();

  const [resending, setResending]     = useState(false);
  const [resent, setResent]           = useState(false);
  const [checking, setChecking]       = useState(false);
  const [error, setError]             = useState("");
  const [cooldown, setCooldown]       = useState(0);

  // Cooldown timer for resend button
  useEffect(() => {
    if (cooldown <= 0) return;
    const t = setInterval(() => setCooldown((c) => c - 1), 1000);
    return () => clearInterval(t);
  }, [cooldown]);

  // Auto-poll every 5 seconds to detect when user clicks the link
  useEffect(() => {
    const interval = setInterval(async () => {
      const verified = await refreshUser();
      if (verified) {
        clearInterval(interval);
        navigate(user?.role === "agent" ? "/dashboard/agent" : "/dashboard/buyer");
      }
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleResend = async () => {
    try {
      setResending(true);
      setError("");
      await resendVerificationEmail();
      setResent(true);
      setCooldown(60); // 60-second cooldown
    } catch (err) {
      if (err.code === "auth/too-many-requests") {
        setError("Too many requests. Please wait a few minutes before trying again.");
      } else {
        setError("Failed to resend. Please try again.");
      }
    } finally {
      setResending(false);
    }
  };

  const handleCheckNow = async () => {
    try {
      setChecking(true);
      setError("");
      const verified = await refreshUser();
      if (verified) {
        navigate(user?.role === "agent" ? "/dashboard/agent" : "/dashboard/buyer");
      } else {
        setError("Email not verified yet. Please click the link in your inbox.");
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setChecking(false);
    }
  };

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  // Mask email: ada@example.com → a**@e******.com
  const maskEmail = (email = "") => {
    const [local, domain] = email.split("@");
    const [domainName, ...tld] = domain.split(".");
    return `${local[0]}**@${domainName[0]}${"*".repeat(domainName.length - 1)}.${tld.join(".")}`;
  };

  return (
    <section className="min-h-screen bg-[#0A1628] flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-[#F7F4EF] rounded-3xl shadow-2xl overflow-hidden">

        {/* Header */}
        <div className="bg-[#0A1628] px-6 pt-8 pb-6 text-center">
          <div className="w-16 h-16 bg-[#C9A84C]/15 border border-[#C9A84C]/30 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <MailCheck size={30} className="text-[#C9A84C]" />
          </div>
          <h2 className="text-[#F7F4EF] text-2xl font-bold">Check Your Inbox</h2>
          <p className="text-[#8A9BB5] text-sm mt-2">
            We sent a verification link to
          </p>
          <p className="text-[#C9A84C] font-semibold text-sm mt-0.5">
            {user?.email ? maskEmail(user.email) : "your email"}
          </p>
        </div>

        {/* Body */}
        <div className="px-6 py-6 flex flex-col gap-4">

          {/* Steps */}
          <div className="bg-[#0A1628]/5 border border-[#0A1628]/10 rounded-2xl p-4 flex flex-col gap-3">
            {[
              { step: "1", text: "Open the email from us" },
              { step: "2", text: 'Click "Verify my email"' },
              { step: "3", text: "Come back here — you'll be let in automatically" },
            ].map(({ step, text }) => (
              <div key={step} className="flex items-center gap-3">
                <span className="w-6 h-6 bg-[#C9A84C] text-[#0A1628] text-xs font-bold rounded-full flex items-center justify-center shrink-0">
                  {step}
                </span>
                <span className="text-sm text-[#374151]">{text}</span>
              </div>
            ))}
          </div>

          {/* Success message */}
          {resent && (
            <div className="flex items-center gap-2 bg-green-50 border border-green-200 text-green-700 text-sm px-4 py-3 rounded-xl">
              <CheckCircle2 size={16} />
              Verification email resent successfully!
            </div>
          )}

          {/* Error message */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded-xl">
              {error}
            </div>
          )}

          {/* I've verified button */}
          <button
            onClick={handleCheckNow}
            disabled={checking}
            className="w-full bg-[#C9A84C] hover:bg-[#b8943d] text-[#0A1628] font-bold py-3 rounded-xl text-sm transition-all active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {checking ? (
              <div className="w-4 h-4 border-2 border-[#0A1628] border-t-transparent rounded-full animate-spin" />
            ) : (
              <CheckCircle2 size={16} />
            )}
            I've Verified My Email
          </button>

          {/* Resend button */}
          <button
            onClick={handleResend}
            disabled={resending || cooldown > 0}
            className="w-full border border-[#E0D9CF] hover:border-[#C9A84C]/50 bg-white text-[#0A1628] font-medium py-3 rounded-xl text-sm transition-all active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2"
          >
            <RefreshCw size={15} className={resending ? "animate-spin" : ""} />
            {cooldown > 0 ? `Resend in ${cooldown}s` : "Resend Verification Email"}
          </button>

          {/* Divider */}
          <div className="flex items-center gap-3">
            <div className="flex-1 h-px bg-[#E0D9CF]" />
            <span className="text-[10px] text-[#6B7280] uppercase tracking-widest">or</span>
            <div className="flex-1 h-px bg-[#E0D9CF]" />
          </div>

          {/* Sign out */}
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 text-sm text-[#6B7280] hover:text-red-500 transition-colors py-2"
          >
            <LogOut size={15} />
            Sign out and use a different account
          </button>

          <p className="text-center text-[10px] text-[#9CA3AF]">
            Can't find the email? Check your spam or junk folder.
          </p>
        </div>
      </div>
    </section>
  );
};

export default VerifyEmail;