// src/components/TrustStats.jsx
import { RiShieldCheckFill } from "react-icons/ri";
import { MdOutlineHomeWork } from "react-icons/md";
import { HiLockClosed } from "react-icons/hi";
import { FaChartLine } from "react-icons/fa";
import { TbMapPin2 } from "react-icons/tb";

const STATS = [
  { value: "1,200+", label: "Verified Agents",      Icon: RiShieldCheckFill },
  { value: "5,000+", label: "Properties Listed",    Icon: MdOutlineHomeWork },
  { value: "₦2B+",   label: "Transactions Secured", Icon: HiLockClosed      },
  { value: "98%",    label: "Fraud-Free Rate",       Icon: FaChartLine       },
  { value: "36",     label: "States Covered",        Icon: TbMapPin2         },
];

const TrustStats = () => {
  return (
    <section className="bg-[#0A1628] py-10 px-6 sm:px-8 lg:px-12">
      <div className="max-w-7xl mx-auto">

        {/* Desktop — single row */}
        <div className="hidden md:grid grid-cols-5 gap-8">
          {STATS.map(({ value, label, Icon }) => (
            <div key={label} className="text-center">
              <Icon size={32} className="text-[#C9A84C] mx-auto mb-3" />
              <p className="text-[#C9A84C] text-3xl font-bold leading-none mb-1">{value}</p>
              <p className="text-[#8A9BB5] text-sm">{label}</p>
            </div>
          ))}
        </div>

        {/* Mobile — 2 col grid */}
        <div className="md:hidden grid grid-cols-2 gap-4">
          {STATS.map(({ value, label, Icon }) => (
            <div key={label} className="text-center py-4">
              <Icon size={28} className="text-[#C9A84C] mx-auto mb-2" />
              <p className="text-[#C9A84C] text-2xl font-bold leading-none mb-1">{value}</p>
              <p className="text-[#8A9BB5] text-xs">{label}</p>
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
                className="bg-[#C9A84C]/10 border border-[#C9A84C]/20 text-[#C9A84C] text-[10px] font-semibold px-2.5 py-1">
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