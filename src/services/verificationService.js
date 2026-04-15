// src/services/verificationService.js
import { doc, setDoc, getDoc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';

// Convert file to base64
const fileToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
  });
};

export const submitIDVerification = async (userId, idData) => {
  const { idType, idNumber, idImage, selfieImage } = idData;
  
  // Convert images to base64
  const [idImageBase64, selfieImageBase64] = await Promise.all([
    fileToBase64(idImage),
    fileToBase64(selfieImage)
  ]);
  
  // Save to Firestore only (no Storage needed)
  const verificationRef = doc(db, 'verifications', userId);
  await setDoc(verificationRef, {
    userId,
    idType,
    idNumber,
    idImageData: idImageBase64,      // Base64 string
    selfieImageData: selfieImageBase64, // Base64 string
    status: 'approved', // Auto-approve for demo, use 'pending_review' in production
    submittedAt: serverTimestamp(),
    bvnVerified: false,
    paymentMethodAdded: false
  });
  
  await updateDoc(doc(db, 'users', userId), {
    verificationStatus: 'approved',
    verificationSubmittedAt: serverTimestamp()
  });
  
  return verificationRef.id;
};

export const checkVerificationStatus = async (userId) => {
  const verificationDoc = await getDoc(doc(db, 'verifications', userId));
  
  if (!verificationDoc.exists()) {
    return { 
      status: 'not_started',
      canChat: false,
      canWithdraw: false,
      canReceivePayments: false,
      isFullyVerified: false
    };
  }
  
  const data = verificationDoc.data();
  
  return {
    ...data,
    status: data.status || 'not_started',
    isFullyVerified: data.status === 'approved' && data.bvnVerified && data.paymentMethodAdded,
    canChat: data.status === 'approved',
    canWithdraw: data.status === 'approved' && data.bvnVerified && data.paymentMethodAdded,
    canReceivePayments: data.status === 'approved' && data.bvnVerified
  };
};

export const submitBVN = async (userId, bvn) => {
  // Mock BVN verification
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  await updateDoc(doc(db, 'verifications', userId), {
    bvnVerified: true,
    bvnLast4: bvn.slice(-4),
    bvnVerifiedAt: serverTimestamp()
  });
  
  return { verified: true };
};

export const updatePaymentMethodStatus = async (userId) => {
  await updateDoc(doc(db, 'verifications', userId), {
    paymentMethodAdded: true,
    paymentMethodAddedAt: serverTimestamp()
  });
};

export const getVerificationRequirements = () => {
  return [
    { id: 'id', label: 'ID Upload' },
    { id: 'selfie', label: 'Selfie' },
    { id: 'bvn', label: 'BVN' },
    { id: 'payment', label: 'Payment Method' }
  ];
};