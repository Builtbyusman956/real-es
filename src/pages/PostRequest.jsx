// src/pages/PostRequest.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  RiMapPinLine, RiMoneyDollarCircleLine, RiHome4Line,
  RiCalendarLine, RiFileTextLine, RiCheckboxCircleLine,
  RiArrowLeftLine, RiArrowRightLine, RiAddLine,
} from "react-icons/ri";
import { MdBedroomParent, MdOutlineBathtub } from "react-icons/md";
import { HiChevronDown } from "react-icons/hi";
import bgImg from "../assets/realestate.avif";

const STEPS = [
  { id: 1, label: "Property",  icon: RiHome4Line           },
  { id: 2, label: "Location",  icon: RiMapPinLine          },
  { id: 3, label: "Budget",    icon: RiMoneyDollarCircleLine },
  { id: 4, label: "Details",   icon: RiFileTextLine        },
  { id: 5, label: "Review",    icon: RiCheckboxCircleLine  },
];

const PROPERTY_TYPES = ["Apartment / Flat", "Duplex", "Bungalow", "Land", "Commercial", "Office Space", "Shop", "Warehouse", "Other"];
const PURPOSES       = ["Rent", "Buy", "Lease"];
const STATES         = ["Lagos", "Abuja (FCT)", "Oyo", "Rivers", "Kano", "Enugu", "Delta", "Kaduna", "Anambra", "Ogun", "Other"];
const BED_OPTIONS    = ["Studio", "1", "2", "3", "4", "5", "6+", "Not applicable"];
const BATH_OPTIONS   = ["1", "2", "3", "4+", "Not applicable"];
const MOVE_IN        = ["Immediately", "Within 1 month", "1–3 months", "3–6 months", "Flexible"];
const DURATION       = ["6 months", "1 year", "2 years", "Permanent (purchase)", "Flexible"];

const INITIAL = {
  purpose: "",
  propertyType: "",
  beds: "",
  baths: "",
  state: "",
  lga: "",
  specificArea: "",
  minBudget: "",
  maxBudget: "",
  moveIn: "",
  duration: "",
  title: "",
  description: "",
  mustHave: [],
  urgent: false,
};

const MUST_HAVES = [
  "24hr Power Supply", "Water Supply", "Security / Gateman",
  "Parking Space", "Swimming Pool", "Gym", "Boys Quarters",
  "Serviced Estate", "C of O", "Registered Survey",
  "Government Approved", "Tiled Floors", "Fitted Kitchen",
];

// ─── Step indicators ──────────────────────────────────────────────────────────
const StepBar = ({ current }) => (
  <div className="flex items-center justify-center gap-0 mb-8">
    {STEPS.map(({ id, label, icon: Icon }, i) => {
      const done   = current > id;
      const active = current === id;
      return (
        <div key={id} className="flex items-center">
          <div className="flex flex-col items-center gap-1">
            <div className={`w-9 h-9 rounded-xl flex items-center justify-center border-2 transition-all duration-300
              ${done   ? "bg-[#C9A84C] border-[#C9A84C] text-[#0A1628]"
              : active ? "bg-[#0A1628] border-[#C9A84C] text-[#C9A84C]"
              :          "bg-[#F7F4EF] border-[#E0D9CF] text-[#6B7280]"}`}>
              <Icon size={16} />
            </div>
            <span className={`text-[9px] font-bold uppercase tracking-widest hidden sm:block
              ${active ? "text-[#0A1628]" : done ? "text-[#C9A84C]" : "text-[#6B7280]"}`}>
              {label}
            </span>
          </div>
          {i < STEPS.length - 1 && (
            <div className={`w-8 sm:w-12 h-0.5 mb-4 mx-1 transition-all duration-300
              ${done ? "bg-[#C9A84C]" : "bg-[#E0D9CF]"}`} />
          )}
        </div>
      );
    })}
  </div>
);

// ─── Shared field styles ──────────────────────────────────────────────────────
const Label = ({ children }) => (
  <label className="text-[10px] font-bold text-[#6B7280] uppercase tracking-widest mb-1.5 block">
    {children}
  </label>
);

const inputCls = "w-full px-3 py-3 rounded-xl border border-[#E0D9CF] text-sm text-[#0A1628] bg-white outline-none focus:ring-2 focus:ring-[#C9A84C] focus:border-[#C9A84C] transition";

