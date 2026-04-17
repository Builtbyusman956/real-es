// src/pages/dashboard/AgentDashboard.jsx
import { useState } from "react";
import {
  ShieldCheck, Home, Eye, TrendingUp, Clock, CheckCircle,
  AlertTriangle, Plus, ChevronRight, MapPin,
  Calendar, FileText, User, Settings, Rss, MessageCircle, ArrowLeft
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import AgentFeed from "./AgentFeed";
import Messages from "./Messages";
import AgentVerification from "./AgentVerification";
import AgentSettings from "./AgentSettings";

// ✅ NEW IMPORTS
import MyListings from "./MyListings";
import AddListing from "./AddListing";

const AGENT = {
  name: "Emeka Okafor",
  email: "emeka@example.com",
  phone: "+234 801 234 5678",
  avatar: "EO",
  verified: false,
  rating: 4.7,
  reviews: 23,
};

const STATS = [
  { label: "Active Listings", value: "12", icon: Home, trend: "+2 this week" },
  { label: "Total Views", value: "1,340", icon: Eye, trend: "+180 this week" },
  { label: "Earnings (₦)", value: "₦480,000", icon: TrendingUp, trend: "+₦60,000 this month" },
  { label: "Pending Inspections", value: "4", icon: Calendar, trend: "2 this week" },
];

const LISTINGS = [/* unchanged */];
const INSPECTIONS = [/* unchanged */];

const NAV = [
  { icon: Home, label: "Overview", id: "overview" },
  { icon: Rss, label: "Feed", id: "feed" },
  { icon: FileText, label: "My Listings", id: "listings" },
  { icon: Calendar, label: "Inspections", id: "inspections" },
  { icon: MessageCircle, label: "Messages", id: "messages" },
  { icon: TrendingUp, label: "Earnings", id: "earnings" },
  { icon: User, label: "Profile", id: "profile" },
  { icon: ShieldCheck, label: "Verification", id: "verification" },
  { icon: Settings, label: "Settings", id: "settings" },
];

/* ---------- OverviewTab (UPDATED) ---------- */
const OverviewTab = ({ setActive, onAddListing }) => (
  <div className="flex flex-col gap-6">
    {/* keep everything same above */}

    <div className="bg-[#0A1628] rounded-2xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
      <div>
        <p className="text-[#F7F4EF] font-bold">Ready to add a new property?</p>
        <p className="text-[#8A9BB5] text-sm mt-0.5">
          List it now and reach thousands of verified buyers.
        </p>
      </div>

      {/* ✅ FIXED BUTTON */}
      <button
        onClick={onAddListing}
        className="flex items-center gap-2 bg-[#C9A84C] hover:bg-[#b8943d] active:scale-95 text-[#0A1628] px-5 py-2.5 rounded-xl text-sm font-bold transition duration-200 flex-shrink-0"
      >
        <Plus size={16} /> Add New Listing
      </button>
    </div>
  </div>
);

/* ---------- MAIN DASHBOARD ---------- */
const AgentDashboard = () => {
  const navigate = useNavigate();

  const [active, setActive] = useState("overview");
  const [prevActive, setPrevActive] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // ✅ NEW STATE
  const [showAddListing, setShowAddListing] = useState(false);

  const goTo = (id) => {
    setPrevActive(active);
    setActive(id);
    setSidebarOpen(false);
    setShowAddListing(false); // ✅ reset
  };

  const goBack = () => {
    if (showAddListing) {
      setShowAddListing(false); // ✅ go back to listings
      return;
    }

    if (prevActive) {
      setActive(prevActive);
      setPrevActive(null);
    }
  };

  // ✅ UPDATED LABEL LOGIC
  const currentLabel = showAddListing
    ? "Add Listing"
    : (NAV.find(n => n.id === active)?.label || "");

  const showBackBar = active !== "overview" || showAddListing;

  return (
    <div className="min-h-screen bg-[#F7F4EF]">
      <div className="flex h-screen">

        <Sidebar
          active={active}
          setActive={goTo}
          open={sidebarOpen}
          setOpen={setSidebarOpen}
          navigate={navigate}
        />

        <div className="flex-1 flex flex-col min-w-0 overflow-hidden">

          {/* Top bar */}
          <div className="bg-white border-b border-[#E0D9CF] px-4 py-3 flex items-center gap-3">

            <button onClick={() => setSidebarOpen(true)}
              className="md:hidden w-9 h-9 rounded-xl border flex items-center justify-center">
              <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="3" y1="6" x2="15" y2="6"/>
                <line x1="3" y1="12" x2="15" y2="12"/>
              </svg>
            </button>

            {showBackBar && (
              <button onClick={goBack}
                className="w-9 h-9 rounded-xl border flex items-center justify-center">
                <ArrowLeft size={16} />
              </button>
            )}

            <p className="text-sm font-bold flex-1">{currentLabel}</p>

            <button onClick={() => navigate("/")} className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-[#0A1628] flex items-center justify-center">
                <Home size={14} className="text-[#C9A84C]" />
              </div>
            </button>
          </div>

          {/* MAIN CONTENT */}
          <main className="flex-1 overflow-y-auto p-5 sm:p-6">

            {showAddListing ? (
              <AddListing
                onBack={() => {
                  setShowAddListing(false);
                  setActive("listings");
                }}
              />
            ) : (
              <>
                {active === "overview" && (
                  <OverviewTab
                    setActive={goTo}
                    onAddListing={() => setShowAddListing(true)}
                  />
                )}

                {active === "feed" && <AgentFeed />}

                {/* ✅ REPLACED PLACEHOLDER */}
                {active === "listings" && (
                  <MyListings onAddListing={() => setShowAddListing(true)} />
                )}

                {active === "inspections" && <PlaceholderTab label="Inspections" />}
                {active === "messages" && <Messages />}
                {active === "earnings" && <PlaceholderTab label="Earnings" />}
                {active === "profile" && <PlaceholderTab label="Profile" />}
                {active === "verification" && <AgentVerification />}
                {active === "settings" && <AgentSettings />}
              </>
            )}

          </main>
        </div>
      </div>
    </div>
  );
};

export default AgentDashboard;