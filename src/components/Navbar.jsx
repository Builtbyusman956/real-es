// src/components/Navbar.jsx
import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  RiMenuLine, RiCloseLine, RiShieldCheckFill,
  RiHome4Line, RiSearchLine, RiHeart3Line,
  RiMessage3Line, RiBellLine, RiUserLine,
  RiLogoutBoxLine, RiAddCircleLine, RiDashboardLine,
  RiFileListLine, RiCalendarLine,
} from "react-icons/ri";
import logo from "../assets/logo.png";

// ─── Mock auth state — replace with real auth later ──────────────────────────
// To test: change IS_LOGGED_IN to true and ROLE to "agent" or "buyer"
const IS_LOGGED_IN = false;
const ROLE         = "buyer"; // "agent" or "buyer"
const USER         = { name: "Chidi Nwosu", avatar: "CN" };

// ─── Public nav links ─────────────────────────────────────────────────────────
const PUBLIC_LINKS = [
  { to: "/",        label: "Home"    },
  { to: "/browse",  label: "Browse"  },
  { to: "/about",   label: "About"   },
  { to: "/contact", label: "Contact" },
];

// ─── Dashboard nav links by role ──────────────────────────────────────────────
const AGENT_LINKS = [
  { to: "/dashboard/agent",            label: "Overview",    icon: RiDashboardLine  },
  { to: "/dashboard/agent/feed",       label: "Buyer Requests", icon: RiFileListLine },
  { to: "/dashboard/agent/listings",   label: "My Listings", icon: RiHome4Line      },
  { to: "/dashboard/agent/messages",   label: "Messages",    icon: RiMessage3Line   },
  { to: "/dashboard/agent/inspections",label: "Inspections", icon: RiCalendarLine   },
];

const BUYER_LINKS = [
  { to: "/dashboard/buyer",            label: "Overview",    icon: RiDashboardLine  },
  { to: "/dashboard/buyer/feed",       label: "Properties",  icon: RiSearchLine     },
  { to: "/dashboard/buyer/saved",      label: "Saved",       icon: RiHeart3Line     },
  { to: "/dashboard/buyer/messages",   label: "Messages",    icon: RiMessage3Line   },
  { to: "/dashboard/buyer/requests",   label: "My Requests", icon: RiFileListLine   },
];

// ─── Notification mock ────────────────────────────────────────────────────────
const NOTIFICATIONS = [
  { id: 1, msg: "Agent Emeka sent you an offer on your Lekki request", time: "2h ago",  read: false },
  { id: 2, msg: "Your inspection is confirmed for tomorrow 10AM",       time: "5h ago",  read: false },
  { id: 3, msg: "New property matching your search in Yaba",            time: "1d ago",  read: true  },
];

// ═════════════════════════════════════════════════════════════════════════════
// PUBLIC NAVBAR
// ═════════════════════════════════════════════════════════════════════════════
const PublicNavbar = () => {
  const [open,     setOpen]     = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [location]);

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-500
      ${scrolled
        ? "bg-[#0A1628]/95 backdrop-blur-md shadow-lg shadow-[#0A1628]/30"
        : "bg-transparent"}`}>

      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 flex items-center justify-between h-16">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5">
          <img src={logo} alt="NRET" className="h-9 w-auto" />
          <div className="flex flex-col leading-none">
            <span className="font-bold text-lg text-[#F7F4EF] tracking-wide">NRET</span>
            <span className="text-[9px] font-semibold text-[#C9A84C] uppercase tracking-[0.18em]">Real Estate</span>
          </div>
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-1">
          {PUBLIC_LINKS.map(({ to, label }) => {
            const active = location.pathname === to;
            return (
              <Link key={to} to={to}
                className={`relative px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200
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

        {/* Desktop CTAs */}
        <div className="hidden md:flex items-center gap-3">
          <Link to="/login"
            className="text-sm font-medium text-[#D0C8BE] hover:text-[#F7F4EF] transition duration-200">
            Sign In
          </Link>
          <Link to="/register"
            className="bg-[#C9A84C] hover:bg-[#b8943d] active:scale-95 text-[#0A1628] text-sm font-bold px-5 py-2.5 rounded-xl transition duration-200">
            Register
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button onClick={() => setOpen((v) => !v)} aria-label="Toggle menu"
          className="md:hidden flex flex-col justify-center items-center w-9 h-9 gap-1.5 rounded-lg hover:bg-[#F7F4EF]/10 transition">
          <span className={`block w-5 h-0.5 bg-[#F7F4EF] rounded transition-all duration-300 ${open ? "rotate-45 translate-y-2" : ""}`} />
          <span className={`block w-5 h-0.5 bg-[#F7F4EF] rounded transition-all duration-300 ${open ? "opacity-0" : ""}`} />
          <span className={`block w-5 h-0.5 bg-[#F7F4EF] rounded transition-all duration-300 ${open ? "-rotate-45 -translate-y-2" : ""}`} />
        </button>
      </div>

      {/* Mobile menu */}
      <div className={`md:hidden overflow-hidden transition-all duration-300 ${open ? "max-h-96" : "max-h-0"}`}>
        <div className="bg-[#0A1628]/97 backdrop-blur-md border-t border-[#C9A84C]/15 px-4 py-5 flex flex-col gap-1">
          {PUBLIC_LINKS.map(({ to, label }) => {
            const active = location.pathname === to;
            return (
              <Link key={to} to={to}
                className={`px-3 py-2.5 rounded-xl text-sm font-medium transition duration-200
                  ${active
                    ? "bg-[#C9A84C]/15 text-[#C9A84C]"
                    : "text-[#D0C8BE] hover:bg-[#F7F4EF]/8 hover:text-[#F7F4EF]"}`}>
                {label}
              </Link>
            );
          })}
          <div className="border-t border-[#C9A84C]/15 mt-3 pt-4 flex flex-col gap-2">
            <Link to="/login"
              className="px-3 py-2.5 rounded-xl text-sm font-medium text-[#D0C8BE] hover:bg-[#F7F4EF]/8 hover:text-[#F7F4EF] transition duration-200">
              Sign In
            </Link>
            <Link to="/register"
              className="bg-[#C9A84C] hover:bg-[#b8943d] text-[#0A1628] text-sm font-bold px-4 py-2.5 rounded-xl text-center transition duration-200">
              Register
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