const SelectField = ({ label, value, onChange, options, placeholder }) => (
  <div className="flex flex-col">
    <Label>{label}</Label>
    <div className="relative">
      <select value={value} onChange={(e) => onChange(e.target.value)}
        className={inputCls + " appearance-none cursor-pointer pr-8"}>
        <option value="">{placeholder || `Select ${label}`}</option>
        {options.map((o) => <option key={o} value={o}>{o}</option>)}
      </select>
      <HiChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6B7280] pointer-events-none" size={16} />
    </div>
  </div>
);

const PillSelect = ({ label, options, value, onChange }) => (
  <div>
    <Label>{label}</Label>
    <div className="flex flex-wrap gap-2">
      {options.map((o) => (
        <button key={o} type="button" onClick={() => onChange(o)}
          className={`px-3 py-2 rounded-xl border text-xs font-semibold transition duration-200
            ${value === o
              ? "bg-[#0A1628] text-[#C9A84C] border-[#0A1628]"
              : "bg-white text-[#6B7280] border-[#E0D9CF] hover:border-[#C9A84C]/50"}`}>
          {o}
        </button>
      ))}
    </div>
  </div>
);

// ─── Step 1 — Property Type ───────────────────────────────────────────────────
const Step1 = ({ form, set }) => (
  <div className="flex flex-col gap-5">
    <PillSelect
      label="What are you looking for?"
      options={PURPOSES}
      value={form.purpose}
      onChange={(v) => set("purpose", v)}
    />
    <div>
      <Label>Property Type</Label>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
        {PROPERTY_TYPES.map((t) => (
          <button key={t} type="button" onClick={() => set("propertyType", t)}
            className={`px-3 py-2.5 rounded-xl border text-xs font-semibold text-left transition duration-200 flex items-center gap-2
              ${form.propertyType === t
                ? "bg-[#0A1628] text-[#C9A84C] border-[#0A1628]"
                : "bg-white text-[#6B7280] border-[#E0D9CF] hover:border-[#C9A84C]/50"}`}>
            <RiHome4Line size={13} /> {t}
          </button>
        ))}
      </div>
    </div>
    <div className="grid grid-cols-2 gap-4">
      <PillSelect
        label="Bedrooms needed"
        options={BED_OPTIONS}
        value={form.beds}
        onChange={(v) => set("beds", v)}
      />
      <PillSelect
        label="Bathrooms needed"
        options={BATH_OPTIONS}
        value={form.baths}
        onChange={(v) => set("baths", v)}
      />
    </div>
  </div>
);

// ─── Step 2 — Location ────────────────────────────────────────────────────────
const Step2 = ({ form, set }) => (
  <div className="flex flex-col gap-5">
    <SelectField
      label="State"
      value={form.state}
      onChange={(v) => set("state", v)}
      options={STATES}
      placeholder="Select state"
    />
    <div>
      <Label>LGA / Area</Label>
      <input
        type="text"
        placeholder="e.g. Eti-Osa, Lekki, Wuse 2"
        value={form.lga}
        onChange={(e) => set("lga", e.target.value)}
        className={inputCls}
      />
    </div>
    <div>
      <Label>Specific Neighbourhood or Landmark (optional)</Label>
      <input
        type="text"
        placeholder="e.g. Near Ikeja City Mall, off Admiralty Way"
        value={form.specificArea}
        onChange={(e) => set("specificArea", e.target.value)}
        className={inputCls}
      />
      <p className="text-[10px] text-[#6B7280] mt-1.5">
        The more specific you are, the better offers you'll receive.
      </p>
    </div>
  </div>
);

