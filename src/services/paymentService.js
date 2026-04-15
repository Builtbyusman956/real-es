// src/services/paymentService.js
import { doc, setDoc, collection, query, where, getDocs, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { updatePaymentMethodStatus } from './verificationService';

const NIGERIAN_BANKS = [
  { code: '057', name: 'Zenith Bank' },
  { code: '011', name: 'First Bank' },
  { code: '033', name: 'UBA' },
  { code: '058', name: 'GTBank' },
  { code: '044', name: 'Access Bank' },
];

export const savePaymentMethod = async (userId, paymentData) => {
  const paymentRef = doc(collection(db, 'users', userId, 'paymentMethods'));
  
  await setDoc(paymentRef, {
    ...paymentData,
    createdAt: new Date().toISOString(),
    verified: true,
    status: 'active',
    isDefault: true
  });
  
  await updatePaymentMethodStatus(userId);
  
  return paymentRef.id;
};

export const getPaymentMethods = async (userId) => {
  const q = query(collection(db, 'users', userId, 'paymentMethods'));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const verifyBankAccount = async (accountNumber, bankCode) => {
  // Mock verification
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  const bank = NIGERIAN_BANKS.find(b => b.code === bankCode);
  
  return {
    verified: true,
    accountNumber: accountNumber,
    accountName: 'Test User', // Mock name
    bankCode: bankCode,
    bankName: bank?.name
  };
};