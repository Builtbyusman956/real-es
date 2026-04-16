// src/pages/dashboard/AgentVerification.jsx
import { useState } from "react";
import {
  ShieldCheck, CheckCircle, Upload, User,
  CreditCard, MapPin, Camera, ChevronRight, Clock
} from "lucide-react";

const STEPS = [
  {
    id: "id",
    label: "ID Upload",
    icon: CreditCard,
    description: "Upload a valid government-issued ID (NIN slip, international passport, or driver's license).",
  },
  {
    id: "bvn",
    label: "BVN Verification",
    icon: ShieldCheck,
    description: "Enter your Bank Verification Number to confirm your identity with your bank.",
  },
  {
    id: "face",
    label: "Face Verification",
    icon: Camera,
    description: "Take a selfie to match against your ID. Make sure your face is clearly visible.",
  },
  {
    id: "address",
    label: "Office Address",
    icon: MapPin,
    description: "Provide your office or business address. This will be visible to buyers.",
  },
];

const AgentVerification = () => {
  const [currentStep, setCurrentStep] = useState("id");
  const [completed,   setCompleted]   = useState([]);
  const [bvn,         setBvn]         = useState("");
  const [address,     setAddress]     = useState("");
  const [fileUploaded, setFileUploaded] = useState(false);

  const completedCount = completed.length;
  const progress       = Math.round((completedCount / STEPS.length) * 100);
  const allDone        = completedCount === STEPS.length;

  const markDone = () => {
    if (!completed.includes(currentStep)) {
      setCompleted(prev => [...prev, currentStep]);
    }
    const idx = STEPS.findIndex(s => s.id === currentStep);
    if (idx < STEPS.length - 1) setCurrentStep(STEPS[idx + 1].id);
  };

  const currentStepData = STEPS.find(s => s.id === currentStep);

  return (
    <div className="flex flex-col gap-6 max-w-4xl">

      {/* Header */}
      <div className="bg-[#0A1628] rounded-2xl p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <p className="text-[#C9A84C] text-xs font-bold uppercase tracking-widest mb-1">Agent Verification</p>
          <h1 className="text-[#F7F4EF] text-xl font-bold">Verify Your Identity</h1>
          <p className="text-[#8A9BB5] text-sm mt-1">Complete all steps to get your verified badge and unlock full features.</p>
        </div>
        <div className="flex-shrink-0 text-right">
          <p className="text-[#C9A84C] text-2xl font-bold">{completedCount}/{STEPS.length}</p>
          <p className="text-[#8A9BB5] text-xs">steps complete</p>
        </div>
      </div>

      {/* Progress bar */}
      <div className="bg-white rounded-2xl border border-[#E0D9CF] p-4 flex items-center gap-4">
        <ShieldCheck size={20} className={allDone ? "text-green-500" : "text-[#C9A84C]"} />
        <div className="flex-1">
          <div className="h-2.5 bg-[#E0D9CF] rounded-full overflow-hidden">
            <div
              className="h-full bg-[#C9A84C] rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
        <span className="text-sm font-bold text-[#C9A84C] flex-shrink-0">{progress}%</span>
      </div>

      {allDone ? (
        /* ── All done state ── */
        <div className="bg-white rounded-2xl border border-[#E0D9CF] p-10 flex flex-col items-center text-center gap-4">
          <div className="w-20 h-20 rounded-full bg-green-50 border-2 border-green-200 flex items-center justify-center">
            <CheckCircle size={40} className="text-green-500" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-[#0A1628]">Verification Submitted!</h2>
            <p className="text-[#6B7280] text-sm mt-1 max-w-sm">Your documents are under review. You'll receive a notification once your account is verified — usually within 24 hours.</p>
          </div>
          <div className="flex items-center gap-2 bg-[#0A1628] text-[#C9A84C] px-5 py-2.5 rounded-xl font-bold text-sm">
            <ShieldCheck size={16} /> Verification Pending Review
          </div>
        </div>
      ) : (
        <div className="grid lg:grid-cols-3 gap-6">

          {/* Step list */}
          <div className="flex flex-col gap-2">
            {STEPS.map((step, idx) => {
              const done    = completed.includes(step.id);
              const isCurrent = currentStep === step.id;
              return (
                <button
                  key={step.id}
                  onClick={() => setCurrentStep(step.id)}
                  className={`w-full p-3.5 rounded-xl text-left flex items-center gap-3 transition-all duration-200 border
                    ${isCurrent
                      ? "bg-[#C9A84C] border-[#C9A84C] text-[#0A1628]"
                      : done
                        ? "bg-[#F7F4EF] border-[#E0D9CF] text-[#0A1628]"
                        : "bg-white border-[#E0D9CF] text-[#6B7280] hover:border-[#C9A84C]/40"}`}>
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold
                    ${isCurrent ? "bg-[#0A1628] text-[#C9A84C]" : done ? "bg-green-500 text-white" : "bg-[#E0D9CF] text-[#6B7280]"}`}>
                    {done ? <CheckCircle size={14} /> : idx + 1}
                  </div>
                  <span className="text-sm font-semibold flex-1">{step.label}</span>
                  {done && !isCurrent && <CheckCircle size={14} className="text-green-500 flex-shrink-0" />}
                </button>
              );
            })}
          </div>

          {/* Step content */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl border border-[#E0D9CF] p-6 flex flex-col gap-5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#0A1628] flex items-center justify-center flex-shrink-0">
                  {currentStepData && <currentStepData.icon size={18} className="text-[#C9A84C]" />}
                </div>
                <div>
                  <h2 className="font-bold text-[#0A1628]">{currentStepData?.label}</h2>
                  <p className="text-xs text-[#6B7280] mt-0.5">{currentStepData?.description}</p>
                </div>
              </div>

              {/* ID Upload step */}
              {currentStep === "id" && (
                <div
                  onClick={() => setFileUploaded(true)}
                  className={`border-2 border-dashed rounded-xl h-40 flex flex-col items-center justify-center cursor-pointer transition-all duration-200
                    ${fileUploaded ? "border-green-400 bg-green-50" : "border-[#E0D9CF] hover:border-[#C9A84C] hover:bg-[#F7F4EF]"}`}>
                  {fileUploaded ? (
                    <>
                      <CheckCircle size={28} className="text-green-500" />
                      <p className="text-sm font-semibold text-green-600 mt-2">File uploaded</p>
                      <p className="text-xs text-[#6B7280] mt-1">Click to replace</p>
                    </>
                  ) : (
                    <>
                      <Upload size={28} className="text-[#C9A84C]" />
                      <p className="text-sm font-semibold text-[#0A1628] mt-2">Click to upload your ID</p>
                      <p className="text-xs text-[#6B7280] mt-1">JPG, PNG or PDF — max 5MB</p>
                    </>
                  )}
                </div>
              )}

              {/* BVN step */}
              {currentStep === "bvn" && (
                <div className="flex flex-col gap-3">
                  <label className="text-xs font-semibold text-[#6B7280] uppercase tracking-wide">BVN Number</label>
                  <input
                    type="text"
                    maxLength={11}
                    value={bvn}
                    onChange={e => setBvn(e.target.value.replace(/\D/, ""))}
                    placeholder="Enter your 11-digit BVN"
                    className="w-full border border-[#E0D9CF] rounded-xl px-4 py-3 text-sm text-[#0A1628] focus:outline-none focus:border-[#C9A84C] transition"
                  />
                  <p className="text-xs text-[#6B7280]">Your BVN is safe and will only be used for identity verification.</p>
                </div>
              )}

              {/* Face verify step */}
              {currentStep === "face" && (
                <div
                  onClick={() => setFileUploaded(true)}
                  className={`border-2 border-dashed rounded-xl h-40 flex flex-col items-center justify-center cursor-pointer transition-all duration-200
                    ${fileUploaded ? "border-green-400 bg-green-50" : "border-[#E0D9CF] hover:border-[#C9A84C] hover:bg-[#F7F4EF]"}`}>
                  {fileUploaded ? (
                    <>
                      <CheckCircle size={28} className="text-green-500" />
                      <p className="text-sm font-semibold text-green-600 mt-2">Selfie uploaded</p>
                    </>
                  ) : (
                    <>
                      <Camera size={28} className="text-[#C9A84C]" />
                      <p className="text-sm font-semibold text-[#0A1628] mt-2">Take or upload a selfie</p>
                      <p className="text-xs text-[#6B7280] mt-1">Make sure your face is clearly visible</p>
                    </>
                  )}
                </div>
              )}

              {/* Address step */}
              {currentStep === "address" && (
                <div className="flex flex-col gap-3">
                  <label className="text-xs font-semibold text-[#6B7280] uppercase tracking-wide">Office / Business Address</label>
                  <textarea
                    value={address}
                    onChange={e => setAddress(e.target.value)}
                    placeholder="Enter your full office address..."
                    rows={4}
                    className="w-full border border-[#E0D9CF] rounded-xl px-4 py-3 text-sm text-[#0A1628] focus:outline-none focus:border-[#C9A84C] transition resize-none"
                  />
                </div>
              )}

              <button
                onClick={markDone}
                className="flex items-center justify-center gap-2 bg-[#C9A84C] hover:bg-[#b8943d] active:scale-95 text-[#0A1628] font-bold px-6 py-3 rounded-xl transition duration-200 w-full sm:w-auto sm:self-end">
                {completed.includes(currentStep) ? "Next Step" : "Submit & Continue"}
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AgentVerification;