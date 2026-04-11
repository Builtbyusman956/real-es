// src/pages/dashboard/BuyerFeed.jsx
import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import {
  RiShieldCheckFill,
  RiMapPinLine,
  RiSearchLine,
  RiHeart3Line,
  RiHeart3Fill,
  RiMessage3Line,
  RiShareLine,
  RiCloseLine,
  RiHome4Line,
} from "react-icons/ri";
import {
  MdOutlineBathtub,
  MdBedroomParent,
  MdTune,
} from "react-icons/md";

// ─── Mock Data ────────────────────────────────────────────────────────────────
const AGENT_POSTS = [
  {
    id: 1, agent: "Emeka Okafor", agentAvatar: "EO", agentVerified: true,
    agentRating: 4.8, agentListings: 24, timePosted: "2 hours ago",
    title: "3 Bedroom Flat — Lekki Phase 1",
    description: "Newly renovated 3 bedroom flat in the heart of Lekki Phase 1. Comes with 24/7 power supply, swimming pool, and boys quarters. Perfect for families.",
    price: "₦2,500,000/yr", priceRaw: 2500000, type: "Rent",
    location: "Lekki Phase 1", state: "Lagos",
    beds: 3, baths: 2, size: "180 sqm",
    verified: true, risk: "Low Risk",
    images: [
      "https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80",
    ],
    saves: 34, offers: 12,
  },
  {
    id: 2, agent: "Fatima Bello", agentAvatar: "FB", agentVerified: true,
    agentRating: 4.9, agentListings: 41, timePosted: "5 hours ago",
    title: "Luxury Duplex — Maitama, Abuja",
    description: "Exquisite 5 bedroom duplex in the prestigious Maitama district. Features marble finishes, smart home system, cinema room, and a private pool.",
    price: "₦85,000,000", priceRaw: 85000000, type: "Sale",
    location: "Maitama", state: "Abuja",
    beds: 5, baths: 4, size: "450 sqm",
    verified: true, risk: "Low Risk",
    images: [
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80",
    ],
    saves: 67, offers: 8,
  },
  {
    id: 3, agent: "Tunde Adeyemi", agentAvatar: "TA", agentVerified: true,
    agentRating: 4.6, agentListings: 18, timePosted: "1 day ago",
    title: "Commercial Land — Bodija, Ibadan",
    description: "Prime 600sqm commercial land in the heart of Bodija. C of O available. Excellent for hotel, plaza, or residential development.",
    price: "₦8,000,000", priceRaw: 8000000, type: "Land",
    location: "Bodija", state: "Oyo",
    beds: null, baths: null, size: "600 sqm",
    verified: true, risk: "Low Risk",
    images: [
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80",
    ],
    saves: 21, offers: 5,
  },
  {
    id: 4, agent: "Ngozi Eze", agentAvatar: "NE", agentVerified: false,
    agentRating: 4.2, agentListings: 7, timePosted: "2 days ago",
    title: "Mini Flat — Yaba, Lagos",
    description: "Cozy self-contained mini flat in a serene estate in Yaba. Good road network, close to University of Lagos and major bus stops.",
    price: "₦900,000/yr", priceRaw: 900000, type: "Rent",
    location: "Yaba", state: "Lagos",
    beds: 1, baths: 1, size: "45 sqm",
    verified: false, risk: "Medium Risk",
    images: [
      "https://images.unsplash.com/photo-1554995207-c18c203602cb?auto=format&fit=crop&w=800&q=80",
    ],
    saves: 9, offers: 3,
  },
  {
    id: 5, agent: "Kemi Adesanya", agentAvatar: "KA", agentVerified: true,
    agentRating: 4.7, agentListings: 33, timePosted: "3 days ago",
    title: "4 Bedroom Terrace — Gwarinpa, Abuja",
    description: "Beautiful 4 bedroom terrace duplex in Gwarinpa Estate. Comes with fitted kitchen, POP ceiling, tiled floors and a spacious compound.",
    price: "₦45,000,000", priceRaw: 45000000, type: "Sale",
    location: "Gwarinpa", state: "Abuja",
    beds: 4, baths: 3, size: "280 sqm",
    verified: true, risk: "Low Risk",
    images: [
      "https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=800&q=80",
    ],
    saves: 44, offers: 11,
  },
];

const STATES = ["All States", "Lagos", "Abuja", "Oyo", "Enugu", "Rivers"];
const TYPES  = ["All Types", "Rent", "Sale", "Land"];
const SORT   = ["Newest", "Price: Low to High", "Price: High to Low", "Most Saved"];

const INITIAL = {
  search: "", type: "All Types", state: "All States",
  sort: "Newest", maxPrice: 250000000,
  verifiedOnly: false, lowRiskOnly: false,
};

