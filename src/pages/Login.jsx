// src/pages/Login.jsx
import { useState, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { 
  Eye, EyeOff, ShieldCheck, Home, ArrowRight, RotateCcw,
  Smartphone, User, Lock, CheckCircle2, Camera
} from "lucide-react";
import bgImg from "../assets/realestate.avif";

// ─── Constants ────────────────────────────────────────────────────────────────
const STEPS = {
  ROLE:  "role",
  CREDS: "credentials",
  OTP:   "otp",
  FACE:  "face",
};

// ─── Reusable ─────────────────────────────────────────────────────────────────
const FieldError = ({ msg }) =>
  msg ? <p className="text-xs text-red-400 mt-0.5">{msg}</p> : null;

const inputCls = (err) =>
  `w-full px-3 py-2.5 rounded-xl border text-sm text-[#0A1628] bg-[#F7F4EF] outline-none transition
   focus:ring-2 focus:ring-[#C9A84C] focus:border-[#C9A84C]
   ${err ? "border-red-400 ring-1 ring-red-300" : "border-[#E0D9CF] hover:border-[#C9A84C]/50"}`;

// ─── Step 1 — Role select ─────────────────────────────────────────────────────
const RoleStep = ({ onSelect }) => (
  <div className="px-6 py-8 flex flex-col gap-4">
    <p className="text-xs text-[#6B7280] text-center mb-2">Choose how you're signing in</p>

    <button
      onClick={() => onSelect("agent")}
      className="group flex items-center gap-4 p-4 rounded-2xl border-2 border-[#E0D9CF] hover:border-[#C9A84C] bg-white hover:bg-[#F7F4EF] active:scale-95 transition-all duration-200"
    >
      <div className="w-12 h-12 rounded-xl bg-[#0A1628] group-hover:bg-[#C9A84C] flex items-center justify-center transition-colors duration-200">
        <ShieldCheck size={22} className="text-[#C9A84C] group-hover:text-[#0A1628] transition-colors duration-200" />
      </div>
      <div className="text-left flex-1">
        <p className="font-bold text-[#0A1628] text-sm">Sign in as Agent</p>
        <p className="text-xs text-[#6B7280] mt-0.5">For verified property agents & dealers</p>
      </div>
      <ArrowRight size={16} className="text-[#C9A84C] opacity-0 group-hover:opacity-100 transition-opacity" />
    </button>

    <button
      onClick={() => onSelect("buyer")}
      className="group flex items-center gap-4 p-4 rounded-2xl border-2 border-[#E0D9CF] hover:border-[#C9A84C] bg-white hover:bg-[#F7F4EF] active:scale-95 transition-all duration-200"
    >
      <div className="w-12 h-12 rounded-xl bg-[#0A1628] group-hover:bg-[#C9A84C] flex items-center justify-center transition-colors duration-200">
        <Home size={22} className="text-[#C9A84C] group-hover:text-[#0A1628] transition-colors duration-200" />
      </div>
      <div className="text-left flex-1">
        <p className="font-bold text-[#0A1628] text-sm">Sign in as Buyer</p>
        <p className="text-xs text-[#6B7280] mt-0.5">For property seekers & renters</p>
      </div>
      <ArrowRight size={16} className="text-[#C9A84C] opacity-0 group-hover:opacity-100 transition-opacity" />
    </button>
  </div>
);

// ─── Step 2 — Credentials ─────────────────────────────────────────────────────
const CredentialsStep = ({ role, onNext }) => {
  const { login, loginWithGoogle } = useAuth();
  const navigate = useNavigate();
  const [form, setForm]       = useState({ email: "", password: "" });
  const [errors, setErrors]   = useState({});
  const [showPw, setShowPw]   = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState("");

  const validate = () => {
    const e = {};
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Enter a valid email.";
    if (form.password.length < 6) e.password = "Password must be at least 6 characters.";
    return e;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }

    try {
      setLoading(true);
      setError("");
      await login(form.email, form.password);

      if (role === "agent") {
        onNext(); // ✅ agents → OTP step
      } else {
        setTimeout(() => navigate("/dashboard/buyer"), 500); // ✅ delay for Firestore role fetch
      }
    } catch (err) {
      console.error("Login error:", err);
      if (err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password' || err.code === 'auth/invalid-credential') {
        setError("Invalid email or password.");
      } else if (err.code === 'auth/too-many-requests') {
        setError("Too many failed attempts. Please try again later.");
      } else {
        setError("Failed to sign in. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      setLoading(true);
      setError("");
      await loginWithGoogle(role);

      if (role === "agent") {
        onNext(); // ✅ agents → OTP step
      } else {
        setTimeout(() => navigate("/dashboard/buyer"), 500); // ✅ delay for Firestore role fetch
      }
    } catch (err) {
      console.error("Google login error:", err);
      setError("Failed to sign in with Google. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} noValidate className="px-6 py-6 flex flex-col gap-4">

      {/* Role pill */}
      <div className="flex justify-center">
        <span className="bg-[#E8D5A3] text-[#0A1628] text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wide flex items-center gap-1">
          {role === "agent" ? <><ShieldCheck size={12} /> Agent Login</> : <><Home size={12} /> Buyer Login</>}
        </span>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded-xl">
          {error}
        </div>
      )}

      {/* Google Sign In */}
      <button
        type="button"
        onClick={handleGoogleLogin}
        disabled={loading}
        className="flex items-center justify-center gap-2 w-full border border-[#E0D9CF] bg-white rounded-xl py-2.5 text-sm font-medium text-[#0A1628] hover:border-[#C9A84C]/50 hover:bg-[#F7F4EF] active:scale-95 transition duration-200 disabled:opacity-50"
      >
        <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="w-4 h-4" alt="Google" />
        Continue with Google
      </button>

      <div className="flex items-center gap-3">
        <div className="flex-1 h-px bg-[#E0D9CF]" />
        <span className="text-[10px] text-[#6B7280] font-medium uppercase tracking-widest">or</span>
        <div className="flex-1 h-px bg-[#E0D9CF]" />
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-[10px] font-semibold text-[#6B7280] uppercase tracking-widest flex items-center gap-1">
          <User size={12} /> Email Address
        </label>
        <input
          type="email" placeholder="ada@example.com" value={form.email}
          onChange={(e) => { setForm((p) => ({ ...p, email: e.target.value })); setErrors((p) => ({ ...p, email: undefined })); }}
          className={inputCls(errors.email)}
        />
        <FieldError msg={errors.email} />
      </div>

      <div className="flex flex-col gap-1">
        <div className="flex items-center justify-between">
          <label className="text-[10px] font-semibold text-[#6B7280] uppercase tracking-widest flex items-center gap-1">
            <Lock size={12} /> Password
          </label>
          <a href="/forgot-password" className="text-[10px] text-[#C9A84C] hover:underline">Forgot password?</a>
        </div>
        <div className="relative">
          <input
            type={showPw ? "text" : "password"} placeholder="Min. 6 characters" value={form.password}
            onChange={(e) => { setForm((p) => ({ ...p, password: e.target.value })); setErrors((p) => ({ ...p, password: undefined })); }}
            className={inputCls(errors.password) + " pr-10"}
          />
          <button type="button" onClick={() => setShowPw((v) => !v)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6B7280] hover:text-[#0A1628] transition">
            {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        </div>
        <FieldError msg={errors.password} />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-[#C9A84C] hover:bg-[#b8943d] active:scale-95 text-[#0A1628] py-3 rounded-xl text-sm font-bold transition duration-200 mt-1 flex items-center justify-center gap-2 disabled:opacity-50"
      >
        {loading ? (
          <div className="w-4 h-4 border-2 border-[#0A1628] border-t-transparent rounded-full animate-spin" />
        ) : (
          <ArrowRight size={16} />
        )}
        Continue
      </button>
    </form>
  );
};

// ─── Step 3 — OTP (agents only) ───────────────────────────────────────────────
const OTPStep = ({ role, onNext }) => {
  const navigate = useNavigate();
  const [otp, setOtp]         = useState(["", "", "", "", "", ""]);
  const [error, setError]     = useState("");
  const [resent, setResent]   = useState(false);
  const [loading, setLoading] = useState(false);
  const inputs = useRef([]);

  const handleChange = (val, i) => {
    if (!/^\d?$/.test(val)) return;
    const next = [...otp];
    next[i] = val;
    setOtp(next);
    if (val && i < 5) inputs.current[i + 1]?.focus();
  };

  const handleKeyDown = (e, i) => {
    if (e.key === "Backspace" && !otp[i] && i > 0) inputs.current[i - 1]?.focus();
  };

  const handlePaste = (e) => {
    const text = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    if (text.length === 6) {
      setOtp(text.split(""));
      inputs.current[5]?.focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const code = otp.join("");
    if (code.length < 6) { setError("Enter the 6-digit code sent to your phone."); return; }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      if (role === "agent") {
        onNext(); // → face verification
      } else {
        navigate("/dashboard/buyer");
      }
    }, 1000);
  };

  const handleResend = () => {
    setResent(true);
    setTimeout(() => setResent(false), 30000);
  };

  return (
    <form onSubmit={handleSubmit} noValidate className="px-6 py-6 flex flex-col gap-5">
      <div className="text-center">
        <div className="w-14 h-14 rounded-full bg-[#E8D5A3]/40 border border-[#C9A84C]/30 flex items-center justify-center text-[#C9A84C] mx-auto mb-3">
          <Smartphone size={28} />
        </div>
        <p className="text-sm text-[#6B7280] leading-relaxed">
          We sent a 6-digit code to your registered phone number. Enter it below to verify it's you.
        </p>
      </div>

      <div className="flex gap-2 justify-center" onPaste={handlePaste}>
        {otp.map((digit, i) => (
          <input
            key={i}
            ref={(el) => (inputs.current[i] = el)}
            type="text" inputMode="numeric" maxLength={1} value={digit}
            onChange={(e) => handleChange(e.target.value, i)}
            onKeyDown={(e) => handleKeyDown(e, i)}
            className={`w-11 h-12 text-center text-lg font-bold rounded-xl border-2 bg-[#F7F4EF] text-[#0A1628] outline-none transition
              focus:border-[#C9A84C] focus:ring-2 focus:ring-[#C9A84C]/30
              ${error ? "border-red-400" : "border-[#E0D9CF]"}`}
          />
        ))}
      </div>

      {error && <p className="text-xs text-red-400 text-center">{error}</p>}

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-[#C9A84C] hover:bg-[#b8943d] active:scale-95 text-[#0A1628] py-3 rounded-xl text-sm font-bold transition duration-200 flex items-center justify-center gap-2 disabled:opacity-50"
      >
        {loading ? (
          <div className="w-4 h-4 border-2 border-[#0A1628] border-t-transparent rounded-full animate-spin" />
        ) : (
          <CheckCircle2 size={16} />
        )}
        Verify Code
      </button>

      <p className="text-center text-xs text-[#6B7280]">
        Didn't receive it?{" "}
        {resent ? (
          <span className="text-[#C9A84C] font-medium flex items-center justify-center gap-1">
            <CheckCircle2 size={12} /> Code resent!
          </span>
        ) : (
          <button type="button" onClick={handleResend} className="text-[#C9A84C] font-medium hover:underline">
            Resend code
          </button>
        )}
      </p>
    </form>
  );
};

// ─── Step 4 — Face capture (agents only) ─────────────────────────────────────
const FaceStep = () => {
  const navigate = useNavigate();
  const videoRef  = useRef(null);
  const canvasRef = useRef(null);
  const [streaming, setStreaming] = useState(false);
  const [captured, setCaptured]   = useState(false);
  const [imgSrc, setImgSrc]       = useState(null);
  const [error, setError]         = useState("");
  const [loading, setLoading]     = useState(false);

  const startCamera = useCallback(async () => {
    setError("");
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "user" } });
      videoRef.current.srcObject = stream;
      videoRef.current.play();
      setStreaming(true);
    } catch {
      setError("Camera access denied. Please allow camera permission and try again.");
    }
  }, []);

  const capture = () => {
    const canvas = canvasRef.current;
    const video  = videoRef.current;
    canvas.width  = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext("2d").drawImage(video, 0, 0);
    const img = canvas.toDataURL("image/jpeg");
    setImgSrc(img);
    setCaptured(true);
    video.srcObject?.getTracks().forEach((t) => t.stop());
    setStreaming(false);
  };

  const retake = () => {
    setCaptured(false);
    setImgSrc(null);
    startCamera();
  };

  const handleConfirm = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate("/dashboard/agent");
    }, 1500);
  };

  return (
    <div className="px-6 py-6 flex flex-col gap-4">
      <div className="text-center">
        <div className="w-14 h-14 rounded-full bg-[#E8D5A3]/40 border border-[#C9A84C]/30 flex items-center justify-center text-[#C9A84C] mx-auto mb-3">
          <Camera size={28} />
        </div>
        <p className="text-sm text-[#6B7280] leading-relaxed">
          As a verified agent, we need a quick face check to confirm it's really you signing in.
        </p>
      </div>

      <div className="relative rounded-2xl overflow-hidden bg-[#0A1628] aspect-video flex items-center justify-center">
        {captured ? (
          <img src={imgSrc} alt="Captured face" className="w-full h-full object-cover" />
        ) : (
          <>
            <video ref={videoRef} className={`w-full h-full object-cover ${streaming ? "block" : "hidden"}`} muted playsInline />
            {!streaming && (
              <div className="flex flex-col items-center gap-3 text-[#8A9BB5]">
                <div className="w-16 h-16 rounded-full border-2 border-dashed border-[#C9A84C]/40 flex items-center justify-center">
                  <Camera size={32} className="text-[#C9A84C]/60" />
                </div>
                <p className="text-xs text-center px-4">Position your face in the frame and click "Start Camera"</p>
              </div>
            )}
          </>
        )}
        {streaming && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-36 h-44 rounded-full border-2 border-[#C9A84C]/60 border-dashed" />
          </div>
        )}
      </div>
      <canvas ref={canvasRef} className="hidden" />

      {error && <p className="text-xs text-red-400 text-center">{error}</p>}

      <div className="flex gap-2">
        {!streaming && !captured && (
          <button onClick={startCamera}
            className="flex-1 bg-[#0A1628] hover:bg-[#1A2E4A] active:scale-95 text-[#F7F4EF] py-2.5 rounded-xl text-sm font-semibold transition duration-200 flex items-center justify-center gap-2">
            <Camera size={16} /> Start Camera
          </button>
        )}
        {streaming && (
          <button onClick={capture}
            className="flex-1 bg-[#C9A84C] hover:bg-[#b8943d] active:scale-95 text-[#0A1628] py-2.5 rounded-xl text-sm font-bold transition duration-200 flex items-center justify-center gap-2">
            <Camera size={16} /> Capture Photo
          </button>
        )}
        {captured && (
          <>
            <button onClick={retake}
              className="flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl border border-[#E0D9CF] text-sm font-medium text-[#6B7280] hover:border-[#C9A84C]/50 hover:text-[#0A1628] transition duration-200">
              <RotateCcw size={14} /> Retake
            </button>
            <button
              onClick={handleConfirm}
              disabled={loading}
              className="flex-1 bg-[#C9A84C] hover:bg-[#b8943d] active:scale-95 text-[#0A1628] py-2.5 rounded-xl text-sm font-bold transition duration-200 flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loading ? (
                <div className="w-4 h-4 border-2 border-[#0A1628] border-t-transparent rounded-full animate-spin" />
              ) : (
                <CheckCircle2 size={16} />
              )}
              Confirm & Sign In
            </button>
          </>
        )}
      </div>
    </div>
  );
};

