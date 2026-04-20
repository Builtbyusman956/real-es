// src/pages/dashboard/BuyerDashboard.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  RiHome4Line, RiSearchLine, RiHeart3Line,
  RiCalendarLine, RiFileListLine, RiUserLine,
  RiArrowLeftLine, RiLogoutBoxLine, RiAddCircleLine,
  RiShieldCheckFill, RiMapPinLine, RiTimeLine,
  RiCloseLine, RiMenuLine, RiCheckboxCircleLine,
} from "react-icons/ri";
import {
  MdBedroomParent, MdOutlineBathtub,
} from "react-icons/md";
import { useAuth } from "../../context/AuthContext";
import BuyerFeed from "./BuyerFeed";
import Messages from "./Messages";
import BuyerProfile from "./BuyerProfile";


// ─── Mock Data ────────────────────────────────────────────────────────────────
const BUYER = {
  name: "Chidi Nwosu", email: "chidi@example.com", avatar: "CN",
};

const SAVED = [
  { id: 1, title: "3 Bedroom Flat",  location: "Lekki Phase 1, Lagos", price: "₦2,500,000/yr", type: "Rent", beds: 3, baths: 2, verified: true,  image: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=800&q=80" },
  { id: 2, title: "Luxury Duplex",   location: "Maitama, Abuja",       price: "₦85,000,000",   type: "Sale", beds: 5, baths: 4, verified: true,  image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80" },
  { id: 3, title: "Mini Flat",       location: "Yaba, Lagos",          price: "₦900,000/yr",   type: "Rent", beds: 1, baths: 1, verified: false, image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80" },
];

const INSPECTIONS = [
  { id: 1, property: "3 Bedroom Flat, Lekki",  agent: "Emeka Okafor", date: "Tomorrow, 10:00 AM", status: "confirmed", image: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=400&q=80" },
  { id: 2, property: "Luxury Duplex, Abuja",   agent: "Fatima Bello", date: "Apr 11, 2:00 PM",    status: "pending",   image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=400&q=80" },
];

const SEARCHES = [
  { id: 1, query: "3 bedroom flat Lekki Lagos", time: "2 hours ago", results: 24 },
  { id: 2, query: "Land for sale Ibadan",        time: "Yesterday",   results: 11 },
  { id: 3, query: "Mini flat Yaba under ₦1m",    time: "2 days ago",  results: 8  },
];

// ─── Nav items ────────────────────────────────────────────────────────────────
const NAV_ITEMS = [
  { id: "overview",    label: "Overview",     icon: RiHome4Line    },
  { id: "feed",        label: "Feed",         icon: RiSearchLine   },
  { id: "saved",       label: "Saved",        icon: RiHeart3Line   },
  { id: "inspections", label: "Inspections",  icon: RiCalendarLine },
  { id: "searches",    label: "Searches",     icon: RiSearchLine   },
  { id: "messages",    label: "Messages",     icon: RiUserLine     },
  { id: "requests",    label: "My Requests",  icon: RiFileListLine },
];

// ─── Top Navbar ───────────────────────────────────────────────────────────────
const DashboardTopbar = ({ active, sidebarOpen, setSidebarOpen }) => {
  const navigate   = useNavigate();
  const { logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  return (
    <header className="h-14 bg-[#0A1628] border-b border-[#1A2E4A] flex items-center justify-between px-4 sm:px-6 sticky top-0 z-30">
      <div className="flex items-center gap-3">
        <button onClick={() => setSidebarOpen((v) => !v)}
          className="md:hidden w-8 h-8 rounded-lg bg-[#1A2E4A] flex items-center justify-center text-[#8A9BB5] hover:text-white transition">
          {sidebarOpen ? <RiCloseLine size={18} /> : <RiMenuLine size={18} />}
        </button>

        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-[#C9A84C] flex items-center justify-center">
            <span className="text-[#0A1628] font-black text-xs">N</span>
          </div>
          <div className="hidden sm:block">
            <p className="text-[#F7F4EF] font-bold text-sm leading-none">NRET</p>
            <p className="text-[#8A9BB5] text-[8px] uppercase tracking-widest font-semibold">Buyer Portal</p>
          </div>
        </div>

        <div className="hidden sm:block h-4 w-px bg-[#1A2E4A] mx-1" />
        <p className="hidden sm:block text-[#8A9BB5] text-sm font-medium capitalize">{active}</p>
      </div>

      <div className="flex items-center gap-2">
        <button onClick={() => navigate("/")}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#1A2E4A] hover:border-[#C9A84C]/40 text-[#8A9BB5] hover:text-[#C9A84C] text-xs font-medium transition duration-200">
          <RiArrowLeftLine size={14} />
          <span className="hidden sm:block">Back to Home</span>
        </button>

        <button
          className="flex items-center gap-1.5 bg-[#C9A84C] hover:bg-[#b8943d] active:scale-95 text-[#0A1628] text-xs font-bold px-3 py-1.5 rounded-lg transition duration-200">
          <RiAddCircleLine size={14} />
          <span className="hidden sm:block">Post Request</span>
        </button>

        <div className="flex items-center gap-2 bg-[#1A2E4A] pl-2 pr-3 py-1.5 rounded-lg">
          <div className="w-6 h-6 rounded-md bg-[#C9A84C] flex items-center justify-center text-[#0A1628] font-bold text-[10px]">
            {BUYER.avatar}
          </div>
          <span className="text-[#F7F4EF] text-xs font-semibold hidden sm:block">
            {BUYER.name.split(" ")[0]}
          </span>
        </div>

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

      {/* Buyer info */}
      <div className="px-4 py-4 border-b border-[#1A2E4A]">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#C9A84C] flex items-center justify-center text-[#0A1628] font-bold text-sm flex-shrink-0">
            {BUYER.avatar}
          </div>
          <div className="min-w-0">
            <p className="text-[#F7F4EF] text-sm font-bold truncate">{BUYER.name}</p>
            <span className="flex items-center gap-1 text-[#C9A84C] text-[10px] font-semibold">
              <RiShieldCheckFill size={10} /> Verified Buyer
            </span>
          </div>
        </div>
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

      {/* Quick stats */}
      <div className="px-3 py-3 border-t border-[#1A2E4A]">
        <div className="bg-[#1A2E4A] rounded-xl p-3">
          <p className="text-[#8A9BB5] text-[10px] font-semibold uppercase tracking-widest mb-2">Summary</p>
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <span className="text-[#8A9BB5] text-xs">Saved</span>
              <span className="text-[#C9A84C] text-xs font-bold">{SAVED.length}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[#8A9BB5] text-xs">Inspections</span>
              <span className="text-[#C9A84C] text-xs font-bold">{INSPECTIONS.length}</span>
            </div>
          </div>
        </div>
      </div>
    </aside>
  </>
);

// ─── Overview ─────────────────────────────────────────────────────────────────
const Overview = ({ setActive, navigate }) => (
  <div className="flex flex-col gap-5">
    {/* Welcome */}
    <div className="bg-[#0A1628] rounded-2xl p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 relative overflow-hidden">
      <div className="absolute -right-6 -top-6 w-28 h-28 rounded-full border border-[#C9A84C]/10 pointer-events-none" />
      <div className="relative z-10">
        <p className="text-[#C9A84C] text-xs font-bold uppercase tracking-widest mb-1">Welcome back</p>
        <h2 className="text-[#F7F4EF] text-xl font-bold">{BUYER.name} 👋</h2>
        <p className="text-[#8A9BB5] text-sm mt-0.5">Find your perfect property safely.</p>
      </div>
      <button onClick={() => navigate("/browse")}
        className="relative z-10 flex items-center gap-2 bg-[#C9A84C] hover:bg-[#b8943d] active:scale-95 text-[#0A1628] px-5 py-2.5 rounded-xl text-sm font-bold transition duration-200 flex-shrink-0">
        <RiSearchLine size={15} /> Browse Properties
      </button>
    </div>

    {/* Quick stats */}
    <div className="grid grid-cols-3 gap-4">
      {[
        { label: "Saved",        value: SAVED.length,        icon: RiHeart3Line,   tab: "saved",        color: "bg-red-50 text-red-500"    },
        { label: "Inspections",  value: INSPECTIONS.length,  icon: RiCalendarLine, tab: "inspections",  color: "bg-blue-50 text-blue-600"  },
        { label: "Searches",     value: SEARCHES.length,     icon: RiSearchLine,   tab: "searches",     color: "bg-purple-50 text-purple-600" },
      ].map(({ label, value, icon: Icon, tab, color }) => (
        <button key={label} onClick={() => setActive(tab)}
          className="bg-white rounded-2xl border border-[#E0D9CF] p-4 hover:border-[#C9A84C]/40 hover:shadow-md transition-all duration-200 text-left group">
          <div className={`w-9 h-9 rounded-xl flex items-center justify-center mb-3 ${color} group-hover:bg-[#C9A84C] group-hover:text-[#0A1628] transition-colors duration-200`}>
            <Icon size={16} />
          </div>
          <p className="text-2xl font-bold text-[#0A1628]">{value}</p>
          <p className="text-xs text-[#6B7280] mt-0.5">{label}</p>
        </button>
      ))}
    </div>

    {/* Saved preview */}
    <div className="bg-white rounded-2xl border border-[#E0D9CF] overflow-hidden">
      <div className="px-5 py-3.5 border-b border-[#E0D9CF] flex items-center justify-between">
        <p className="font-bold text-[#0A1628] text-sm">Saved Properties</p>
        <button onClick={() => setActive("saved")}
          className="text-[#C9A84C] text-xs font-semibold hover:underline">View all →</button>
      </div>
      {SAVED.slice(0, 2).map((p) => (
        <div key={p.id} className="flex items-center gap-3 px-5 py-3 border-b border-[#E0D9CF] last:border-0 hover:bg-[#F7F4EF] transition">
          <img src={p.image} alt={p.title} className="w-12 h-12 rounded-xl object-cover flex-shrink-0" />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-[#0A1628] truncate">{p.title}</p>
            <p className="text-xs text-[#6B7280] flex items-center gap-1 mt-0.5">
              <RiMapPinLine size={10} /> {p.location}
            </p>
          </div>
          <div className="text-right flex-shrink-0">
            <p className="text-sm font-bold text-[#0A1628]">{p.price}</p>
            <span className="text-[10px] bg-[#E8D5A3] text-[#0A1628] font-semibold px-2 py-0.5 rounded-full">
              {p.type}
            </span>
          </div>
        </div>
      ))}
    </div>

    {/* Next inspection */}
    {INSPECTIONS[0] && (
      <div className="bg-white rounded-2xl border border-[#E0D9CF] overflow-hidden">
        <div className="px-5 py-3.5 border-b border-[#E0D9CF] flex items-center justify-between">
          <p className="font-bold text-[#0A1628] text-sm">Next Inspection</p>
          <button onClick={() => setActive("inspections")}
            className="text-[#C9A84C] text-xs font-semibold hover:underline">View all →</button>
        </div>
        <div className="flex items-center gap-3 px-5 py-4">
          <img src={INSPECTIONS[0].image} alt="" className="w-14 h-14 rounded-xl object-cover flex-shrink-0" />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-[#0A1628] truncate">{INSPECTIONS[0].property}</p>
            <p className="text-xs text-[#6B7280] flex items-center gap-1 mt-0.5">
              <RiUserLine size={10} /> Agent: {INSPECTIONS[0].agent}
            </p>
            <p className="text-xs text-[#C9A84C] font-medium flex items-center gap-1 mt-0.5">
              <RiTimeLine size={10} /> {INSPECTIONS[0].date}
            </p>
          </div>
          <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-[#0A1628] text-[#C9A84C]">
            {INSPECTIONS[0].status}
          </span>
        </div>
      </div>
    )}
  </div>
);

// ─── Saved Tab ────────────────────────────────────────────────────────────────
const SavedTab = ({ navigate }) => {
  const [saved, setSaved] = useState(SAVED);
  return (
    <div className="flex flex-col gap-4">
      <p className="text-sm text-[#6B7280]">{saved.length} saved properties</p>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {saved.map((p) => (
          <div key={p.id} className="bg-white rounded-2xl border border-[#E0D9CF] overflow-hidden hover:border-[#C9A84C]/40 hover:shadow-lg transition-all duration-200 group">
            <div className="relative h-44 overflow-hidden">
              <img src={p.image} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute top-3 left-3 flex gap-1.5">
                <span className="bg-[#0A1628] text-[#C9A84C] text-[10px] font-bold px-2.5 py-1 rounded-full">{p.type}</span>
              </div>
              <button onClick={() => setSaved((prev) => prev.filter((s) => s.id !== p.id))}
                className="absolute top-3 right-3 w-7 h-7 bg-white/90 rounded-full flex items-center justify-center text-red-400 hover:bg-red-50 transition">
                ✕
              </button>
            </div>
            <div className="p-4">
              <h3 className="font-bold text-[#0A1628] text-sm mb-1">{p.title}</h3>
              <p className="text-xs text-[#6B7280] flex items-center gap-1 mb-2">
                <RiMapPinLine size={10} /> {p.location}
              </p>
              {p.beds && (
                <div className="flex gap-3 mb-3">
                  <span className="text-xs text-[#6B7280] flex items-center gap-1"><MdBedroomParent size={11} /> {p.beds} Beds</span>
                  <span className="text-xs text-[#6B7280] flex items-center gap-1"><MdOutlineBathtub size={11} /> {p.baths} Baths</span>
                </div>
              )}
              <div className="flex items-center justify-between pt-3 border-t border-[#E0D9CF]">
                <p className="text-[#0A1628] font-bold text-sm">{p.price}</p>
                <button onClick={() => navigate(`/property/${p.id}`)}
                  className="text-[#C9A84C] text-xs font-semibold hover:underline">View →</button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {saved.length === 0 && (
        <div className="flex flex-col items-center py-16 text-center">
          <RiHeart3Line size={32} className="text-[#C9A84C] mb-4" />
          <p className="text-[#0A1628] font-bold">No saved properties yet</p>
          <button onClick={() => navigate("/browse")}
            className="mt-4 bg-[#C9A84C] hover:bg-[#b8943d] text-[#0A1628] font-bold px-5 py-2.5 rounded-xl text-sm transition">
            Browse Properties
          </button>
        </div>
      )}
    </div>
  );
};

// ─── Inspections Tab ──────────────────────────────────────────────────────────
const InspectionsTab = () => (
  <div className="flex flex-col gap-4">
    <p className="text-sm text-[#6B7280]">{INSPECTIONS.length} scheduled inspections</p>
    {INSPECTIONS.map((ins) => (
      <div key={ins.id} className="bg-white rounded-2xl border border-[#E0D9CF] overflow-hidden hover:border-[#C9A84C]/30 transition">
        <div className="flex items-start gap-4 p-4 sm:p-5">
          <img src={ins.image} alt="" className="w-16 h-16 rounded-xl object-cover flex-shrink-0" />
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2 flex-wrap">
              <h3 className="font-bold text-[#0A1628] text-sm">{ins.property}</h3>
              <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full flex-shrink-0
                ${ins.status === "confirmed" ? "bg-[#0A1628] text-[#C9A84C]" : "bg-[#E8D5A3] text-[#6B7280]"}`}>
                {ins.status}
              </span>
            </div>
            <p className="text-xs text-[#6B7280] mt-1">Agent: <span className="font-semibold text-[#0A1628]">{ins.agent}</span></p>
            <p className="text-xs text-[#C9A84C] font-semibold mt-0.5">{ins.date}</p>
          </div>
        </div>
        <div className="px-4 pb-4 flex gap-2 border-t border-[#E0D9CF] pt-3">
          <button className="flex-1 border border-[#E0D9CF] hover:border-[#C9A84C]/40 text-[#6B7280] text-xs font-semibold py-2 rounded-xl transition">Reschedule</button>
          <button className="flex-1 border border-red-200 hover:bg-red-50 text-red-400 text-xs font-semibold py-2 rounded-xl transition">Cancel</button>
        </div>
      </div>
    ))}
  </div>
);

// ─── Searches Tab ─────────────────────────────────────────────────────────────
const SearchesTab = ({ navigate }) => (
  <div className="flex flex-col gap-3">
    <p className="text-sm text-[#6B7280]">{SEARCHES.length} recent searches</p>
    {SEARCHES.map((s) => (
      <button key={s.id}
        onClick={() => navigate(`/browse?q=${encodeURIComponent(s.query)}`)}
        className="bg-white rounded-2xl border border-[#E0D9CF] px-5 py-4 flex items-center justify-between gap-3 hover:border-[#C9A84C]/40 hover:shadow-md transition-all text-left group w-full">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-9 h-9 rounded-xl bg-[#F7F4EF] border border-[#E0D9CF] flex items-center justify-center flex-shrink-0 group-hover:bg-[#E8D5A3] transition">
            <RiSearchLine size={15} className="text-[#C9A84C]" />
          </div>
          <div className="min-w-0">
            <p className="text-sm font-semibold text-[#0A1628] truncate">{s.query}</p>
            <p className="text-xs text-[#6B7280] mt-0.5">{s.results} results • {s.time}</p>
          </div>
        </div>
      </button>
    ))}
  </div>
);

// ─── Placeholder ──────────────────────────────────────────────────────────────
const Placeholder = ({ label, icon: Icon = RiTimeLine }) => (
  <div className="flex flex-col items-center justify-center py-24 text-center">
    <div className="w-16 h-16 rounded-2xl bg-[#E8D5A3]/40 border border-[#C9A84C]/20 flex items-center justify-center mb-4">
      <Icon size={28} className="text-[#C9A84C]" />
    </div>
    <p className="text-[#0A1628] font-bold text-lg">{label}</p>
    <p className="text-[#6B7280] text-sm mt-1 max-w-xs">This section is being built.</p>
  </div>
);

// ─── Main ─────────────────────────────────────────────────────────────────────
const BuyerDashboard = () => {
  const navigate = useNavigate();
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
          {active === "overview"    && <Overview     setActive={setActive} navigate={navigate} />}
          {active === "feed"        && <BuyerFeed />}
          {active === "saved"       && <SavedTab     navigate={navigate} />}
          {active === "inspections" && <InspectionsTab />}
          {active === "searches"    && <SearchesTab  navigate={navigate} />}
          {active === "messages"    && <Messages />}
          {active === "requests"    && <Placeholder  label="My Requests" icon={RiFileListLine} />}
          {active === "profile" && <BuyerProfile />}

        </main>
      </div>
    </div>
  );
};

export default BuyerDashboard;