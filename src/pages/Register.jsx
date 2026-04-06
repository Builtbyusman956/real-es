import { useState } from "react";
import { Eye, EyeOff, Mail } from "lucide-react";
import { useNavigate } from "react-router-dom";
import bgImg from "../assets/realestate.avif";

const COUNTRIES = [
  "Nigeria", "Ghana", "Kenya", "South Africa",
  "United Kingdom", "United States", "Canada", "Other",
];

const INITIAL = {
  firstName: "", lastName: "", email: "",
  phone: "", password: "", country: "",
  newsletter: false, agreed: false,
};

const validate = ({ firstName, lastName, email, phone, password, country, agreed }) => {
  const e = {};
  if (!firstName.trim()) e.firstName = "First name is required.";
  if (!lastName.trim())  e.lastName  = "Last name is required.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = "Enter a valid email.";
  if (!/^\+?[0-9]{7,15}$/.test(phone))           e.phone = "Enter a valid phone number.";
  if (password.length < 8)                        e.password = "Password must be at least 8 characters.";
  if (!country)                                   e.country = "Please select your country.";
  if (!agreed)                                    e.agreed = "You must agree to our policies.";
  return e;
};

// ── Reusable components ───────────────────────────────────────────────────────
const FieldError = ({ msg }) =>
  msg ? <p className="text-xs text-red-400 mt-0.5">{msg}</p> : null;

const Field = ({ label, error, children }) => (
  <div className="flex flex-col gap-1">
    <label className="text-[10px] font-semibold text-[#6B7280] uppercase tracking-widest">{label}</label>
    {children}
    <FieldError msg={error} />
  </div>
);

const inputCls = (err) =>
  `w-full px-3 py-2.5 rounded-xl border text-sm text-[#0A1628] bg-[#F7F4EF] outline-none transition
   focus:ring-2 focus:ring-[#C9A84C] focus:border-[#C9A84C]
   ${err ? "border-red-400 ring-1 ring-red-300" : "border-[#E0D9CF] hover:border-[#C9A84C]/50"}`;

// ── Confirmation screen ───────────────────────────────────────────────────────
const ConfirmScreen = ({ email }) => (
  <div className="flex flex-col items-center text-center gap-4 py-10 px-6">
    <div className="w-16 h-16 rounded-full bg-[#E8D5A3]/40 border border-[#C9A84C]/30 flex items-center justify-center text-[#C9A84C]">
      <Mail size={30} />
    </div>
    <h3 className="text-xl font-bold text-[#0A1628]">Check your inbox</h3>
    <p className="text-sm text-[#6B7280] max-w-xs leading-relaxed">
      We sent a confirmation link to{" "}
      <span className="font-semibold text-[#0A1628]">{email}</span>.
      Click it to activate your account and access your dashboard.
    </p>
    <p className="text-xs text-[#6B7280] mt-1">
      Didn't get it? Check your spam folder or{" "}
      <button className="text-[#C9A84C] underline font-medium">resend email</button>.
    </p>
  </div>
);

