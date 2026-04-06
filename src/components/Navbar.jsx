import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import logo from "../assets/logo.png";

const NAV_LINKS = [
  { to: "/",        label: "Home"    },
  { to: "/browse",  label: "Browse"  },
  { to: "/about",   label: "About"   },
  { to: "/contact", label: "Contact" },
];

const Navbar = () => {
  const [open,      setOpen]      = useState(false);
  const [scrolled,  setScrolled]  = useState(false);
  const location = useLocation();

  // Solidify navbar on scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => setOpen(false), [location]);

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-500
        ${scrolled
          ? "bg-[#0A1628]/95 backdrop-blur-md shadow-lg shadow-[#0A1628]/30 py-0"
          : "bg-transparent py-2"
        }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 flex items-center justify-between h-16">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5 group">
          <img src={logo} alt="NRET logo" className="h-9 w-auto" />
          <div className="flex flex-col leading-none">
            <span className="font-bold text-lg text-[#F7F4EF] tracking-wide">NRET</span>
            <span className="text-[9px] font-medium text-[#C9A84C] uppercase tracking-[0.18em]">
              Real Estate
            </span>
          </div>
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map(({ to, label }) => {
            const active = location.pathname === to;
            return (
              <Link
                key={to}
                to={to}
                className={`relative px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200
                  ${active
                    ? "text-[#C9A84C]"
                    : "text-white hover:text-[#F7F4EF] hover:bg-[#F7F4EF]/8"
                  }`}
              >
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
          <Link
            to="/login"
            className="text-sm font-medium text-[#D0C8BE] hover:text-[#F7F4EF] transition duration-200"
          >
            Sign In
          </Link>
          <Link
            to="/register"
            className="bg-[#C9A84C] hover:bg-[#b8943d] active:scale-95 text-[#0A1628] text-sm font-semibold px-5 py-2.5 rounded-xl transition duration-200"
          >
            Register
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
          className="md:hidden flex flex-col justify-center items-center w-9 h-9 gap-1.5 rounded-lg hover:bg-[#F7F4EF]/10 transition"
        >
          <span className={`block w-5 h-0.5 bg-[#F7F4EF] rounded transition-all duration-300 ${open ? "rotate-45 translate-y-2" : ""}`} />
          <span className={`block w-5 h-0.5 bg-[#F7F4EF] rounded transition-all duration-300 ${open ? "opacity-0" : ""}`} />
          <span className={`block w-5 h-0.5 bg-[#F7F4EF] rounded transition-all duration-300 ${open ? "-rotate-45 -translate-y-2" : ""}`} />
        </button>
      </div>

      {/* Mobile menu */}
      <div className={`md:hidden overflow-hidden transition-all duration-300 ${open ? "max-h-96" : "max-h-0"}`}>
        <div className="bg-[#0A1628]/97 backdrop-blur-md border-t border-[#C9A84C]/15 px-6 py-5 flex flex-col gap-1">
          {NAV_LINKS.map(({ to, label }) => {
            const active = location.pathname === to;
            return (
              <Link
                key={to}
                to={to}
                className={`px-3 py-2.5 rounded-lg text-sm font-medium transition duration-200
                  ${active
                    ? "bg-[#C9A84C]/15 text-[#C9A84C]"
                    : "text-[#D0C8BE] hover:bg-[#F7F4EF]/8 hover:text-[#F7F4EF]"
                  }`}
              >
                {label}
              </Link>
            );
          })}

          <div className="border-t border-[#C9A84C]/15 mt-3 pt-4 flex flex-col gap-2">
            <Link
              to="/login"
              className="px-3 py-2.5 rounded-lg text-sm font-medium text-[#D0C8BE] hover:bg-[#F7F4EF]/8 hover:text-[#F7F4EF] transition duration-200"
            >
              Sign In
            </Link>
            <Link
              to="/register"
              className="bg-[#C9A84C] hover:bg-[#b8943d] active:scale-95 text-[#0A1628] text-sm font-semibold px-4 py-2.5 rounded-xl text-center transition duration-200"
            >
              Register
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;