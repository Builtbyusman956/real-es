// src/components/HowItWorks.jsx
import { Search, ShieldCheck, FileText, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const STEPS = [
  {
    number: "01",
    icon: Search,
    title: "Search & Discover",
    description:
      "Browse thousands of verified properties across Nigeria. Filter by location, price, type, and size. Every listing is uploaded by a verified agent with real documents.",
    bullets: ["Rent or buy options", "Filter by state & LGA", "View images, videos & documents"],
  },
  {
    number: "02",
    icon: ShieldCheck,
    title: "Verify Everything",
    description:
      "Before you commit a kobo, verify the agent, the property, and the ownership record. Our platform checks NIN, BVN, and physical location so you never get scammed.",
    bullets: ["Confirm agent identity", "Check ownership history", "Spot government land risks"],
  },
  {
    number: "03",
    icon: FileText,
    title: "Transact Safely",
    description:
      "Book an inspection, sign a tamper-proof agreement, and complete your transaction all within the platform. Terms can never be changed after signing.",
    bullets: ["Platform-assigned inspectors", "Secure digital agreements", "Full transaction record"],
  },
];

const HowItWorks = () => {
  return (
    <section className="bg-[#F7F4EF] py-24 px-6 sm:px-8 lg:px-12">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="max-w-2xl mb-16">
          <span className="inline-block text-[#C9A84C] text-xs font-bold uppercase tracking-[0.18em] mb-3">
            How It Works
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#0A1628] leading-tight mb-4">
            From Search to Signed Fully Protected
          </h2>
          <p className="text-[#6B7280] text-lg leading-relaxed">
            We built every step of the process around one goal: making sure you
            never lose money to fraud in Nigerian real estate again.
          </p>
        </div>

        {/* Steps */}
        <div className="grid md:grid-cols-3 gap-8 relative">

          {/* Connector line */}
          <div className="hidden md:block absolute top-10 left-[calc(16.66%+1rem)] right-[calc(16.66%+1rem)] h-px bg-[#E0D9CF] z-0" />

          {STEPS.map(({ number, icon: Icon, title, description, bullets }, i) => (
            <div key={number} className="relative z-10 flex flex-col">

              <div className="bg-white rounded-2xl p-6 border border-[#E0D9CF] hover:border-[#C9A84C]/50 hover:shadow-lg transition-all duration-300 flex flex-col h-full group">

                {/* Icon + Number */}
                <div className="flex items-center justify-between mb-5">
                  <div className="w-12 h-12 rounded-xl bg-[#0A1628] flex items-center justify-center text-[#C9A84C] group-hover:bg-[#C9A84C] group-hover:text-[#0A1628] transition">
                    <Icon size={22} />
                  </div>
                  <span className="text-4xl font-bold text-[#E0D9CF] group-hover:text-[#E8D5A3] transition">
                    {number}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-[#0A1628] mb-2">{title}</h3>
                <p className="text-sm text-[#6B7280] mb-4">{description}</p>

                <ul className="mt-auto flex flex-col gap-2">
                  {bullets.map((b) => (
                    <li key={b} className="flex items-center gap-2 text-xs text-[#6B7280]">
                      <span className="w-4 h-4 rounded-full bg-[#E8D5A3] flex items-center justify-center">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#C9A84C]" />
                      </span>
                      {b}
                    </li>
                  ))}
                </ul>

              </div>

              {/* Mobile arrow */}
              {i < STEPS.length - 1 && (
                <div className="md:hidden flex justify-center my-4 text-[#C9A84C]">
                  <ArrowRight size={20} className="rotate-90" />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-14 flex flex-col sm:flex-row items-center justify-between gap-6 bg-[#0A1628] rounded-2xl px-8 py-6">
          <div>
            <p className="text-[#F7F4EF] font-bold text-lg">Ready to find your property safely?</p>
            <p className="text-[#8A9BB5] text-sm mt-0.5">Join thousands of Nigerians who trust our platform.</p>
          </div>

          <div className="flex gap-3 flex-shrink-0 flex-wrap">
            <Link
              to="/browse"
              className="bg-[#C9A84C] hover:bg-[#b8943d] active:scale-95 text-[#0A1628] px-5 py-2.5 rounded-xl text-sm font-bold transition"
            >
              Browse Properties
            </Link>

            <Link
              to="/register"
              className="border border-[#F7F4EF]/20 hover:bg-[#F7F4EF]/10 text-[#F7F4EF] px-5 py-2.5 rounded-xl text-sm font-semibold transition"
            >
              Register as Agent
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
};

export default HowItWorks;