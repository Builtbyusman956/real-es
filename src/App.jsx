// src/App.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";

import Home            from "./pages/Home";
import Browse          from "./pages/Browse";
import Register        from "./pages/Register";
import Login           from "./pages/Login";
import AgentDashboard  from "./pages/dashboard/AgentDashboard";
import BuyerDashboard  from "./pages/dashboard/BuyerDashboard";
import PropertyDetails from "./pages/PropertyDetails";
import About           from "./pages/About";
import Contact         from "./pages/Contact";
import BuyerFeed from "./pages/dashboard/BuyerFeed";
import AgentFeed from "./pages/dashboard/AgentFeed";


function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/"                element={<Home />} />
        <Route path="/browse"          element={<Browse />} />
        <Route path="/register"        element={<Register />} />
        <Route path="/login"           element={<Login />} />
        <Route path="/dashboard/agent" element={<AgentDashboard />} />
        <Route path="/dashboard/buyer" element={<BuyerDashboard />} />
        <Route path="/property/:id"    element={<PropertyDetails />} />
        <Route path="/about"           element={<About />} />
        <Route path="/contact"         element={<Contact />} />
        <Route path="/dashboard/buyer/feed"  element={<BuyerFeed />} />
        <Route path="/dashboard/agent/feed"  element={<AgentFeed />} />



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