// ─── Step 3 — Budget ─────────────────────────────────────────────────────────
const Step3 = ({ form, set }) => (
  <div className="flex flex-col gap-5">
    <div className="grid grid-cols-2 gap-4">
      <div>
        <Label>Minimum Budget (₦)</Label>
        <input
          type="number"
          placeholder="e.g. 1000000"
          value={form.minBudget}
          onChange={(e) => set("minBudget", e.target.value)}
          className={inputCls}
        />
      </div>
      <div>
        <Label>Maximum Budget (₦)</Label>
        <input
          type="number"
          placeholder="e.g. 3000000"
          value={form.maxBudget}
          onChange={(e) => set("maxBudget", e.target.value)}
          className={inputCls}
        />
      </div>
    </div>

    {form.minBudget && form.maxBudget && (
      <div className="bg-[#E8D5A3]/30 border border-[#C9A84C]/20 rounded-xl px-4 py-3">
        <p className="text-sm font-bold text-[#0A1628]">
          Budget: ₦{Number(form.minBudget).toLocaleString()} — ₦{Number(form.maxBudget).toLocaleString()}
          {form.purpose === "Rent" || form.purpose === "Lease" ? "/yr" : ""}
        </p>
      </div>
    )}

    <PillSelect
      label="Preferred Move-in Date"
      options={MOVE_IN}
      value={form.moveIn}
      onChange={(v) => set("moveIn", v)}
    />

    {(form.purpose === "Rent" || form.purpose === "Lease") && (
      <PillSelect
        label="Lease Duration"
        options={DURATION}
        value={form.duration}
        onChange={(v) => set("duration", v)}
      />
    )}
  </div>
);

// ─── Step 4 — Details ─────────────────────────────────────────────────────────
const Step4 = ({ form, set }) => {
  const toggle = (item) => {
    const current = form.mustHave || [];
    set("mustHave", current.includes(item)
      ? current.filter((i) => i !== item)
      : [...current, item]);
  };

  return (
    <div className="flex flex-col gap-5">
      <div>
        <Label>Request Title</Label>
        <input
          type="text"
          placeholder="e.g. Looking for 3 Bedroom Flat in Lekki Phase 1"
          value={form.title}
          onChange={(e) => set("title", e.target.value)}
          className={inputCls}
          maxLength={80}
        />
        <p className="text-[10px] text-[#6B7280] mt-1">{form.title.length}/80 characters</p>
      </div>

      <div>
        <Label>Description</Label>
        <textarea
          rows={4}
          placeholder="Describe exactly what you need. Include must-haves, deal-breakers, and anything else agents should know..."
          value={form.description}
          onChange={(e) => set("description", e.target.value)}
          className={inputCls + " resize-none"}
          maxLength={500}
        />
        <p className="text-[10px] text-[#6B7280] mt-1">{form.description.length}/500 characters</p>
      </div>

      <div>
        <Label>Must-Have Features (select all that apply)</Label>
        <div className="flex flex-wrap gap-2">
          {MUST_HAVES.map((item) => {
            const selected = (form.mustHave || []).includes(item);
            return (
              <button key={item} type="button" onClick={() => toggle(item)}
                className={`px-3 py-1.5 rounded-xl border text-xs font-medium transition duration-200
                  ${selected
                    ? "bg-[#0A1628] text-[#C9A84C] border-[#0A1628]"
                    : "bg-white text-[#6B7280] border-[#E0D9CF] hover:border-[#C9A84C]/50"}`}>
                {selected ? "✓ " : ""}{item}
              </button>
            );
          })}
        </div>
      </div>

      <label className="flex items-center gap-3 cursor-pointer bg-red-50 border border-red-200 rounded-xl px-4 py-3">
        <div onClick={() => set("urgent", !form.urgent)}
          className={`w-10 h-6 rounded-full flex items-center transition-all duration-300 px-0.5 flex-shrink-0
            ${form.urgent ? "bg-red-500" : "bg-[#E0D9CF]"}`}>
          <div className={`w-5 h-5 rounded-full bg-white shadow transition-transform duration-300
            ${form.urgent ? "translate-x-4" : "translate-x-0"}`} />
        </div>
        <div>
          <p className="text-sm font-bold text-[#0A1628]">Mark as Urgent</p>
          <p className="text-[10px] text-[#6B7280]">Urgent requests get priority visibility and more agent responses</p>
        </div>
      </label>
    </div>
  );
};

