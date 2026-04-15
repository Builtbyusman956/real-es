// src/context/AuthContext.jsx
import { createContext, useContext, useState, useEffect } from "react";
import { auth, db } from "../firebase";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser]             = useState(null);
  const [userRole, setUserRole]     = useState(null); // ✅ was missing
  const [loading, setLoading]       = useState(true);
  const [roleLoading, setRoleLoading] = useState(true); // ✅ was missing

  // Fetch user data from Firestore with offline tolerance
  const fetchUserData = async (uid) => {
    try {
      const userSnap = await getDoc(doc(db, "users", uid));
      return userSnap.exists() ? userSnap.data() : {};
    } catch (err) {
      const isOffline =
        err.code === "unavailable" ||
        err.code === "failed-precondition" ||
        err.message?.includes("offline");

      if (isOffline) {
        console.warn("Firestore offline. Using basic auth user data.");
      } else {
        console.warn("Failed to fetch user data:", err.message);
      }
      return {};
    }
  };

  // Email + Password Login
  const login = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const firebaseUser = userCredential.user;
      const userData = await fetchUserData(firebaseUser.uid);

      setUser({ ...firebaseUser, ...userData });
      setUserRole(userData.role || null); // ✅ set role after login
      return userCredential;
    } catch (error) {
      console.error("Email login error:", error);
      throw error;
    }
  };

  // Google Login
  const loginWithGoogle = async (selectedRole) => {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: "select_account" });

    try {
      const result = await signInWithPopup(auth, provider);
      const firebaseUser = result.user;
      const userSnap = await getDoc(doc(db, "users", firebaseUser.uid));
      let userData;

      if (!userSnap.exists()) {
        userData = {
          uid: firebaseUser.uid,
          email: firebaseUser.email,
          displayName: firebaseUser.displayName || "",
          photoURL: firebaseUser.photoURL || "",
          role: selectedRole || "buyer",
          createdAt: new Date().toISOString(),
          lastLogin: new Date().toISOString(),
        };
        await setDoc(doc(db, "users", firebaseUser.uid), userData);
      } else {
        userData = userSnap.data();
        if (selectedRole && userData.role && userData.role !== selectedRole) {
          throw new Error(
            `This account is registered as a ${userData.role}, not a ${selectedRole}.`
          );
        }
      }

      setUser({ ...firebaseUser, ...userData });
      setUserRole(userData.role || null); // ✅ set role after Google login
      return { user: firebaseUser, role: userData.role };
    } catch (error) {
      console.error("Google login error:", error);
      throw error;
    }
  };

  // Logout
  const logout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      setUserRole(null); // ✅ clear role on logout
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  // Auth state listener
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (firebaseUser) => {
      setRoleLoading(true); // ✅ start role loading

      if (firebaseUser) {
        const userData = await fetchUserData(firebaseUser.uid);
        setUser({ ...firebaseUser, ...userData });
        setUserRole(userData.role || null); // ✅ set role from Firestore
      } else {
        setUser(null);
        setUserRole(null);
      }

      setLoading(false);    // ✅ no more arbitrary 300ms delay
      setRoleLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const value = {
    user,
    userRole,      // ✅ now exported
    loading,
    roleLoading,   // ✅ now exported
    login,
    loginWithGoogle,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children} {/* ✅ don't render anything until auth resolves */}
    </AuthContext.Provider>
  );
};