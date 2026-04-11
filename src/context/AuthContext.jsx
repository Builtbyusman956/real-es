// src/context/AuthContext.jsx
import { createContext, useContext, useState, useEffect } from 'react';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
  updateProfile,
  sendEmailVerification
} from 'firebase/auth';
import { doc, setDoc, getDoc } from "firebase/firestore";
import { auth, db } from '../firebase';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser]           = useState(null);
  const [loading, setLoading]     = useState(true);
  const [userRole, setUserRole]   = useState(null);
  const [roleLoading, setRoleLoading] = useState(true); // ✅ NEW

  // 🔹 SIGN UP (Email/Password)
  const signup = async (email, password, displayName, role = 'buyer') => {
    const result = await createUserWithEmailAndPassword(auth, email, password);

    if (displayName) {
      await updateProfile(result.user, { displayName });
    }

    // ✅ Send email verification
    await sendEmailVerification(result.user);

    // ✅ Save user + role to Firestore
    await setDoc(doc(db, "users", result.user.uid), {
      email,
      displayName,
      role,
      createdAt: new Date()
    });

    setUserRole(role);

    return result;
  };

  // 🔹 LOGIN (Email/Password)
  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  // 🔹 GOOGLE SIGN-IN
  const loginWithGoogle = async (role = 'buyer') => {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);

    const userRef = doc(db, "users", result.user.uid);
    const userSnap = await getDoc(userRef);

    // ✅ New user → create record
    if (!userSnap.exists()) {
      await setDoc(userRef, {
        email: result.user.email,
        displayName: result.user.displayName,
        role,
        createdAt: new Date()
      });
      setUserRole(role);
    } else {
      // ✅ Existing user → use saved role
      const data = userSnap.data();
      setUserRole(data.role);
    }

    return result;
  };

  // 🔹 LOGOUT
  const logout = () => {
    setUserRole(null);
    return signOut(auth);
  };

  // 🔹 AUTH STATE LISTENER
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user);

      if (user) {
        const docRef  = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setUserRole(docSnap.data().role);
        }
      } else {
        setUserRole(null);
      }

      setLoading(false);
      setRoleLoading(false); // ✅ role is now resolved
    });

    return unsubscribe;
  }, []);

  const value = {
    user,
    userRole,
    roleLoading, // ✅ exported
    signup,
    login,
    logout,
    loginWithGoogle,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};