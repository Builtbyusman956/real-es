// src/pages/dashboard/BuyerVerification.jsx
import { useState, useRef } from "react";
import {
  ShieldCheck, AlertTriangle, CheckCircle, Clock, Upload,
  Camera, FileText, ChevronRight, X, UserCheck, Lock
} from "lucide-react";

const STEPS = [
  { id: "id", label: "ID Upload", icon: FileText, description: "Government-issued ID" },
  { id: "face", label: "Face Verify", icon: Camera, description: "Live photo match" },
];

const BuyerVerification = () => {
  const [currentStep, setCurrentStep] = useState("id");
  const [completed, setCompleted] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // ID Upload state
  const [idFront, setIdFront] = useState(null);
  const [idBack, setIdBack] = useState(null);
  const idFrontRef = useRef(null);
  const idBackRef = useRef(null);

  // Face verify state
  const [faceImage, setFaceImage] = useState(null);
  const [isCapturing, setIsCapturing] = useState(false);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const handleFileUpload = (e, setFile) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert("File size must be less than 5MB");
        return;
      }
      setFile(URL.createObjectURL(file));
    }
  };

  const startFaceCapture = async () => {
    setIsCapturing(true);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      alert("Camera access denied");
      setIsCapturing(false);
    }
  };

  const captureFace = () => {
    if (videoRef.current && canvasRef.current) {
      const ctx = canvasRef.current.getContext("2d");
      canvasRef.current.width = videoRef.current.videoWidth;
      canvasRef.current.height = videoRef.current.videoHeight;
      ctx.drawImage(videoRef.current, 0, 0);
      setFaceImage(canvasRef.current.toDataURL("image/png"));
      
      const stream = videoRef.current.srcObject;
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
      setIsCapturing(false);
    }
  };

  const submitStep = async () => {
    setIsSubmitting(true);
    await new Promise(r => setTimeout(r, 1500));
    setCompleted([...completed, currentStep]);
    setIsSubmitting(false);
    
    const currentIdx = STEPS.findIndex(s => s.id === currentStep);
    if (currentIdx < STEPS.length - 1) {
      setCurrentStep(STEPS[currentIdx + 1].id);
    }
  };

  const isStepComplete = (stepId) => completed.includes(stepId);
  const allComplete = STEPS.every(s => completed.includes(s.id));

  return (
    <div className="flex flex-col gap-6 max-w-3xl mx-auto">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#0A1628] to-[#1A2E4A] rounded-2xl p-6 text-white">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-2">Verify Your Identity</h1>
            <p className="text-[#8A9BB5] text-sm">
              Verification helps us keep the platform safe and unlocks premium features 
              like instant booking and priority support.
            </p>
          </div>
          <div className="w-16 h-16 rounded-2xl bg-[#C9A84C]/20 flex items-center justify-center">
            <ShieldCheck size={32} className="text-[#C9A84C]" />
          </div>
        </div>
        
        <div className="mt-6 flex items-center gap-2">
          <div className="flex-1 h-2 bg-[#1A2E4A] rounded-full overflow-hidden">
            <div 
              className="h-full bg-[#C9A84C] transition-all duration-500"
              style={{ width: `${(completed.length / STEPS.length) * 100}%` }}
            />
          </div>
          <span className="text-sm font-semibold text-[#C9A84C]">
            {completed.length}/{STEPS.length}
          </span>
        </div>
      </div>

      {allComplete ? (
        <div className="bg-green-50 border border-green-200 rounded-2xl p-8 text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle size={40} className="text-green-600" />
          </div>
          <h2 className="text-xl font-bold text-green-800 mb-2">You're Verified!</h2>
          <p className="text-green-600 mb-4">You now have full access to all platform features.</p>
          <div className="inline-flex items-center gap-2 bg-[#0A1628] text-[#C9A84C] px-4 py-2 rounded-xl font-semibold">
            <ShieldCheck size={18} /> Verified Buyer
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-[#E0D9CF] p-6">
          {/* Step Indicator */}
          <div className="flex items-center gap-4 mb-6">
            {STEPS.map((step, idx) => (
              <div key={step.id} className="flex items-center gap-2">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold
                  ${isStepComplete(step.id) ? "bg-green-500 text-white" :
                    currentStep === step.id ? "bg-[#C9A84C] text-[#0A1628]" : "bg-[#E0D9CF] text-[#6B7280]"}`}>
                  {isStepComplete(step.id) ? <CheckCircle size={16} /> : idx + 1}
                </div>
                <span className={`text-sm font-medium ${currentStep === step.id ? "text-[#0A1628]" : "text-[#6B7280]"}`}>
                  {step.label}
                </span>
                {idx < STEPS.length - 1 && <ChevronRight size={16} className="text-[#E0D9CF]" />}
              </div>
            ))}
          </div>

          {/* ID Upload */}
          {currentStep === "id" && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-bold text-[#0A1628] mb-1">Upload Your ID</h3>
                <p className="text-sm text-[#6B7280]">National ID, Driver's License, or Passport</p>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-[#0A1628] mb-2">Front</label>
                  <div 
                    onClick={() => idFrontRef.current?.click()}
                    className={`border-2 border-dashed rounded-xl h-40 flex flex-col items-center justify-center cursor-pointer
                      ${idFront ? "border-[#C9A84C] bg-[#C9A84C]/5" : "border-[#E0D9CF]"}`}
                  >
                    {idFront ? (
                      <img src={idFront} alt="ID" className="h-full w-full object-contain rounded-xl" />
                    ) : (
                      <>
                        <Upload size={28} className="text-[#C9A84C] mb-2" />
                        <span className="text-sm text-[#6B7280]">Click to upload</span>
                      </>
                    )}
                    <input ref={idFrontRef} type="file" accept="image/*" className="hidden" onChange={(e) => handleFileUpload(e, setIdFront)} />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-[#0A1628] mb-2">Back</label>
                  <div 
                    onClick={() => idBackRef.current?.click()}
                    className={`border-2 border-dashed rounded-xl h-40 flex flex-col items-center justify-center cursor-pointer
                      ${idBack ? "border-[#C9A84C] bg-[#C9A84C]/5" : "border-[#E0D9CF]"}`}
                  >
                    {idBack ? (
                      <img src={idBack} alt="ID" className="h-full w-full object-contain rounded-xl" />
                    ) : (
                      <>
                        <Upload size={28} className="text-[#C9A84C] mb-2" />
                        <span className="text-sm text-[#6B7280]">Click to upload</span>
                      </>
                    )}
                    <input ref={idBackRef} type="file" accept="image/*" className="hidden" onChange={(e) => handleFileUpload(e, setIdBack)} />
                  </div>
                </div>
              </div>

              <div className="bg-[#0A1628] rounded-xl p-4 text-white flex items-start gap-3">
                <Lock size={18} className="text-[#C9A84C] flex-shrink-0 mt-0.5" />
                <p className="text-sm text-[#8A9BB5]">
                  Your ID is encrypted and stored securely. We only use it for identity verification 
                  and never share it with agents or third parties.
                </p>
              </div>
            </div>
          )}

          {/* Face Verify */}
          {currentStep === "face" && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-bold text-[#0A1628] mb-1">Face Verification</h3>
                <p className="text-sm text-[#6B7280]">Take a quick selfie to match your ID</p>
              </div>

              <div className="relative bg-[#0A1628] rounded-xl overflow-hidden aspect-video flex items-center justify-center">
                {isCapturing ? (
                  <>
                    <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover" />
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <div className="w-56 h-56 border-2 border-[#C9A84C] rounded-full opacity-50" />
                    </div>
                    <button
                      onClick={captureFace}
                      className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-[#C9A84C] text-[#0A1628] px-6 py-2 rounded-full font-bold"
                    >
                      Capture Photo
                    </button>
                  </>
                ) : faceImage ? (
                  <img src={faceImage} alt="Captured" className="w-full h-full object-cover" />
                ) : (
                  <div className="text-center p-8">
                    <Camera size={32} className="text-[#C9A84C] mx-auto mb-4" />
                    <button
                      onClick={startFaceCapture}
                      className="bg-[#C9A84C] text-[#0A1628] px-6 py-2 rounded-xl font-bold"
                    >
                      Start Camera
                    </button>
                  </div>
                )}
                <canvas ref={canvasRef} className="hidden" />
              </div>

              <div className="flex items-start gap-3 bg-[#F7F4EF] rounded-xl p-4">
                <UserCheck size={20} className="text-[#C9A84C] flex-shrink-0 mt-0.5" />
                <ul className="text-sm text-[#6B7280] space-y-1">
                  <li>• Face the camera directly</li>
                  <li>• Ensure good lighting</li>
                  <li>• Remove glasses or hats</li>
                </ul>
              </div>

              {faceImage && (
                <button onClick={() => setFaceImage(null)} className="text-red-500 text-sm font-semibold">
                  Retake Photo
                </button>
              )}
            </div>
          )}

          <button
            onClick={submitStep}
            disabled={isSubmitting}
            className="w-full mt-6 bg-[#C9A84C] hover:bg-[#b8943d] disabled:opacity-50 text-[#0A1628] font-bold py-3 rounded-xl transition flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <>
                <div className="w-5 h-5 border-2 border-[#0A1628] border-t-transparent rounded-full animate-spin" />
                Processing...
              </>
            ) : (
              <>Continue <ChevronRight size={18} /></>
            )}
          </button>
        </div>
      )}
    </div>
  );
};

export default BuyerVerification;
