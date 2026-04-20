// src/components/Hero.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  RiSearchLine, 
  RiHome4Line, 
  RiMapPinLine, 
  RiHotelBedLine, 
  RiMoneyDollarCircleLine,
  RiArrowRightLine,
  RiAddLine,
  RiBuildingLine
} from "react-icons/ri";
import { MdOutlineBathtub } from "react-icons/md";
import { HiChevronDown } from "react-icons/hi";
import bgImg from "../assets/realestate.avif";

const Hero = () => {
  const navigate = useNavigate();
  const [searchData, setSearchData] = useState({
    type: "Buy",
    propertyType: "All Types",
    location: "",
    beds: "Any",
    baths: "Any",
    priceRange: "Any Price"
  });

  const handleSearch = (e) => {
    e.preventDefault();
    const query = new URLSearchParams({
      type: searchData.type,
      property: searchData.propertyType,
      location: searchData.location,
      beds: searchData.beds,
      baths: searchData.baths,
      price: searchData.priceRange
    }).toString();
    navigate(`/browse?${query}`);
  };

  const propertyTypes = ["All Types", "Apartment", "House", "Land", "Commercial", "Duplex", "Bungalow"];
  const bedOptions    = ["Any", "1", "2", "3", "4", "5+"];
  const bathOptions   = ["Any", "1", "2", "3", "4+"];
  const priceRanges   = ["Any Price", "₦0 - ₦500K", "₦500K - ₦1M", "₦1M - ₦5M", "₦5M - ₦10M", "₦10M - ₦50M", "₦50M+"];

  return (
    <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden">

      {/* Background */}
      <div className="absolute inset-0">
        <img src={bgImg} alt="Real estate background" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A1628]/95 via-[#0A1628]/75 to-[#0A1628]/40" />
      </div>

      {/* Content — extra bottom padding so content never overlaps scroll indicator */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 py-20 pb-36">

        <div className="max-w-5xl mx-auto text-center">

          {/* Badge */}
          <div className="inline-flex items-center gap-2 border border-[#C9A84C]/40 bg-[#C9A84C]/10 text-[#C9A84C] text-xs font-semibold uppercase tracking-widest px-4 py-2 rounded-full mb-6 backdrop-blur-sm">
            <RiBuildingLine size={14} />
            Nigeria's #1 Verified Property Platform
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-[#F7F4EF] leading-tight mb-4 tracking-tight">
            Find Your Perfect <span className="text-[#C9A84C]">Property</span>
          </h1>

          <p className="text-[#8A9BB5] text-lg md:text-xl mb-10 max-w-2xl mx-auto leading-relaxed">
            Verified listings, trusted agents, secure transactions.
            Search thousands of properties across Nigeria.
          </p>

          {/* Search Bar */}
          <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-2 shadow-2xl">

            {/* Toggle Buy/Rent/Land */}
            <div className="flex gap-1 mb-2 p-1">
              {["Buy", "Rent", "Land"].map((type) => (
                <button
                  key={type}
                  onClick={() => setSearchData({ ...searchData, type })}
                  className={`flex-1 py-2.5 text-sm font-semibold rounded-xl transition-all duration-200 ${
                    searchData.type === type
                      ? "bg-[#C9A84C] text-[#0A1628]"
                      : "text-[#8A9BB5] hover:text-[#F7F4EF] hover:bg-white/5"
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>

            {/* Search Inputs */}
            <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-12 gap-2">

              {/* Property Type */}
              <div className="md:col-span-2 relative group">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[#C9A84C]">
                  <RiHome4Line size={18} />
                </div>
                <select
                  value={searchData.propertyType}
                  onChange={(e) => setSearchData({ ...searchData, propertyType: e.target.value })}
                  className="w-full pl-10 pr-8 py-3.5 bg-[#0A1628] border border-[#1A2E4A] rounded-xl text-[#F7F4EF] text-sm font-medium focus:border-[#C9A84C] focus:outline-none appearance-none cursor-pointer hover:bg-[#1A2E4A] transition-colors"
                >
                  {propertyTypes.map(type => <option key={type} value={type}>{type}</option>)}
                </select>
                <HiChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6B7280] pointer-events-none" size={16} />
              </div>

              {/* Location */}
              <div className="md:col-span-4 relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[#C9A84C]">
                  <RiMapPinLine size={18} />
                </div>
                <input
                  type="text"
                  placeholder="Enter location (e.g., Lekki, Abuja, Ibadan)"
                  value={searchData.location}
                  onChange={(e) => setSearchData({ ...searchData, location: e.target.value })}
                  className="w-full pl-10 pr-4 py-3.5 bg-[#0A1628] border border-[#1A2E4A] rounded-xl text-[#F7F4EF] text-sm font-medium placeholder-[#6B7280] focus:border-[#C9A84C] focus:outline-none hover:bg-[#1A2E4A] transition-colors"
                />
              </div>

              {/* Beds */}
              <div className="md:col-span-2 relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[#C9A84C]">
                  <RiHotelBedLine size={18} />
                </div>
                <select
                  value={searchData.beds}
                  onChange={(e) => setSearchData({ ...searchData, beds: e.target.value })}
                  className="w-full pl-10 pr-8 py-3.5 bg-[#0A1628] border border-[#1A2E4A] rounded-xl text-[#F7F4EF] text-sm font-medium focus:border-[#C9A84C] focus:outline-none appearance-none cursor-pointer hover:bg-[#1A2E4A] transition-colors"
                >
                  {bedOptions.map(opt => <option key={opt} value={opt}>{opt} Beds</option>)}
                </select>
                <HiChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6B7280] pointer-events-none" size={16} />
              </div>

              {/* Baths */}
              <div className="md:col-span-2 relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[#C9A84C]">
                  <MdOutlineBathtub size={18} />
                </div>
                <select
                  value={searchData.baths}
                  onChange={(e) => setSearchData({ ...searchData, baths: e.target.value })}
                  className="w-full pl-10 pr-8 py-3.5 bg-[#0A1628] border border-[#1A2E4A] rounded-xl text-[#F7F4EF] text-sm font-medium focus:border-[#C9A84C] focus:outline-none appearance-none cursor-pointer hover:bg-[#1A2E4A] transition-colors"
                >
                  {bathOptions.map(opt => <option key={opt} value={opt}>{opt} Baths</option>)}
                </select>
                <HiChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6B7280] pointer-events-none" size={16} />
              </div>

              {/* Price */}
              <div className="md:col-span-2 relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[#C9A84C]">
                  <RiMoneyDollarCircleLine size={18} />
                </div>
                <select
                  value={searchData.priceRange}
                  onChange={(e) => setSearchData({ ...searchData, priceRange: e.target.value })}
                  className="w-full pl-10 pr-8 py-3.5 bg-[#0A1628] border border-[#1A2E4A] rounded-xl text-[#F7F4EF] text-sm font-medium focus:border-[#C9A84C] focus:outline-none appearance-none cursor-pointer hover:bg-[#1A2E4A] transition-colors"
                >
                  {priceRanges.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                </select>
                <HiChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6B7280] pointer-events-none" size={16} />
              </div>

              {/* Search Button */}
              <div className="md:col-span-12 mt-2">
                <button
                  type="submit"
                  className="w-full md:w-auto md:px-12 py-4 bg-[#C9A84C] hover:bg-[#b8943d] text-[#0A1628] font-bold text-base rounded-xl transition-all duration-200 flex items-center justify-center gap-2 hover:shadow-[0_0_30px_rgba(201,168,76,0.4)] hover:scale-[1.02] active:scale-[0.98]"
                >
                  <RiSearchLine size={20} />
                  Search Properties
                  <RiArrowRightLine size={18} className="hidden md:inline" />
                </button>
              </div>
            </form>
          </div>

          {/* Post a Request */}
          <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-4 text-sm">
            <span className="text-[#8A9BB5]">Can't find what you're looking for?</span>
            <button
              onClick={() => navigate("/post-request")}
              className="group flex items-center gap-2 text-[#C9A84C] font-semibold hover:text-[#e8c87a] transition-colors"
            >
              <span className="flex items-center gap-1.5 px-4 py-2 border border-[#C9A84C]/30 rounded-full group-hover:bg-[#C9A84C]/10 group-hover:border-[#C9A84C] transition-all">
                <RiAddLine size={18} />
                Post a Request
              </span>
              <span className="hidden sm:inline text-[#6B7280] font-normal">
                Let agents come to you
              </span>
            </button>
          </div>

          {/* Quick Stats */}
          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
            {[
              { value: "5,000+", label: "Properties" },
              { value: "1,200+", label: "Verified Agents" },
              { value: "₦2B+",   label: "Transactions" },
              { value: "0",      label: "Fraud Cases" },
            ].map((stat, idx) => (
              <div key={idx} className="text-center p-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl">
                <p className="text-2xl font-bold text-[#C9A84C] mb-1">{stat.value}</p>
                <p className="text-xs text-[#8A9BB5] uppercase tracking-wider">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Trust badges */}
          <div className="flex flex-wrap justify-center gap-3 mt-8">
            {["Verified Agents", "Secure Payments", "Fraud Protection", "24/7 Support"].map((badge) => (
              <span
                key={badge}
                className="flex items-center gap-1.5 text-[#8A9BB5] text-xs font-medium px-3 py-1.5 bg-white/5 border border-white/10 rounded-full"
              >
                <svg className="w-3.5 h-3.5 text-[#C9A84C]" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                {badge}
              </span>
            ))}
          </div>

        </div>
      </div>

      {/* Scroll indicator — lifted higher with bottom-12, more gap from content above */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 opacity-50 hover:opacity-90 transition-opacity duration-300 cursor-pointer">
        <span className="text-[#8A9BB5] text-[10px] uppercase tracking-[0.2em]">Scroll to explore</span>
        <div className="w-6 h-10 border border-[#C9A84C]/40 rounded-full flex justify-center pt-2">
          <div className="w-1 h-2 bg-[#C9A84C] rounded-full animate-bounce" />
        </div>
      </div>

    </section>
  );
};

export default Hero;