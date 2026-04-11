// src/pages/Register.jsx
import { useState } from "react";
import { Eye, EyeOff, Mail, Home, ShieldCheck, Building2, MapPin } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import bgImg from "../assets/realestate.avif";

// All 195 countries
const COUNTRIES = [
  "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua and Barbuda", "Argentina", "Armenia", "Australia", "Austria", "Azerbaijan",
  "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bhutan", "Bolivia", "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei", "Bulgaria", "Burkina Faso", "Burundi",
  "Cabo Verde", "Cambodia", "Cameroon", "Canada", "Central African Republic", "Chad", "Chile", "China", "Colombia", "Comoros", "Congo", "Costa Rica", "Croatia", "Cuba", "Cyprus", "Czech Republic",
  "Denmark", "Djibouti", "Dominica", "Dominican Republic",
  "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Eswatini", "Ethiopia",
  "Fiji", "Finland", "France",
  "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Greece", "Grenada", "Guatemala", "Guinea", "Guinea-Bissau", "Guyana",
  "Haiti", "Honduras", "Hungary",
  "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Israel", "Italy", "Ivory Coast",
  "Jamaica", "Japan", "Jordan",
  "Kazakhstan", "Kenya", "Kiribati", "Korea North", "Korea South", "Kosovo", "Kuwait", "Kyrgyzstan",
  "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg",
  "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Mauritania", "Mauritius", "Mexico", "Micronesia", "Moldova", "Monaco", "Mongolia", "Montenegro", "Morocco", "Mozambique", "Myanmar",
  "Namibia", "Nauru", "Nepal", "Netherlands", "New Zealand", "Nicaragua", "Niger", "Nigeria", "North Macedonia", "Norway",
  "Oman",
  "Pakistan", "Palau", "Palestine", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal",
  "Qatar",
  "Romania", "Russia", "Rwanda",
  "Saint Kitts and Nevis", "Saint Lucia", "Saint Vincent and the Grenadines", "Samoa", "San Marino", "Sao Tome and Principe", "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands", "Somalia", "South Africa", "South Sudan", "Spain", "Sri Lanka", "Sudan", "Suriname", "Sweden", "Switzerland", "Syria",
  "Taiwan", "Tajikistan", "Tanzania", "Thailand", "Timor-Leste", "Togo", "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan", "Tuvalu",
  "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States", "Uruguay", "Uzbekistan",
  "Vanuatu", "Vatican City", "Venezuela", "Vietnam",
  "Yemen",
  "Zambia", "Zimbabwe"
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
const ConfirmScreen = ({ email, role }) => {
  const isAgent = role === "agent";
  
  return (
    <div className="flex flex-col items-center text-center gap-4 py-10 px-6">
      <div className="w-16 h-16 rounded-full bg-[#E8D5A3]/40 border border-[#C9A84C]/30 flex items-center justify-center text-[#C9A84C]">
        <Mail size={30} />
      </div>
      <h3 className="text-xl font-bold text-[#0A1628]">Check your inbox</h3>
      <p className="text-sm text-[#6B7280] max-w-xs leading-relaxed">
        We sent a confirmation link to{" "}
        <span className="font-semibold text-[#0A1628]">{email}</span>.
        Click it to activate your {role} account and access your dashboard.
      </p>
      <p className="text-xs text-[#6B7280] mt-1">
        Didn't get it? Check your spam folder or{" "}
        <button className="text-[#C9A84C] underline font-medium">resend email</button>.
      </p>
      
      {/* Role indicator with icon */}
      <div className="mt-4 flex items-center gap-2 px-4 py-2 bg-[#E8D5A3]/30 rounded-full">
        {isAgent ? (
          <>
            <ShieldCheck size={16} className="text-[#C9A84C]" />
            <span className="text-xs font-semibold text-[#0A1628]">Agent Account</span>
          </>
        ) : (
          <>
            <Home size={16} className="text-[#C9A84C]" />
            <span className="text-xs font-semibold text-[#0A1628]">Buyer Account</span>
          </>
        )}
      </div>
    </div>
  );
};

// ── Main ─────────────────────────────────────────────────────────────────────
const Register = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { signup, loginWithGoogle } = useAuth();
  const role = searchParams.get("role") || "buyer";

  const [form, setForm]           = useState(INITIAL);
  const [errors, setErrors]       = useState({});
  const [showPw, setShowPw]       = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading]     = useState(false);
  const [error, setError]         = useState("");

  const isAgent = role === "agent";
  const portalTitle = isAgent ? "Agent Portal" : "Buyer Portal";
  const accountType = isAgent ? "Agent" : "Buyer";
  const submitText = isAgent ? "Create Agent Account" : "Create Buyer Account";
  const postScript = isAgent 
    ? "Agent ID & BVN verification happens inside your dashboard after sign-up."
    : "Start browsing verified properties immediately after confirmation.";

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((p)   => ({ ...p, [name]: type === "checkbox" ? checked : value }));
    setErrors((p) => ({ ...p, [name]: undefined }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate(form);
    if (Object.keys(errs).length) { setErrors(errs); return; }

    try {
      setLoading(true);
      setError("");
      
      const displayName = `${form.firstName} ${form.lastName}`;
      await signup(form.email, form.password, displayName, role);
      
      setSubmitted(true);
    } catch (err) {
      console.error("Registration error:", err);
      if (err.code === 'auth/email-already-in-use') {
        setError("This email is already registered. Please sign in instead.");
      } else if (err.code === 'auth/weak-password') {
        setError("Password should be at least 6 characters.");
      } else {
        setError("Failed to create account. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignUp = async () => {
    try {
      setLoading(true);
      setError("");
      await loginWithGoogle(role);
      // Redirect to dashboard after successful Google sign-up
      navigate(isAgent ? "/dashboard/agent" : "/dashboard/buyer");
    } catch (err) {
      console.error("Google sign-up error:", err);
      setError("Failed to sign up with Google. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative w-full min-h-screen flex items-center justify-center px-4 py-20">

      {/* Background */}
      <div className="absolute inset-0">
        <img src={bgImg} alt="background" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A1628]/90 via-[#0A1628]/65 to-[#0A1628]/20" />
      </div>

      {/* Card */}
      <div className="relative z-10 w-full max-w-md bg-[#F7F4EF] rounded-3xl shadow-2xl shadow-[#0A1628]/40 overflow-hidden">

        {/* Header - DYNAMIC BASED ON ROLE */}
        <div className="bg-[#0A1628] px-6 pt-6 pb-5">
          <div className="flex items-center gap-2 mb-1">
            {isAgent ? (
              <ShieldCheck size={14} className="text-[#C9A84C]" />
            ) : (
              <Home size={14} className="text-[#C9A84C]" />
            )}
            <p className="text-[#C9A84C] text-[10px] font-semibold uppercase tracking-[0.18em]">
              {portalTitle}
            </p>
          </div>
          <h2 className="text-[#F7F4EF] text-2xl font-bold leading-tight">
            Create Your {accountType} Account
          </h2>
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

        {error && (
          <div className="mx-6 mt-4 bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded-xl">
            {error}
          </div>
        )}

        {submitted ? <ConfirmScreen email={form.email} role={role} /> : (
          <form onSubmit={handleSubmit} noValidate className="px-6 py-5 flex flex-col gap-4">

            {/* Social buttons */}
            <div className="flex flex-col gap-2">
              <button 
                type="button"
                onClick={handleGoogleSignUp}
                disabled={loading}
                className="flex items-center justify-center gap-2 w-full border border-[#E0D9CF] bg-white rounded-xl py-2.5 text-sm font-medium text-[#0A1628] hover:border-[#C9A84C]/50 hover:bg-[#F7F4EF] active:scale-95 transition duration-200 disabled:opacity-50"
              >
                <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="w-4 h-4" alt="Google" />
                Continue with Google
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

            {/* Country dropdown - ALL COUNTRIES */}
            <Field label="Country" error={errors.country}>
              <div className="relative">
                <MapPin size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6B7280]" />
                <select name="country" value={form.country} onChange={handleChange}
                  className={inputCls(errors.country) + " pl-10"}>
                  <option value="">— Select country —</option>
                  {COUNTRIES.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
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

            {/* Submit button - DYNAMIC TEXT */}
            <button 
              type="submit"
              disabled={loading}
              className="w-full bg-[#C9A84C] hover:bg-[#b8943d] active:scale-95 text-[#0A1628] py-3 rounded-xl text-sm font-bold transition duration-200 mt-1 flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loading ? (
                <div className="w-4 h-4 border-2 border-[#0A1628] border-t-transparent rounded-full animate-spin" />
              ) : (
                isAgent ? <Building2 size={16} /> : <Home size={16} />
              )}
              {submitText}
            </button>

            <p className="text-center text-xs text-[#6B7280]">
              {postScript}
            </p>

          </form>
        )}
      </div>
    </section>
  );
};

export default Register;