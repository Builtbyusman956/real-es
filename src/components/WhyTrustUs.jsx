// src/components/WhyTrustUs.jsx
import {
  ShieldCheck, FileSearch, Users, ScrollText,
  MapPin, AlertTriangle,
} from "lucide-react";

const PILLARS = [
  {
    icon: ShieldCheck,
    title: "Verified Agents Only",
    description:
      "Every agent on NRET is verified with NIN, BVN, and face verification. No unverified agent can list a property.",
    gold: true,
  },
  {
    icon: FileSearch,
    title: "Ownership Registry",
    description:
      "Check the full ownership history of any land or property before you pay a kobo. Every property gets a unique ID.",
    gold: false,
  },
  {
    icon: Users,
    title: "Inspection Support",
    description:
      "We assign independent inspectors to visit properties with buyers. What you see online is what you get in person.",
    gold: false,
  },
  {
    icon: ScrollText,
    title: "Tamper-Proof Agreements",
    description:
      "Agreements are signed digitally through the platform. Terms cannot be altered after signing — ever.",
    gold: false,
  },
  {
    icon: AlertTriangle,
    title: "Anti-Fraud System",
    description:
      "Instantly see if a property has been sold to multiple buyers or has a disputed ownership history.",
    gold: false,
  },
  {
    icon: MapPin,
    title: "Government Land Risk",
    description:
      "Know if a land is under government acquisition or near future road and infrastructure projects before you buy.",
    gold: true,
  },
];

const WhyTrustUs = () => (
  <section className="bg-[#0A1628] py-24 px-6 sm:px-8 lg:px-12">
    <div className="max-w-7xl mx-auto">

      {/* Header */}
      <div className="max-w-2xl mb-16">
        <span className="inline-block text-[#C9A84C] text-xs font-bold uppercase tracking-[0.18em] mb-3">
          Why Trust NRET
        </span>
        <h2 className="text-3xl sm:text-4xl font-bold text-[#F7F4EF] leading-tight mb-4">
          We Verify Everything So You Don't Get Scammed
        </h2>
        <p className="text-[#8A9BB5] text-lg leading-relaxed">
          Nigeria's real estate market is full of fraud. We built NRET specifically to fix that — one verified agent, one verified property at a time.
        </p>
      </div>

      {/* Pillars grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {PILLARS.map(({ icon: Icon, title, description, gold }) => (
          <div
            key={title}
            className={`rounded-2xl p-6 border transition-all duration-300 group hover:scale-[1.02]
              ${gold
                ? "bg-[#C9A84C]/10 border-[#C9A84C]/30 hover:border-[#C9A84C]/60"
                : "bg-[#1A2E4A] border-[#1A2E4A] hover:border-[#C9A84C]/20"}`}
          >
            <div className={`w-11 h-11 rounded-xl flex items-center justify-center mb-4
              ${gold ? "bg-[#C9A84C] text-[#0A1628]" : "bg-[#0A1628] border border-[#C9A84C]/20 text-[#C9A84C]"}`}>
              <Icon size={20} />
            </div>
            <h3 className="font-bold text-[#F7F4EF] text-base mb-2">{title}</h3>
            <p className="text-[#8A9BB5] text-sm leading-relaxed">{description}</p>
          </div>
        ))}
      </div>

    </div>
  </section>
);

export default WhyTrustUs;