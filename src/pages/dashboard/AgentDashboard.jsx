// src/pages/dashboard/AgentDashboard.jsx
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  RiHome4Line, RiFileListLine, RiCalendarLine,
  RiDashboardLine, RiMenuLine, RiCloseLine,
  RiShieldCheckFill, RiAddCircleLine, RiLogoutBoxLine,
  RiArrowLeftLine, RiMapPinLine, RiTimeLine,
  RiCheckboxCircleLine, RiAlertLine, RiTrendingUpLine,
  RiEyeLine, RiMoneyDollarCircleLine, RiUserLine,
} from "react-icons/ri";
import { MdBedroomParent } from "react-icons/md";
import { useAuth } from "../../context/AuthContext";
import AgentFeed from "./AgentFeed";
import Messages from "./Messages";

// ─── Mock Data ────────────────────────────────────────────────────────────────
const AGENT = {
  name: "Emeka Okafor", email: "emeka@example.com",
  phone: "+234 801 234 5678", avatar: "EO", verified: false,
  rating: 4.7, reviews: 23,
};

const STATS = [
  { label: "Active Listings",     value: "12",       icon: RiHome4Line,           trend: "+2 this week",        color: "bg-blue-50 text-blue-600"   },
  { label: "Total Views",         value: "1,340",    icon: RiEyeLine,             trend: "+180 this week",      color: "bg-purple-50 text-purple-600" },
  { label: "Earnings",            value: "₦480,000", icon: RiMoneyDollarCircleLine, trend: "+₦60k this month",  color: "bg-green-50 text-green-600"  },
  { label: "Inspections",         value: "4",        icon: RiCalendarLine,        trend: "2 upcoming",          color: "bg-orange-50 text-orange-600"},
];

