// src/pages/dashboard/AgentDashboard.jsx
import { useState } from "react";
import {
  Home, ArrowLeft, Plus, FileText, Calendar,
  MessageCircle, TrendingUp, User, ShieldCheck, Settings, Rss
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import AgentFeed from "./AgentFeed";
import Messages from "./Messages";
import AgentVerification from "./AgentVerification";
import AgentSettings from "./AgentSettings";
import MyListings from "./MyListings";
import AddListing from "./AddListing";

/* ---------- NAV ---------- */
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

/* ---------- ✅ SIDEBAR (DEFINED FIRST — FIXES YOUR ERROR) ---------- */
function Sidebar({ active, setActive, open, setOpen }) {
  return (
    <>
      {open && (
        <div
          className="fixed inset-0 bg-black/50 z-20 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      <aside
        className={`fixed top-0 left-0 h-screen w-60 bg-[#0A1628] z-30 flex flex-col transition-transform
        ${open ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 md:static`}
      >
        <div className="px-5 py-4 border-b border-[#1A2E4A]">
          <p className="text-white font-bold text-sm">Agent Dashboard</p>
        </div>

        <nav className="flex-1 px-3 py-4 flex flex-col gap-1">
          {NAV.map(({ icon: Icon, label, id }) => (
            <button
              key={id}
              onClick={() => {
                setActive(id);
                setOpen(false);
              }}
              className={`flex items-center gap-3 px-3 py-2 rounded-xl text-sm
                ${
                  active === id
                    ? "bg-[#C9A84C] text-black"
                    : "text-gray-300 hover:bg-[#1A2E4A]"
                }`}
            >
              <Icon size={16} />
              {label}
            </button>
          ))}
        </nav>
      </aside>
    </>
  );
}

/* ---------- PLACEHOLDER ---------- */
const PlaceholderTab = ({ label }) => (
  <div className="flex items-center justify-center h-full text-gray-500">
    {label} coming soon
  </div>
);

/* ---------- OVERVIEW ---------- */
const OverviewTab = ({ onAddListing }) => (
  <div className="bg-[#0A1628] rounded-2xl p-5 flex justify-between items-center">
    <div>
      <p className="text-white font-bold">Ready to add a new property?</p>
      <p className="text-gray-400 text-sm">Reach more buyers instantly</p>
    </div>

    <button
      onClick={onAddListing}
      className="flex items-center gap-2 bg-[#C9A84C] px-4 py-2 rounded-xl font-bold"
    >
      <Plus size={16} /> Add Listing
    </button>
  </div>
);

/* ---------- MAIN ---------- */
export default function AgentDashboard() {
  const navigate = useNavigate();

  const [active, setActive] = useState("overview");
  const [prevActive, setPrevActive] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showAddListing, setShowAddListing] = useState(false);

  const goTo = (id) => {
    setPrevActive(active);
    setActive(id);
    setSidebarOpen(false);
    setShowAddListing(false);
  };

  const goBack = () => {
    if (showAddListing) {
      setShowAddListing(false);
      return;
    }
    if (prevActive) {
      setActive(prevActive);
      setPrevActive(null);
    }
  };

  const currentLabel = showAddListing
    ? "Add Listing"
    : NAV.find(n => n.id === active)?.label;

  const showBackBar = active !== "overview" || showAddListing;

  return (
    <div className="min-h-screen bg-[#F7F4EF]">
      <div className="flex h-screen">

        {/* ✅ Sidebar now works */}
        <Sidebar
          active={active}
          setActive={goTo}
          open={sidebarOpen}
          setOpen={setSidebarOpen}
        />

        <div className="flex-1 flex flex-col">

          {/* TOP BAR */}
          <div className="bg-white border-b px-4 py-3 flex items-center gap-3">

            <button onClick={() => setSidebarOpen(true)} className="md:hidden">
              ☰
            </button>

            {showBackBar && (
              <button onClick={goBack}>
                <ArrowLeft size={16} />
              </button>
            )}

            <p className="font-bold flex-1">{currentLabel}</p>

            <button onClick={() => navigate("/")}>
              <Home size={18} />
            </button>
          </div>

          {/* CONTENT */}
          <main className="flex-1 overflow-y-auto p-5">

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
                  <OverviewTab onAddListing={() => setShowAddListing(true)} />
                )}

                {active === "feed" && <AgentFeed />}

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
}