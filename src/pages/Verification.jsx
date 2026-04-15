// src/pages/Verification.jsx
import { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  Shield, Camera, Upload, CheckCircle, AlertCircle, 
  ChevronRight, ChevronLeft, Building2, User, CreditCard,
  Loader2, Eye, EyeOff, Lock, FileText, MapPin, Phone
} from 'lucide-react';
import { 
  submitIDVerification, 
  checkVerificationStatus, 
  submitBVN,
  getVerificationRequirements 
} from '../services/verificationService';
import { savePaymentMethod, verifyBankAccount } from '../services/paymentService';

// ─── ID Types ────────────────────────────────────────────────────────────────
const ID_TYPES = [
  { value: 'passport', label: 'International Passport', icon: '🛂', maxLength: 9 },
  { value: 'drivers_license', label: 'Driver\'s License', icon: '🚗', maxLength: 11 },
  { value: 'national_id', label: 'National ID (NIN)', icon: '🆔', maxLength: 11 },
  { value: 'voters_card', label: 'Voter\'s Card', icon: '🗳️', maxLength: 19 },
];

// ─── Nigerian Banks ───────────────────────────────────────────────────────────
const NIGERIAN_BANKS = [
  { code: '057', name: 'Zenith Bank' },
  { code: '011', name: 'First Bank of Nigeria' },
  { code: '033', name: 'United Bank for Africa (UBA)' },
  { code: '058', name: 'Guaranty Trust Bank (GTB)' },
  { code: '044', name: 'Access Bank' },
  { code: '076', name: 'Polaris Bank' },
  { code: '032', name: 'Union Bank' },
  { code: '035', name: 'Wema Bank' },
  { code: '050', name: 'Ecobank Nigeria' },
  { code: '070', name: 'Fidelity Bank' },
  { code: '082', name: 'Keystone Bank' },
  { code: '214', name: 'First City Monument Bank (FCMB)' },
  { code: '215', name: 'Unity Bank' },
  { code: '221', name: 'Stanbic IBTC Bank' },
  { code: '232', name: 'Sterling Bank' },
  { code: '302', name: 'Unity Bank' },
];

