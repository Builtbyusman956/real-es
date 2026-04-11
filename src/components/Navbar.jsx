// src/components/Navbar.jsx
import { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  RiMenuLine,
  RiCloseLine,
  RiShieldCheckFill,
  RiHome4Line,
  RiSearchLine,
  RiHeart3Line,
  RiMessage3Line,
  RiBellLine,
  RiUserLine,
  RiLogoutBoxLine,
  RiAddCircleLine,
  RiDashboardLine,
  RiFileListLine,
  RiCalendarLine,
  RiArrowDownSLine,
} from "react-icons/ri";
import { useAuth } from "../context/AuthContext";
import logo from "../assets/logo.png";

// ─── Nav link sets ────────────────────────────────────────────────────────────
const PUBLIC_LINKS = [
  { to: "/",        label: "Home"    },
  { to: "/browse",  label: "Browse"  },
  { to: "/about",   label: "About"   },
  { to: "/contact", label: "Contact" },
];

const BUYER_LINKS = [
  { to: "/dashboard/buyer/feed",     label: "Feed",       icon: RiHome4Line    },
  { to: "/browse",                   label: "Browse",     icon: RiSearchLine   },
  { to: "/dashboard/buyer/saved",    label: "Saved",      icon: RiHeart3Line   },
  { to: "/dashboard/buyer/requests", label: "My Requests",icon: RiFileListLine },
];

const AGENT_LINKS = [
  { to: "/dashboard/agent/feed",        label: "Feed",        icon: RiHome4Line   },
  { to: "/dashboard/agent/listings",    label: "Listings",    icon: RiFileListLine},
  { to: "/dashboard/agent/inspections", label: "Inspections", icon: RiCalendarLine},
  { to: "/dashboard/agent",            label: "Dashboard",   icon: RiDashboardLine},
];

const MOCK_NOTIFICATIONS = [
  { id: 1, msg: "Agent Emeka sent you an offer on your Lekki request", time: "2h ago",  read: false },
  { id: 2, msg: "Your inspection is confirmed for tomorrow 10AM",       time: "5h ago",  read: false },
  { id: 3, msg: "New property matching your search in Yaba",            time: "1d ago",  read: true  },
];

// ─── Hooks ────────────────────────────────────────────────────────────────────
const useScrolled = () => {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);
  return scrolled;
};

const useClickOutside = (ref, cb) => {
  useEffect(() => {
    const fn = (e) => { if (ref.current && !ref.current.contains(e.target)) cb(); };
    document.addEventListener("mousedown", fn);
    return () => document.removeEventListener("mousedown", fn);
  }, [ref, cb]);
};

