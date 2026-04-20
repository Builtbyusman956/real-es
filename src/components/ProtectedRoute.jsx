// src/components/ProtectedRoute.jsx
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  const { user, userRole, loading, roleLoading } = useAuth();

  // Wait for both auth AND role to resolve
  if (loading || roleLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F7F4EF]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#C9A84C]" />
      </div>
    );
  }

  // Not logged in
  if (!user) return <Navigate to="/login" replace />;

  // Google users are trusted (phoneVerified set to true on signup)
  // Email users must complete SMS OTP before accessing dashboard
  if (!user.phoneVerified) {
    return <Navigate to="/verify-otp" replace />;
  }

  // Role-based access
  if (allowedRoles.length > 0 && !allowedRoles.includes(userRole)) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;