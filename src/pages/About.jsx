// src/pages/About.jsx
import { useNavigate } from "react-router-dom";
import {
  RiShieldCheckFill, RiTeamFill, RiMapPinLine,
  RiLightbulbFlashLine, RiHandHeartLine, RiTrophyLine,
} from "react-icons/ri";
import { HiArrowRight } from "react-icons/hi";

// ─── Data ─────────────────────────────────────────────────────────────────────
const TEAM = [
  { name: "Adebayo Okonkwo", role: "CEO & Co-Founder",      avatar: "AO", bio: "10+ years in Nigerian real estate. Victim of land fraud himself — built NRET to fix the system."   },
  { name: "Fatima Al-Hassan", role: "CTO & Co-Founder",     avatar: "FA", bio: "Former software engineer at Andela. Passionate about using technology to solve African problems."    },
  { name: "Chukwudi Eze",     role: "Head of Verification", avatar: "CE", bio: "Ex-LASAA official with deep knowledge of land documentation, titles, and government acquisition."     },
  { name: "Ngozi Obiora",     role: "Head of Operations",   avatar: "NO", bio: "Managed real estate portfolios across Lagos, Abuja, and Port Harcourt for over 8 years."            },
];

const VALUES = [
  { icon: RiShieldCheckFill,      title: "Trust First",       description: "Every decision we make is filtered through one question — does this make the platform more trustworthy?" },
  { icon: RiLightbulbFlashLine,   title: "Transparency",      description: "No hidden fees, no secret processes. Every verification step is visible to both agents and buyers."       },
  { icon: RiHandHeartLine,        title: "People Over Profit", description: "We exist to protect Nigerians from fraud — not to maximize revenue at the expense of our users."         },
  { icon: RiTeamFill,             title: "Community",         description: "We are building an ecosystem where agents, buyers, and inspectors all thrive together."                   },
];

const MILESTONES = [
  { year: "2023", event: "NRET founded after co-founder loses ₦4.5M to land fraud in Lagos" },
  { year: "2024", event: "First 100 verified agents onboarded across Lagos and Abuja"        },
  { year: "2024", event: "Inspection system launched — first platform in Nigeria to do this" },
  { year: "2025", event: "5,000+ verified listings and ₦2B+ in secured transactions"         },
  { year: "2025", event: "Expanded to 36 states — full national coverage achieved"           },
  { year: "2026", event: "Ownership registry launched — land history now publicly searchable" },
];

