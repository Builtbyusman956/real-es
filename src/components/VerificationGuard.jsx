// src/components/VerificationGuard.jsx
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { checkVerificationStatus } from '../services/verificationService';
import { Shield, AlertCircle, Loader2 } from 'lucide-react';

const VerificationGuard = ({ children, requireVerification = true }) => {
  const { user, userRole } = useAuth();
  const navigate = useNavigate();
  const [checking, setChecking] = useState(true);
  const [verified, setVerified] = useState(false);

  useEffect(() => {
    const check = async () => {
      if (!user) {
        setChecking(false);
        return;
      }
      
      try {
        const status = await checkVerificationStatus(user.uid);
        
        if (requireVerification && !status.canChat) {
          // Redirect to verification with return URL
          navigate('/verify', { 
            state: { 
              returnTo: window.location.pathname,
              message: 'Please complete verification to access this feature' 
            },
            replace: true
          });
        } else {
          setVerified(status.canChat);
        }
      } catch (err) {
        console.error('Verification check failed:', err);
        // Allow access on error (fail open for UX, but log for monitoring)
        setVerified(true);
      } finally {
        setChecking(false);
      }
    };
    
    check();
  }, [user, requireVerification, navigate]);

  if (checking) {
    return (
      <div className="h-screen flex items-center justify-center bg-[#F7F4EF]">
        <div className="flex flex-col items-center gap-3">
          <Loader2 size={32} className="animate-spin text-[#C9A84C]" />
          <p className="text-sm text-[#6B7280]">Checking verification status...</p>
        </div>
      </div>
    );
  }

  // If verification not required or user is verified, render children
  if (!requireVerification || verified) {
    return children;
  }

  // Fallback blocked message (shouldn't reach here due to redirect, but just in case)
  return (
    <div className="h-screen flex items-center justify-center bg-[#F7F4EF] p-4">
      <div className="text-center max-w-md">
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <AlertCircle size={32} className="text-red-500" />
        </div>
        <h2 className="text-xl font-bold text-[#0A1628] mb-2">Verification Required</h2>
        <p className="text-sm text-[#6B7280] mb-6">
          You need to complete identity verification before you can use this feature. This helps us prevent fraud and keep everyone safe.
        </p>
        <button
          onClick={() => navigate('/verify')}
          className="bg-[#C9A84C] hover:bg-[#b8943d] text-[#0A1628] font-bold px-6 py-3 rounded-xl transition flex items-center gap-2 mx-auto"
        >
          <Shield size={18} />
          Start Verification
        </button>
      </div>
    </div>
  );
};

export default VerificationGuard;