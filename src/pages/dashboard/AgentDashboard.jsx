// src/pages/dashboard/AgentDashboard.jsx
import { useState } from "react";
import {
  ShieldCheck, Home, Eye, TrendingUp, Clock, CheckCircle,
  AlertTriangle, Plus, ChevronRight, MapPin,
  Calendar, FileText, User, Settings, Rss, MessageCircle
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import AgentFeed from "./AgentFeed";
import Messages from "./Messages"; // Import Messages component

// ... (keep all existing mock data)

// ─── Sidebar nav items ────────────────────────────────────────────────────────
const NAV = [
  { icon: Home,        label: "Overview",       id: "overview"      },
  { icon: Rss,         label: "Feed",           id: "feed"          },
  { icon: FileText,    label: "My Listings",    id: "listings"      },
  { icon: Calendar,    label: "Inspections",    id: "inspections"   },
  { icon: MessageCircle, label: "Messages",     id: "messages"      }, // Add Messages
  { icon: TrendingUp,  label: "Earnings",       id: "earnings"      },
  { icon: User,        label: "Profile",        id: "profile"       },
  { icon: ShieldCheck, label: "Verification",   id: "verification"  },
  { icon: Settings,    label: "Settings",       id: "settings"      },
];

// ... (keep VerificationBanner, Sidebar, OverviewTab, PlaceholderTab components)

// ─── Main ─────────────────────────────────────────────────────────────────────
const AgentDashboard = () => {
  const [active,      setActive]      = useState("overview");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#F7F4EF]">
      <div className="pt-16 flex h-[calc(100vh-64px)]">
        <Sidebar active={active} setActive={setActive} open={sidebarOpen} setOpen={setSidebarOpen} />
        
        <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
          <div className="md:hidden bg-white border-b border-[#E0D9CF] px-4 py-3 flex items-center gap-3">
            <button onClick={() => setSidebarOpen(true)} className="w-9 h-9 rounded-xl border border-[#E0D9CF] flex items-center justify-center text-[#0A1628]">
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
            {active === "messages"     && <Messages />} {/* Add Messages rendering */}
            {active === "earnings"     && <PlaceholderTab label="Earnings" />}
            {active === "profile"      && <PlaceholderTab label="Profile" />}
            {active === "verification" && <PlaceholderTab label="Verification" />}
            {active === "settings"     && <PlaceholderTab label="Settings" />}
          </main>
        </div>
      </div>
    </div>
  );
};

export default AgentDashboard;