// ─── Progress helpers ─────────────────────────────────────────────────────────
const stepIndex = (step, role) => {
  const steps = role === "agent"
    ? [STEPS.ROLE, STEPS.CREDS, STEPS.OTP, STEPS.FACE]
    : [STEPS.ROLE, STEPS.CREDS];
  return steps.indexOf(step);
};

const totalSteps = (role) => role === "agent" ? 4 : 2;

// ─── Main ─────────────────────────────────────────────────────────────────────
const Login = () => {
  const [step, setStep] = useState(STEPS.ROLE);
  const [role, setRole] = useState(null);

  const handleRoleSelect = (r) => { setRole(r); setStep(STEPS.CREDS); };
  const handleCredsNext  = ()  => setStep(STEPS.OTP);
  const handleOTPNext    = ()  => { if (role === "agent") setStep(STEPS.FACE); };

  const HEADERS = {
    [STEPS.ROLE]:  { label: "Welcome Back",       sub: "How would you like to sign in?" },
    [STEPS.CREDS]: { label: "Enter Your Details", sub: "Sign in to your NRET account" },
    [STEPS.OTP]:   { label: "Verify Your Phone",  sub: "Security check — enter your OTP" },
    [STEPS.FACE]:  { label: "Face Verification",  sub: "Final security step for agents" },
  };

  const current  = HEADERS[step];
  const progress = role
    ? Math.round(((stepIndex(step, role) + 1) / totalSteps(role)) * 100)
    : 0;

  return (
    <section className="relative w-full min-h-screen flex items-center justify-center px-4 py-20">

      <div className="absolute inset-0">
        <img src={bgImg} alt="background" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A1628]/90 via-[#0A1628]/65 to-[#0A1628]/20" />
      </div>

      <div className="relative z-10 w-full max-w-md bg-[#F7F4EF] rounded-3xl shadow-2xl shadow-[#0A1628]/40 overflow-hidden">

        <div className="bg-[#0A1628] px-6 pt-6 pb-5">
          <p className="text-[#C9A84C] text-[10px] font-semibold uppercase tracking-[0.18em] mb-1">NRET Platform</p>
          <h2 className="text-[#F7F4EF] text-2xl font-bold leading-tight">{current.label}</h2>
          <p className="text-[#8A9BB5] text-sm mt-1">{current.sub}</p>

          {role && (
            <div className="mt-4 bg-[#1A2E4A] rounded-full h-1">
              <div
                className="bg-[#C9A84C] h-1 rounded-full transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          )}
        </div>

        {step === STEPS.ROLE  && <RoleStep        onSelect={handleRoleSelect} />}
        {step === STEPS.CREDS && <CredentialsStep role={role} onNext={handleCredsNext} />}
        {step === STEPS.OTP   && <OTPStep         role={role} onNext={handleOTPNext} />}
        {step === STEPS.FACE  && <FaceStep />}

        <div className="px-6 pb-5 pt-1 text-center">
          <p className="text-xs text-[#6B7280]">
            Don't have an account?{" "}
            <a href="/register" className="text-[#C9A84C] font-semibold hover:underline">
              Create one free
            </a>
          </p>
        </div>

      </div>
    </section>
  );
};

export default Login;