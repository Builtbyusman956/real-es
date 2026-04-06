// src/App.jsx
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";

import Home            from "./pages/Home";
import Browse          from "./pages/Browse";
import PropertyDetails from "./pages/PropertyDetails";
import Register        from "./pages/Register";
import Login           from "./pages/Login";
import AgentDashboard  from "./pages/dashboard/AgentDashboard";

// Separate component so we can use useLocation
const AppContent = () => {
  const location = useLocation();

  // Pages where Navbar should NOT appear
  const hideNavbar = [
    "/dashboard/agent",
    "/dashboard/buyer",
    "/login",
    "/register",
  ].includes(location.pathname);

  return (
    <>
      {!hideNavbar && <Navbar />}

      <Routes>
        <Route path="/"                element={<Home />} />
        <Route path="/browse"          element={<Browse />} />
        <Route path="/property/:id"    element={<PropertyDetails />} />
        <Route path="/register"        element={<Register />} />
        <Route path="/login"           element={<Login />} />
        <Route path="/dashboard/agent" element={<AgentDashboard />} />

        <Route
          path="*"
          element={
            <div className="h-screen flex items-center justify-center">
              <div className="text-center">
                <h1 className="text-5xl font-bold text-[#0A1628] mb-3">404</h1>
                <p className="text-[#6B7280] mb-6">This page doesn't exist.</p>
                <a href="/"
                  className="bg-[#C9A84C] hover:bg-[#b8943d] text-[#0A1628] font-bold px-6 py-2.5 rounded-xl transition duration-200">
                  Back to Home
                </a>
              </div>
            </div>
          }
        />
      </Routes>
    </>
  );
};

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;