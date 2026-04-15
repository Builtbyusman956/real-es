import { useState } from "react";
import {
  ShieldCheck, CheckCircle, ChevronRight
} from "lucide-react";

const Card = ({ children, className = "" }) => (
  <div className={`bg-white rounded-2xl border border-[#E0D9CF] ${className}`}>
    {children}
  </div>
);

const STEPS = [
  { id: "id", label: "ID Upload" },
  { id: "bvn", label: "BVN" },
  { id: "face", label: "Face Verify" },
  { id: "address", label: "Address" },
];

const AgentVerification = () => {
  const [currentStep, setCurrentStep] = useState("id");
  const [completed, setCompleted] = useState(["id"]);

  const submit = () => {
    setCompleted([...completed, currentStep]);
    const i = STEPS.findIndex(s => s.id === currentStep);
    if (i < STEPS.length - 1) setCurrentStep(STEPS[i + 1].id);
  };

  return (
    <div className="flex flex-col gap-6">

      {/* Header */}
      <div>
        <h1 className="text-xl font-bold text-[#0A1628]">
          Verification
        </h1>
        <p className="text-sm text-[#6B7280]">
          Complete your verification to unlock full access
        </p>
      </div>

      {/* Progress */}
      <Card className="p-5 flex items-center gap-4">
        <ShieldCheck className="text-[#C9A84C]" />
        <div className="flex-1">
          <div className="h-2 bg-[#E0D9CF] rounded-full overflow-hidden">
            <div
              className="h-full bg-[#C9A84C]"
              style={{
                width: `${(completed.length / STEPS.length) * 100}%`,
              }}
            />
          </div>
        </div>
        <span className="text-sm font-semibold text-[#C9A84C]">
          {completed.length}/{STEPS.length}
        </span>
      </Card>

      <div className="grid lg:grid-cols-3 gap-6">

        {/* Steps */}
        <div className="space-y-2">
          {STEPS.map((step) => {
            const done = completed.includes(step.id);

            return (
              <button
                key={step.id}
                onClick={() => setCurrentStep(step.id)}
                className={`w-full p-3 rounded-xl text-left flex justify-between
                  ${currentStep === step.id
                    ? "bg-[#C9A84C] text-[#0A1628]"
                    : "bg-white border border-[#E0D9CF]"}`}
              >
                {step.label}
                {done && <CheckCircle size={16} />}
              </button>
            );
          })}
        </div>

        {/* Content */}
        <div className="lg:col-span-2">
          <Card className="p-6 space-y-4">
            <h2 className="font-bold text-[#0A1628] capitalize">
              {currentStep}
            </h2>

            <p className="text-sm text-[#6B7280]">
              Complete this step to continue verification.
            </p>

            <button
              onClick={submit}
              className="btn-primary flex items-center gap-2"
            >
              Continue <ChevronRight size={16} />
            </button>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AgentVerification;