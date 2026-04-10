// src/pages/Browse.jsx
import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import {
  RiShieldCheckFill, RiMapPinLine, RiSearchLine,
  RiFilter3Line, RiCloseLine, RiGridFill,
  RiListCheck2, RiHeart3Line, RiHeart3Fill,
  RiEyeLine, RiHotelBedLine, RiHome4Line,
} from "react-icons/ri";
import { MdOutlineBathtub } from "react-icons/md";
import { HiChevronDown } from "react-icons/hi";
import { TbSortDescending } from "react-icons/tb";

// ─── Mock Data ────────────────────────────────────────────────────────────────
const PROPERTIES = [
  { id: 1,  title: "3 Bedroom Flat",           location: "Lekki Phase 1",  state: "Lagos", price: 2500000,   priceLabel: "₦2,500,000/yr",  type: "Rent", beds: 3,    baths: 2,    views: 340, verified: true,  image: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=800&q=80", agent: "Emeka Okafor"   },
  { id: 2,  title: "Luxury Duplex",             location: "Maitama",        state: "Abuja", price: 85000000,  priceLabel: "₦85,000,000",     type: "Sale", beds: 5,    baths: 4,    views: 210, verified: true,  image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80", agent: "Fatima Bello"   },
  { id: 3,  title: "Commercial Land (600sqm)",  location: "Bodija",         state: "Oyo",   price: 8000000,   priceLabel: "₦8,000,000",      type: "Land", beds: null, baths: null, views: 180, verified: true,  image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80", agent: "Tunde Adeyemi"  },
  { id: 4,  title: "Mini Flat",                 location: "Yaba",           state: "Lagos", price: 900000,    priceLabel: "₦900,000/yr",     type: "Rent", beds: 1,    baths: 1,    views: 95,  verified: true,  image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80", agent: "Ngozi Eze"      },
  { id: 5,  title: "4 Bedroom Terrace",         location: "Gwarinpa",       state: "Abuja", price: 45000000,  priceLabel: "₦45,000,000",     type: "Sale", beds: 4,    baths: 3,    views: 178, verified: true,  image: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=800&q=80", agent: "Kemi Adesanya"  },
  { id: 6,  title: "Residential Land (300sqm)", location: "Agodi",          state: "Oyo",   price: 3500000,   priceLabel: "₦3,500,000",      type: "Land", beds: null, baths: null, views: 134, verified: false, image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80", agent: "Dele Ogun"      },
  { id: 7,  title: "2 Bedroom Apartment",       location: "Victoria Island", state: "Lagos", price: 3200000,  priceLabel: "₦3,200,000/yr",   type: "Rent", beds: 2,    baths: 2,    views: 290, verified: true,  image: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=800&q=80", agent: "Amaka Obi"      },
  { id: 8,  title: "5 Bedroom Mansion",         location: "Banana Island",  state: "Lagos", price: 250000000, priceLabel: "₦250,000,000",    type: "Sale", beds: 5,    baths: 6,    views: 520, verified: true,  image: "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=800&q=80", agent: "Chukwudi Eze"   },
  { id: 9,  title: "Self-Con Room",             location: "Surulere",       state: "Lagos", price: 400000,    priceLabel: "₦400,000/yr",     type: "Rent", beds: 1,    baths: 1,    views: 67,  verified: false, image: "https://images.unsplash.com/photo-1554995207-c18c203602cb?auto=format&fit=crop&w=800&q=80", agent: "Tobi Lawson"    },
  { id: 10, title: "3 Bedroom Bungalow",        location: "Trans-Ekulu",    state: "Enugu", price: 12000000,  priceLabel: "₦12,000,000",     type: "Sale", beds: 3,    baths: 2,    views: 145, verified: true,  image: "https://plus.unsplash.com/premium_photo-1689609950112-d66095626efb?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", agent: "Ifeoma Nwosu"   },
  { id: 11, title: "Office Space (200sqm)",     location: "Wuse 2",         state: "Abuja", price: 6000000,   priceLabel: "₦6,000,000/yr",   type: "Rent", beds: null, baths: null, views: 88,  verified: true,  image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80", agent: "Bola Tinubu Jr" },
  { id: 12, title: "Land (1 Plot)",             location: "Ikoyi",          state: "Lagos", price: 120000000, priceLabel: "₦120,000,000",    type: "Land", beds: null, baths: null, views: 310, verified: true,  image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80", agent: "Sandra Okeke"   },
];

const STATES       = ["All States", "Lagos", "Abuja", "Oyo", "Enugu", "Rivers", "Kano", "Delta"];
const TYPES        = ["All Types", "Rent", "Sale", "Land"];
const BEDROOMS     = ["Any", "1", "2", "3", "4", "5+"];
const SORT_OPTIONS = ["Newest", "Price: Low to High", "Price: High to Low", "Most Viewed"];

const INITIAL_FILTERS = {
  search: "", type: "All Types", state: "All States",
  beds: "Any", minPrice: 0, maxPrice: 250000000,
  verifiedOnly: false,
};

// ─── Filter Panel ─────────────────────────────────────────────────────────────
const FilterPanel = ({ filters, setFilters, onClear }) => {
  const set = (key, value) => setFilters((p) => ({ ...p, [key]: value }));

  return (
    <div className="flex flex-col gap-6">

      <div>
        <p className="text-xs font-bold text-[#0A1628] uppercase tracking-widest mb-3">Property Type</p>
        <div className="flex flex-wrap gap-2">
          {TYPES.map((t) => (
            <button key={t} onClick={() => set("type", t)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition duration-200
                ${filters.type === t
                  ? "bg-[#0A1628] text-[#C9A84C] border-[#0A1628]"
                  : "bg-white text-[#6B7280] border-[#E0D9CF] hover:border-[#C9A84C]/50"}`}>
              {t}
            </button>
          ))}
        </div>
      </div>

      <div>
        <p className="text-xs font-bold text-[#0A1628] uppercase tracking-widest mb-3">State</p>
        <div className="flex flex-wrap gap-2">
          {STATES.map((s) => (
            <button key={s} onClick={() => set("state", s)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition duration-200
                ${filters.state === s
                  ? "bg-[#0A1628] text-[#C9A84C] border-[#0A1628]"
                  : "bg-white text-[#6B7280] border-[#E0D9CF] hover:border-[#C9A84C]/50"}`}>
              {s}
            </button>
          ))}
        </div>
      </div>

      <div>
        <p className="text-xs font-bold text-[#0A1628] uppercase tracking-widest mb-3">Bedrooms</p>
        <div className="flex gap-2 flex-wrap">
          {BEDROOMS.map((b) => (
            <button key={b} onClick={() => set("beds", b)}
              className={`w-10 h-10 rounded-xl text-xs font-bold border transition duration-200
                ${filters.beds === b
                  ? "bg-[#0A1628] text-[#C9A84C] border-[#0A1628]"
                  : "bg-white text-[#6B7280] border-[#E0D9CF] hover:border-[#C9A84C]/50"}`}>
              {b}
            </button>
          ))}
        </div>
      </div>

      <div>
        <p className="text-xs font-bold text-[#0A1628] uppercase tracking-widest mb-1">Price Range</p>
        <p className="text-[#C9A84C] text-xs font-semibold mb-3">
          ₦{filters.minPrice.toLocaleString()} — ₦{filters.maxPrice.toLocaleString()}
        </p>
        <div className="flex flex-col gap-3">
          <div>
            <p className="text-[10px] text-[#6B7280] mb-1.5">Min Price</p>
            <input type="range" min={0} max={250000000} step={500000}
              value={filters.minPrice}
              onChange={(e) => set("minPrice", Number(e.target.value))}
              className="w-full accent-[#C9A84C]" />
          </div>
          <div>
            <p className="text-[10px] text-[#6B7280] mb-1.5">Max Price</p>
            <input type="range" min={0} max={250000000} step={500000}
              value={filters.maxPrice}
              onChange={(e) => set("maxPrice", Number(e.target.value))}
              className="w-full accent-[#C9A84C]" />
          </div>
        </div>
      </div>

      <label className="flex items-center gap-3 cursor-pointer">
        <div onClick={() => set("verifiedOnly", !filters.verifiedOnly)}
          className={`w-10 h-6 rounded-full flex items-center transition-all duration-300 px-0.5
            ${filters.verifiedOnly ? "bg-[#C9A84C]" : "bg-[#E0D9CF]"}`}>
          <div className={`w-5 h-5 rounded-full bg-white shadow transition-transform duration-300
            ${filters.verifiedOnly ? "translate-x-4" : "translate-x-0"}`} />
        </div>
        <span className="text-sm font-medium text-[#0A1628]">Verified only</span>
      </label>

      <button onClick={onClear}
        className="w-full border border-[#E0D9CF] hover:border-red-300 hover:text-red-400 text-[#6B7280] text-sm font-semibold py-2.5 rounded-xl transition duration-200">
        Clear All Filters
      </button>
    </div>
  );
};

// ─── Grid Card ────────────────────────────────────────────────────────────────
const GridCard = ({ property, liked, toggleLike }) => {
  const navigate = useNavigate();
  return (
    <div onClick={() => navigate(`/property/${property.id}`)}
      className="bg-white rounded-2xl border border-[#E0D9CF] overflow-hidden hover:border-[#C9A84C]/50 hover:shadow-xl transition-all duration-300 cursor-pointer group">
      <div className="relative h-48 overflow-hidden">
        <img src={property.image} alt={property.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        <div className="absolute top-3 left-3 flex gap-1.5">
          <span className="bg-[#0A1628] text-[#C9A84C] text-[10px] font-bold px-2.5 py-1 rounded-full">
            {property.type}
          </span>
          {property.verified && (
            <span className="bg-[#C9A84C] text-[#0A1628] text-[10px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1">
              <RiShieldCheckFill size={10} /> Verified
            </span>
          )}
        </div>
        <button
          onClick={(e) => { e.stopPropagation(); toggleLike(property.id); }}
          className="absolute top-3 right-3 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center transition hover:scale-110">
          {liked
            ? <RiHeart3Fill size={16} className="text-red-500" />
            : <RiHeart3Line size={16} className="text-[#6B7280]" />}
        </button>
        <div className="absolute bottom-3 right-3 bg-black/50 backdrop-blur-sm text-white text-[10px] px-2 py-1 rounded-full flex items-center gap-1">
          <RiEyeLine size={11} /> {property.views}
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-bold text-[#0A1628] text-sm mb-1 truncate">{property.title}</h3>
        <p className="text-xs text-[#6B7280] flex items-center gap-1 mb-3">
          <RiMapPinLine size={11} /> {property.location}, {property.state}
        </p>
        {property.beds && (
          <div className="flex gap-3 mb-3">
            <span className="text-xs text-[#6B7280] flex items-center gap-1">
              <RiHotelBedLine size={12} /> {property.beds} Beds
            </span>
            <span className="text-xs text-[#6B7280] flex items-center gap-1">
              <MdOutlineBathtub size={12} /> {property.baths} Baths
            </span>
          </div>
        )}
        <div className="flex items-center justify-between pt-3 border-t border-[#E0D9CF]">
          <p className="text-[#0A1628] font-bold text-sm">{property.priceLabel}</p>
          <div className="flex items-center gap-1.5 text-xs text-[#6B7280]">
            <div className="w-6 h-6 rounded-full bg-[#0A1628] flex items-center justify-center text-[#C9A84C] text-[8px] font-bold flex-shrink-0">
              {property.agent.split(" ").map((n) => n[0]).join("")}
            </div>
            <span className="truncate max-w-[80px]">{property.agent.split(" ")[0]}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── List Card ────────────────────────────────────────────────────────────────
const ListCard = ({ property, liked, toggleLike }) => {
  const navigate = useNavigate();
  return (
    <div onClick={() => navigate(`/property/${property.id}`)}
      className="bg-white rounded-2xl border border-[#E0D9CF] overflow-hidden hover:border-[#C9A84C]/50 hover:shadow-lg transition-all duration-300 cursor-pointer group flex">
      <div className="relative w-36 sm:w-52 flex-shrink-0 overflow-hidden">
        <img src={property.image} alt={property.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        <div className="absolute top-2 left-2">
          <span className="bg-[#0A1628] text-[#C9A84C] text-[9px] font-bold px-2 py-0.5 rounded-full">
            {property.type}
          </span>
        </div>
      </div>
      <div className="flex-1 p-4 flex flex-col justify-between min-w-0">
        <div>
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-bold text-[#0A1628] text-sm truncate">{property.title}</h3>
            <button
              onClick={(e) => { e.stopPropagation(); toggleLike(property.id); }}
              className="flex-shrink-0 w-7 h-7 rounded-full border border-[#E0D9CF] flex items-center justify-center hover:border-red-300 transition">
              {liked
                ? <RiHeart3Fill size={14} className="text-red-500" />
                : <RiHeart3Line size={14} className="text-[#6B7280]" />}
            </button>
          </div>
          <p className="text-xs text-[#6B7280] flex items-center gap-1 mt-1">
            <RiMapPinLine size={11} /> {property.location}, {property.state}
          </p>
          {property.beds && (
            <div className="flex gap-3 mt-2">
              <span className="text-xs text-[#6B7280] flex items-center gap-1"><RiBedLine size={11} /> {property.beds} Beds</span>
              <span className="text-xs text-[#6B7280] flex items-center gap-1"><MdOutlineBathtub size={11} /> {property.baths} Baths</span>
              <span className="text-xs text-[#6B7280] flex items-center gap-1"><RiEyeLine size={11} /> {property.views}</span>
            </div>
          )}
        </div>
        <div className="flex items-center justify-between mt-3 pt-3 border-t border-[#E0D9CF]">
          <p className="text-[#0A1628] font-bold text-sm">{property.priceLabel}</p>
          {property.verified && (
            <span className="flex items-center gap-1 text-[10px] font-bold text-[#C9A84C] bg-[#E8D5A3]/40 px-2 py-0.5 rounded-full">
              <RiShieldCheckFill size={10} /> Verified
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

// ─── Main ─────────────────────────────────────────────────────────────────────
const Browse = () => {
  const [filters,    setFilters]    = useState(INITIAL_FILTERS);
  const [view,       setView]       = useState("grid");
  const [sort,       setSort]       = useState("Newest");
  const [showSort,   setShowSort]   = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);
  const [liked,      setLiked]      = useState({});

  const toggleLike   = (id) => setLiked((p) => ({ ...p, [id]: !p[id] }));
  const clearFilters = () => setFilters(INITIAL_FILTERS);

  const activeFilterCount = [
    filters.type !== "All Types",
    filters.state !== "All States",
    filters.beds !== "Any",
    filters.minPrice > 0,
    filters.maxPrice < 250000000,
    filters.verifiedOnly,
  ].filter(Boolean).length;

  const filtered = useMemo(() => {
    let list = [...PROPERTIES];
    if (filters.search)
      list = list.filter((p) =>
        p.title.toLowerCase().includes(filters.search.toLowerCase()) ||
        p.location.toLowerCase().includes(filters.search.toLowerCase()) ||
        p.state.toLowerCase().includes(filters.search.toLowerCase())
      );
    if (filters.type  !== "All Types")   list = list.filter((p) => p.type  === filters.type);
    if (filters.state !== "All States")  list = list.filter((p) => p.state === filters.state);
    if (filters.beds  !== "Any") {
      const b = filters.beds === "5+" ? 5 : Number(filters.beds);
      list = list.filter((p) => p.beds !== null && p.beds >= b);
    }
    list = list.filter((p) => p.price >= filters.minPrice && p.price <= filters.maxPrice);
    if (filters.verifiedOnly) list = list.filter((p) => p.verified);
    if (sort === "Price: Low to High")  list = [...list].sort((a, b) => a.price - b.price);
    if (sort === "Price: High to Low")  list = [...list].sort((a, b) => b.price - a.price);
    if (sort === "Most Viewed")         list = [...list].sort((a, b) => b.views - a.views);
    return list;
  }, [filters, sort]);

  return (
    <div className="min-h-screen bg-[#F7F4EF]">

      {/* Header */}
      <div className="bg-[#0A1628] pt-24 pb-8 px-4 sm:px-8 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <p className="text-[#C9A84C] text-xs font-bold uppercase tracking-[0.18em] mb-2">Browse</p>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#F7F4EF] mb-6">Find Your Perfect Property</h1>
          <div className="flex gap-3">
            <div className="flex-1 flex items-center gap-3 bg-white rounded-2xl px-4 py-3 border border-[#E0D9CF] focus-within:border-[#C9A84C] transition">
              <RiSearchLine size={18} className="text-[#6B7280] flex-shrink-0" />
              <input
                type="text" placeholder="Search by location, property type..."
                value={filters.search}
                onChange={(e) => setFilters((p) => ({ ...p, search: e.target.value }))}
                className="flex-1 text-sm text-[#0A1628] outline-none placeholder-[#6B7280] bg-transparent"
              />
              {filters.search && (
                <button onClick={() => setFilters((p) => ({ ...p, search: "" }))}
                  className="text-[#6B7280] hover:text-[#0A1628] transition flex-shrink-0">
                  <RiCloseLine size={18} />
                </button>
              )}
            </div>
            <button onClick={() => setFilterOpen(true)}
              className="lg:hidden relative flex items-center gap-2 bg-white border border-[#E0D9CF] hover:border-[#C9A84C] px-4 rounded-2xl text-sm font-semibold text-[#0A1628] transition">
              <RiFilter3Line size={18} />
              <span className="hidden sm:block">Filters</span>
              {activeFilterCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-[#C9A84C] rounded-full text-[#0A1628] text-[10px] font-bold flex items-center justify-center">
                  {activeFilterCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 py-8">
        <div className="flex gap-8">

          {/* Sidebar */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="bg-white rounded-2xl border border-[#E0D9CF] p-5 sticky top-6">
              <div className="flex items-center justify-between mb-5">
                <p className="font-bold text-[#0A1628] text-sm">Filters</p>
                {activeFilterCount > 0 && (
                  <span className="bg-[#C9A84C] text-[#0A1628] text-[10px] font-bold px-2 py-0.5 rounded-full">
                    {activeFilterCount} active
                  </span>
                )}
              </div>
              <FilterPanel filters={filters} setFilters={setFilters} onClear={clearFilters} />
            </div>
          </aside>

          {/* Results */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-3 mb-5">
              <p className="text-sm text-[#6B7280]">
                <span className="font-bold text-[#0A1628]">{filtered.length}</span> properties found
              </p>
              <div className="flex items-center gap-2">
                <div className="relative">
                  <button onClick={() => setShowSort((v) => !v)}
                    className="flex items-center gap-2 bg-white border border-[#E0D9CF] hover:border-[#C9A84C]/50 px-3 py-2 rounded-xl text-xs font-semibold text-[#0A1628] transition">
                    <TbSortDescending size={15} className="text-[#C9A84C]" />
                    <span className="hidden sm:block">{sort}</span>
                    <HiChevronDown size={14} />
                  </button>
                  {showSort && (
                    <div className="absolute right-0 top-10 w-48 bg-white rounded-2xl border border-[#E0D9CF] shadow-xl z-20 overflow-hidden">
                      {SORT_OPTIONS.map((o) => (
                        <button key={o} onClick={() => { setSort(o); setShowSort(false); }}
                          className={`w-full text-left px-4 py-2.5 text-xs font-medium transition hover:bg-[#F7F4EF]
                            ${sort === o ? "text-[#C9A84C] font-bold" : "text-[#0A1628]"}`}>
                          {o}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                <div className="flex bg-white border border-[#E0D9CF] rounded-xl overflow-hidden">
                  <button onClick={() => setView("grid")}
                    className={`p-2 transition ${view === "grid" ? "bg-[#0A1628] text-[#C9A84C]" : "text-[#6B7280] hover:text-[#0A1628]"}`}>
                    <RiGridFill size={16} />
                  </button>
                  <button onClick={() => setView("list")}
                    className={`p-2 transition ${view === "list" ? "bg-[#0A1628] text-[#C9A84C]" : "text-[#6B7280] hover:text-[#0A1628]"}`}>
                    <RiListCheck2 size={16} />
                  </button>
                </div>
              </div>
            </div>

            {filtered.length === 0 ? (
              <div className="flex flex-col items-center py-24 text-center">
                <div className="w-16 h-16 rounded-2xl bg-[#E8D5A3]/40 border border-[#C9A84C]/20 flex items-center justify-center mb-4">
                  <RiHome4Line size={28} className="text-[#C9A84C]" />
                </div>
                <p className="text-[#0A1628] font-bold text-lg">No properties found</p>
                <p className="text-[#6B7280] text-sm mt-1 max-w-xs">Try adjusting your filters or search terms.</p>
                <button onClick={clearFilters}
                  className="mt-4 bg-[#C9A84C] hover:bg-[#b8943d] text-[#0A1628] font-bold px-5 py-2.5 rounded-xl text-sm transition duration-200">
                  Clear Filters
                </button>
              </div>
            ) : view === "grid" ? (
              <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-5">
                {filtered.map((p) => (
                  <GridCard key={p.id} property={p} liked={liked[p.id]} toggleLike={toggleLike} />
                ))}
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                {filtered.map((p) => (
                  <ListCard key={p.id} property={p} liked={liked[p.id]} toggleLike={toggleLike} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filter Drawer */}
      {filterOpen && (
        <div className="fixed inset-0 z-50 flex">
          <div className="absolute inset-0 bg-black/50" onClick={() => setFilterOpen(false)} />
          <div className="relative ml-auto w-full max-w-sm bg-[#F7F4EF] h-full flex flex-col shadow-2xl">
            <div className="flex items-center justify-between px-5 py-4 border-b border-[#E0D9CF] bg-white">
              <p className="font-bold text-[#0A1628]">Filters</p>
              <button onClick={() => setFilterOpen(false)} className="text-[#6B7280] hover:text-[#0A1628]">
                <RiCloseLine size={22} />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-5">
              <FilterPanel filters={filters} setFilters={setFilters} onClear={clearFilters} />
            </div>
            <div className="px-5 py-4 border-t border-[#E0D9CF] bg-white">
              <button onClick={() => setFilterOpen(false)}
                className="w-full bg-[#C9A84C] hover:bg-[#b8943d] active:scale-95 text-[#0A1628] font-bold py-3 rounded-xl text-sm transition duration-200">
                Show {filtered.length} Properties
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Browse;