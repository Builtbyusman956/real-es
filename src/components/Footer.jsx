// src/components/Footer.jsx
import { Link } from "react-router-dom";
import { 
  FaXTwitter, 
  FaInstagram, 
  FaFacebookF, 
  FaWhatsapp 
} from "react-icons/fa6";
import { 
  RiShieldCheckFill, 
  RiGlobalLine,
  RiBuildingLine,
  RiVerifiedBadgeFill
} from "react-icons/ri";

const LINKS = {
  Platform: [
    { label: "Browse Properties", to: "/browse"   },
    { label: "Register as Agent", to: "/register" },
    { label: "Sign In",           to: "/login"    },
    { label: "How It Works",      to: "/#how"     },
  ],
  Company: [
    { label: "About Us",    to: "/about"   },
    { label: "Contact",     to: "/contact" },
    { label: "Careers",     to: "/careers" },
    { label: "Blog",        to: "/blog"    },
  ],
  Legal: [
    { label: "Terms of Service", to: "/terms"   },
    { label: "Privacy Policy",   to: "/privacy" },
    { label: "Cookie Policy",    to: "/cookies" },
    { label: "Fraud Policy",     to: "/fraud"   },
  ],
};

const SOCIAL_LINKS = [
  { icon: FaXTwitter,   href: "https://twitter.com/nret",       label: "Twitter",   color: "hover:bg-black hover:text-white" },
  { icon: FaInstagram,  href: "https://instagram.com/nret",     label: "Instagram", color: "hover:bg-pink-600 hover:text-white" },
  { icon: FaFacebookF,  href: "https://facebook.com/nret",      label: "Facebook",  color: "hover:bg-blue-600 hover:text-white" },
  { icon: FaWhatsapp,   href: "https://wa.me/2348006733723",    label: "WhatsApp",  color: "hover:bg-green-600 hover:text-white" },
];

const BADGES = [
  { icon: RiVerifiedBadgeFill, label: "NIN Verified" },
  { icon: RiShieldCheckFill,   label: "BVN Secured" },
  { icon: RiBuildingLine,      label: "CAC Registered" },
];

const Footer = () => (
  <footer className="bg-[#0A1628] px-6 sm:px-8 lg:px-12 pt-16 pb-8">
    <div className="max-w-7xl mx-auto">

      {/* Top row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-10 pb-12 border-b border-[#1A2E4A]">

        {/* Brand */}
        <div className="col-span-2 md:col-span-1">
          <div className="mb-4">
            <div className="flex items-center gap-2 mb-1">
              <RiGlobalLine className="text-[#C9A84C]" size={24} />
              <p className="text-[#F7F4EF] font-bold text-xl tracking-wide">NRET</p>
            </div>
            <p className="text-[#C9A84C] text-[10px] font-semibold uppercase tracking-[0.18em]">
              Nigeria Real Estate Trust
            </p>
          </div>
          <p className="text-[#8A9BB5] text-sm leading-relaxed mb-6">
            Nigeria's most trusted platform for verified property listings, agent checks, and fraud-free real estate transactions.
          </p>
          
          {/* Socials - Real Icons */}
          <div className="flex gap-3">
            {SOCIAL_LINKS.map(({ icon: Icon, href, label, color }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className={`w-10 h-10 rounded-xl bg-[#1A2E4A] border border-[#1A2E4A] flex items-center justify-center text-[#8A9BB5] transition-all duration-300 ${color} hover:border-transparent hover:scale-110`}>
                <Icon size={18} />
              </a>
            ))}
          </div>
        </div>

        {/* Links */}
        {Object.entries(LINKS).map(([group, items]) => (
          <div key={group}>
            <p className="text-[#F7F4EF] text-xs font-bold uppercase tracking-[0.15em] mb-4">{group}</p>
            <ul className="flex flex-col gap-2.5">
              {items.map(({ label, to }) => (
                <li key={label}>
                  <Link to={to}
                    className="text-[#8A9BB5] text-sm hover:text-[#C9A84C] transition duration-200 relative group">
                    {label}
                    <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-[#C9A84C] transition-all duration-300 group-hover:w-full"></span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Bottom row */}
      <div className="pt-7 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-[#8A9BB5] text-xs text-center sm:text-left">
          © {new Date().getFullYear()} NRET Nigeria Real Estate Trust. All rights reserved.
        </p>
        
        {/* Badges with Icons */}
        <div className="flex items-center gap-2 flex-wrap justify-center">
          {BADGES.map(({ icon: Icon, label }) => (
            <div
              key={label}
              className="flex items-center gap-1.5 bg-[#C9A84C]/10 border border-[#C9A84C]/20 text-[#C9A84C] text-[10px] font-semibold px-3 py-1.5 rounded-full">
              <Icon size={12} />
              <span>{label}</span>
            </div>
          ))}
        </div>
      </div>

    </div>
  </footer>
);

export default Footer;