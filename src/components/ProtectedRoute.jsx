// src/components/ProtectedRoute.jsx
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  const { user, userRole, loading, roleLoading } = useAuth();

  // Wait for BOTH auth AND role to resolve before making any decision
  if (loading || roleLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F7F4EF]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#C9A84C]" />
      </div>
    );
  }

  // Not logged in at all
  if (!user) return <Navigate to="/login" replace />;

  // Google accounts are pre-verified — skip the email check for them
  const isGoogleUser = user.providerData?.some(
    (p) => p.providerId === "google.com"
  );

  // Email/password users must verify before accessing any protected route
  if (!isGoogleUser && !user.emailVerified) {
    return <Navigate to="/verify-email" replace />;
  }

  // Role-based access — if route requires specific roles, enforce them
  if (allowedRoles.length > 0 && !allowedRoles.includes(userRole)) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;