// ─── About Page ───────────────────────────────────────────────────────────────
const About = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#F7F4EF]">

      {/* ── Hero ── */}
      <div className="bg-[#0A1628] pt-32 pb-20 px-4 sm:px-8 lg:px-12 relative overflow-hidden">
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full border border-[#C9A84C]/8 pointer-events-none" />
        <div className="absolute -bottom-32 -left-20 w-[500px] h-[500px] rounded-full border border-[#C9A84C]/6 pointer-events-none" />
        <div className="max-w-7xl mx-auto relative z-10">
          <span className="inline-block text-[#C9A84C] text-xs font-bold uppercase tracking-[0.18em] mb-4">
            Our Story
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#F7F4EF] leading-tight max-w-3xl mb-6">
            We Built NRET Because{" "}
            <span className="text-[#C9A84C]">We Got Scammed Too</span>
          </h1>
          <p className="text-[#8A9BB5] text-base sm:text-lg leading-relaxed max-w-2xl mb-8">
            Nigeria's real estate market is worth trillions of naira — yet millions of people lose their life savings every year to fake agents, forged documents, and land sold to multiple buyers. We decided to fix that.
          </p>
          <div className="flex flex-wrap gap-3">
            <button onClick={() => navigate("/browse")}
              className="flex items-center gap-2 bg-[#C9A84C] hover:bg-[#b8943d] active:scale-95 text-[#0A1628] px-6 py-3 rounded-xl font-bold text-sm transition duration-200">
              Browse Properties <HiArrowRight size={16} />
            </button>
            <button onClick={() => navigate("/register")}
              className="flex items-center gap-2 border border-[#F7F4EF]/20 hover:bg-[#F7F4EF]/8 text-[#F7F4EF] px-6 py-3 rounded-xl font-semibold text-sm transition duration-200">
              Register as Agent
            </button>
          </div>
        </div>
      </div>

      {/* ── Mission ── */}
      <section className="py-20 px-4 sm:px-8 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block text-[#C9A84C] text-xs font-bold uppercase tracking-[0.18em] mb-3">
                Our Mission
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-[#0A1628] leading-tight mb-5">
                Making Real Estate Trustworthy for Every Nigerian
              </h2>
              <p className="text-[#6B7280] text-base leading-relaxed mb-4">
                NRET exists to create a Nigeria where anyone — from first-time renters to large property investors — can transact real estate with complete confidence. We verify agents, properties, and ownership records so that trust is built into every transaction from the start.
              </p>
              <p className="text-[#6B7280] text-base leading-relaxed mb-6">
                We are not just a property listing platform. We are a trust infrastructure for the entire Nigerian real estate ecosystem.
              </p>
              <div className="flex flex-wrap gap-3">
                {["Verified Agents", "Fraud Protection", "Ownership Registry", "Inspection Support"].map((b) => (
                  <span key={b}
                    className="flex items-center gap-1.5 bg-[#E8D5A3]/40 border border-[#C9A84C]/20 text-[#0A1628] text-xs font-semibold px-3 py-1.5 rounded-full">
                    <RiShieldCheckFill size={11} className="text-[#C9A84C]" /> {b}
                  </span>
                ))}
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { value: "1,200+", label: "Verified Agents",      sub: "Across Nigeria"         },
                { value: "5,000+", label: "Properties Listed",    sub: "All verified"            },
                { value: "₦2B+",   label: "Transactions Secured", sub: "Zero fraud cases"        },
                { value: "36",     label: "States Covered",       sub: "Full national coverage"  },
              ].map(({ value, label, sub }) => (
                <div key={label}
                  className="bg-white rounded-2xl border border-[#E0D9CF] p-5 hover:border-[#C9A84C]/40 hover:shadow-md transition-all duration-200">
                  <p className="text-3xl font-bold text-[#C9A84C] mb-1">{value}</p>
                  <p className="text-sm font-bold text-[#0A1628]">{label}</p>
                  <p className="text-xs text-[#6B7280] mt-0.5">{sub}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Values ── */}
      <section className="bg-[#0A1628] py-20 px-4 sm:px-8 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-2xl mb-12">
            <span className="inline-block text-[#C9A84C] text-xs font-bold uppercase tracking-[0.18em] mb-3">
              What We Stand For
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#F7F4EF] leading-tight">
              Our Core Values
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {VALUES.map(({ icon: Icon, title, description }) => (
              <div key={title}
                className="bg-[#1A2E4A] rounded-2xl p-6 border border-[#1A2E4A] hover:border-[#C9A84C]/20 transition-all duration-300 group">
                <div className="w-11 h-11 rounded-xl bg-[#0A1628] border border-[#C9A84C]/20 flex items-center justify-center mb-4 group-hover:bg-[#C9A84C] transition-colors duration-300">
                  <Icon size={20} className="text-[#C9A84C] group-hover:text-[#0A1628] transition-colors duration-300" />
                </div>
                <h3 className="font-bold text-[#F7F4EF] text-base mb-2">{title}</h3>
                <p className="text-[#8A9BB5] text-sm leading-relaxed">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Timeline ── */}
      <section className="py-20 px-4 sm:px-8 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-2xl mb-12">
            <span className="inline-block text-[#C9A84C] text-xs font-bold uppercase tracking-[0.18em] mb-3">
              How We Got Here
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#0A1628] leading-tight">
              Our Journey
            </h2>
          </div>
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-4 sm:left-1/2 top-0 bottom-0 w-px bg-[#E0D9CF] -translate-x-1/2" />
            <div className="flex flex-col gap-8">
              {MILESTONES.map(({ year, event }, i) => (
                <div key={i}
                  className={`relative flex items-start gap-6 sm:gap-0 ${i % 2 === 0 ? "sm:flex-row" : "sm:flex-row-reverse"}`}>
                  {/* Dot */}
                  <div className="absolute left-4 sm:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-[#C9A84C] border-2 border-[#F7F4EF] z-10 mt-1.5" />
                  {/* Content */}
                  <div className={`ml-12 sm:ml-0 sm:w-1/2 ${i % 2 === 0 ? "sm:pr-12" : "sm:pl-12"}`}>
                    <div className="bg-white rounded-2xl border border-[#E0D9CF] p-5 hover:border-[#C9A84C]/40 hover:shadow-md transition-all duration-200">
                      <span className="inline-block bg-[#0A1628] text-[#C9A84C] text-xs font-bold px-3 py-1 rounded-full mb-3">
                        {year}
                      </span>
                      <p className="text-[#0A1628] text-sm font-medium leading-relaxed">{event}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Team ── */}
      <section className="bg-[#0A1628] py-20 px-4 sm:px-8 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-2xl mb-12">
            <span className="inline-block text-[#C9A84C] text-xs font-bold uppercase tracking-[0.18em] mb-3">
              The People Behind NRET
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#F7F4EF] leading-tight">
              Meet the Team
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {TEAM.map(({ name, role, avatar, bio }) => (
              <div key={name}
                className="bg-[#1A2E4A] rounded-2xl p-6 border border-[#1A2E4A] hover:border-[#C9A84C]/20 transition-all duration-300 group">
                <div className="w-14 h-14 rounded-2xl bg-[#C9A84C] flex items-center justify-center text-[#0A1628] font-bold text-lg mb-4 group-hover:scale-105 transition-transform duration-300">
                  {avatar}
                </div>
                <h3 className="font-bold text-[#F7F4EF] text-base">{name}</h3>
                <p className="text-[#C9A84C] text-xs font-semibold uppercase tracking-wide mt-0.5 mb-3">{role}</p>
                <p className="text-[#8A9BB5] text-sm leading-relaxed">{bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Location ── */}
      <section className="py-20 px-4 sm:px-8 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-3xl border border-[#E0D9CF] p-8 sm:p-12 flex flex-col lg:flex-row items-center justify-between gap-8">
            <div>
              <span className="inline-block text-[#C9A84C] text-xs font-bold uppercase tracking-[0.18em] mb-3">
                Where We Are
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#0A1628] mb-4">
                Headquartered in Lagos, <br className="hidden sm:block" /> Operating Nationwide
              </h2>
              <div className="flex flex-col gap-2">
                {[
                  "Plot 14, Admiralty Way, Lekki Phase 1, Lagos",
                  "Suite 4B, Wuse 2, Abuja (FCT Office)",
                  "support@nret.ng",
                  "+234 800 NRET SAFE",
                ].map((item) => (
                  <p key={item} className="flex items-center gap-2 text-sm text-[#6B7280]">
                    <RiMapPinLine size={14} className="text-[#C9A84C] flex-shrink-0" /> {item}
                  </p>
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-3 w-full lg:w-auto flex-shrink-0">
              <button onClick={() => navigate("/contact")}
                className="flex items-center justify-center gap-2 bg-[#C9A84C] hover:bg-[#b8943d] active:scale-95 text-[#0A1628] px-8 py-3.5 rounded-xl font-bold text-sm transition duration-200">
                Contact Us <HiArrowRight size={16} />
              </button>
              <button onClick={() => navigate("/register")}
                className="flex items-center justify-center gap-2 border border-[#0A1628]/20 hover:border-[#C9A84C]/50 text-[#0A1628] px-8 py-3.5 rounded-xl font-semibold text-sm transition duration-200">
                <RiTrophyLine size={16} className="text-[#C9A84C]" /> Join Our Team
              </button>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default About;