// ─── Step 5 — Review ─────────────────────────────────────────────────────────
const Step5 = ({ form }) => (
  <div className="flex flex-col gap-4">
    <div className="bg-[#0A1628] rounded-2xl p-5">
      <div className="flex items-start justify-between gap-3 mb-3">
        <h3 className="text-[#F7F4EF] font-bold text-base leading-tight">{form.title || "Your Request"}</h3>
        <div className="flex gap-1.5 flex-shrink-0 flex-wrap justify-end">
          <span className="bg-[#C9A84C] text-[#0A1628] text-[10px] font-bold px-2.5 py-1 rounded-full">{form.purpose}</span>
          {form.urgent && <span className="bg-red-500 text-white text-[10px] font-bold px-2.5 py-1 rounded-full">Urgent</span>}
        </div>
      </div>
      {form.description && <p className="text-[#8A9BB5] text-sm leading-relaxed">{form.description}</p>}
    </div>

    <div className="grid grid-cols-2 gap-3">
      {[
        { label: "Property Type", value: form.propertyType },
        { label: "Location",      value: [form.specificArea, form.lga, form.state].filter(Boolean).join(", ") },
        { label: "Budget",        value: form.minBudget && form.maxBudget ? `₦${Number(form.minBudget).toLocaleString()} – ₦${Number(form.maxBudget).toLocaleString()}` : "Not set" },
        { label: "Move-in",       value: form.moveIn || "Not set" },
        { label: "Bedrooms",      value: form.beds || "Not set"   },
        { label: "Bathrooms",     value: form.baths || "Not set"  },
      ].map(({ label, value }) => (
        <div key={label} className="bg-white rounded-xl border border-[#E0D9CF] px-4 py-3">
          <p className="text-[10px] text-[#6B7280] font-semibold uppercase tracking-widest">{label}</p>
          <p className="text-sm font-bold text-[#0A1628] mt-0.5">{value || "—"}</p>
        </div>
      ))}
    </div>

    {form.mustHave?.length > 0 && (
      <div className="bg-white rounded-xl border border-[#E0D9CF] px-4 py-3">
        <p className="text-[10px] text-[#6B7280] font-semibold uppercase tracking-widest mb-2">Must-Have Features</p>
        <div className="flex flex-wrap gap-1.5">
          {form.mustHave.map((m) => (
            <span key={m} className="bg-[#E8D5A3]/60 text-[#0A1628] text-[10px] font-semibold px-2.5 py-1 rounded-full">
              ✓ {m}
            </span>
          ))}
        </div>
      </div>
    )}

    <div className="bg-[#E8D5A3]/20 border border-[#C9A84C]/20 rounded-xl px-4 py-3">
      <p className="text-xs text-[#6B7280] leading-relaxed">
        By submitting, your request will be visible to <strong className="text-[#0A1628]">verified agents only</strong>.
        Other buyers cannot see your request. Agents will contact you via the platform's messaging system.
      </p>
    </div>
  </div>
);

// ─── Success Screen ───────────────────────────────────────────────────────────
const SuccessScreen = ({ onDone }) => (
  <div className="flex flex-col items-center text-center gap-4 py-8 px-6">
    <div className="w-20 h-20 rounded-2xl bg-[#E8D5A3]/40 border border-[#C9A84C]/20 flex items-center justify-center">
      <RiCheckboxCircleLine size={40} className="text-[#C9A84C]" />
    </div>
    <h3 className="text-xl font-bold text-[#0A1628]">Request Posted!</h3>
    <p className="text-sm text-[#6B7280] max-w-xs leading-relaxed">
      Your property request has been submitted. Verified agents will start sending you offers shortly.
    </p>
    <div className="flex flex-col sm:flex-row gap-3 w-full mt-2">
      <button onClick={onDone}
        className="flex-1 bg-[#C9A84C] hover:bg-[#b8943d] active:scale-95 text-[#0A1628] font-bold py-3 rounded-xl text-sm transition">
        View My Requests
      </button>
      <button onClick={() => window.location.reload()}
        className="flex-1 border border-[#E0D9CF] hover:border-[#C9A84C]/50 text-[#0A1628] font-semibold py-3 rounded-xl text-sm transition">
        Post Another
      </button>
    </div>
  </div>
);

// ─── Validation ───────────────────────────────────────────────────────────────
const validate = (step, form) => {
  if (step === 1) return form.purpose && form.propertyType;
  if (step === 2) return form.state;
  if (step === 3) return form.minBudget && form.maxBudget && form.moveIn;
  if (step === 4) return form.title.trim().length >= 10 && form.description.trim().length >= 20;
  return true;
};

