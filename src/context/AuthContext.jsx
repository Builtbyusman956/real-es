// src/context/AuthContext.jsx
import { createContext, useContext, useState, useEffect } from "react";
import { auth, db } from "../firebase";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  reload,
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser]               = useState(null);
  const [userRole, setUserRole]       = useState(null);
  const [loading, setLoading]         = useState(true);
  const [roleLoading, setRoleLoading] = useState(true);

  // ── Helpers ──────────────────────────────────────────────────────────────

  const fetchUserData = async (uid) => {
    try {
      const userSnap = await getDoc(doc(db, "users", uid));
      return userSnap.exists() ? userSnap.data() : {};
    } catch (err) {
      console.warn("Failed to fetch user data:", err.message);
      return {};
    }
  };

  // ── Register (email/password) ────────────────────────────────────────────
  // Creates account + sends verification email immediately.
  // User is stored in state but ProtectedRoute blocks them until
  // emailVerified === true.
  const registerUser = async (email, password, extraData = {}) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const firebaseUser   = userCredential.user;

      // Send verification email straight after account creation
      await sendEmailVerification(firebaseUser);

      const userData = {
        uid:         firebaseUser.uid,
        email:       firebaseUser.email,
        displayName: extraData.displayName || "",
        role:        extraData.role || "buyer",
        createdAt:   new Date().toISOString(),
        lastLogin:   new Date().toISOString(),
      };

      await setDoc(doc(db, "users", firebaseUser.uid), userData);

      setUser({ ...firebaseUser, ...userData });
      setUserRole(userData.role);

      return userCredential;
    } catch (error) {
      console.error("Register error:", error);
      throw error;
    }
  };

  // Alias so both names work across the codebase
  const signup = registerUser;

  // ── Resend verification email ────────────────────────────────────────────
  const resendVerificationEmail = async () => {
    if (!auth.currentUser) throw new Error("No user signed in.");
    await sendEmailVerification(auth.currentUser);
  };

  // ── Refresh Firebase user — checks emailVerified from server ─────────────
  // Returns true if now verified, false if still pending.
  const refreshUser = async () => {
    if (!auth.currentUser) return false;
    await reload(auth.currentUser);          // force re-fetch from Firebase server
    const userData = await fetchUserData(auth.currentUser.uid);
    setUser({ ...auth.currentUser, ...userData });
    return auth.currentUser.emailVerified;
  };

  // ── Login (email/password) ───────────────────────────────────────────────
  const login = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const firebaseUser   = userCredential.user;
      const userData       = await fetchUserData(firebaseUser.uid);

      setUser({ ...firebaseUser, ...userData });
      setUserRole(userData.role || null);

      return userCredential;
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  };

  // ── Google sign-in / sign-up ─────────────────────────────────────────────
  // Google accounts are already verified — no email step needed.
  const loginWithGoogle = async (selectedRole) => {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: "select_account" });

    try {
      const result       = await signInWithPopup(auth, provider);
      const firebaseUser = result.user;
      const userRef      = doc(db, "users", firebaseUser.uid);
      const userSnap     = await getDoc(userRef);

      let userData;
      if (!userSnap.exists()) {
        userData = {
          uid:         firebaseUser.uid,
          email:       firebaseUser.email,
          displayName: firebaseUser.displayName || "",
          photoURL:    firebaseUser.photoURL    || "",
          role:        selectedRole || "buyer",
          createdAt:   new Date().toISOString(),
          lastLogin:   new Date().toISOString(),
        };
        await setDoc(userRef, userData);
      } else {
        userData = userSnap.data();
      }

      setUser({ ...firebaseUser, ...userData });
      setUserRole(userData.role);

      return { user: firebaseUser, role: userData.role };
    } catch (error) {
      console.error("Google login error:", error);
      throw error;
    }
  };

  // ── Logout ───────────────────────────────────────────────────────────────
  const logout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      setUserRole(null);
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  // ── Auth state listener ──────────────────────────────────────────────────
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (firebaseUser) => {
      setRoleLoading(true);

      if (firebaseUser) {
        const userData = await fetchUserData(firebaseUser.uid);
        setUser({ ...firebaseUser, ...userData });
        setUserRole(userData.role || null);
      } else {
        setUser(null);
        setUserRole(null);
      }

      setLoading(false);
      setRoleLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const value = {
    user,
    userRole,
    loading,
    roleLoading,
    login,
    loginWithGoogle,
    logout,
    registerUser,
    signup,                   // alias for registerUser
    resendVerificationEmail,  // ← NEW
    refreshUser,              // ← NEW
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};