// src/context/AuthContext.jsx
import { createContext, useContext, useState, useEffect } from "react";
import { auth, db } from "../firebase";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";

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
  // Creates Firebase Auth account + saves full profile to Firestore.
  // Does NOT send email verification — SMS OTP handled by backend.
  const registerUser = async (email, password, extraData = {}) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const firebaseUser   = userCredential.user;

      const userData = {
        uid:           firebaseUser.uid,
        email:         firebaseUser.email,
        displayName:   extraData.displayName  || "",
        firstName:     extraData.firstName    || "",
        lastName:      extraData.lastName     || "",
        phone:         extraData.phone        || "",
        country:       extraData.country      || "",
        newsletter:    extraData.newsletter   || false,
        role:          extraData.role         || "buyer",
        phoneVerified: false,                    // set to true after OTP
        photoURL:      "",
        createdAt:     new Date().toISOString(),
        lastLogin:     new Date().toISOString(),
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

  const signup = registerUser; // alias

  // ── Refresh user from Firestore after OTP verification ───────────────────
  // Backend sets phoneVerified:true in Firestore — this picks it up
  const refreshUserVerification = async () => {
    if (!auth.currentUser) return false;
    const userData = await fetchUserData(auth.currentUser.uid);
    setUser({ ...auth.currentUser, ...userData });
    setUserRole(userData.role || null);
    return userData.phoneVerified === true;
  };

  // ── Update profile ───────────────────────────────────────────────────────
  const updateProfile = async (updates) => {
    if (!auth.currentUser) throw new Error("Not signed in");
    const userRef = doc(db, "users", auth.currentUser.uid);
    await updateDoc(userRef, { ...updates, updatedAt: new Date().toISOString() });
    const userData = await fetchUserData(auth.currentUser.uid);
    setUser({ ...auth.currentUser, ...userData });
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
  // Google users skip OTP — they are trusted by default
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
          uid:           firebaseUser.uid,
          email:         firebaseUser.email,
          displayName:   firebaseUser.displayName || "",
          firstName:     firebaseUser.displayName?.split(" ")[0] || "",
          lastName:      firebaseUser.displayName?.split(" ").slice(1).join(" ") || "",
          phone:         "",
          country:       "",
          photoURL:      firebaseUser.photoURL || "",
          role:          selectedRole || "buyer",
          phoneVerified: true,   // Google = trusted, skip OTP
          newsletter:    false,
          createdAt:     new Date().toISOString(),
          lastLogin:     new Date().toISOString(),
        };
        await setDoc(userRef, userData);
      } else {
        userData = userSnap.data();
        // Update lastLogin
        await updateDoc(userRef, { lastLogin: new Date().toISOString() });
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
    signup,
    refreshUserVerification,
    updateProfile,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};