// ─── Notification Bell ────────────────────────────────────────────────────────
const NotifBell = ({ notifications, setNotifications }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  useClickOutside(ref, () => setOpen(false));
  const unread = notifications.filter((n) => !n.read).length;

  return (
    <div ref={ref} className="relative">
      <button onClick={() => setOpen((v) => !v)}
        className="relative w-9 h-9 rounded-xl bg-[#1A2E4A] flex items-center justify-center text-[#8A9BB5] hover:text-[#C9A84C] transition">
        <RiBellLine size={18} />
        {unread > 0 && (
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#C9A84C] rounded-full text-[#0A1628] text-[9px] font-bold flex items-center justify-center">
            {unread}
          </span>
        )}
      </button>
      {open && (
        <div className="absolute right-0 top-12 w-80 bg-white rounded-2xl border border-[#E0D9CF] shadow-2xl z-50 overflow-hidden">
          <div className="px-4 py-3 border-b border-[#E0D9CF] flex items-center justify-between">
            <p className="text-sm font-bold text-[#0A1628]">Notifications</p>
            {unread > 0 && (
              <button
                onClick={() => setNotifications((p) => p.map((n) => ({ ...n, read: true })))}
                className="text-[10px] text-[#C9A84C] font-semibold hover:underline">
                Mark all read
              </button>
            )}
          </div>
          {notifications.map((n) => (
            <div key={n.id}
              className={`px-4 py-3 border-b border-[#E0D9CF] last:border-0 hover:bg-[#F7F4EF] transition
                ${!n.read ? "bg-[#E8D5A3]/15" : ""}`}>
              <div className="flex gap-2 items-start">
                {!n.read && <div className="w-1.5 h-1.5 rounded-full bg-[#C9A84C] mt-1.5 flex-shrink-0" />}
                <div className={!n.read ? "" : "pl-3.5"}>
                  <p className="text-xs text-[#0A1628] leading-relaxed">{n.msg}</p>
                  <p className="text-[10px] text-[#6B7280] mt-1">{n.time}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// ─── Avatar Dropdown ──────────────────────────────────────────────────────────
const AvatarMenu = ({ user, role, onLogout }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const navigate = useNavigate();
  useClickOutside(ref, () => setOpen(false));

  const dashboardUrl = role === "agent" ? "/dashboard/agent" : "/dashboard/buyer";
  const displayName = user?.displayName || user?.email?.split('@')[0] || 'User';
  const avatar = displayName.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();

  const handleLogout = async () => {
    try {
      await onLogout();
      navigate("/");
    } catch (err) {
      console.error("Logout failed:", err);
    }
    setOpen(false);
  };

  return (
    <div ref={ref} className="relative">
      <button onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-2 bg-[#1A2E4A] hover:bg-[#243B55] pl-1.5 pr-3 py-1.5 rounded-xl transition">
        <div className="w-7 h-7 rounded-lg bg-[#C9A84C] flex items-center justify-center text-[#0A1628] font-bold text-xs">
          {avatar}
        </div>
        <span className="text-xs font-semibold text-[#F7F4EF] hidden sm:block">
          {displayName.split(' ')[0]}
        </span>
        <RiArrowDownSLine size={14} className={`text-[#8A9BB5] transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <div className="absolute right-0 top-12 w-56 bg-white rounded-2xl border border-[#E0D9CF] shadow-2xl z-50 overflow-hidden">
          <div className="px-4 py-4 bg-[#F7F4EF] border-b border-[#E0D9CF]">
            <p className="text-sm font-bold text-[#0A1628]">{displayName}</p>
            <div className="flex items-center gap-1 mt-0.5">
              <RiShieldCheckFill size={11} className="text-[#C9A84C]" />
              <span className="text-[10px] text-[#C9A84C] font-semibold capitalize">
                Verified {role}
              </span>
            </div>
          </div>
          <div className="py-2">
            <button onClick={() => { navigate(`${dashboardUrl}`); setOpen(false); }}
              className="flex items-center gap-3 px-4 py-2.5 text-sm text-[#0A1628] hover:bg-[#F7F4EF] transition w-full text-left">
              <RiDashboardLine size={16} className="text-[#6B7280]" /> Dashboard
            </button>
            <button onClick={() => { navigate(`${dashboardUrl}/profile`); setOpen(false); }}
              className="flex items-center gap-3 px-4 py-2.5 text-sm text-[#0A1628] hover:bg-[#F7F4EF] transition w-full text-left">
              <RiUserLine size={16} className="text-[#6B7280]" /> My Profile
            </button>
            <button onClick={() => { navigate(`${dashboardUrl}/messages`); setOpen(false); }}
              className="flex items-center gap-3 px-4 py-2.5 text-sm text-[#0A1628] hover:bg-[#F7F4EF] transition w-full text-left">
              <RiMessage3Line size={16} className="text-[#6B7280]" /> Messages
            </button>
          </div>
          <div className="border-t border-[#E0D9CF] py-2">
            <button onClick={handleLogout}
              className="flex items-center gap-3 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 transition w-full text-left">
              <RiLogoutBoxLine size={16} /> Sign Out
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

// ─── Register Dropdown ────────────────────────────────────────────────────────
const RegisterDropdown = () => {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const navigate = useNavigate();
  useClickOutside(ref, () => setOpen(false));

  return (
    <div ref={ref} className="relative">
      <button onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-1.5 bg-[#C9A84C] hover:bg-[#b8943d] active:scale-95 text-[#0A1628] text-sm font-bold px-4 py-2.5 rounded-xl transition duration-200">
        Register
        <RiArrowDownSLine size={16} className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <div className="absolute right-0 top-12 w-64 bg-white rounded-2xl border border-[#E0D9CF] shadow-2xl z-50 overflow-hidden">
          <div className="px-4 py-3 border-b border-[#E0D9CF] bg-[#F7F4EF]">
            <p className="text-xs font-bold text-[#0A1628]">How do you want to join NRET?</p>
          </div>
          <div className="p-2">
            <button
              onClick={() => { navigate("/register?role=buyer"); setOpen(false); }}
              className="flex items-start gap-3 w-full px-3 py-3 rounded-xl hover:bg-[#F7F4EF] transition text-left group">
              <div className="w-9 h-9 rounded-xl bg-[#E8D5A3]/50 group-hover:bg-[#C9A84C] flex items-center justify-center flex-shrink-0 transition-colors duration-200">
                <RiHome4Line size={18} className="text-[#0A1628]" />
              </div>
              <div>
                <p className="text-sm font-bold text-[#0A1628]">Register as Buyer</p>
                <p className="text-[10px] text-[#6B7280] mt-0.5 leading-relaxed">
                  Find, verify and secure properties safely
                </p>
              </div>
            </button>
            <button
              onClick={() => { navigate("/register?role=agent"); setOpen(false); }}
              className="flex items-start gap-3 w-full px-3 py-3 rounded-xl hover:bg-[#F7F4EF] transition text-left group">
              <div className="w-9 h-9 rounded-xl bg-[#E8D5A3]/50 group-hover:bg-[#C9A84C] flex items-center justify-center flex-shrink-0 transition-colors duration-200">
                <RiShieldCheckFill size={18} className="text-[#0A1628]" />
              </div>
              <div>
                <p className="text-sm font-bold text-[#0A1628]">Register as Agent</p>
                <p className="text-[10px] text-[#6B7280] mt-0.5 leading-relaxed">
                  List properties and connect with verified buyers
                </p>
              </div>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

// ═════════════════════════════════════════════════════════════════════════════
// PUBLIC NAVBAR
// ═════════════════════════════════════════════════════════════════════════════
const PublicNavbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const scrolled  = useScrolled();
  const location  = useLocation();
  const navigate  = useNavigate();

  useEffect(() => setMobileOpen(false), [location]);

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-500
      ${scrolled
        ? "bg-[#0A1628]/95 backdrop-blur-md shadow-lg shadow-[#0A1628]/30"
        : "bg-transparent"}`}>

      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 h-16 flex items-center justify-between gap-6">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5 flex-shrink-0">
          <img src={logo} alt="NRET" className="h-9 w-auto" />
          <div className="flex flex-col leading-none">
            <span className="font-bold text-lg text-[#F7F4EF] tracking-wide">NRET</span>
            <span className="text-[9px] font-semibold text-[#C9A84C] uppercase tracking-[0.18em]">
              Real Estate
            </span>
          </div>
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-1 flex-1 justify-center">
          {PUBLIC_LINKS.map(({ to, label }) => {
            const active = location.pathname === to;
            return (
              <Link key={to} to={to}
                className={`relative px-4 py-2 text-sm font-medium rounded-xl transition-all duration-200
                  ${active
                    ? "text-[#C9A84C]"
                    : "text-[#D0C8BE] hover:text-[#F7F4EF] hover:bg-[#F7F4EF]/8"}`}>
                {label}
                {active && (
                  <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-[#C9A84C] rounded-full" />
                )}
              </Link>
            );
          })}
        </div>

        {/* Desktop actions */}
        <div className="hidden md:flex items-center gap-3 flex-shrink-0">
          <Link to="/login"
            className="text-sm font-medium text-[#D0C8BE] hover:text-[#F7F4EF] transition duration-200 px-2">
            Sign In
          </Link>
          <RegisterDropdown />
        </div>

        {/* Mobile hamburger */}
        <button onClick={() => setMobileOpen((v) => !v)}
          className="md:hidden flex flex-col justify-center items-center w-9 h-9 gap-1.5 rounded-xl hover:bg-[#F7F4EF]/10 transition flex-shrink-0">
          <span className={`block w-5 h-0.5 bg-[#F7F4EF] rounded transition-all duration-300 ${mobileOpen ? "rotate-45 translate-y-2" : ""}`} />
          <span className={`block w-5 h-0.5 bg-[#F7F4EF] rounded transition-all duration-300 ${mobileOpen ? "opacity-0" : ""}`} />
          <span className={`block w-5 h-0.5 bg-[#F7F4EF] rounded transition-all duration-300 ${mobileOpen ? "-rotate-45 -translate-y-2" : ""}`} />
        </button>
      </div>

      {/* Mobile drawer */}
      <div className={`md:hidden overflow-hidden transition-all duration-300 ${mobileOpen ? "max-h-[500px]" : "max-h-0"}`}>
        <div className="bg-[#0A1628] border-t border-[#C9A84C]/15 px-4 py-5 flex flex-col gap-1">
          {PUBLIC_LINKS.map(({ to, label }) => {
            const active = location.pathname === to;
            return (
              <Link key={to} to={to}
                className={`px-4 py-3 rounded-xl text-sm font-medium transition duration-200
                  ${active
                    ? "bg-[#C9A84C]/15 text-[#C9A84C]"
                    : "text-[#D0C8BE] hover:bg-[#F7F4EF]/8 hover:text-[#F7F4EF]"}`}>
                {label}
              </Link>
            );
          })}

          <div className="border-t border-[#C9A84C]/15 mt-3 pt-4 flex flex-col gap-2">
            <Link to="/login"
              className="px-4 py-3 rounded-xl text-sm font-medium text-[#D0C8BE] hover:bg-[#F7F4EF]/8 hover:text-[#F7F4EF] transition">
              Sign In
            </Link>

            {/* Mobile register options */}
            <div className="flex flex-col gap-2">
              <p className="text-[10px] text-[#8A9BB5] font-semibold uppercase tracking-widest px-1 mt-1">
                Create Account
              </p>
              <button onClick={() => { navigate("/register?role=buyer"); setMobileOpen(false); }}
                className="flex items-center gap-3 px-4 py-3 rounded-xl bg-[#1A2E4A] hover:bg-[#243B55] transition text-left">
                <RiHome4Line size={18} className="text-[#C9A84C]" />
                <div>
                  <p className="text-sm font-bold text-[#F7F4EF]">Register as Buyer</p>
                  <p className="text-[10px] text-[#8A9BB5]">Find & verify properties</p>
                </div>
              </button>
              <button onClick={() => { navigate("/register?role=agent"); setMobileOpen(false); }}
                className="flex items-center gap-3 px-4 py-3 rounded-xl bg-[#C9A84C] hover:bg-[#b8943d] active:scale-95 transition text-left">
                <RiShieldCheckFill size={18} className="text-[#0A1628]" />
                <div>
                  <p className="text-sm font-bold text-[#0A1628]">Register as Agent</p>
                  <p className="text-[10px] text-[#0A1628]/70">List & sell properties</p>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

// ═════════════════════════════════════════════════════════════════════════════
// DASHBOARD NAVBAR (logged in)
// ═════════════════════════════════════════════════════════════════════════════
const DashboardNavbar = ({ role, user, onLogout }) => {
  const [mobileOpen,    setMobileOpen]    = useState(false);
  const [notifications, setNotifications] = useState(MOCK_NOTIFICATIONS);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => setMobileOpen(false), [location]);

  const links      = role === "agent" ? AGENT_LINKS : BUYER_LINKS;
  const dashBase   = role === "agent" ? "/dashboard/agent" : "/dashboard/buyer";
  const postLabel  = role === "agent" ? "Post Listing" : "Post Request";
  const postUrl    = role === "agent" ? "/dashboard/agent/listings/new" : "/dashboard/buyer/requests/new";

  return (
    <nav className="fixed top-0 w-full z-50 bg-[#0A1628] border-b border-[#1A2E4A] shadow-lg shadow-[#0A1628]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">

        {/* Left — hamburger + logo */}
        <div className="flex items-center gap-3 flex-shrink-0">
          <button onClick={() => setMobileOpen((v) => !v)}
            className="lg:hidden w-9 h-9 rounded-xl bg-[#1A2E4A] flex items-center justify-center text-[#8A9BB5] hover:text-[#F7F4EF] transition">
            {mobileOpen ? <RiCloseLine size={20} /> : <RiMenuLine size={20} />}
          </button>
          <Link to={dashBase} className="flex items-center gap-2">
            <img src={logo} alt="NRET" className="h-8 w-auto" />
            <div className="flex flex-col leading-none">
              <span className="font-bold text-sm text-[#F7F4EF] tracking-wide">NRET</span>
              <span className={`text-[8px] font-bold uppercase tracking-[0.15em]
                ${role === "agent" ? "text-[#C9A84C]" : "text-[#8A9BB5]"}`}>
                {role === "agent" ? "Agent Portal" : "Buyer Portal"}
              </span>
            </div>
          </Link>
        </div>

        {/* Center — desktop nav links */}
        <div className="hidden lg:flex items-center gap-1 flex-1 justify-center">
          {links.map(({ to, label, icon: Icon }) => {
            const active = location.pathname === to;
            return (
              <Link key={to} to={to}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200
                  ${active
                    ? "bg-[#C9A84C] text-[#0A1628]"
                    : "text-[#8A9BB5] hover:bg-[#1A2E4A] hover:text-[#F7F4EF]"}`}>
                <Icon size={15} />
                {label}
              </Link>
            );
          })}
        </div>

        {/* Right — actions */}
        <div className="flex items-center gap-2 flex-shrink-0">
          {/* Post button */}
          <button onClick={() => navigate(postUrl)}
            className="hidden sm:flex items-center gap-1.5 bg-[#C9A84C] hover:bg-[#b8943d] active:scale-95 text-[#0A1628] text-xs font-bold px-3 py-2 rounded-xl transition duration-200">
            <RiAddCircleLine size={15} />
            <span className="hidden md:block">{postLabel}</span>
          </button>

          {/* Messages */}
          <Link to={`${dashBase}/messages`}
            className="w-9 h-9 rounded-xl bg-[#1A2E4A] flex items-center justify-center text-[#8A9BB5] hover:text-[#C9A84C] transition">
            <RiMessage3Line size={18} />
          </Link>

          {/* Notifications */}
          <NotifBell
            notifications={notifications}
            setNotifications={setNotifications}
          />

          {/* Avatar */}
          <AvatarMenu user={user} role={role} onLogout={onLogout} />
        </div>
      </div>

      {/* Mobile drawer */}
      <div className={`lg:hidden overflow-hidden transition-all duration-300 ${mobileOpen ? "max-h-[500px]" : "max-h-0"}`}>
        <div className="bg-[#0A1628] border-t border-[#1A2E4A] px-4 py-4 flex flex-col gap-1">

          {/* User info */}
          <div className="flex items-center gap-3 px-3 py-3 mb-2 bg-[#1A2E4A] rounded-xl">
            <div className="w-10 h-10 rounded-xl bg-[#C9A84C] flex items-center justify-center text-[#0A1628] font-bold text-sm">
              {(user?.displayName || user?.email || 'U').split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()}
            </div>
            <div>
              <p className="text-[#F7F4EF] text-sm font-bold">{user?.displayName || user?.email?.split('@')[0] || 'User'}</p>
              <div className="flex items-center gap-1">
                <RiShieldCheckFill size={10} className="text-[#C9A84C]" />
                <span className="text-[10px] text-[#C9A84C] font-semibold capitalize">
                  Verified {role}
                </span>
              </div>
            </div>
          </div>

          {/* Nav links */}
          {links.map(({ to, label, icon: Icon }) => {
            const active = location.pathname === to;
            return (
              <Link key={to} to={to}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition duration-200
                  ${active
                    ? "bg-[#C9A84C] text-[#0A1628]"
                    : "text-[#8A9BB5] hover:bg-[#1A2E4A] hover:text-[#F7F4EF]"}`}>
                <Icon size={17} /> {label}
              </Link>
            );
          })}

          {/* Post + Sign out */}
          <div className="border-t border-[#1A2E4A] mt-3 pt-3 flex flex-col gap-2">
            <button onClick={() => { navigate(postUrl); setMobileOpen(false); }}
              className="flex items-center gap-2 bg-[#C9A84C] hover:bg-[#b8943d] text-[#0A1628] text-sm font-bold px-4 py-3 rounded-xl transition">
              <RiAddCircleLine size={17} /> {postLabel}
            </button>
            <button onClick={async () => { await onLogout(); navigate("/"); }}
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-400 hover:bg-[#1A2E4A] transition">
              <RiLogoutBoxLine size={17} /> Sign Out
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

// ═════════════════════════════════════════════════════════════════════════════
// MAIN EXPORT
// ═════════════════════════════════════════════════════════════════════════════
const Navbar = () => {
  const { user, userRole, logout } = useAuth();
  const isLoggedIn = !!user;
  const role = userRole || "buyer";

  if (isLoggedIn) {
    return <DashboardNavbar role={role} user={user} onLogout={logout} />;
  }
  return <PublicNavbar />;
};

export default Navbar;