// ── Main ─────────────────────────────────────────────────────────────────────
const Register = () => {
  const navigate = useNavigate();
  const [form, setForm]           = useState(INITIAL);
  const [errors, setErrors]       = useState({});
  const [showPw, setShowPw]       = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((p)   => ({ ...p, [name]: type === "checkbox" ? checked : value }));
    setErrors((p) => ({ ...p, [name]: undefined }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate(form);
    if (Object.keys(errs).length) { setErrors(errs); return; }
    console.log("Register:", form);
    setSubmitted(true);
  };

  return (
    <section className="relative w-full min-h-screen flex items-center justify-center px-4 py-20">

      {/* Background — matches Hero exactly */}
      <div className="absolute inset-0">
        <img src={bgImg} alt="background" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A1628]/90 via-[#0A1628]/65 to-[#0A1628]/20" />
      </div>

      {/* Card */}
      <div className="relative z-10 w-full max-w-md bg-[#F7F4EF] rounded-3xl shadow-2xl shadow-[#0A1628]/40 overflow-hidden">

        {/* Header */}
        <div className="bg-[#0A1628] px-6 pt-6 pb-5">
          <p className="text-[#C9A84C] text-[10px] font-semibold uppercase tracking-[0.18em] mb-1">
            Agent Portal
          </p>
          <h2 className="text-[#F7F4EF] text-2xl font-bold leading-tight">Create Your Account</h2>
          <p className="text-[#8A9BB5] text-sm mt-1">
            Already have an account?{" "}
            <button
              onClick={() => navigate("/login")}
              className="text-[#C9A84C] underline font-medium hover:text-[#E8D5A3] transition"
            >
              Sign in
            </button>
          </p>
        </div>

        {submitted ? <ConfirmScreen email={form.email} /> : (
          <form onSubmit={handleSubmit} noValidate className="px-6 py-5 flex flex-col gap-4">

            {/* Social buttons */}
            <div className="flex flex-col gap-2">
              <button type="button"
                className="flex items-center justify-center gap-2 w-full border border-[#E0D9CF] bg-white rounded-xl py-2.5 text-sm font-medium text-[#0A1628] hover:border-[#C9A84C]/50 hover:bg-[#F7F4EF] active:scale-95 transition duration-200">
                <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="w-4 h-4" alt="Google" />
                Continue with Google
              </button>
              <button type="button"
                className="flex items-center justify-center gap-2 w-full bg-[#0A1628] hover:bg-[#1A2E4A] active:scale-95 text-[#F7F4EF] rounded-xl py-2.5 text-sm font-medium transition duration-200">
                <svg className="w-4 h-4 fill-[#F7F4EF]" viewBox="0 0 24 24">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                </svg>
                Continue with Apple
              </button>
            </div>

            {/* Divider */}
            <div className="flex items-center gap-3">
              <div className="flex-1 h-px bg-[#E0D9CF]" />
              <span className="text-[10px] text-[#6B7280] font-medium uppercase tracking-widest">or sign up with email</span>
              <div className="flex-1 h-px bg-[#E0D9CF]" />
            </div>

            {/* Name row */}
            <div className="grid grid-cols-2 gap-3">
              <Field label="First Name" error={errors.firstName}>
                <input name="firstName" placeholder="Ada" value={form.firstName}
                  onChange={handleChange} className={inputCls(errors.firstName)} />
              </Field>
              <Field label="Last Name" error={errors.lastName}>
                <input name="lastName" placeholder="Okonkwo" value={form.lastName}
                  onChange={handleChange} className={inputCls(errors.lastName)} />
              </Field>
            </div>

            <Field label="Email Address" error={errors.email}>
              <input name="email" type="email" placeholder="ada@example.com"
                value={form.email} onChange={handleChange} className={inputCls(errors.email)} />
            </Field>

            <Field label="Phone Number" error={errors.phone}>
              <input name="phone" type="tel" placeholder="+234 800 000 0000"
                value={form.phone} onChange={handleChange} className={inputCls(errors.phone)} />
            </Field>

            <Field label="Password" error={errors.password}>
              <div className="relative">
                <input name="password" type={showPw ? "text" : "password"}
                  placeholder="Min. 8 characters" value={form.password}
                  onChange={handleChange} className={inputCls(errors.password) + " pr-10"} />
                <button type="button" onClick={() => setShowPw((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6B7280] hover:text-[#0A1628] transition">
                  {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </Field>

            <Field label="Country" error={errors.country}>
              <select name="country" value={form.country} onChange={handleChange}
                className={inputCls(errors.country)}>
                <option value="">— Select country —</option>
                {COUNTRIES.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </Field>

            {/* Checkboxes */}
            <div className="flex flex-col gap-2.5 pt-1">
              <label className="flex items-start gap-2.5 cursor-pointer group">
                <input type="checkbox" name="newsletter" checked={form.newsletter}
                  onChange={handleChange}
                  className="mt-0.5 w-4 h-4 rounded accent-[#C9A84C] cursor-pointer" />
                <span className="text-xs text-[#6B7280] leading-relaxed group-hover:text-[#0A1628] transition">
                  Send me property listings, market updates and tips via email.
                </span>
              </label>

              <label className="flex items-start gap-2.5 cursor-pointer group">
                <input type="checkbox" name="agreed" checked={form.agreed}
                  onChange={handleChange}
                  className="mt-0.5 w-4 h-4 rounded accent-[#C9A84C] cursor-pointer" />
                <span className="text-xs text-[#6B7280] leading-relaxed group-hover:text-[#0A1628] transition">
                  I agree to the{" "}
                  <a href="/terms" className="text-[#C9A84C] underline hover:text-[#b8943d]">Terms of Service</a>{" "}
                  and{" "}
                  <a href="/privacy" className="text-[#C9A84C] underline hover:text-[#b8943d]">Privacy Policy</a>.
                </span>
              </label>
              <FieldError msg={errors.agreed} />
            </div>

            {/* Submit */}
            <button type="submit"
              className="w-full bg-[#C9A84C] hover:bg-[#b8943d] active:scale-95 text-[#0A1628] py-3 rounded-xl text-sm font-bold transition duration-200 mt-1">
              Create Account
            </button>

            <p className="text-center text-xs text-[#6B7280]">
              Agent ID & BVN verification happens inside your dashboard after sign-up.
            </p>

          </form>
        )}
      </div>
    </section>
  );
};

export default Register;