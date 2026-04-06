// src/components/CTABanner.jsx
import { useNavigate } from "react-router-dom";
import { ShieldCheck, Home } from "lucide-react";

const CTABanner = () => {
  const navigate = useNavigate();

  return (
    <section className="bg-[#0A1628] py-20 sm:py-28 px-4 sm:px-8 lg:px-12 relative overflow-hidden">

      {/* Decorative rings */}
      <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full border border-[#C9A84C]/8 pointer-events-none" />
      <div className="absolute -bottom-32 -left-20 w-[500px] h-[500px] rounded-full border border-[#C9A84C]/6 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full border border-[#C9A84C]/4 pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">

        {/* Top label */}
        <div className="flex justify-center mb-8">
          <span className="bg-[#C9A84C]/10 border border-[#C9A84C]/20 text-[#C9A84C] text-[11px] font-bold uppercase tracking-[0.18em] px-5 py-2 rounded-full">
            Get Started Today
          </span>
        </div>

        {/* Heading */}
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#F7F4EF] leading-tight text-center mb-5 max-w-3xl mx-auto">
          Ready to Buy, Rent, or List{" "}
          <span className="text-[#C9A84C]">Without Fear?</span>
        </h2>

        {/* Subtext */}
        <p className="text-[#8A9BB5] text-base sm:text-lg leading-relaxed text-center max-w-xl mx-auto mb-12">
          Join thousands of Nigerians using NRET to find, verify, and secure
          real estate transactions safely — no fraud, no stress.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-4 sm:gap-5 max-w-md sm:max-w-none mx-auto mb-16">
          <button
            onClick={() => navigate("/browse")}
            className="flex items-center justify-center gap-3 bg-[#C9A84C] hover:bg-[#b8943d] active:scale-95 text-[#0A1628] px-10 py-4 rounded-2xl font-bold text-base transition duration-200"
          >
            <Home size={20} />
            Browse Properties
          </button>
          <button
            onClick={() => navigate("/register")}
            className="flex items-center justify-center gap-3 border-2 border-[#F7F4EF]/20 hover:border-[#C9A84C]/50 hover:bg-[#F7F4EF]/5 active:scale-95 text-[#F7F4EF] px-10 py-4 rounded-2xl font-semibold text-base transition duration-200"
          >
            <ShieldCheck size={20} />
            Register as Agent
          </button>
        </div>

        {/* Divider */}
        <div className="border-t border-[#1A2E4A] mb-12" />

        {/* Stats row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 sm:gap-0 sm:divide-x sm:divide-[#1A2E4A]">
          {[
            { value: "1,200+", label: "Verified Agents"      },
            { value: "5,000+", label: "Properties Listed"    },
            { value: "₦2B+",   label: "Transactions Secured" },
            { value: "98%",    label: "Fraud-Free Rate"       },
          ].map(({ value, label }) => (
            <div key={label} className="flex flex-col items-center text-center px-4 gap-1">
              <p className="text-[#C9A84C] text-3xl sm:text-4xl font-bold">{value}</p>
              <p className="text-[#8A9BB5] text-sm">{label}</p>
            </div>
          ))}
        </div>

        {/* Trust chips */}
        <div className="flex flex-wrap items-center justify-center gap-3 mt-12">
          {["NIN Verified", "BVN Secured", "CAC Registered", "Fraud Protected"].map((b) => (
            <span
              key={b}
              className="bg-[#F7F4EF]/5 border border-[#F7F4EF]/10 text-[#8A9BB5] text-xs font-medium px-4 py-1.5 rounded-full"
            >
              ✔ {b}
            </span>
          ))}
        </div>

      </div>
    </section>
  );
};

export default CTABanner;