// src/components/Footer.jsx
import { Link } from "react-router-dom";

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

const Footer = () => (
  <footer className="bg-[#0A1628] px-6 sm:px-8 p-4 lg:px-12 pt-16 pb-8">
    <div className="max-w-7xl mx-auto">

      {/* Top row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-10 pb-12 border-b border-[#1A2E4A]">

        {/* Brand */}
        <div className="col-span-2 md:col-span-1">
          <div className="mb-4">
            <p className="text-[#F7F4EF] font-bold text-xl tracking-wide">NRET</p>
            <p className="text-[#C9A84C] text-[10px] font-semibold uppercase tracking-[0.18em]">
              Nigeria Real Estate Trust
            </p>
          </div>
          <p className="text-[#8A9BB5] text-sm leading-relaxed mb-5">
            Nigeria's most trusted platform for verified property listings, agent checks, and fraud-free real estate transactions.
          </p>
          {/* Socials */}
          <div className="flex gap-2">
            {["tw", "ig", "fb", "wa"].map((s) => (
              <div key={s}
                className="w-8 h-8 rounded-lg bg-[#1A2E4A] hover:bg-[#C9A84C]/20 border border-[#1A2E4A] hover:border-[#C9A84C]/30 flex items-center justify-center text-[#8A9BB5] hover:text-[#C9A84C] text-[10px] font-bold uppercase cursor-pointer transition duration-200">
                {s}
              </div>
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
                    className="text-[#8A9BB5] text-sm hover:text-[#C9A84C] transition duration-200">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Bottom row */}
      <div className="pt-7 flex flex-col sm:flex-row items-center justify-between gap-3">
        <p className="text-[#8A9BB5] text-xs text-center sm:text-left">
          © {new Date().getFullYear()} NRET — Nigeria Real Estate Trust. All rights reserved.
        </p>
        <div className="flex items-center gap-2">
          {["NIN Verified", "BVN Secured", "CAC Registered"].map((b) => (
            <span key={b}
              className="bg-[#C9A84C]/10 border border-[#C9A84C]/15 text-[#C9A84C] text-[9px] font-semibold px-2 py-0.5 rounded-full">
              ✔ {b}
            </span>
          ))}
        </div>
      </div>

    </div>
  </footer>
);

export default Footer;