// ═════════════════════════════════════════════════════════════════════════════
// DASHBOARD NAVBAR
// ═════════════════════════════════════════════════════════════════════════════
const DashboardNavbar = ({ role }) => {
  const [mobileOpen,   setMobileOpen]   = useState(false);
  const [showNotifs,   setShowNotifs]   = useState(false);
  const [showProfile,  setShowProfile]  = useState(false);
  const [notifications, setNotifications] = useState(NOTIFICATIONS);
  const location = useLocation();
  const navigate = useNavigate();

  const links   = role === "agent" ? AGENT_LINKS : BUYER_LINKS;
  const unread  = notifications.filter((n) => !n.read).length;
  const baseUrl = role === "agent" ? "/dashboard/agent" : "/dashboard/buyer";

  useEffect(() => {
    setMobileOpen(false);
    setShowNotifs(false);
    setShowProfile(false);
  }, [location]);

  const markAllRead = () =>
    setNotifications((p) => p.map((n) => ({ ...n, read: true })));

  return (
    <>
      <nav className="fixed top-0 w-full z-50 bg-[#0A1628] border-b border-[#1A2E4A] shadow-lg shadow-[#0A1628]/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">

          {/* Left — Logo + hamburger */}
          <div className="flex items-center gap-3">
            <button onClick={() => setMobileOpen((v) => !v)}
              className="lg:hidden text-[#8A9BB5] hover:text-[#F7F4EF] transition w-9 h-9 flex items-center justify-center rounded-xl hover:bg-[#1A2E4A]">
              {mobileOpen ? <RiCloseLine size={22} /> : <RiMenuLine size={22} />}
            </button>
            <Link to="/" className="flex items-center gap-2">
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

          {/* Center — Desktop nav links */}
          <div className="hidden lg:flex items-center gap-1">
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
          <div className="flex items-center gap-2">

            {/* Post button */}
            <button
              onClick={() => navigate(role === "agent"
                ? "/dashboard/agent/listings/new"
                : "/dashboard/buyer/requests/new")}
              className="hidden sm:flex items-center gap-1.5 bg-[#C9A84C] hover:bg-[#b8943d] active:scale-95 text-[#0A1628] text-xs font-bold px-3 py-2 rounded-xl transition duration-200">
              <RiAddCircleLine size={15} />
              {role === "agent" ? "Post Listing" : "Post Request"}
            </button>

            {/* Notifications */}
            <div className="relative">
              <button onClick={() => { setShowNotifs((v) => !v); setShowProfile(false); }}
                className="relative w-9 h-9 rounded-xl bg-[#1A2E4A] flex items-center justify-center text-[#8A9BB5] hover:text-[#C9A84C] transition">
                <RiBellLine size={18} />
                {unread > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#C9A84C] rounded-full text-[#0A1628] text-[9px] font-bold flex items-center justify-center">
                    {unread}
                  </span>
                )}
              </button>

              {showNotifs && (
                <div className="absolute right-0 top-12 w-80 bg-white rounded-2xl border border-[#E0D9CF] shadow-2xl z-50 overflow-hidden">
                  <div className="px-4 py-3 border-b border-[#E0D9CF] flex items-center justify-between">
                    <p className="text-sm font-bold text-[#0A1628]">Notifications</p>
                    {unread > 0 && (
                      <button onClick={markAllRead}
                        className="text-[10px] text-[#C9A84C] font-semibold hover:underline">
                        Mark all read
                      </button>
                    )}
                  </div>
                  {notifications.length === 0 ? (
                    <div className="px-4 py-6 text-center text-sm text-[#6B7280]">No notifications</div>
                  ) : (
                    notifications.map((n) => (
                      <div key={n.id}
                        className={`px-4 py-3 border-b border-[#E0D9CF] last:border-0 transition hover:bg-[#F7F4EF]
                          ${!n.read ? "bg-[#E8D5A3]/15" : ""}`}>
                        <div className="flex gap-2 items-start">
                          {!n.read && <div className="w-1.5 h-1.5 rounded-full bg-[#C9A84C] mt-1.5 flex-shrink-0" />}
                          <div className={!n.read ? "" : "pl-3.5"}>
                            <p className="text-xs text-[#0A1628] leading-relaxed">{n.msg}</p>
                            <p className="text-[10px] text-[#6B7280] mt-1">{n.time}</p>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                  <div className="px-4 py-3 border-t border-[#E0D9CF]">
                    <button className="w-full text-center text-xs text-[#C9A84C] font-semibold hover:underline">
                      View all notifications
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Messages shortcut */}
            <Link to={`${baseUrl}/messages`}
              className="w-9 h-9 rounded-xl bg-[#1A2E4A] flex items-center justify-center text-[#8A9BB5] hover:text-[#C9A84C] transition">
              <RiMessage3Line size={18} />
            </Link>

            {/* Profile dropdown */}
            <div className="relative">
              <button onClick={() => { setShowProfile((v) => !v); setShowNotifs(false); }}
                className="flex items-center gap-2 bg-[#1A2E4A] hover:bg-[#243B55] pl-1 pr-3 py-1 rounded-xl transition">
                <div className="w-7 h-7 rounded-lg bg-[#C9A84C] flex items-center justify-center text-[#0A1628] font-bold text-xs">
                  {USER.avatar}
                </div>
                <span className="text-xs font-semibold text-[#F7F4EF] hidden sm:block">
                  {USER.name.split(" ")[0]}
                </span>
              </button>

              {showProfile && (
                <div className="absolute right-0 top-12 w-52 bg-white rounded-2xl border border-[#E0D9CF] shadow-2xl z-50 overflow-hidden">
                  <div className="px-4 py-4 border-b border-[#E0D9CF] bg-[#F7F4EF]">
                    <p className="text-sm font-bold text-[#0A1628]">{USER.name}</p>
                    <div className="flex items-center gap-1 mt-0.5">
                      <RiShieldCheckFill size={11} className="text-[#C9A84C]" />
                      <span className="text-[10px] text-[#C9A84C] font-semibold capitalize">
                        Verified {role}
                      </span>
                    </div>
                  </div>
                  <div className="py-2">
                    <Link to={`${baseUrl}/profile`}
                      className="flex items-center gap-3 px-4 py-2.5 text-sm text-[#0A1628] hover:bg-[#F7F4EF] transition">
                      <RiUserLine size={16} className="text-[#6B7280]" /> My Profile
                    </Link>
                    <Link to={`${baseUrl}`}
                      className="flex items-center gap-3 px-4 py-2.5 text-sm text-[#0A1628] hover:bg-[#F7F4EF] transition">
                      <RiDashboardLine size={16} className="text-[#6B7280]" /> Dashboard
                    </Link>
                  </div>
                  <div className="border-t border-[#E0D9CF] py-2">
                    <button onClick={() => navigate("/")}
                      className="flex items-center gap-3 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 transition w-full text-left">
                      <RiLogoutBoxLine size={16} /> Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Mobile nav links */}
        <div className={`lg:hidden overflow-hidden transition-all duration-300 ${mobileOpen ? "max-h-96" : "max-h-0"}`}>
          <div className="border-t border-[#1A2E4A] px-4 py-4 flex flex-col gap-1">
            {links.map(({ to, label, icon: Icon }) => {
              const active = location.pathname === to;
              return (
                <Link key={to} to={to}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200
                    ${active
                      ? "bg-[#C9A84C] text-[#0A1628]"
                      : "text-[#8A9BB5] hover:bg-[#1A2E4A] hover:text-[#F7F4EF]"}`}>
                  <Icon size={17} /> {label}
                </Link>
              );
            })}
            <button
              onClick={() => navigate(role === "agent"
                ? "/dashboard/agent/listings/new"
                : "/dashboard/buyer/requests/new")}
              className="flex items-center gap-2 bg-[#C9A84C] hover:bg-[#b8943d] text-[#0A1628] text-sm font-bold px-4 py-2.5 rounded-xl mt-2 transition duration-200">
              <RiAddCircleLine size={17} />
              {role === "agent" ? "Post New Listing" : "Post Property Request"}
            </button>
          </div>
        </div>
      </nav>

      {/* Spacer so content doesn't hide under fixed nav */}
      <div className="h-16" />
    </>
  );
};

// ═════════════════════════════════════════════════════════════════════════════
// MAIN EXPORT — auto-switches based on auth state
// ═════════════════════════════════════════════════════════════════════════════
const Navbar = () => {
  if (IS_LOGGED_IN) return <DashboardNavbar role={ROLE} />;
  return <PublicNavbar />;
};

export default Navbar;