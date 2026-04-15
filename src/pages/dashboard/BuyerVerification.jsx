// src/pages/dashboard/BuyerVerification.jsx
import { useState } from "react";
import { ShieldCheck, Upload, CheckCircle } from "lucide-react";

const BuyerVerification = () => {
  const [step, setStep] = useState(1);

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-6 flex flex-col gap-6">

      {/* Header */}
      <div className="bg-[#0A1628] rounded-2xl p-6 text-white">
        <p className="text-xs text-[#C9A84C] font-bold uppercase">Verification</p>
        <h1 className="text-xl font-bold mt-1">Verify your identity</h1>
        <p className="text-sm text-[#8A9BB5] mt-1">
          This keeps the platform safe and unlocks full features.
        </p>
      </div>

      {/* Card */}
      <div className="bg-white border border-[#E0D9CF] rounded-2xl p-6">

        {step === 1 && (
          <div className="space-y-4">
            <p className="font-bold text-[#0A1628]">Upload ID</p>

            <div className="border-2 border-dashed border-[#E0D9CF] rounded-xl h-40 flex flex-col items-center justify-center cursor-pointer hover:border-[#C9A84C] transition">
              <Upload size={24} className="text-[#C9A84C]" />
              <p className="text-xs text-[#6B7280] mt-2">Click to upload</p>
            </div>

            <button
              onClick={() => setStep(2)}
              className="btn-primary w-full"
            >
              Continue
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4 text-center">
            <CheckCircle size={40} className="text-green-500 mx-auto"/>
            <p className="font-bold text-[#0A1628]">Verification Complete</p>
            <p className="text-sm text-[#6B7280]">
              You are now verified.
            </p>

            <div className="inline-flex items-center gap-2 bg-[#0A1628] text-[#C9A84C] px-4 py-2 rounded-xl font-semibold">
              <ShieldCheck size={16}/> Verified Buyer
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BuyerVerification;