// ─── Step Indicator ───────────────────────────────────────────────────────────
const StepIndicator = ({ currentStep, steps }) => (
  <div className="flex items-center justify-center gap-2 mb-8">
    {steps.map((step, index) => (
      <div key={step.id} className="flex items-center">
        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all
          ${currentStep > index ? 'bg-green-500 text-white' : 
            currentStep === index ? 'bg-[#C9A84C] text-[#0A1628]' : 
            'bg-[#E0D9CF] text-[#6B7280]'}`}>
          {currentStep > index ? <CheckCircle size={14} /> : index + 1}
        </div>
        <span className={`ml-2 text-xs font-medium hidden sm:block
          ${currentStep >= index ? 'text-[#0A1628]' : 'text-[#6B7280]'}`}>
          {step.label}
        </span>
        {index < steps.length - 1 && (
          <div className={`w-8 h-0.5 mx-2 ${currentStep > index ? 'bg-green-500' : 'bg-[#E0D9CF]'}`} />
        )}
      </div>
    ))}
  </div>
);

// ─── ID Upload Step ─────────────────────────────────────────────────────────────
const IDUploadStep = ({ formData, setFormData, onNext }) => {
  const [preview, setPreview] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef(null);

  const handleFile = (file) => {
    if (!file) return;
    
    // Validate file size (5MB max)
    if (file.size > 5 * 1024 * 1024) {
      alert('File too large. Maximum size is 5MB.');
      return;
    }
    
    // Validate file type
    if (!['image/jpeg', 'image/png', 'image/jpg', 'application/pdf'].includes(file.type)) {
      alert('Invalid file type. Please upload JPG, PNG, or PDF.');
      return;
    }

    setFormData({ ...formData, idImage: file });
    
    if (file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(file);
    } else {
      setPreview('pdf');
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragActive(false);
    const file = e.dataTransfer.files[0];
    handleFile(file);
  };

  const selectedIdType = ID_TYPES.find(t => t.value === formData.idType);

  return (
    <div className="max-w-md mx-auto">
      <h3 className="text-lg font-bold text-[#0A1628] mb-2">Verify Your Identity</h3>
      <p className="text-sm text-[#6B7280] mb-6">
        Upload a government-issued ID. This is required before you can message other users or receive payments.
      </p>

      {/* ID Type Selection */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        {ID_TYPES.map((type) => (
          <button
            key={type.value}
            onClick={() => setFormData({ ...formData, idType: type.value, idNumber: '' })}
            className={`p-4 rounded-xl border-2 text-left transition-all
              ${formData.idType === type.value 
                ? 'border-[#C9A84C] bg-[#C9A84C]/10' 
                : 'border-[#E0D9CF] hover:border-[#C9A84C]/50'}`}
          >
            <span className="text-2xl mb-2 block">{type.icon}</span>
            <span className="text-xs font-semibold text-[#0A1628]">{type.label}</span>
          </button>
        ))}
      </div>

      {/* ID Number */}
      {selectedIdType && (
        <div className="mb-6">
          <label className="text-xs font-bold text-[#6B7280] uppercase tracking-widest mb-2 block">
            {selectedIdType.label} Number
          </label>
          <input
            type="text"
            value={formData.idNumber}
            onChange={(e) => {
              const value = e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, '');
              if (value.length <= selectedIdType.maxLength) {
                setFormData({ ...formData, idNumber: value });
              }
            }}
            placeholder={`Enter ${selectedIdType.maxLength} characters`}
            maxLength={selectedIdType.maxLength}
            className="w-full px-4 py-3 bg-[#F7F4EF] rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#C9A84C] font-mono tracking-wider"
          />
          <p className="text-xs text-[#6B7280] mt-1">
            {formData.idNumber.length}/{selectedIdType.maxLength} characters
          </p>
        </div>
      )}

      {/* File Upload */}
      <div className="mb-6">
        <label className="text-xs font-bold text-[#6B7280] uppercase tracking-widest mb-2 block">
          Upload ID Document
        </label>
        <div
          onClick={() => fileInputRef.current?.click()}
          onDragEnter={(e) => { e.preventDefault(); setDragActive(true); }}
          onDragLeave={(e) => { e.preventDefault(); setDragActive(false); }}
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDrop}
          className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-all
            ${dragActive ? 'border-[#C9A84C] bg-[#C9A84C]/10' : ''}
            ${preview ? 'border-[#C9A84C] bg-[#C9A84C]/5' : 'border-[#E0D9CF] hover:border-[#C9A84C]'}`}
        >
          {preview === 'pdf' ? (
            <div className="flex flex-col items-center">
              <FileText size={48} className="text-[#C9A84C] mb-2" />
              <p className="text-sm text-[#0A1628] font-medium">PDF document selected</p>
              <p className="text-xs text-[#6B7280]">{formData.idImage?.name}</p>
            </div>
          ) : preview ? (
            <img src={preview} alt="ID Preview" className="max-h-40 mx-auto rounded-lg" />
          ) : (
            <>
              <Upload size={32} className="mx-auto text-[#C9A84C] mb-2" />
              <p className="text-sm text-[#6B7280]">Click to upload or drag and drop</p>
              <p className="text-xs text-[#6B7280] mt-1">JPG, PNG, or PDF up to 5MB</p>
            </>
          )}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/png,image/jpg,application/pdf"
            onChange={(e) => handleFile(e.target.files[0])}
            className="hidden"
          />
        </div>
      </div>

      <button
        onClick={onNext}
        disabled={!formData.idType || !formData.idNumber || !formData.idImage}
        className="w-full py-3 bg-[#C9A84C] hover:bg-[#b8943d] disabled:opacity-50 disabled:cursor-not-allowed text-[#0A1628] font-bold rounded-xl transition flex items-center justify-center gap-2"
      >
        Continue
        <ChevronRight size={18} />
      </button>
    </div>
  );
};

// ─── Selfie Verification Step ──────────────────────────────────────────────────
const SelfieStep = ({ formData, setFormData, onNext, onBack }) => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [captured, setCaptured] = useState(false);
  const [stream, setStream] = useState(null);
  const [cameraError, setCameraError] = useState(null);

  const startCamera = useCallback(async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ 
        video: { 
          facingMode: 'user',
          width: { ideal: 1280 },
          height: { ideal: 720 }
        } 
      });
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
      setCameraError(null);
    } catch (err) {
      console.error('Camera access denied:', err);
      setCameraError('Please allow camera access to complete verification. This is required for security.');
    }
  }, []);

  const captureSelfie = () => {
    if (videoRef.current && canvasRef.current) {
      const canvas = canvasRef.current;
      const video = videoRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      canvas.getContext('2d').drawImage(video, 0, 0);
      
      canvas.toBlob((blob) => {
        setFormData({ ...formData, selfieImage: blob });
        setCaptured(true);
        // Stop camera to save resources
        stream?.getTracks().forEach(track => track.stop());
      }, 'image/jpeg', 0.9);
    }
  };

  const retake = () => {
    setCaptured(false);
    setFormData({ ...formData, selfieImage: null });
    startCamera();
  };

  useEffect(() => {
    startCamera();
    return () => {
      stream?.getTracks().forEach(track => track.stop());
    };
  }, [startCamera]);

  if (cameraError) {
    return (
      <div className="max-w-md mx-auto text-center">
        <AlertCircle size={48} className="text-red-500 mx-auto mb-4" />
        <h3 className="text-lg font-bold text-[#0A1628] mb-2">Camera Access Required</h3>
        <p className="text-sm text-[#6B7280] mb-6">{cameraError}</p>
        <button
          onClick={startCamera}
          className="px-6 py-3 bg-[#C9A84C] hover:bg-[#b8943d] text-[#0A1628] font-bold rounded-xl transition"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto">
      <h3 className="text-lg font-bold text-[#0A1628] mb-2">Live Selfie Check</h3>
      <p className="text-sm text-[#6B7280] mb-6">
        Take a clear photo of your face. This helps us verify you match your ID document and prevents identity fraud.
      </p>

      <div className="relative bg-[#0A1628] rounded-2xl overflow-hidden mb-6 aspect-[4/3]">
        {!captured ? (
          <>
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className="w-full h-full object-cover"
            />
            {/* Face overlay guide */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-48 h-64 border-2 border-[#C9A84C] rounded-full opacity-50" />
            </div>
            <div className="absolute top-4 left-4 right-4">
              <p className="text-xs text-[#F7F4EF] bg-[#0A1628]/50 px-3 py-1 rounded-full inline-block">
                Position your face within the oval
              </p>
            </div>
            <button
              onClick={captureSelfie}
              className="absolute bottom-4 left-1/2 -translate-x-1/2 w-16 h-16 bg-[#C9A84C] rounded-full flex items-center justify-center hover:bg-[#b8943d] transition shadow-lg"
            >
              <Camera size={28} className="text-[#0A1628]" />
            </button>
          </>
        ) : (
          <canvas
            ref={canvasRef}
            className="w-full h-full object-cover"
          />
        )}
      </div>

      {captured ? (
        <div className="space-y-3">
          <p className="text-sm text-[#6B7280] text-center">Does this look clear and well-lit?</p>
          <div className="flex gap-3">
            <button
              onClick={retake}
              className="flex-1 py-3 border border-[#E0D9CF] text-[#6B7280] font-semibold rounded-xl hover:bg-[#F7F4EF] transition"
            >
              Retake
            </button>
            <button
              onClick={onNext}
              className="flex-1 py-3 bg-[#C9A84C] hover:bg-[#b8943d] text-[#0A1628] font-bold rounded-xl transition flex items-center justify-center gap-2"
            >
              Looks Good
              <CheckCircle size={18} />
            </button>
          </div>
        </div>
      ) : (
        <button
          onClick={onBack}
          className="w-full py-3 border border-[#E0D9CF] text-[#6B7280] font-semibold rounded-xl hover:bg-[#F7F4EF] transition"
        >
          Back
        </button>
      )}
    </div>
  );
};

// ─── BVN Verification Step ────────────────────────────────────────────────────
const BVNStep = ({ formData, setFormData, onNext, onBack }) => {
  const [showBVN, setShowBVN] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [bvnValid, setBvnValid] = useState(false);
  const [bvnTouched, setBvnTouched] = useState(false);

  const validateBVN = (bvn) => {
    // BVN is exactly 11 digits
    const isValid = /^\d{11}$/.test(bvn);
    setBvnValid(isValid);
    return isValid;
  };

  const handleVerify = async () => {
    if (!validateBVN(formData.bvn)) return;
    
    setVerifying(true);
    try {
      const result = await submitBVN(formData.userId, formData.bvn);
      if (result.verified) {
        onNext();
      } else {
        alert('BVN verification failed. Please check the number matches your registered name.');
      }
    } catch (err) {
      alert('Verification service temporarily unavailable. Please try again later.');
    } finally {
      setVerifying(false);
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <h3 className="text-lg font-bold text-[#0A1628] mb-2">BVN Verification</h3>
      <p className="text-sm text-[#6B7280] mb-6">
        Enter your Bank Verification Number to confirm your identity. Required by Central Bank of Nigeria regulations.
      </p>

      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
        <div className="flex items-start gap-3">
          <Shield size={20} className="text-blue-600 mt-0.5 flex-shrink-0" />
          <div className="text-sm text-blue-700">
            <p className="font-semibold mb-1">Why we need your BVN</p>
            <ul className="list-disc list-inside space-y-1 text-xs">
              <li>Verify your identity matches bank records</li>
              <li>Enable secure withdrawals (agents)</li>
              <li>Prevent fraudulent account creation</li>
              <li>Required by CBN regulations</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="mb-6">
        <label className="text-xs font-bold text-[#6B7280] uppercase tracking-widest mb-2 block">
          Bank Verification Number (BVN)
        </label>
        <div className="relative">
          <input
            type={showBVN ? 'text' : 'password'}
            value={formData.bvn}
            onChange={(e) => {
              const value = e.target.value.replace(/\D/g, '').slice(0, 11);
              setFormData({ ...formData, bvn: value });
              validateBVN(value);
              setBvnTouched(true);
            }}
            onBlur={() => setBvnTouched(true)}
            placeholder="Enter 11-digit BVN"
            className={`w-full px-4 py-3 pr-12 bg-[#F7F4EF] rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#C9A84C] tracking-widest font-mono
              ${bvnTouched && !bvnValid && formData.bvn.length > 0 ? 'ring-2 ring-red-300' : ''}`}
          />
          <button
            type="button"
            onClick={() => setShowBVN(!showBVN)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6B7280] hover:text-[#0A1628] transition"
          >
            {showBVN ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
        <div className="flex items-center justify-between mt-2">
          <p className="text-xs text-[#6B7280]">
            {formData.bvn.length}/11 digits
          </p>
          {bvnValid && (
            <p className="text-xs text-green-600 flex items-center gap-1">
              <CheckCircle size={12} /> Valid BVN format
            </p>
          )}
        </div>
      </div>

      <div className="flex gap-3">
        <button
          onClick={onBack}
          className="flex-1 py-3 border border-[#E0D9CF] text-[#6B7280] font-semibold rounded-xl hover:bg-[#F7F4EF] transition"
        >
          Back
        </button>
        <button
          onClick={handleVerify}
          disabled={!bvnValid || verifying}
          className="flex-1 py-3 bg-[#C9A84C] hover:bg-[#b8943d] disabled:opacity-50 disabled:cursor-not-allowed text-[#0A1628] font-bold rounded-xl transition flex items-center justify-center gap-2"
        >
          {verifying ? (
            <>
              <Loader2 size={18} className="animate-spin" />
              Verifying...
            </>
          ) : (
            <>
              Verify BVN
              <Shield size={18} />
            </>
          )}
        </button>
      </div>
    </div>
  );
};

// ─── Payment Method Step ──────────────────────────────────────────────────────
const PaymentMethodStep = ({ userRole, formData, setFormData, onComplete, onBack }) => {
  const [step, setStep] = useState('select'); // select, confirm
  const [verifying, setVerifying] = useState(false);
  const [bankDetails, setBankDetails] = useState(null);
  const [error, setError] = useState(null);

  const handleBankSelect = (bankCode) => {
    setFormData({ ...formData, bankCode });
    setError(null);
  };

  const verifyAccount = async () => {
    if (!formData.bankCode || formData.accountNumber.length !== 10) return;
    
    setVerifying(true);
    setError(null);
    
    try {
      const result = await verifyBankAccount(formData.accountNumber, formData.bankCode);
      if (result.verified) {
        setBankDetails(result);
        setStep('confirm');
      } else {
        setError('Account verification failed. Please check your account number and try again.');
      }
    } catch (err) {
      setError('Unable to verify account. Please try again later.');
    } finally {
      setVerifying(false);
    }
  };

  const saveAndComplete = async () => {
    try {
      await savePaymentMethod(formData.userId, {
        type: 'bank_transfer',
        bankCode: formData.bankCode,
        bankName: NIGERIAN_BANKS.find(b => b.code === formData.bankCode)?.name,
        accountNumber: formData.accountNumber,
        accountName: bankDetails?.accountName,
        purpose: userRole === 'agent' ? 'withdrawal' : 'payment',
        isDefault: true,
        verified: true,
        verifiedAt: new Date().toISOString()
      });
      
      // Submit final verification
      await submitIDVerification(formData.userId, {
        idType: formData.idType,
        idNumber: formData.idNumber,
        idImage: formData.idImage,
        selfieImage: formData.selfieImage
      });
      
      onComplete();
    } catch (err) {
      setError('Failed to save. Please try again.');
    }
  };

  if (step === 'confirm' && bankDetails) {
    return (
      <div className="max-w-md mx-auto">
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle size={32} className="text-green-600" />
          </div>
          <h3 className="text-lg font-bold text-[#0A1628]">Account Verified!</h3>
          <p className="text-sm text-[#6B7280]">Your bank account has been verified and linked</p>
        </div>

        <div className="bg-[#F7F4EF] rounded-xl p-4 mb-6 space-y-3">
          <div className="flex items-center gap-3">
            <Building2 size={20} className="text-[#C9A84C]" />
            <div>
              <p className="text-xs text-[#6B7280]">Bank</p>
              <p className="text-sm font-semibold text-[#0A1628]">
                {NIGERIAN_BANKS.find(b => b.code === formData.bankCode)?.name}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <CreditCard size={20} className="text-[#C9A84C]" />
            <div>
              <p className="text-xs text-[#6B7280]">Account Number</p>
              <p className="text-sm font-semibold text-[#0A1628]">
                ****{formData.accountNumber.slice(-4)}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <User size={20} className="text-[#C9A84C]" />
            <div>
              <p className="text-xs text-[#6B7280]">Account Name</p>
              <p className="text-sm font-semibold text-[#0A1628]">{bankDetails.accountName}</p>
            </div>
          </div>
        </div>

        <div className="bg-green-50 border border-green-200 rounded-xl p-3 mb-6">
          <p className="text-xs text-green-700 text-center">
            {userRole === 'agent' 
              ? '✓ You can now receive payments and withdraw earnings'
              : '✓ You can now make quick payments for properties'}
          </p>
        </div>

        <button
          onClick={saveAndComplete}
          className="w-full py-3 bg-[#C9A84C] hover:bg-[#b8943d] text-[#0A1628] font-bold rounded-xl transition flex items-center justify-center gap-2"
        >
          Complete Setup
          <CheckCircle size={18} />
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto">
      <h3 className="text-lg font-bold text-[#0A1628] mb-2">
        {userRole === 'agent' ? 'Add Withdrawal Account' : 'Add Payment Method'}
      </h3>
      <p className="text-sm text-[#6B7280] mb-6">
        {userRole === 'agent' 
          ? 'Add your bank account to receive payments from property sales and rentals.' 
          : 'Add a payment method for quick checkout when you find your perfect property.'}
      </p>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-3 mb-4 flex items-center gap-2">
          <AlertCircle size={16} className="text-red-500" />
          <p className="text-xs text-red-700">{error}</p>
        </div>
      )}

      {/* Bank Selection */}
      <div className="mb-4">
        <label className="text-xs font-bold text-[#6B7280] uppercase tracking-widest mb-2 block">
          Select Bank
        </label>
        <select
          value={formData.bankCode}
          onChange={(e) => handleBankSelect(e.target.value)}
          className="w-full px-4 py-3 bg-[#F7F4EF] rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#C9A84C]"
        >
          <option value="">Choose your bank</option>
          {NIGERIAN_BANKS.map(bank => (
            <option key={bank.code} value={bank.code}>{bank.name}</option>
          ))}
        </select>
      </div>

      {/* Account Number */}
      <div className="mb-6">
        <label className="text-xs font-bold text-[#6B7280] uppercase tracking-widest mb-2 block">
          Account Number
        </label>
        <input
          type="text"
          value={formData.accountNumber}
          onChange={(e) => {
            const value = e.target.value.replace(/\D/g, '').slice(0, 10);
            setFormData({ ...formData, accountNumber: value });
            setError(null);
          }}
          placeholder="Enter 10-digit account number"
          className="w-full px-4 py-3 bg-[#F7F4EF] rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#C9A84C] tracking-widest font-mono"
        />
        <p className="text-xs text-[#6B7280] mt-1">
          {formData.accountNumber.length}/10 digits
        </p>
      </div>

      <div className="flex gap-3">
        <button
          onClick={onBack}
          className="flex-1 py-3 border border-[#E0D9CF] text-[#6B7280] font-semibold rounded-xl hover:bg-[#F7F4EF] transition"
        >
          Back
        </button>
        <button
          onClick={verifyAccount}
          disabled={!formData.bankCode || formData.accountNumber.length !== 10 || verifying}
          className="flex-1 py-3 bg-[#C9A84C] hover:bg-[#b8943d] disabled:opacity-50 disabled:cursor-not-allowed text-[#0A1628] font-bold rounded-xl transition flex items-center justify-center gap-2"
        >
          {verifying ? (
            <>
              <Loader2 size={18} className="animate-spin" />
              Verifying...
            </>
          ) : (
            <>
              Verify Account
              <Shield size={18} />
            </>
          )}
        </button>
      </div>
    </div>
  );
};

// ─── Success Screen ───────────────────────────────────────────────────────────
const SuccessScreen = ({ userRole, onGoToDashboard }) => (
  <div className="max-w-md mx-auto text-center">
    <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
      <CheckCircle size={40} className="text-white" />
    </div>
    
    <h2 className="text-2xl font-bold text-[#0A1628] mb-3">You're Verified! 🎉</h2>
    
    <div className="bg-[#F7F4EF] rounded-xl p-4 mb-6 text-left">
      <h3 className="text-sm font-bold text-[#0A1628] mb-3">What you can now do:</h3>
      <ul className="space-y-2">
        <li className="flex items-center gap-2 text-sm text-[#6B7280]">
          <CheckCircle size={16} className="text-green-500" />
          Message other users securely
        </li>
        <li className="flex items-center gap-2 text-sm text-[#6B7280]">
          <CheckCircle size={16} className="text-green-500" />
          Send and receive offers
        </li>
        {userRole === 'agent' ? (
          <>
            <li className="flex items-center gap-2 text-sm text-[#6B7280]">
              <CheckCircle size={16} className="text-green-500" />
              List properties for sale/rent
            </li>
            <li className="flex items-center gap-2 text-sm text-[#6B7280]">
              <CheckCircle size={16} className="text-green-500" />
              Receive payments and withdraw earnings
            </li>
          </>
        ) : (
          <>
            <li className="flex items-center gap-2 text-sm text-[#6B7280]">
              <CheckCircle size={16} className="text-green-500" />
              Book property inspections
            </li>
            <li className="flex items-center gap-2 text-sm text-[#6B7280]">
              <CheckCircle size={16} className="text-green-500" />
              Make secure payments with escrow protection
            </li>
          </>
        )}
      </ul>
    </div>

    <button
      onClick={onGoToDashboard}
      className="w-full py-3 bg-[#C9A84C] hover:bg-[#b8943d] text-[#0A1628] font-bold rounded-xl transition flex items-center justify-center gap-2"
    >
      Go to Dashboard
      <ChevronRight size={18} />
    </button>
  </div>
);

// ─── Main Verification Component ──────────────────────────────────────────────
const Verification = () => {
  const { user, userRole, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [currentStep, setCurrentStep] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [checkingStatus, setCheckingStatus] = useState(true);
  
  const [formData, setFormData] = useState({
    userId: '',
    idType: '',
    idNumber: '',
    idImage: null,
    selfieImage: null,
    bvn: '',
    bankCode: '',
    accountNumber: '',
  });

  const returnTo = location.state?.returnTo || (userRole === 'agent' ? '/dashboard/agent' : '/dashboard/buyer');

  // Check if already verified on mount
  useEffect(() => {
    const checkExisting = async () => {
      if (!user) return;
      
      setFormData(prev => ({ ...prev, userId: user.uid }));
      
      try {
        const status = await checkVerificationStatus(user.uid);
        
        if (status.isFullyVerified) {
          // Already verified, redirect to dashboard
          navigate(returnTo, { replace: true });
          return;
        }
        
        // Partially verified - resume from appropriate step
        if (status.bvnVerified && status.status === 'approved') {
          // Skip to payment method
          setCurrentStep(3);
        } else if (status.status === 'approved') {
          // ID approved, need BVN
          setCurrentStep(2);
        }
      } catch (err) {
        console.error('Failed to check verification status:', err);
      } finally {
        setCheckingStatus(false);
      }
    };
    
    if (!authLoading) {
      checkExisting();
    }
  }, [user, userRole, authLoading, navigate, returnTo]);

  const steps = [
    { id: 'id', label: 'ID Upload' },
    { id: 'selfie', label: 'Selfie' },
    { id: 'bvn', label: 'BVN' },
    { id: 'payment', label: userRole === 'agent' ? 'Bank Account' : 'Payment' }
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleComplete = () => {
    setCompleted(true);
  };

  const handleGoToDashboard = () => {
    navigate(returnTo, { replace: true });
  };

  if (authLoading || checkingStatus) {
    return (
      <div className="min-h-screen bg-[#F7F4EF] flex items-center justify-center">
        <div className="flex items-center gap-3 text-[#6B7280]">
          <Loader2 size={24} className="animate-spin text-[#C9A84C]" />
          <span>Checking verification status...</span>
        </div>
      </div>
    );
  }

  if (!user) {
    navigate('/login', { state: { returnTo: '/verify' } });
    return null;
  }

  const renderStep = () => {
    if (completed) {
      return <SuccessScreen userRole={userRole} onGoToDashboard={handleGoToDashboard} />;
    }

    switch (currentStep) {
      case 0:
        return <IDUploadStep formData={formData} setFormData={setFormData} onNext={handleNext} />;
      case 1:
        return <SelfieStep formData={formData} setFormData={setFormData} onNext={handleNext} onBack={handleBack} />;
      case 2:
        return <BVNStep formData={formData} setFormData={setFormData} onNext={handleNext} onBack={handleBack} />;
      case 3:
        return <PaymentMethodStep userRole={userRole} formData={formData} setFormData={setFormData} onComplete={handleComplete} onBack={handleBack} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F4EF]">
      {/* Header */}
      <div className="bg-white border-b border-[#E0D9CF] px-4 py-4">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#0A1628] rounded-xl flex items-center justify-center">
              <Shield size={20} className="text-[#C9A84C]" />
            </div>
            <div>
              <h1 className="font-bold text-[#0A1628]">OrbitWatch</h1>
              <p className="text-xs text-[#6B7280]">Secure Property Platform</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-xs text-[#6B7280]">Step {currentStep + 1} of {steps.length}</p>
            <p className="text-xs font-semibold text-[#C9A84C] capitalize">{userRole} Verification</p>
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-8">
        {!completed && <StepIndicator currentStep={currentStep} steps={steps} />}

        {/* Step Content */}
        <div className="bg-white rounded-2xl border border-[#E0D9CF] p-6 shadow-sm">
          {renderStep()}
        </div>

        {/* Security Footer */}
        <div className="mt-6 flex items-center justify-center gap-4 text-xs text-[#6B7280]">
          <div className="flex items-center gap-1">
            <Lock size={12} className="text-[#C9A84C]" />
            <span>256-bit encryption</span>
          </div>
          <div className="w-px h-3 bg-[#E0D9CF]" />
          <div className="flex items-center gap-1">
            <Shield size={12} className="text-[#C9A84C]" />
            <span>NDPR Compliant</span>
          </div>
          <div className="w-px h-3 bg-[#E0D9CF]" />
          <div className="flex items-center gap-1">
            <CheckCircle size={12} className="text-[#C9A84C]" />
            <span>CBN Regulated</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Verification;