// ─── Main ─────────────────────────────────────────────────────────────────────
const PostRequest = () => {
  const navigate  = useNavigate();
  const [step,      setStep]      = useState(1);
  const [form,      setForm]      = useState(INITIAL);
  const [submitted, setSubmitted] = useState(false);
  const [error,     setError]     = useState("");

  const set = (key, val) => {
    setForm((p) => ({ ...p, [key]: val }));
    setError("");
  };

  const next = () => {
    if (!validate(step, form)) {
      setError("Please fill in all required fields before continuing.");
      return;
    }
    setError("");
    setStep((s) => s + 1);
  };

  const prev = () => { setError(""); setStep((s) => s - 1); };

  const submit = () => {
    if (!validate(4, form)) { setError("Please complete all required fields."); return; }
    console.log("POST REQUEST:", form);
    setSubmitted(true);
  };

  const isPublicRoute = !window.location.pathname.startsWith("/dashboard");

  return (
    <section className={`relative min-h-screen flex items-center justify-center px-4 py-20 ${isPublicRoute ? "" : "bg-[#F7F4EF]"}`}>
      {isPublicRoute && (
        <div className="absolute inset-0">
          <img src={bgImg} alt="background" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0A1628]/90 via-[#0A1628]/65 to-[#0A1628]/20" />
        </div>
      )}

      <div className="relative z-10 w-full max-w-xl">
        <div className="bg-[#F7F4EF] rounded-3xl shadow-2xl shadow-[#0A1628]/30 overflow-hidden">

          {/* Header */}
          <div className="bg-[#0A1628] px-6 pt-6 pb-5">
            <div className="flex items-center gap-3 mb-2">
              {step > 1 && !submitted && (
                <button onClick={prev}
                  className="w-8 h-8 rounded-lg bg-[#1A2E4A] flex items-center justify-center text-[#8A9BB5] hover:text-white transition flex-shrink-0">
                  <RiArrowLeftLine size={16} />
                </button>
              )}
              <div>
                <p className="text-[#C9A84C] text-[10px] font-bold uppercase tracking-[0.18em]">Post a Request</p>
                <h2 className="text-[#F7F4EF] text-xl font-bold leading-tight">
                  {submitted ? "All Done!" :
                   step === 1 ? "What are you looking for?" :
                   step === 2 ? "Where do you want it?" :
                   step === 3 ? "What's your budget?" :
                   step === 4 ? "Tell agents more" :
                   "Review your request"}
                </h2>
              </div>
            </div>

            {/* Progress bar */}
            {!submitted && (
              <div className="bg-[#1A2E4A] rounded-full h-1 mt-3">
                <div
                  className="bg-[#C9A84C] h-1 rounded-full transition-all duration-500"
                  style={{ width: `${(step / 5) * 100}%` }}
                />
              </div>
            )}
          </div>

          {/* Body */}
          <div className="px-6 py-5">
            {submitted ? (
              <SuccessScreen onDone={() => navigate("/dashboard/buyer")} />
            ) : (
              <>
                {!submitted && <StepBar current={step} />}
                {step === 1 && <Step1 form={form} set={set} />}
                {step === 2 && <Step2 form={form} set={set} />}
                {step === 3 && <Step3 form={form} set={set} />}
                {step === 4 && <Step4 form={form} set={set} />}
                {step === 5 && <Step5 form={form} />}

                {error && (
                  <p className="text-xs text-red-500 font-medium mt-3 bg-red-50 border border-red-200 px-3 py-2 rounded-xl">
                    {error}
                  </p>
                )}

                <div className="flex items-center justify-between mt-6 pt-4 border-t border-[#E0D9CF]">
                  <span className="text-xs text-[#6B7280]">Step {step} of 5</span>
                  {step < 5 ? (
                    <button onClick={next}
                      className="flex items-center gap-2 bg-[#C9A84C] hover:bg-[#b8943d] active:scale-95 text-[#0A1628] px-6 py-2.5 rounded-xl font-bold text-sm transition duration-200">
                      Continue <RiArrowRightLine size={16} />
                    </button>
                  ) : (
                    <button onClick={submit}
                      className="flex items-center gap-2 bg-[#0A1628] hover:bg-[#1A2E4A] active:scale-95 text-[#C9A84C] px-6 py-2.5 rounded-xl font-bold text-sm transition duration-200">
                      <RiCheckboxCircleLine size={16} /> Submit Request
                    </button>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PostRequest;