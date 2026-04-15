// src/pages/dashboard/BuyerDashboard.jsx
import { useState } from "react";
import {
  Heart, Calendar, Search, Home, Bell,
  MapPin, Bed, Bath, Clock, ChevronRight,
  ShieldCheck, User, Trash2, Rss, MessageCircle
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import BuyerFeed from "./BuyerFeed";
import Messages from "./Messages";

// ─── Mock Data ────────────────────────────────────────────────────────────────
const BUYER = {
  name: "Chidi Nwosu",
  email: "chidi@example.com",
  avatar: "CN",
};

const SAVED = [
  {
    id: 1, title: "3 Bedroom Flat", location: "Lekki Phase 1, Lagos",
    price: "₦2,500,000/yr", type: "Rent", beds: 3, baths: 2, verified: true,
    image: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 2, title: "Luxury Duplex", location: "Maitama, Abuja",
    price: "₦85,000,000", type: "Sale", beds: 5, baths: 4, verified: true,
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 3, title: "Mini Flat", location: "Yaba, Lagos",
    price: "₦900,000/yr", type: "Rent", beds: 1, baths: 1, verified: true,
    image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80",
  },
];

const INSPECTIONS = [
  {
    id: 1, property: "3 Bedroom Flat, Lekki", agent: "Emeka Okafor",
    date: "Tomorrow, 10:00 AM", status: "confirmed",
    image: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: 2, property: "Luxury Duplex, Abuja", agent: "Fatima Bello",
    date: "Apr 11, 2:00 PM", status: "pending",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=400&q=80",
  },
];

const SEARCHES = [
  { id: 1, query: "3 bedroom flat Lekki Lagos",  time: "2 hours ago", results: 24 },
  { id: 2, query: "Land for sale Ibadan",         time: "Yesterday",   results: 11 },
  { id: 3, query: "Mini flat Yaba under ₦1m",     time: "2 days ago",  results: 8  },
  { id: 4, query: "Duplex Abuja Maitama",          time: "3 days ago",  results: 5  },
];

// ─── Tabs ─────────────────────────────────────────────────────────────────────
const TABS = [
  { id: "overview",    label: "Overview",    icon: Home     },
  { id: "feed",        label: "Feed",        icon: Rss      },
  { id: "saved",       label: "Saved",       icon: Heart    },
  { id: "inspections", label: "Inspections", icon: Calendar },
  { id: "searches",    label: "Searches",    icon: Search   },
  { id: "messages",    label: "Messages",    icon: MessageCircle },
];

// ─── Tab bar ──────────────────────────────────────────────────────────────────
const TabBar = ({ active, setActive }) => (
  <div className="bg-white border-b border-[#E0D9CF] px-4 sm:px-6 sticky top-0 z-10">
    <div className="flex gap-1 overflow-x-auto scrollbar-hide">
      {TABS.map(({ id, label, icon: Icon }) => (
        <button key={id} onClick={() => setActive(id)}
          className={`flex items-center gap-2 px-4 py-3.5 text-sm font-medium whitespace-nowrap border-b-2 transition-all duration-200
            ${active === id
              ? "border-[#C9A84C] text-[#0A1628]"
              : "border-transparent text-[#6B7280] hover:text-[#0A1628]"}`}>
          <Icon size={15} />
          {label}
        </button>
      ))}
    </div>
  </div>
);

// ─── Overview Tab ─────────────────────────────────────────────────────────────
const OverviewTab = ({ setActive, navigate }) => (
  <div className="flex flex-col gap-6">
    {/* Welcome banner */}
    <div className="bg-[#0A1628] rounded-2xl p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 relative overflow-hidden">
      <div className="absolute -right-8 -top-8 w-32 h-32 rounded-full border border-[#C9A84C]/10 pointer-events-none" />
      <div className="relative z-10">
        <p className="text-[#C9A84C] text-xs font-bold uppercase tracking-widest mb-1">Welcome back</p>
        <h2 className="text-[#F7F4EF] text-xl sm:text-2xl font-bold">{BUYER.name} 👋</h2>
        <p className="text-[#8A9BB5] text-sm mt-1">Find your perfect property safely and securely.</p>
      </div>
      <button onClick={() => navigate("/browse")}
        className="relative z-10 flex items-center gap-2 bg-[#C9A84C] hover:bg-[#b8943d] active:scale-95 text-[#0A1628] px-5 py-2.5 rounded-xl text-sm font-bold transition duration-200 flex-shrink-0">
        <Search size={15} /> Browse Properties
      </button>
    </div>

    {/* Quick stats */}
    <div className="grid grid-cols-4 gap-3 sm:gap-4">
      {[
        { label: "Feed",        value: "New",            icon: Rss,      tab: "feed"        },
        { label: "Saved",       value: SAVED.length,     icon: Heart,    tab: "saved"       },
        { label: "Inspections", value: INSPECTIONS.length, icon: Calendar, tab: "inspections" },
        { label: "Searches",    value: SEARCHES.length,  icon: Search,   tab: "searches"    },
      ].map(({ label, value, icon: Icon, tab }) => (
        <button key={label} onClick={() => setActive(tab)}
          className="bg-white rounded-2xl border border-[#E0D9CF] p-4 hover:border-[#C9A84C]/40 hover:shadow-md transition-all duration-200 text-left group">
          <div className="w-9 h-9 rounded-xl bg-[#0A1628] flex items-center justify-center mb-3 group-hover:bg-[#C9A84C] transition-colors duration-200">
            <Icon size={16} className="text-[#C9A84C] group-hover:text-[#0A1628] transition-colors duration-200" />
          </div>
          <p className="text-2xl font-bold text-[#0A1628]">{value}</p>
          <p className="text-[10px] sm:text-xs text-[#6B7280] mt-0.5 leading-tight">{label}</p>
        </button>
      ))}
    </div>

    {/* Saved preview */}
    <div className="bg-white rounded-2xl border border-[#E0D9CF] overflow-hidden">
      <div className="px-5 py-4 border-b border-[#E0D9CF] flex items-center justify-between">
        <p className="font-bold text-[#0A1628] text-sm">Saved Properties</p>
        <button onClick={() => setActive("saved")}
          className="text-[#C9A84C] text-xs font-semibold flex items-center gap-1 hover:underline">
          View all <ChevronRight size={13} />
        </button>
      </div>
      <div className="divide-y divide-[#E0D9CF]">
        {SAVED.slice(0, 2).map((p) => (
          <div key={p.id} className="flex items-center gap-3 px-5 py-3 hover:bg-[#F7F4EF] transition">
            <img src={p.image} alt={p.title} className="w-14 h-14 rounded-xl object-cover flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-[#0A1628] truncate">{p.title}</p>
              <p className="text-xs text-[#6B7280] flex items-center gap-1 mt-0.5">
                <MapPin size={10} /> {p.location}
              </p>
            </div>
            <div className="text-right flex-shrink-0">
              <p className="text-sm font-bold text-[#0A1628]">{p.price}</p>
              <span className="text-[10px] bg-[#E8D5A3] text-[#0A1628] font-semibold px-2 py-0.5 rounded-full">{p.type}</span>
            </div>
          </div>
        ))}
      </div>
    </div>

    {/* Next inspection */}
    <div className="bg-white rounded-2xl border border-[#E0D9CF] overflow-hidden">
      <div className="px-5 py-4 border-b border-[#E0D9CF] flex items-center justify-between">
        <p className="font-bold text-[#0A1628] text-sm">Next Inspection</p>
        <button onClick={() => setActive("inspections")}
          className="text-[#C9A84C] text-xs font-semibold flex items-center gap-1 hover:underline">
          View all <ChevronRight size={13} />
        </button>
      </div>
      {INSPECTIONS[0] && (
        <div className="flex items-center gap-3 px-5 py-4">
          <img src={INSPECTIONS[0].image} alt="" className="w-14 h-14 rounded-xl object-cover flex-shrink-0" />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-[#0A1628] truncate">{INSPECTIONS[0].property}</p>
            <p className="text-xs text-[#6B7280] flex items-center gap-1 mt-0.5">
              <User size={10} /> Agent: {INSPECTIONS[0].agent}
            </p>
            <p className="text-xs text-[#C9A84C] font-medium flex items-center gap-1 mt-0.5">
              <Clock size={10} /> {INSPECTIONS[0].date}
            </p>
          </div>
          <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-[#0A1628] text-[#C9A84C] flex-shrink-0">
            {INSPECTIONS[0].status}
          </span>
        </div>
      )}
    </div>
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
                {p.verified && (
                  <span className="bg-[#C9A84C] text-[#0A1628] text-[10px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1">
                    <ShieldCheck size={9} /> Verified
                  </span>
                )}
              </div>
              <button onClick={() => setSaved((prev) => prev.filter((s) => s.id !== p.id))}
                className="absolute top-3 right-3 w-7 h-7 bg-white/90 rounded-full flex items-center justify-center text-red-400 hover:bg-red-50 transition">
                <Trash2 size={13} />
              </button>
            </div>
            <div className="p-4">
              <h3 className="font-bold text-[#0A1628] text-sm mb-1">{p.title}</h3>
              <p className="text-xs text-[#6B7280] flex items-center gap-1 mb-2"><MapPin size={10} /> {p.location}</p>
              {p.beds && (
                <div className="flex gap-3 mb-3">
                  <span className="text-xs text-[#6B7280] flex items-center gap-1"><Bed size={11} /> {p.beds} Beds</span>
                  <span className="text-xs text-[#6B7280] flex items-center gap-1"><Bath size={11} /> {p.baths} Baths</span>
                </div>
              )}
              <div className="flex items-center justify-between pt-3 border-t border-[#E0D9CF]">
                <p className="text-[#0A1628] font-bold text-sm">{p.price}</p>
                <button onClick={() => navigate(`/property/${p.id}`)}
                  className="text-[#C9A84C] text-xs font-semibold flex items-center gap-1 hover:underline">
                  View <ChevronRight size={12} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {saved.length === 0 && (
        <div className="flex flex-col items-center py-16 text-center">
          <Heart size={32} className="text-[#C9A84C] mb-4" />
          <p className="text-[#0A1628] font-bold">No saved properties yet</p>
          <p className="text-[#6B7280] text-sm mt-1">Browse properties and save them here.</p>
          <button onClick={() => navigate("/browse")}
            className="mt-4 bg-[#C9A84C] hover:bg-[#b8943d] text-[#0A1628] font-bold px-5 py-2.5 rounded-xl text-sm transition duration-200">
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
      <div key={ins.id} className="bg-white rounded-2xl border border-[#E0D9CF] overflow-hidden hover:border-[#C9A84C]/30 transition-all duration-200">
        <div className="flex items-start gap-4 p-4 sm:p-5">
          <img src={ins.image} alt="" className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl object-cover flex-shrink-0" />
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2 flex-wrap">
              <h3 className="font-bold text-[#0A1628] text-sm">{ins.property}</h3>
              <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full flex-shrink-0
                ${ins.status === "confirmed" ? "bg-[#0A1628] text-[#C9A84C]" : "bg-[#E8D5A3] text-[#6B7280]"}`}>
                {ins.status}
              </span>
            </div>
            <p className="text-xs text-[#6B7280] flex items-center gap-1 mt-1.5">
              <User size={11} /> Agent: <span className="font-semibold text-[#0A1628]">{ins.agent}</span>
            </p>
            <p className="text-xs text-[#C9A84C] font-semibold flex items-center gap-1 mt-1">
              <Clock size={11} /> {ins.date}
            </p>
          </div>
        </div>
        <div className="px-4 sm:px-5 pb-4 flex gap-2 border-t border-[#E0D9CF] pt-3">
          <button className="flex-1 border border-[#E0D9CF] hover:border-[#C9A84C]/40 text-[#6B7280] hover:text-[#0A1628] text-xs font-semibold py-2 rounded-xl transition duration-200">
            Reschedule
          </button>
          <button className="flex-1 border border-red-200 hover:bg-red-50 text-red-400 text-xs font-semibold py-2 rounded-xl transition duration-200">
            Cancel
          </button>
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
        className="bg-white rounded-2xl border border-[#E0D9CF] px-5 py-4 flex items-center justify-between gap-3 hover:border-[#C9A84C]/40 hover:shadow-md transition-all duration-200 text-left group w-full">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-9 h-9 rounded-xl bg-[#F7F4EF] border border-[#E0D9CF] flex items-center justify-center flex-shrink-0 group-hover:bg-[#E8D5A3] transition">
            <Search size={15} className="text-[#C9A84C]" />
          </div>
          <div className="min-w-0">
            <p className="text-sm font-semibold text-[#0A1628] truncate">{s.query}</p>
            <p className="text-xs text-[#6B7280] mt-0.5">{s.results} results • {s.time}</p>
          </div>
        </div>
        <ChevronRight size={15} className="text-[#C9A84C] flex-shrink-0 opacity-0 group-hover:opacity-100 transition" />
      </button>
    ))}
  </div>
);

// ─── Main ─────────────────────────────────────────────────────────────────────
const BuyerDashboard = () => {
  const navigate = useNavigate();
  const [active, setActive] = useState("overview");

  return (
    <div className="min-h-screen bg-[#F7F4EF]">
      <div>
        <TabBar active={active} setActive={setActive} />
        <main className="max-w-5xl w-full mx-auto px-4 sm:px-6 py-6">
          {active === "overview"    && <OverviewTab    setActive={setActive} navigate={navigate} />}
          {active === "feed"        && <BuyerFeed />}
          {active === "saved"       && <SavedTab       navigate={navigate} />}
          {active === "inspections" && <InspectionsTab />}
          {active === "searches"    && <SearchesTab    navigate={navigate} />}
          {active === "messages"    && <Messages />}
        </main>
      </div>
    </div>
  );
};

export default BuyerDashboard;