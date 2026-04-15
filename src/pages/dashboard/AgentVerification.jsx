// src/pages/dashboard/AgentVerification.jsx
import { useState, useRef } from "react";
import {
  ShieldCheck, AlertTriangle, CheckCircle, Clock, Upload,
  Camera, MapPin, FileText, ChevronRight, X, Eye, EyeOff,
  Lock, Smartphone, CreditCard, UserCheck
} from "lucide-react";

const STEPS = [
  { id: "id", label: "ID Upload", icon: FileText, description: "Government-issued ID" },
  { id: "bvn", label: "BVN Verification", icon: CreditCard, description: "Bank Verification Number" },
  { id: "face", label: "Face Verify", icon: Camera, description: "Live photo match" },
  { id: "address", label: "Office Address", icon: MapPin, description: "Business location" },
];

const AgentVerification = () => {
  const [currentStep, setCurrentStep] = useState("id");
  const [completed, setCompleted] = useState(["id", "address"]); // Mock: ID and address done
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // ID Upload state
  const [idFront, setIdFront] = useState(null);
  const [idBack, setIdBack] = useState(null);
  const idFrontRef = useRef(null);
  const idBackRef = useRef(null);

  // BVN state
  const [bvn, setBvn] = useState("");
  const [showBvn, setShowBvn] = useState(false);

  // Face verify state
  const [faceImage, setFaceImage] = useState(null);
  const [isCapturing, setIsCapturing] = useState(false);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  // Address state
  const [address, setAddress] = useState({
    street: "123 Business Avenue",
    city: "Lekki",
    state: "Lagos",
    lga: "Eti-Osa",
    landmark: "Near Ebeano Supermarket"
  });

  const handleFileUpload = (e, setFile) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert("File size must be less than 5MB");
        return;
      }
      if (!["image/jpeg", "image/png", "image/jpg"].includes(file.type)) {
        alert("Only JPG/PNG files allowed");
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
      alert("Camera access denied. Please allow camera permissions.");
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
      
      // Stop camera
      const stream = videoRef.current.srcObject;
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
      setIsCapturing(false);
    }
  };

  const submitStep = async () => {
    setIsSubmitting(true);
    // Simulate API call
    await new Promise(r => setTimeout(r, 1500));
    setCompleted([...completed, currentStep]);
    setIsSubmitting(false);
    
    // Auto-advance to next step
    const currentIdx = STEPS.findIndex(s => s.id === currentStep);
    if (currentIdx < STEPS.length - 1) {
      setCurrentStep(STEPS[currentIdx + 1].id);
    }
  };

  const isStepComplete = (stepId) => completed.includes(stepId);
  const allComplete = STEPS.every(s => completed.includes(s.id));

  return (
    <div className="flex flex-col gap-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#0A1628] to-[#1A2E4A] rounded-2xl p-6 text-white">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-2">Agent Verification</h1>
            <p className="text-[#8A9BB5] text-sm max-w-md">
              Complete verification to unlock full platform features, build trust with buyers, 
              and access premium listings. This protects everyone from fraud.
            </p>
          </div>
          <div className="w-16 h-16 rounded-2xl bg-[#C9A84C]/20 flex items-center justify-center">
            <ShieldCheck size={32} className="text-[#C9A84C]" />
          </div>
        </div>
        
        {/* Progress */}
        <div className="mt-6 flex items-center gap-2">
          <div className="flex-1 h-2 bg-[#1A2E4A] rounded-full overflow-hidden">
            <div 
              className="h-full bg-[#C9A84C] transition-all duration-500"
              style={{ width: `${(completed.length / STEPS.length) * 100}%` }}
            />
          </div>
          <span className="text-sm font-semibold text-[#C9A84C]">
            {completed.length}/{STEPS.length} Complete
          </span>
        </div>
      </div>

      {allComplete ? (
        <div className="bg-green-50 border border-green-200 rounded-2xl p-8 text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle size={40} className="text-green-600" />
          </div>
          <h2 className="text-xl font-bold text-green-800 mb-2">Verification Complete!</h2>
          <p className="text-green-600 mb-4">You are now a verified agent. Your badge is visible to all buyers.</p>
          <div className="inline-flex items-center gap-2 bg-[#0A1628] text-[#C9A84C] px-4 py-2 rounded-xl font-semibold">
            <ShieldCheck size={18} /> Verified Agent Badge Active
          </div>
        </div>
      ) : (
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Step Navigation */}
          <div className="lg:col-span-1 space-y-2">
            {STEPS.map((step, idx) => {
              const isComplete = isStepComplete(step.id);
              const isCurrent = currentStep === step.id;
              
              return (
                <button
                  key={step.id}
                  onClick={() => setCurrentStep(step.id)}
                  className={`w-full flex items-center gap-3 p-4 rounded-xl transition-all duration-200 text-left
                    ${isCurrent 
                      ? "bg-[#C9A84C] text-[#0A1628] shadow-lg" 
                      : isComplete
                        ? "bg-white border border-green-200 text-green-700"
                        : "bg-white border border-[#E0D9CF] text-[#6B7280] hover:border-[#C9A84C]/40"
                    }`}
                >
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0
                    ${isCurrent ? "bg-[#0A1628] text-[#C9A84C]" : 
                      isComplete ? "bg-green-100 text-green-600" : "bg-[#F7F4EF] text-[#6B7280]"}`}>
                    {isComplete ? <CheckCircle size={20} /> : <step.icon size={20} />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-sm truncate">{step.label}</p>
                    <p className="text-xs opacity-80 truncate">{step.description}</p>
                  </div>
                  {isComplete && <CheckCircle size={16} className="text-green-600 flex-shrink-0" />}
                </button>
              );
            })}
          </div>

          {/* Step Content */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl border border-[#E0D9CF] p-6">
              
              {/* ID Upload Step */}
              {currentStep === "id" && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-bold text-[#0A1628] mb-1">Upload Government ID</h3>
                    <p className="text-sm text-[#6B7280]">National ID, Driver's License, or International Passport</p>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    {/* Front */}
                    <div>
                      <label className="block text-sm font-semibold text-[#0A1628] mb-2">Front Side</label>
                      <div 
                        onClick={() => idFrontRef.current?.click()}
                        className={`border-2 border-dashed rounded-xl h-48 flex flex-col items-center justify-center cursor-pointer transition-all
                          ${idFront ? "border-[#C9A84C] bg-[#C9A84C]/5" : "border-[#E0D9CF] hover:border-[#C9A84C]/40"}`}
                      >
                        {idFront ? (
                          <img src={idFront} alt="ID Front" className="h-full w-full object-contain rounded-xl" />
                        ) : (
                          <>
                            <Upload size={32} className="text-[#C9A84C] mb-2" />
                            <span className="text-sm text-[#6B7280]">Click to upload</span>
                          </>
                        )}
                        <input 
                          ref={idFrontRef}
                          type="file" 
                          accept="image/*" 
                          className="hidden" 
                          onChange={(e) => handleFileUpload(e, setIdFront)}
                        />
                      </div>
                    </div>

                    {/* Back */}
                    <div>
                      <label className="block text-sm font-semibold text-[#0A1628] mb-2">Back Side</label>
                      <div 
                        onClick={() => idBackRef.current?.click()}
                        className={`border-2 border-dashed rounded-xl h-48 flex flex-col items-center justify-center cursor-pointer transition-all
                          ${idBack ? "border-[#C9A84C] bg-[#C9A84C]/5" : "border-[#E0D9CF] hover:border-[#C9A84C]/40"}`}
                      >
                        {idBack ? (
                          <img src={idBack} alt="ID Back" className="h-full w-full object-contain rounded-xl" />
                        ) : (
                          <>
                            <Upload size={32} className="text-[#C9A84C] mb-2" />
                            <span className="text-sm text-[#6B7280]">Click to upload</span>
                          </>
                        )}
                        <input 
                          ref={idBackRef}
                          type="file" 
                          accept="image/*" 
                          className="hidden" 
                          onChange={(e) => handleFileUpload(e, setIdBack)}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="bg-[#F7F4EF] rounded-xl p-4 flex items-start gap-3">
                    <AlertTriangle size={20} className="text-[#C9A84C] flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-[#6B7280]">
                      Ensure all text is clearly visible. Blurry or cropped images will be rejected. 
                      Max file size: 5MB per image.
                    </p>
                  </div>
                </div>
              )}

              {/* BVN Step */}
              {currentStep === "bvn" && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-bold text-[#0A1628] mb-1">BVN Verification</h3>
                    <p className="text-sm text-[#6B7280]">Enter your 11-digit Bank Verification Number</p>
                  </div>

                  <div className="relative">
                    <input
                      type={showBvn ? "text" : "password"}
                      value={bvn}
                      onChange={(e) => setBvn(e.target.value.replace(/\D/g, "").slice(0, 11))}
                      placeholder="Enter 11-digit BVN"
                      className="w-full px-4 py-3 pr-12 border border-[#E0D9CF] rounded-xl focus:border-[#C9A84C] focus:outline-none text-lg tracking-widest"
                    />
                    <button
                      onClick={() => setShowBvn(!showBvn)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6B7280] hover:text-[#0A1628]"
                    >
                      {showBvn ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>

                  <div className="bg-[#0A1628] rounded-xl p-4 text-white">
                    <div className="flex items-center gap-2 mb-2">
                      <Lock size={16} className="text-[#C9A84C]" />
                      <span className="font-semibold text-sm">Secure Verification</span>
                    </div>
                    <p className="text-sm text-[#8A9BB5]">
                      Your BVN is encrypted and only used to verify your identity. 
                      We never store or share this with third parties.
                    </p>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-[#6B7280]">
                    <Smartphone size={16} />
                    <span>An OTP will be sent to your registered phone number</span>
                  </div>
                </div>
              )}

              {/* Face Verify Step */}
              {currentStep === "face" && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-bold text-[#0A1628] mb-1">Face Verification</h3>
                    <p className="text-sm text-[#6B7280]">Take a live photo to match with your ID</p>
                  </div>

                  <div className="relative bg-[#0A1628] rounded-xl overflow-hidden aspect-video flex items-center justify-center">
                    {isCapturing ? (
                      <>
                        <video 
                          ref={videoRef} 
                          autoPlay 
                          playsInline 
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-64 h-64 border-2 border-[#C9A84C] rounded-full opacity-50" />
                        </div>
                        <button
                          onClick={captureFace}
                          className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-[#C9A84C] text-[#0A1628] px-6 py-2 rounded-full font-bold flex items-center gap-2"
                        >
                          <Camera size={18} /> Capture
                        </button>
                      </>
                    ) : faceImage ? (
                      <img src={faceImage} alt="Captured" className="w-full h-full object-cover" />
                    ) : (
                      <div className="text-center p-8">
                        <div className="w-20 h-20 bg-[#C9A84C]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                          <Camera size={32} className="text-[#C9A84C]" />
                        </div>
                        <button
                          onClick={startFaceCapture}
                          className="bg-[#C9A84C] hover:bg-[#b8943d] text-[#0A1628] px-6 py-3 rounded-xl font-bold"
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
                      <li>• Ensure good lighting on your face</li>
                      <li>• Remove glasses, hats, or masks</li>
                      <li>• Look directly at the camera</li>
                      <li>• Photo must match your ID document</li>
                    </ul>
                  </div>

                  {faceImage && (
                    <button
                      onClick={() => setFaceImage(null)}
                      className="text-red-500 text-sm font-semibold flex items-center gap-1"
                    >
                      <X size={16} /> Retake Photo
                    </button>
                  )}
                </div>
              )}

              {/* Address Step */}
              {currentStep === "address" && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-bold text-[#0A1628] mb-1">Office Address</h3>
                    <p className="text-sm text-[#6B7280]">Your registered business location</p>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold text-[#0A1628] mb-1">Street Address</label>
                      <input
                        type="text"
                        value={address.street}
                        onChange={(e) => setAddress({...address, street: e.target.value})}
                        className="w-full px-4 py-3 border border-[#E0D9CF] rounded-xl focus:border-[#C9A84C] focus:outline-none"
                      />
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-[#0A1628] mb-1">City</label>
                        <input
                          type="text"
                          value={address.city}
                          onChange={(e) => setAddress({...address, city: e.target.value})}
                          className="w-full px-4 py-3 border border-[#E0D9CF] rounded-xl focus:border-[#C9A84C] focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-[#0A1628] mb-1">State</label>
                        <select
                          value={address.state}
                          onChange={(e) => setAddress({...address, state: e.target.value})}
                          className="w-full px-4 py-3 border border-[#E0D9CF] rounded-xl focus:border-[#C9A84C] focus:outline-none bg-white"
                        >
                          <option>Lagos</option>
                          <option>Abuja</option>
                          <option>Rivers</option>
                          <option>Oyo</option>
                          <option>Kano</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-[#0A1628] mb-1">LGA (Local Government Area)</label>
                      <input
                        type="text"
                        value={address.lga}
                        onChange={(e) => setAddress({...address, lga: e.target.value})}
                        className="w-full px-4 py-3 border border-[#E0D9CF] rounded-xl focus:border-[#C9A84C] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-[#0A1628] mb-1">Nearest Landmark</label>
                      <input
                        type="text"
                        value={address.landmark}
                        onChange={(e) => setAddress({...address, landmark: e.target.value})}
                        placeholder="e.g., Near Shoprite, Beside GTBank"
                        className="w-full px-4 py-3 border border-[#E0D9CF] rounded-xl focus:border-[#C9A84C] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="bg-[#F7F4EF] rounded-xl p-4 flex items-start gap-3">
                    <MapPin size={20} className="text-[#C9A84C] flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-[#6B7280]">
                      This address will be used for physical verification visits. 
                      Ensure it's accurate and accessible during business hours.
                    </p>
                  </div>
                </div>
              )}

              {/* Submit Button */}
              <div className="pt-4 border-t border-[#E0D9CF]">
                <button
                  onClick={submitStep}
                  disabled={isSubmitting}
                  className="w-full bg-[#C9A84C] hover:bg-[#b8943d] disabled:opacity-50 disabled:cursor-not-allowed text-[#0A1628] font-bold py-3 rounded-xl transition-all duration-200 flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-[#0A1628] border-t-transparent rounded-full animate-spin" />
                      Verifying...
                    </>
                  ) : (
                    <>
                      {isStepComplete(currentStep) ? "Update" : "Submit & Continue"}
                      <ChevronRight size={18} />
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AgentVerification;