const LISTINGS = [
  { id: 1, title: "3 Bedroom Flat",     location: "Lekki, Lagos",  price: "₦2,500,000/yr", status: "active",  views: 340, image: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=400&q=80" },
  { id: 2, title: "Land (600sqm)",      location: "Ibadan, Oyo",   price: "₦8,000,000",    status: "pending", views: 120, image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=400&q=80" },
  { id: 3, title: "2 Bedroom Bungalow", location: "Abuja, FCT",    price: "₦1,800,000/yr", status: "active",  views: 210, image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=400&q=80" },
];

const INSPECTIONS = [
  { id: 1, property: "3 Bedroom Flat, Lekki",    buyer: "Chidi Nwosu",   date: "Tomorrow, 10:00 AM", status: "confirmed" },
  { id: 2, property: "Land (600sqm), Ibadan",     buyer: "Fatima Bello",  date: "Apr 9, 2:00 PM",     status: "pending"   },
  { id: 3, property: "2 Bedroom Bungalow, Abuja", buyer: "Tunde Adeyemi", date: "Apr 11, 11:00 AM",   status: "confirmed" },
];

// ─── Nav items ────────────────────────────────────────────────────────────────
const NAV_ITEMS = [
  { id: "overview",    label: "Overview",    icon: RiDashboardLine  },
  { id: "feed",        label: "Feed",        icon: RiHome4Line      },
  { id: "listings",    label: "My Listings", icon: RiFileListLine   },
  { id: "inspections", label: "Inspections", icon: RiCalendarLine   },
  { id: "messages",    label: "Messages",    icon: RiUserLine       },
  { id: "earnings",    label: "Earnings",    icon: RiTrendingUpLine },
  { id: "profile",     label: "Profile",     icon: RiUserLine       },
];

// ─── Top Navbar ───────────────────────────────────────────────────────────────
const DashboardTopbar = ({ active, sidebarOpen, setSidebarOpen }) => {
  const navigate  = useNavigate();
  const { logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  return (
    <header className="h-14 bg-[#0A1628] border-b border-[#1A2E4A] flex items-center justify-between px-4 sm:px-6 sticky top-0 z-30">
      <div className="flex items-center gap-3">
        {/* Mobile hamburger */}
        <button onClick={() => setSidebarOpen((v) => !v)}
          className="md:hidden w-8 h-8 rounded-lg bg-[#1A2E4A] flex items-center justify-center text-[#8A9BB5] hover:text-white transition">
          {sidebarOpen ? <RiCloseLine size={18} /> : <RiMenuLine size={18} />}
        </button>

        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-[#C9A84C] flex items-center justify-center">
            <span className="text-[#0A1628] font-black text-xs">N</span>
          </div>
          <div className="hidden sm:block">
            <p className="text-[#F7F4EF] font-bold text-sm leading-none">NRET</p>
            <p className="text-[#C9A84C] text-[8px] uppercase tracking-widest font-semibold">Agent Portal</p>
          </div>
        </div>

        {/* Current page */}
        <div className="hidden sm:block h-4 w-px bg-[#1A2E4A] mx-1" />
        <p className="hidden sm:block text-[#8A9BB5] text-sm font-medium capitalize">{active}</p>
      </div>

      <div className="flex items-center gap-2">
        {/* Back to home */}
        <button onClick={() => navigate("/")}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#1A2E4A] hover:border-[#C9A84C]/40 text-[#8A9BB5] hover:text-[#C9A84C] text-xs font-medium transition duration-200">
          <RiArrowLeftLine size={14} />
          <span className="hidden sm:block">Back to Home</span>
        </button>

        {/* Post listing */}
        <button
          className="flex items-center gap-1.5 bg-[#C9A84C] hover:bg-[#b8943d] active:scale-95 text-[#0A1628] text-xs font-bold px-3 py-1.5 rounded-lg transition duration-200">
          <RiAddCircleLine size={14} />
          <span className="hidden sm:block">Post Listing</span>
        </button>

        {/* Avatar */}
        <div className="flex items-center gap-2 bg-[#1A2E4A] pl-2 pr-3 py-1.5 rounded-lg">
          <div className="w-6 h-6 rounded-md bg-[#C9A84C] flex items-center justify-center text-[#0A1628] font-bold text-[10px]">
            {AGENT.avatar}
          </div>
          <span className="text-[#F7F4EF] text-xs font-semibold hidden sm:block">
            {AGENT.name.split(" ")[0]}
          </span>
        </div>

        {/* Logout */}
        <button onClick={handleLogout}
          className="w-8 h-8 rounded-lg bg-[#1A2E4A] flex items-center justify-center text-[#8A9BB5] hover:text-red-400 transition">
          <RiLogoutBoxLine size={16} />
        </button>
      </div>
    </header>
  );
};

// ─── Sidebar ──────────────────────────────────────────────────────────────────
const Sidebar = ({ active, setActive, open, setOpen }) => (
  <>
    {open && (
      <div className="fixed inset-0 bg-black/50 z-20 md:hidden" onClick={() => setOpen(false)} />
    )}
    <aside className={`fixed top-14 left-0 h-[calc(100vh-3.5rem)] w-56 bg-[#0A1628] border-r border-[#1A2E4A] z-20 flex flex-col transition-transform duration-300
      ${open ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 md:sticky md:top-14`}>

      {/* Agent info */}
      <div className="px-4 py-4 border-b border-[#1A2E4A]">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#C9A84C] flex items-center justify-center text-[#0A1628] font-bold text-sm flex-shrink-0">
            {AGENT.avatar}
          </div>
          <div className="min-w-0">
            <p className="text-[#F7F4EF] text-sm font-bold truncate">{AGENT.name}</p>
            {AGENT.verified ? (
              <span className="flex items-center gap-1 text-[#C9A84C] text-[10px] font-semibold">
                <RiShieldCheckFill size={10} /> Verified Agent
              </span>
            ) : (
              <span className="flex items-center gap-1 text-yellow-400 text-[10px] font-semibold">
                <RiAlertLine size={10} /> Unverified
              </span>
            )}
          </div>
        </div>

        {!AGENT.verified && (
          <button className="w-full mt-3 bg-[#C9A84C]/10 border border-[#C9A84C]/30 text-[#C9A84C] text-[10px] font-bold py-1.5 rounded-lg hover:bg-[#C9A84C]/20 transition">
            Complete Verification →
          </button>
        )}
      </div>

      {/* Nav links */}
      <nav className="flex-1 px-3 py-3 flex flex-col gap-0.5 overflow-y-auto">
        {NAV_ITEMS.map(({ icon: Icon, label, id }) => (
          <button key={id} onClick={() => { setActive(id); setOpen(false); }}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 w-full text-left
              ${active === id
                ? "bg-[#C9A84C] text-[#0A1628]"
                : "text-[#8A9BB5] hover:bg-[#1A2E4A] hover:text-[#F7F4EF]"}`}>
            <Icon size={16} />
            {label}
          </button>
        ))}
      </nav>

      {/* Stats mini */}
      <div className="px-3 py-3 border-t border-[#1A2E4A]">
        <div className="bg-[#1A2E4A] rounded-xl p-3">
          <p className="text-[#8A9BB5] text-[10px] font-semibold uppercase tracking-widest mb-2">Quick Stats</p>
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <span className="text-[#8A9BB5] text-xs">Listings</span>
              <span className="text-[#C9A84C] text-xs font-bold">12</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[#8A9BB5] text-xs">Rating</span>
              <span className="text-[#C9A84C] text-xs font-bold">⭐ {AGENT.rating}</span>
            </div>
          </div>
        </div>
      </div>
    </aside>
  </>
);

// ─── Verification Banner ──────────────────────────────────────────────────────
const VerificationBanner = () => (
  <div className="bg-[#C9A84C]/10 border border-[#C9A84C]/25 rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center gap-4">
    <div className="w-10 h-10 rounded-xl bg-[#C9A84C]/20 flex items-center justify-center flex-shrink-0">
      <RiAlertLine size={20} className="text-[#C9A84C]" />
    </div>
    <div className="flex-1">
      <p className="text-[#0A1628] font-bold text-sm">Complete Your Agent Verification</p>
      <p className="text-[#6B7280] text-xs mt-0.5">
        Upload your ID, BVN, and office address to get verified and unlock all features.
      </p>
      <div className="flex gap-2 mt-2.5 flex-wrap">
        {[
          { label: "ID Upload",   done: true  },
          { label: "BVN",         done: false },
          { label: "Face Verify", done: false },
          { label: "Office Addr", done: true  },
        ].map(({ label, done }) => (
          <span key={label}
            className={`text-[10px] font-semibold px-2.5 py-1 rounded-full flex items-center gap-1
              ${done
                ? "bg-[#0A1628] text-[#C9A84C]"
                : "bg-[#E0D9CF] text-[#6B7280]"}`}>
            {done ? <RiCheckboxCircleLine size={10} /> : <RiTimeLine size={10} />}
            {label}
          </span>
        ))}
      </div>
    </div>
    <button className="bg-[#C9A84C] hover:bg-[#b8943d] active:scale-95 text-[#0A1628] text-xs font-bold px-4 py-2.5 rounded-xl transition duration-200 flex-shrink-0">
      Complete Now
    </button>
  </div>
);

// ─── Overview ─────────────────────────────────────────────────────────────────
const Overview = ({ setActive }) => (
  <div className="flex flex-col gap-5">
    {!AGENT.verified && <VerificationBanner />}

    {/* Stats */}
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {STATS.map(({ label, value, icon: Icon, trend, color }) => (
        <div key={label} className="bg-white rounded-2xl border border-[#E0D9CF] p-4 hover:border-[#C9A84C]/30 hover:shadow-md transition-all duration-200">
          <div className="flex items-center justify-between mb-3">
            <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${color}`}>
              <Icon size={17} />
            </div>
            <span className="text-[10px] text-[#C9A84C] font-semibold bg-[#E8D5A3]/40 px-2 py-0.5 rounded-full">
              {trend}
            </span>
          </div>
          <p className="text-2xl font-bold text-[#0A1628]">{value}</p>
          <p className="text-xs text-[#6B7280] mt-0.5">{label}</p>
        </div>
      ))}
    </div>

    {/* Listings + Inspections */}
    <div className="grid lg:grid-cols-2 gap-5">
      <div className="bg-white rounded-2xl border border-[#E0D9CF] overflow-hidden">
        <div className="px-5 py-3.5 border-b border-[#E0D9CF] flex items-center justify-between">
          <p className="font-bold text-[#0A1628] text-sm">Recent Listings</p>
          <button onClick={() => setActive("listings")}
            className="text-[#C9A84C] text-xs font-semibold hover:underline">View all →</button>
        </div>
        {LISTINGS.map((l) => (
          <div key={l.id} className="flex items-center gap-3 px-5 py-3 border-b border-[#E0D9CF] last:border-0 hover:bg-[#F7F4EF] transition">
            <img src={l.image} alt={l.title} className="w-12 h-12 rounded-xl object-cover flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-[#0A1628] truncate">{l.title}</p>
              <p className="text-xs text-[#6B7280] flex items-center gap-1 mt-0.5">
                <RiMapPinLine size={10} /> {l.location}
              </p>
            </div>
            <div className="text-right flex-shrink-0">
              <p className="text-xs font-bold text-[#0A1628]">{l.price}</p>
              <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full
                ${l.status === "active" ? "bg-[#0A1628] text-[#C9A84C]" : "bg-[#E8D5A3] text-[#6B7280]"}`}>
                {l.status}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl border border-[#E0D9CF] overflow-hidden">
        <div className="px-5 py-3.5 border-b border-[#E0D9CF] flex items-center justify-between">
          <p className="font-bold text-[#0A1628] text-sm">Upcoming Inspections</p>
          <button onClick={() => setActive("inspections")}
            className="text-[#C9A84C] text-xs font-semibold hover:underline">View all →</button>
        </div>
        {INSPECTIONS.map((ins) => (
          <div key={ins.id} className="px-5 py-3 border-b border-[#E0D9CF] last:border-0 hover:bg-[#F7F4EF] transition">
            <div className="flex items-start justify-between gap-2">
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-[#0A1628] truncate">{ins.property}</p>
                <p className="text-xs text-[#6B7280] flex items-center gap-1 mt-0.5">
                  <RiUserLine size={10} /> {ins.buyer}
                </p>
                <p className="text-xs text-[#C9A84C] font-medium flex items-center gap-1 mt-0.5">
                  <RiTimeLine size={10} /> {ins.date}
                </p>
              </div>
              <span className={`text-[10px] font-semibold px-2 py-1 rounded-full flex-shrink-0
                ${ins.status === "confirmed" ? "bg-[#0A1628] text-[#C9A84C]" : "bg-[#E8D5A3] text-[#6B7280]"}`}>
                {ins.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>

    {/* Add listing CTA */}
    <div className="bg-[#0A1628] rounded-2xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
      <div>
        <p className="text-[#F7F4EF] font-bold">Ready to add a new property?</p>
        <p className="text-[#8A9BB5] text-sm mt-0.5">List it now and reach thousands of verified buyers.</p>
      </div>
      <button className="flex items-center gap-2 bg-[#C9A84C] hover:bg-[#b8943d] active:scale-95 text-[#0A1628] px-5 py-2.5 rounded-xl text-sm font-bold transition duration-200 flex-shrink-0">
        <RiAddCircleLine size={16} /> Add New Listing
      </button>
    </div>
  </div>
);

// ─── Placeholder ──────────────────────────────────────────────────────────────
const Placeholder = ({ label, icon: Icon = RiTimeLine }) => (
  <div className="flex flex-col items-center justify-center py-24 text-center">
    <div className="w-16 h-16 rounded-2xl bg-[#E8D5A3]/40 border border-[#C9A84C]/20 flex items-center justify-center mb-4">
      <Icon size={28} className="text-[#C9A84C]" />
    </div>
    <p className="text-[#0A1628] font-bold text-lg">{label}</p>
    <p className="text-[#6B7280] text-sm mt-1 max-w-xs">This section is being built. Check back soon.</p>
  </div>
);

// ─── Main ─────────────────────────────────────────────────────────────────────
const AgentDashboard = () => {
  const [active,      setActive]      = useState("overview");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#F7F4EF]">
      <DashboardTopbar
        active={active}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />
      <div className="flex h-[calc(100vh-3.5rem)]">
        <Sidebar
          active={active}
          setActive={setActive}
          open={sidebarOpen}
          setOpen={setSidebarOpen}
        />
        <main className="flex-1 overflow-y-auto p-5 sm:p-6">
          {active === "overview"    && <Overview    setActive={setActive} />}
          {active === "feed"        && <AgentFeed />}
          {active === "listings"    && <Placeholder label="My Listings"  icon={RiFileListLine}   />}
          {active === "inspections" && <Placeholder label="Inspections"  icon={RiCalendarLine}   />}
          {active === "messages"    && <Messages />}
          {active === "earnings"    && <Placeholder label="Earnings"     icon={RiTrendingUpLine} />}
          {active === "profile"     && <Placeholder label="Profile"      icon={RiUserLine}       />}
        </main>
      </div>
    </div>
  );
};

export default AgentDashboard;