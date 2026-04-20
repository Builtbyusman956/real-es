// src/App.jsx
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import VerificationGuard from "./components/VerificationGuard";

import Home from "./pages/Home";
import Browse from "./pages/Browse";
import Register from "./pages/Register";
import Login from "./pages/Login";
import PropertyDetails from "./pages/PropertyDetails";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Verification from "./pages/Verification";
import VerifyEmail from "./pages/VerifyEmail";           // ← NEW
import AgentDashboard from "./pages/dashboard/AgentDashboard";
import BuyerDashboard from "./pages/dashboard/BuyerDashboard";

const RoleBasedRedirect = () => {
  const { user, userRole, roleLoading } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  if (roleLoading) return null;
  if (userRole === "agent") return <Navigate to="/dashboard/agent" replace />;
  return <Navigate to="/dashboard/buyer" replace />;
};

const ConditionalNavbar = () => {
  const { pathname } = useLocation();
  // Also hide navbar on the verify-email screen — it's a standalone blocking page
  if (pathname.startsWith("/dashboard") || pathname === "/verify-email") return null;
  return <Navbar />;
};

const AppRoutes = () => {
  const { user } = useAuth();
  return (
    <>
      <ConditionalNavbar />
      <Routes>
        {/* ── Public ───────────────────────────────────────────────────── */}
        <Route path="/"             element={<Home />} />
        <Route path="/browse"       element={<Browse />} />
        <Route path="/about"        element={<About />} />
        <Route path="/contact"      element={<Contact />} />
        <Route path="/property/:id" element={<PropertyDetails />} />

        {/* Redirect logged-in users away from auth pages */}
        <Route path="/login"    element={user ? <RoleBasedRedirect /> : <Login />} />
        <Route path="/register" element={user ? <RoleBasedRedirect /> : <Register />} />

        {/* ── Email verification screen ─────────────────────────────────
            Accessible to any signed-in user (verified or not).
            ProtectedRoute with no allowedRoles just checks user exists.
            Once they verify, ProtectedRoute inside dashboards lets them through. */}
        <Route path="/verify-email" element={
          user
            ? <VerifyEmail />
            : <Navigate to="/login" replace />
        } />

        {/* Legacy /verify route kept for backward compat */}
        <Route path="/verify" element={
          <ProtectedRoute>
            <Verification />
          </ProtectedRoute>
        } />

        {/* ── Protected dashboards ─────────────────────────────────────── */}
        <Route path="/dashboard/buyer/*" element={
          <ProtectedRoute allowedRoles={["buyer"]}>
            <VerificationGuard requireVerification={true}>
              <BuyerDashboard />
            </VerificationGuard>
          </ProtectedRoute>
        } />

        <Route path="/dashboard/agent/*" element={
          <ProtectedRoute allowedRoles={["agent"]}>
            <VerificationGuard requireVerification={true}>
              <AgentDashboard />
            </VerificationGuard>
          </ProtectedRoute>
        } />

        <Route path="/dashboard" element={<RoleBasedRedirect />} />

        {/* ── 404 ──────────────────────────────────────────────────────── */}
        <Route path="*" element={
          <div className="h-screen flex items-center justify-center bg-[#F7F4EF]">
            <div className="text-center">
              <div className="w-20 h-20 bg-[#0A1628] rounded-2xl flex items-center justify-center mx-auto mb-6">
                <span className="text-4xl font-bold text-[#C9A84C]">404</span>
              </div>
              <h1 className="text-2xl font-bold text-[#0A1628] mb-3">Page Not Found</h1>
              <p className="text-[#6B7280] mb-6 max-w-xs mx-auto">
                The page you're looking for doesn't exist or has been moved.
              </p>
              <a
                href="/"
                className="inline-flex items-center gap-2 bg-[#C9A84C] hover:bg-[#b8943d] text-[#0A1628] font-bold px-6 py-3 rounded-xl transition duration-200"
              >
                Back to Home
              </a>
            </div>
          </div>
        } />
      </Routes>
    </>
  );
};

function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;