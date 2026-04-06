// src/components/TrustStats.jsx

const STATS = [
  { value: "1,200+",  label: "Verified Agents",       icon: "🛡" },
  { value: "5,000+",  label: "Properties Listed",     icon: "🏠" },
  { value: "₦2B+",    label: "Transactions Secured",  icon: "🔒" },
  { value: "98%",     label: "Fraud-Free Rate",        icon: "✅" },
  { value: "36",      label: "States Covered",         icon: "📍" },
];

const TrustStats = () => {
  return (
    <section className="bg-[#0A1628] py-10 px-6 sm:px-8 lg:px-12">
      <div className="max-w-7xl mx-auto">

        {/* Desktop — single row */}
        <div className="hidden md:flex items-center justify-between gap-4">
          {STATS.map(({ value, label, icon }, i) => (
            <div key={label} className="flex items-center gap-4 flex-1">

              {/* Stat */}
              <div className="flex items-center gap-3">
                <span className="text-2xl">{icon}</span>
                <div>
                  <p className="text-[#C9A84C] text-2xl font-bold leading-none">{value}</p>
                  <p className="text-[#8A9BB5] text-xs mt-0.5">{label}</p>
                </div>
              </div>

              {/* Divider — not after last item */}
              {i < STATS.length - 1 && (
                <div className="flex-1 flex justify-end">
                  <div className="w-px h-8 bg-[#1A2E4A]" />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Mobile — 2 col grid */}
        <div className="md:hidden grid grid-cols-2 gap-4">
          {STATS.map(({ value, label, icon }) => (
            <div key={label}
              className="flex items-center gap-3 bg-[#1A2E4A] rounded-2xl px-4 py-3 border border-[#C9A84C]/10">
              <span className="text-xl">{icon}</span>
              <div>
                <p className="text-[#C9A84C] text-xl font-bold leading-none">{value}</p>
                <p className="text-[#8A9BB5] text-[11px] mt-0.5">{label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom tagline */}
        <div className="mt-8 pt-6 border-t border-[#1A2E4A] flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-[#8A9BB5] text-sm text-center sm:text-left">
            Nigeria's most trusted property verification platform —
            <span className="text-[#C9A84C] font-semibold"> verified agents, real documents, zero fraud.</span>
          </p>
          <div className="flex items-center gap-2 flex-shrink-0">
            {["NIN Verified", "BVN Secured", "CAC Registered"].map((b) => (
              <span key={b}
                className="bg-[#C9A84C]/10 border border-[#C9A84C]/20 text-[#C9A84C] text-[10px] font-semibold px-2.5 py-1 rounded-full">
                ✔ {b}
              </span>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default TrustStats;