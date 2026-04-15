// src/pages/dashboard/AgentDashboard.jsx
import { useState } from "react";
import {
  ShieldCheck, Home, Eye, TrendingUp, Clock, CheckCircle,
  AlertTriangle, Plus, ChevronRight, MapPin,
  Calendar, FileText, User, Settings, Rss, MessageCircle
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import AgentFeed from "./AgentFeed";
import Messages from "./Messages";

// ─── Mock Data ────────────────────────────────────────────────────────────────
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
  { label: "Active Listings",     value: "12",       icon: Home,       trend: "+2 this week"        },
  { label: "Total Views",         value: "1,340",    icon: Eye,        trend: "+180 this week"      },
  { label: "Earnings (₦)",        value: "₦480,000", icon: TrendingUp, trend: "+₦60,000 this month" },
  { label: "Pending Inspections", value: "4",        icon: Calendar,   trend: "2 this week"         },
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

// ─── Sidebar nav items ────────────────────────────────────────────────────────
const NAV = [
  { icon: Home,          label: "Overview",     id: "overview"     },
  { icon: Rss,           label: "Feed",         id: "feed"         },
  { icon: FileText,      label: "My Listings",  id: "listings"     },
  { icon: Calendar,      label: "Inspections",  id: "inspections"  },
  { icon: MessageCircle, label: "Messages",     id: "messages"     },
  { icon: TrendingUp,    label: "Earnings",     id: "earnings"     },
  { icon: User,          label: "Profile",      id: "profile"      },
  { icon: ShieldCheck,   label: "Verification", id: "verification", external: true },
  { icon: Settings,      label: "Settings",     id: "settings",     external: true },
];

// ─── Verification Banner ──────────────────────────────────────────────────────
const VerificationBanner = () => (
  <div className="bg-gradient-to-r from-[#C9A84C]/15 to-[#E8D5A3]/10 border border-[#C9A84C]/30 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4">
    <div className="w-10 h-10 rounded-xl bg-[#C9A84C]/20 flex items-center justify-center flex-shrink-0">
      <AlertTriangle size={20} className="text-[#C9A84C]" />
    </div>
    <div className="flex-1">
      <p className="text-[#0A1628] font-bold text-sm">Complete Your Agent Verification</p>
      <p className="text-[#6B7280] text-xs mt-0.5 leading-relaxed">
        Upload your ID, BVN, and office address to get your verified badge and unlock full features.
      </p>
      <div className="flex gap-2 mt-3 flex-wrap">
        {[
          { label: "ID Upload",   done: true  },
          { label: "BVN",         done: false },
          { label: "Face Verify", done: false },
          { label: "Office Addr", done: true  },
        ].map(({ label, done }) => (
          <span key={label}
            className={`text-[10px] font-semibold px-2.5 py-1 rounded-full flex items-center gap-1
              ${done ? "bg-[#0A1628] text-[#C9A84C]" : "bg-[#E0D9CF] text-[#6B7280]"}`}>
            {done ? <CheckCircle size={10} /> : <Clock size={10} />} {label}
          </span>
        ))}
      </div>
    </div>
    <button className="bg-[#C9A84C] hover:bg-[#b8943d] active:scale-95 text-[#0A1628] text-xs font-bold px-4 py-2.5 rounded-xl transition duration-200 flex-shrink-0 whitespace-nowrap">
      Complete Now
    </button>
  </div>
);

// ─── Sidebar ──────────────────────────────────────────────────────────────────
const Sidebar = ({ active, setActive, open, setOpen, navigate }) => (
  <>
    {open && <div className="fixed inset-0 bg-black/50 z-20 md:hidden" onClick={() => setOpen(false)} />}
    <aside className={`fixed top-0 left-0 h-screen w-60 bg-[#0A1628] z-30 flex flex-col transition-transform duration-300
      ${open ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 md:static md:z-auto`}>

      <div className="px-5 py-4 border-b border-[#1A2E4A]">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#C9A84C] flex items-center justify-center text-[#0A1628] font-bold text-sm flex-shrink-0">
            {AGENT.avatar}
          </div>
          <div className="min-w-0">
            <p className="text-[#F7F4EF] text-sm font-semibold truncate">{AGENT.name}</p>
            <div className="flex items-center gap-1 mt-0.5">
              {AGENT.verified ? (
                <span className="flex items-center gap-1 text-[#C9A84C] text-[10px] font-semibold">
                  <ShieldCheck size={10} /> Verified Agent
                </span>
              ) : (
                <span className="text-yellow-400 text-[10px] font-semibold flex items-center gap-1">
                  <AlertTriangle size={10} /> Unverified
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      <nav className="flex-1 px-3 py-4 flex flex-col gap-1 overflow-y-auto">
        {NAV.map(({ icon: Icon, label, id, external }) => (
          <button key={id} onClick={() => { 
              if (external) {
                navigate(`/dashboard/agent/${id}`);
              } else {
                setActive(id); 
              }
              setOpen(false); 
            }}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 w-full text-left
              ${active === id && !external
                ? "bg-[#C9A84C] text-[#0A1628]"
                : "text-[#8A9BB5] hover:bg-[#1A2E4A] hover:text-[#F7F4EF]"}`}>
            <Icon size={17} /> {label}
          </button>
        ))}
      </nav>
    </aside>
  </>
);

// ─── Overview Tab ─────────────────────────────────────────────────────────────
const OverviewTab = ({ setActive }) => (
  <div className="flex flex-col gap-6">
    {!AGENT.verified && <VerificationBanner />}

    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {STATS.map(({ label, value, icon: Icon, trend }) => (
        <div key={label} className="bg-white rounded-2xl border border-[#E0D9CF] p-4 hover:border-[#C9A84C]/40 hover:shadow-md transition-all duration-200">
          <div className="flex items-center justify-between mb-3">
            <p className="text-xs font-semibold text-[#6B7280] uppercase tracking-wide leading-tight">{label}</p>
            <div className="w-8 h-8 rounded-lg bg-[#0A1628] flex items-center justify-center flex-shrink-0">
              <Icon size={15} className="text-[#C9A84C]" />
            </div>
          </div>
          <p className="text-2xl font-bold text-[#0A1628]">{value}</p>
          <p className="text-[10px] text-[#C9A84C] font-medium mt-1">{trend}</p>
        </div>
      ))}
    </div>

    <div className="grid lg:grid-cols-2 gap-6">
      <div className="bg-white rounded-2xl border border-[#E0D9CF] overflow-hidden">
        <div className="px-5 py-4 border-b border-[#E0D9CF] flex items-center justify-between">
          <p className="font-bold text-[#0A1628] text-sm">Recent Listings</p>
          <button onClick={() => setActive("listings")}
            className="text-[#C9A84C] text-xs font-semibold flex items-center gap-1 hover:underline">
            View all <ChevronRight size={13} />
          </button>
        </div>
        <div className="flex flex-col divide-y divide-[#E0D9CF]">
          {LISTINGS.map((l) => (
            <div key={l.id} className="flex items-center gap-3 px-5 py-3 hover:bg-[#F7F4EF] transition">
              <img src={l.image} alt={l.title} className="w-12 h-12 rounded-xl object-cover flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-[#0A1628] truncate">{l.title}</p>
                <p className="text-xs text-[#6B7280] flex items-center gap-1 mt-0.5"><MapPin size={10} /> {l.location}</p>
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
      </div>

      <div className="bg-white rounded-2xl border border-[#E0D9CF] overflow-hidden">
        <div className="px-5 py-4 border-b border-[#E0D9CF] flex items-center justify-between">
          <p className="font-bold text-[#0A1628] text-sm">Upcoming Inspections</p>
          <button onClick={() => setActive("inspections")}
            className="text-[#C9A84C] text-xs font-semibold flex items-center gap-1 hover:underline">
            View all <ChevronRight size={13} />
          </button>
        </div>
        <div className="flex flex-col divide-y divide-[#E0D9CF]">
          {INSPECTIONS.map((ins) => (
            <div key={ins.id} className="px-5 py-3 hover:bg-[#F7F4EF] transition">
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-[#0A1628] truncate">{ins.property}</p>
                  <p className="text-xs text-[#6B7280] flex items-center gap-1 mt-0.5"><User size={10} /> {ins.buyer}</p>
                  <p className="text-xs text-[#C9A84C] font-medium flex items-center gap-1 mt-0.5"><Clock size={10} /> {ins.date}</p>
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
    </div>

    <div className="bg-[#0A1628] rounded-2xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
      <div>
        <p className="text-[#F7F4EF] font-bold">Ready to add a new property?</p>
        <p className="text-[#8A9BB5] text-sm mt-0.5">List it now and reach thousands of verified buyers.</p>
      </div>
      <button className="flex items-center gap-2 bg-[#C9A84C] hover:bg-[#b8943d] active:scale-95 text-[#0A1628] px-5 py-2.5 rounded-xl text-sm font-bold transition duration-200 flex-shrink-0">
        <Plus size={16} /> Add New Listing
      </button>
    </div>
  </div>
);

// ─── Placeholder Tab ──────────────────────────────────────────────────────────
const PlaceholderTab = ({ label }) => (
  <div className="flex flex-col items-center justify-center py-24 text-center">
    <div className="w-16 h-16 rounded-2xl bg-[#E8D5A3]/40 border border-[#C9A84C]/20 flex items-center justify-center mb-4">
      <Clock size={28} className="text-[#C9A84C]" />
    </div>
    <p className="text-[#0A1628] font-bold text-lg">{label} Coming Soon</p>
    <p className="text-[#6B7280] text-sm mt-1 max-w-xs">This section is being built. Check back soon.</p>
  </div>
);

// ─── Main ─────────────────────────────────────────────────────────────────────
const AgentDashboard = () => {
  const navigate = useNavigate();
  const [active,      setActive]      = useState("overview");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#F7F4EF]">
      <div className="flex h-screen">
        <Sidebar active={active} setActive={setActive} open={sidebarOpen} setOpen={setSidebarOpen} navigate={navigate} />

        <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
          <div className="md:hidden bg-white border-b border-[#E0D9CF] px-4 py-3 flex items-center gap-3">
            <button onClick={() => setSidebarOpen(true)}
              className="w-9 h-9 rounded-xl border border-[#E0D9CF] flex items-center justify-center text-[#0A1628]">
              <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <line x1="3" y1="6" x2="15" y2="6"/><line x1="3" y1="12" x2="15" y2="12"/>
              </svg>
            </button>
            <p className="text-sm font-bold text-[#0A1628] capitalize">{active}</p>
          </div>

          <main className="flex-1 overflow-y-auto p-5 sm:p-6">
            {active === "overview"     && <OverviewTab setActive={setActive} />}
            {active === "feed"         && <AgentFeed />}
            {active === "listings"     && <PlaceholderTab label="My Listings" />}
            {active === "inspections"  && <PlaceholderTab label="Inspections" />}
            {active === "messages"     && <Messages />}
            {active === "earnings"     && <PlaceholderTab label="Earnings" />}
            {active === "profile"      && <PlaceholderTab label="Profile" />}
          </main>
        </div>
      </div>
    </div>
  );
};

export default AgentDashboard;