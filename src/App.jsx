// src/App.jsx
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";

import Home            from "./pages/Home";
import Browse          from "./pages/Browse";
import Register        from "./pages/Register";
import Login           from "./pages/Login";
import AgentDashboard  from "./pages/dashboard/AgentDashboard";
import BuyerDashboard  from "./pages/dashboard/BuyerDashboard";
import PropertyDetails from "./pages/PropertyDetails";
import About           from "./pages/About";
import Contact         from "./pages/Contact";
import BuyerFeed       from "./pages/dashboard/BuyerFeed";
import AgentFeed       from "./pages/dashboard/AgentFeed";

// ✅ Waits for role to load before redirecting — prevents agents landing on buyer dashboard
const RoleBasedRedirect = () => {
  const { user, userRole, roleLoading } = useAuth();

  if (!user) return <Navigate to="/login" replace />;
  if (roleLoading) return null; // ⏳ wait for Firestore role fetch

  if (userRole === 'agent') return <Navigate to="/dashboard/agent" replace />;
  return <Navigate to="/dashboard/buyer" replace />;
};

function App() {
  const { user } = useAuth();

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        {/* Public routes */}
        <Route path="/"             element={<Home />} />
        <Route path="/browse"       element={<Browse />} />
        <Route path="/about"        element={<About />} />
        <Route path="/contact"      element={<Contact />} />
        <Route path="/property/:id" element={<PropertyDetails />} />

        {/* Auth routes - redirect to dashboard if already logged in */}
        <Route
          path="/login"
          element={user ? <RoleBasedRedirect /> : <Login />}
        />
        <Route
          path="/register"
          element={user ? <RoleBasedRedirect /> : <Register />}
        />

        {/* Protected Buyer Routes */}
        <Route
          path="/dashboard/buyer/*"
          element={
            <ProtectedRoute allowedRoles={['buyer']}>
              <BuyerDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/buyer/feed"
          element={
            <ProtectedRoute allowedRoles={['buyer']}>
              <BuyerFeed />
            </ProtectedRoute>
          }
        />

        {/* Protected Agent Routes */}
        <Route
          path="/dashboard/agent/*"
          element={
            <ProtectedRoute allowedRoles={['agent']}>
              <AgentDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/agent/feed"
          element={
            <ProtectedRoute allowedRoles={['agent']}>
              <AgentFeed />
            </ProtectedRoute>
          }
        />

        {/* Root dashboard redirect */}
        <Route path="/dashboard" element={<RoleBasedRedirect />} />

        {/* 404 Fallback */}
        <Route path="*" element={
          <div className="h-screen flex items-center justify-center">
            <div className="text-center">
              <h1 className="text-5xl font-bold text-[#0A1628] mb-3">404</h1>
              <p className="text-[#6B7280] mb-6">This page doesn't exist.</p>
              <a href="/" className="bg-[#C9A84C] hover:bg-[#b8943d] text-[#0A1628] font-bold px-6 py-2.5 rounded-xl transition duration-200">
                Back to Home
              </a>
            </div>
          </div>
        } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;