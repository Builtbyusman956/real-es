// src/components/ProtectedRoute.jsx
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  const { user, userRole, loading, roleLoading } = useAuth();

  if (loading || roleLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F7F4EF]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#C9A84C]" />
      </div>
    );
  }

  // Not logged in
  if (!user) return <Navigate to="/login" replace />;

  // Google users are pre-verified — skip email check
  const isGoogleUser = user.providerData?.some(
    (p) => p.providerId === "google.com"
  );

  // Email/password users must verify email before accessing dashboard
  if (!isGoogleUser && !user.emailVerified) {
    return <Navigate to="/verify-email" replace />;
  }

  // Role-based access
  if (allowedRoles.length > 0 && !allowedRoles.includes(userRole)) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;