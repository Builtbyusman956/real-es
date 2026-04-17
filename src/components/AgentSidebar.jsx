import {
  Home, Rss, FileText, Calendar, MessageCircle,
  TrendingUp, User, ShieldCheck, Settings, AlertTriangle
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const NAV = [
  { icon: Home,          label: "Overview",     id: "overview"     },
  { icon: Rss,           label: "Feed",         id: "feed"         },
  { icon: FileText,      label: "My Listings",  id: "listings"     },
  { icon: Calendar,      label: "Inspections",  id: "inspections"  },
  { icon: MessageCircle, label: "Messages",     id: "messages"     },
  { icon: TrendingUp,    label: "Earnings",     id: "earnings"     },
  { icon: User,          label: "Profile",      id: "profile"      },
  { icon: ShieldCheck,   label: "Verification", id: "verification" },
  { icon: Settings,      label: "Settings",     id: "settings"     },
];

const AgentSidebar = ({ active, setActive, open, setOpen, agent, hidden }) => {
  const navigate = useNavigate();

  // ✅ When add listing overlay is open, hide sidebar completely
  if (hidden) return null;

  return (
    <>
      {open && (
        <div
          className="fixed inset-0 bg-black/50 z-20 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      <aside className={`fixed top-0 left-0 h-screen w-60 bg-[#0A1628] z-30 flex flex-col transition-transform duration-300
        ${open ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 md:static md:z-auto`}>

        {/* Logo */}
        <div className="px-5 py-4 border-b border-[#1A2E4A]">
          <button onClick={() => navigate("/")} className="flex items-center gap-2 group w-full">
            <div className="w-8 h-8 rounded-lg bg-[#C9A84C] flex items-center justify-center flex-shrink-0">
              <Home size={15} className="text-[#0A1628]" />
            </div>
            <span className="text-[#F7F4EF] text-sm font-bold group-hover:text-[#C9A84C] transition-colors">
              RealEstate
            </span>
          </button>
        </div>

        {/* Agent profile */}
        <div className="px-5 py-4 border-b border-[#1A2E4A]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#C9A84C] flex items-center justify-center text-[#0A1628] font-bold text-sm flex-shrink-0">
              {agent?.avatar || "AG"}
            </div>
            <div className="min-w-0">
              <p className="text-[#F7F4EF] text-sm font-semibold truncate">
                {agent?.name || "Agent"}
              </p>
              <span className="text-yellow-400 text-[10px] font-semibold flex items-center gap-1">
                <AlertTriangle size={10} /> Unverified
              </span>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 flex flex-col gap-1 overflow-y-auto">
          {NAV.map(({ icon: Icon, label, id }) => (
            <button
              key={id}
              onClick={() => { setActive(id); setOpen(false); }}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 w-full text-left
                ${active === id
                  ? "bg-[#C9A84C] text-[#0A1628]"
                  : "text-[#8A9BB5] hover:bg-[#1A2E4A] hover:text-[#F7F4EF]"}`}>
              <Icon size={17} />
              {label}
            </button>
          ))}
        </nav>
      </aside>
    </>
  );
};

export default AgentSidebar;