// ─── Post Card ────────────────────────────────────────────────────────────────
const PostCard = ({ post, saved, onSave }) => {
  const navigate  = useNavigate();
  const [imgIndex, setImgIndex] = useState(0);
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="bg-white rounded-2xl border border-[#E0D9CF] overflow-hidden hover:border-[#C9A84C]/30 transition-all duration-200">

      {/* Agent header */}
      <div className="flex items-center justify-between px-4 pt-4 pb-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#0A1628] flex items-center justify-center text-[#C9A84C] font-bold text-sm flex-shrink-0">
            {post.agentAvatar}
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <p className="text-sm font-bold text-[#0A1628]">{post.agent}</p>
              {post.agentVerified && (
                <RiShieldCheckFill size={13} className="text-[#C9A84C]" />
              )}
            </div>
            <div className="flex items-center gap-2 mt-0.5">
              <span className="text-[10px] text-[#6B7280]">⭐ {post.agentRating}</span>
              <span className="text-[10px] text-[#6B7280]">• {post.agentListings} listings</span>
              <span className="text-[10px] text-[#6B7280]">• {post.timePosted}</span>
            </div>
          </div>
        </div>
        <div className="flex gap-1.5">
          <span className="bg-[#0A1628] text-[#C9A84C] text-[10px] font-bold px-2.5 py-1 rounded-full">
            {post.type}
          </span>
          {post.verified && (
            <span className="bg-[#E8D5A3] text-[#0A1628] text-[10px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1">
              <RiShieldCheckFill size={10} /> Verified
            </span>
          )}
        </div>
      </div>

      {/* Image */}
      <div className="relative">
        <img
          src={post.images[imgIndex]}
          alt={post.title}
          className="w-full h-56 sm:h-64 object-cover"
        />
        {post.images.length > 1 && (
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
            {post.images.map((_, i) => (
              <button key={i} onClick={() => setImgIndex(i)}
                className={`w-1.5 h-1.5 rounded-full transition ${i === imgIndex ? "bg-white" : "bg-white/50"}`}
              />
            ))}
          </div>
        )}
        <div className={`absolute top-3 right-3 text-[10px] font-bold px-2.5 py-1 rounded-full
          ${post.risk === "Low Risk"
            ? "bg-[#0A1628] text-[#C9A84C]"
            : "bg-yellow-100 text-yellow-700"}`}>
          {post.risk}
        </div>
      </div>

      {/* Content */}
      <div className="px-4 pt-3 pb-2">
        <h3 className="font-bold text-[#0A1628] text-base mb-1">{post.title}</h3>
        <p className="text-xs text-[#6B7280] flex items-center gap-1 mb-2">
          <RiMapPinLine size={11} /> {post.location}, {post.state}
        </p>

        {post.beds && (
          <div className="flex gap-4 mb-2">
            <span className="text-xs text-[#6B7280] flex items-center gap-1">
              <MdBedroomParent size={13} /> {post.beds} Beds
            </span>
            <span className="text-xs text-[#6B7280] flex items-center gap-1">
              <MdOutlineBathtub size={13} /> {post.baths} Baths
            </span>
            <span className="text-xs text-[#6B7280] flex items-center gap-1">
              <RiHome4Line size={12} /> {post.size}
            </span>
          </div>
        )}
        {!post.beds && (
          <div className="flex gap-4 mb-2">
            <span className="text-xs text-[#6B7280] flex items-center gap-1">
              <RiHome4Line size={12} /> {post.size}
            </span>
          </div>
        )}

        <p className={`text-sm text-[#6B7280] leading-relaxed ${expanded ? "" : "line-clamp-2"}`}>
          {post.description}
        </p>
        {post.description.length > 100 && (
          <button onClick={() => setExpanded((v) => !v)}
            className="text-[#C9A84C] text-xs font-semibold mt-1 hover:underline">
            {expanded ? "Show less" : "Read more"}
          </button>
        )}

        <p className="text-[#0A1628] font-bold text-lg mt-3">{post.price}</p>
      </div>

      {/* Action bar */}
      <div className="flex items-center justify-between px-4 py-3 border-t border-[#E0D9CF]">
        <div className="flex items-center gap-1">
          <button onClick={() => onSave(post.id)}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl hover:bg-[#F7F4EF] transition text-[#6B7280] hover:text-[#0A1628]">
            {saved
              ? <RiHeart3Fill size={17} className="text-red-500" />
              : <RiHeart3Line size={17} />}
            <span className="text-xs">{post.saves + (saved ? 1 : 0)}</span>
          </button>
          <button onClick={() => navigate("/dashboard/buyer/messages")}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl hover:bg-[#F7F4EF] transition text-[#6B7280] hover:text-[#0A1628]">
            <RiMessage3Line size={17} />
            <span className="text-xs">Message</span>
          </button>
          <button className="flex items-center gap-1.5 px-3 py-2 rounded-xl hover:bg-[#F7F4EF] transition text-[#6B7280] hover:text-[#0A1628]">
            <RiShareLine size={17} />
            <span className="text-xs hidden sm:block">Share</span>
          </button>
        </div>
        <button onClick={() => navigate(`/property/${post.id}`)}
          className="bg-[#0A1628] hover:bg-[#1A2E4A] active:scale-95 text-[#C9A84C] text-xs font-bold px-4 py-2 rounded-xl transition duration-200">
          View Listing
        </button>
      </div>
    </div>
  );
};

// ─── Filter Bar ───────────────────────────────────────────────────────────────
const FilterBar = ({ filters, setFilters, total, showFilters, setShowFilters }) => (
  <div className="bg-white border-b border-[#E0D9CF] px-4 py-3 flex items-center gap-3 overflow-x-auto">
    <button onClick={() => setShowFilters((v) => !v)}
      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-semibold flex-shrink-0 transition
        ${showFilters
          ? "bg-[#0A1628] text-[#C9A84C] border-[#0A1628]"
          : "bg-white text-[#0A1628] border-[#E0D9CF] hover:border-[#C9A84C]/50"}`}>
      <MdTune size={13} /> Filters
    </button>
    {TYPES.map((t) => (
      <button key={t} onClick={() => setFilters((p) => ({ ...p, type: t }))}
        className={`px-3 py-1.5 rounded-xl border text-xs font-semibold flex-shrink-0 transition
          ${filters.type === t
            ? "bg-[#0A1628] text-[#C9A84C] border-[#0A1628]"
            : "bg-white text-[#6B7280] border-[#E0D9CF] hover:border-[#C9A84C]/50"}`}>
        {t}
      </button>
    ))}
    <div className="h-4 w-px bg-[#E0D9CF] flex-shrink-0" />
    {STATES.map((s) => (
      <button key={s} onClick={() => setFilters((p) => ({ ...p, state: s }))}
        className={`px-3 py-1.5 rounded-xl border text-xs font-semibold flex-shrink-0 transition
          ${filters.state === s
            ? "bg-[#0A1628] text-[#C9A84C] border-[#0A1628]"
            : "bg-white text-[#6B7280] border-[#E0D9CF] hover:border-[#C9A84C]/50"}`}>
        {s}
      </button>
    ))}
    <div className="ml-auto flex-shrink-0 text-xs text-[#6B7280] font-medium whitespace-nowrap">
      {total} posts
    </div>
  </div>
);

// ─── Advanced Filters ─────────────────────────────────────────────────────────
const AdvancedFilters = ({ filters, setFilters, onClose }) => (
  <div className="bg-[#F7F4EF] border-b border-[#E0D9CF] px-4 py-4">
    <div className="flex items-center justify-between mb-4">
      <p className="text-sm font-bold text-[#0A1628]">Advanced Filters</p>
      <button onClick={onClose}>
        <RiCloseLine size={18} className="text-[#6B7280]" />
      </button>
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <div>
        <p className="text-[10px] font-bold text-[#6B7280] uppercase tracking-widest mb-2">Sort By</p>
        <div className="flex flex-col gap-1.5">
          {SORT.map((s) => (
            <button key={s} onClick={() => setFilters((p) => ({ ...p, sort: s }))}
              className={`px-3 py-1.5 rounded-xl border text-xs font-semibold text-left transition
                ${filters.sort === s
                  ? "bg-[#0A1628] text-[#C9A84C] border-[#0A1628]"
                  : "bg-white text-[#6B7280] border-[#E0D9CF] hover:border-[#C9A84C]/50"}`}>
              {s}
            </button>
          ))}
        </div>
      </div>
      <div>
        <p className="text-[10px] font-bold text-[#6B7280] uppercase tracking-widest mb-2">
          Max Price — ₦{filters.maxPrice.toLocaleString()}
        </p>
        <input type="range" min={0} max={250000000} step={500000}
          value={filters.maxPrice}
          onChange={(e) => setFilters((p) => ({ ...p, maxPrice: Number(e.target.value) }))}
          className="w-full accent-[#C9A84C]" />
      </div>
      <div>
        <p className="text-[10px] font-bold text-[#6B7280] uppercase tracking-widest mb-2">Listing Quality</p>
        <label className="flex items-center gap-2.5 cursor-pointer mb-3">
          <div onClick={() => setFilters((p) => ({ ...p, verifiedOnly: !p.verifiedOnly }))}
            className={`w-10 h-6 rounded-full flex items-center transition-all duration-300 px-0.5
              ${filters.verifiedOnly ? "bg-[#C9A84C]" : "bg-[#E0D9CF]"}`}>
            <div className={`w-5 h-5 rounded-full bg-white shadow transition-transform duration-300
              ${filters.verifiedOnly ? "translate-x-4" : "translate-x-0"}`} />
          </div>
          <span className="text-sm font-medium text-[#0A1628]">Verified only</span>
        </label>
        <label className="flex items-center gap-2.5 cursor-pointer">
          <div onClick={() => setFilters((p) => ({ ...p, lowRiskOnly: !p.lowRiskOnly }))}
            className={`w-10 h-6 rounded-full flex items-center transition-all duration-300 px-0.5
              ${filters.lowRiskOnly ? "bg-[#C9A84C]" : "bg-[#E0D9CF]"}`}>
            <div className={`w-5 h-5 rounded-full bg-white shadow transition-transform duration-300
              ${filters.lowRiskOnly ? "translate-x-4" : "translate-x-0"}`} />
          </div>
          <span className="text-sm font-medium text-[#0A1628]">Low risk only</span>
        </label>
      </div>
    </div>
  </div>
);

// ─── Main ─────────────────────────────────────────────────────────────────────
const BuyerFeed = () => {
  const [filters,     setFilters]     = useState(INITIAL);
  const [saved,       setSaved]       = useState({});
  const [showFilters, setShowFilters] = useState(false);

  const onSave = (id) => setSaved((p) => ({ ...p, [id]: !p[id] }));

  const filtered = useMemo(() => {
    let list = [...AGENT_POSTS];
    if (filters.search)
      list = list.filter((p) =>
        p.title.toLowerCase().includes(filters.search.toLowerCase()) ||
        p.location.toLowerCase().includes(filters.search.toLowerCase()));
    if (filters.type  !== "All Types")  list = list.filter((p) => p.type  === filters.type);
    if (filters.state !== "All States") list = list.filter((p) => p.state === filters.state);
    if (filters.verifiedOnly)           list = list.filter((p) => p.verified);
    if (filters.lowRiskOnly)            list = list.filter((p) => p.risk === "Low Risk");
    list = list.filter((p) => p.priceRaw <= filters.maxPrice);
    if (filters.sort === "Price: Low to High") list = [...list].sort((a, b) => a.priceRaw - b.priceRaw);
    if (filters.sort === "Price: High to Low") list = [...list].sort((a, b) => b.priceRaw - a.priceRaw);
    if (filters.sort === "Most Saved")          list = [...list].sort((a, b) => b.saves - a.saves);
    return list;
  }, [filters]);

  return (
    <div className="min-h-screen bg-[#F7F4EF]">

      {/* Search */}
      <div className="bg-white border-b border-[#E0D9CF] px-4 py-3">
        <div className="flex items-center gap-2 bg-[#F7F4EF] rounded-xl px-3 py-2 border border-[#E0D9CF] focus-within:border-[#C9A84C] transition">
          <RiSearchLine size={16} className="text-[#6B7280] flex-shrink-0" />
          <input type="text" placeholder="Search listings..."
            value={filters.search}
            onChange={(e) => setFilters((p) => ({ ...p, search: e.target.value }))}
            className="flex-1 text-sm text-[#0A1628] outline-none placeholder-[#6B7280] bg-transparent" />
          {filters.search && (
            <button onClick={() => setFilters((p) => ({ ...p, search: "" }))}>
              <RiCloseLine size={16} className="text-[#6B7280]" />
            </button>
          )}
        </div>
      </div>

      {/* Filter bar */}
      <FilterBar
        filters={filters} setFilters={setFilters}
        total={filtered.length}
        showFilters={showFilters} setShowFilters={setShowFilters}
      />

      {/* Advanced filters */}
      {showFilters && (
        <AdvancedFilters
          filters={filters} setFilters={setFilters}
          onClose={() => setShowFilters(false)}
        />
      )}

      {/* Feed */}
      <div className="max-w-2xl mx-auto px-4 py-6 flex flex-col gap-5">
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center py-24 text-center">
            <div className="w-16 h-16 rounded-2xl bg-[#E8D5A3]/40 border border-[#C9A84C]/20 flex items-center justify-center mb-4">
              <RiHome4Line size={28} className="text-[#C9A84C]" />
            </div>
            <p className="text-[#0A1628] font-bold text-lg">No listings found</p>
            <p className="text-[#6B7280] text-sm mt-1">Try adjusting your filters.</p>
            <button onClick={() => setFilters(INITIAL)}
              className="mt-4 bg-[#C9A84C] hover:bg-[#b8943d] text-[#0A1628] font-bold px-5 py-2.5 rounded-xl text-sm transition">
              Clear Filters
            </button>
          </div>
        ) : (
          filtered.map((post) => (
            <PostCard key={post.id} post={post} saved={saved[post.id]} onSave={onSave} />
          ))
        )}
      </div>
    </div>
  );
};

export default BuyerFeed;