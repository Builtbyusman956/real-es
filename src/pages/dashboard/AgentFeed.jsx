// src/pages/dashboard/AgentFeed.jsx
import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import {
  RiSearchLine,
  RiCloseLine,
  RiMapPinLine,
  RiTimeLine,
  RiMessage3Line,
  RiShareLine,
  RiSendPlaneLine,
  RiHeart3Line,
  RiHeart3Fill,
  RiHome4Line,
  RiMoneyDollarCircleLine,
  RiShieldCheckFill,
} from "react-icons/ri";
import { MdTune } from "react-icons/md";

// ─── Mock Data ────────────────────────────────────────────────────────────────
const BUYER_REQUESTS = [
  {
    id: 1, buyer: "Chidi Nwosu", buyerAvatar: "CN", buyerVerified: true,
    timePosted: "1 hour ago",
    title: "Looking for 3 Bedroom Flat in Lekki",
    description: "I need a clean, secure 3 bedroom flat in Lekki Phase 1 or 2. Must have good power supply and water. Preferably in a serviced estate. Ready to move in immediately.",
    budget: "₦2,000,000 — ₦3,000,000/yr", budgetRaw: 3000000,
    type: "Rent", location: "Lekki", state: "Lagos",
    beds: 3, moveIn: "Immediately",
    offers: 4, saves: 12, urgent: true,
  },
  {
    id: 2, buyer: "Amaka Obi", buyerAvatar: "AO", buyerVerified: true,
    timePosted: "3 hours ago",
    title: "Seeking Land for Sale in Ibadan",
    description: "Looking for a plot of land between 300-600sqm in Bodija, Agodi or Jericho area. Must have C of O or Registered Survey. Budget is flexible for the right land.",
    budget: "₦3,000,000 — ₦10,000,000", budgetRaw: 10000000,
    type: "Land", location: "Bodija / Agodi", state: "Oyo",
    beds: null, moveIn: "Flexible",
    offers: 7, saves: 19, urgent: false,
  },
  {
    id: 3, buyer: "Tola Adeyemi", buyerAvatar: "TA", buyerVerified: false,
    timePosted: "6 hours ago",
    title: "Need 2 Bedroom Apartment in Abuja",
    description: "Looking for a 2 bedroom apartment in Wuse 2, Maitama or Garki. Must be in a good estate with 24hr power. Company accommodation — payment upfront.",
    budget: "₦2,500,000 — ₦4,000,000/yr", budgetRaw: 4000000,
    type: "Rent", location: "Wuse 2 / Maitama", state: "Abuja",
    beds: 2, moveIn: "Next Month",
    offers: 11, saves: 28, urgent: true,
  },
  {
    id: 4, buyer: "Emeka Johnson", buyerAvatar: "EJ", buyerVerified: true,
    timePosted: "1 day ago",
    title: "5 Bedroom Duplex for Purchase in Lagos",
    description: "Serious buyer looking for a 5 bedroom duplex in Ikoyi, Victoria Island or Banana Island. Must have title documents. Willing to pay above market for the right property.",
    budget: "₦150,000,000 — ₦300,000,000", budgetRaw: 300000000,
    type: "Sale", location: "Ikoyi / V.I", state: "Lagos",
    beds: 5, moveIn: "3 months",
    offers: 15, saves: 43, urgent: false,
  },
];

const STATES = ["All States", "Lagos", "Abuja", "Oyo", "Enugu", "Rivers"];
const TYPES  = ["All Types", "Rent", "Sale", "Land"];
const SORT   = ["Newest", "Highest Budget", "Most Offers", "Most Urgent"];

const INITIAL = {
  search: "", type: "All Types", state: "All States",
  sort: "Newest", maxBudget: 300000000,
  verifiedOnly: false, urgentOnly: false,
};

// ─── Offer Modal ──────────────────────────────────────────────────────────────
const OfferModal = ({ request, onClose, onSend }) => {
  const [message, setMessage] = useState(
    `Hi ${request.buyer.split(" ")[0]}, I have a property that matches your request for ${request.title}. `
  );
  const [price, setPrice] = useState("");

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative bg-white rounded-2xl w-full max-w-md shadow-2xl overflow-hidden">
        <div className="bg-[#0A1628] px-5 py-4">
          <p className="text-[#C9A84C] text-[10px] font-bold uppercase tracking-widest mb-0.5">
            Send Offer
          </p>
          <p className="text-[#F7F4EF] font-bold text-sm truncate">{request.title}</p>
          <p className="text-[#8A9BB5] text-xs mt-0.5">To: {request.buyer}</p>
        </div>
        <div className="p-5 flex flex-col gap-4">
          <div>
            <label className="text-[10px] font-bold text-[#6B7280] uppercase tracking-widest mb-1.5 block">
              Your Offer Price
            </label>
            <input
              type="text" placeholder="e.g. ₦2,500,000/yr"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl border border-[#E0D9CF] text-sm text-[#0A1628] bg-[#F7F4EF] outline-none focus:ring-2 focus:ring-[#C9A84C] focus:border-[#C9A84C] transition"
            />
          </div>
          <div>
            <label className="text-[10px] font-bold text-[#6B7280] uppercase tracking-widest mb-1.5 block">
              Message
            </label>
            <textarea
              rows={4} value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl border border-[#E0D9CF] text-sm text-[#0A1628] bg-[#F7F4EF] outline-none focus:ring-2 focus:ring-[#C9A84C] focus:border-[#C9A84C] transition resize-none"
            />
          </div>
          <div className="flex gap-2 pt-1">
            <button onClick={onClose}
              className="flex-1 border border-[#E0D9CF] text-[#6B7280] hover:border-red-300 hover:text-red-400 py-2.5 rounded-xl text-sm font-semibold transition">
              Cancel
            </button>
            <button onClick={() => { onSend(request.id, { price, message }); onClose(); }}
              className="flex-1 flex items-center justify-center gap-2 bg-[#C9A84C] hover:bg-[#b8943d] active:scale-95 text-[#0A1628] py-2.5 rounded-xl text-sm font-bold transition">
              <RiSendPlaneLine size={15} /> Send Offer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── Request Card ─────────────────────────────────────────────────────────────
const RequestCard = ({ request, saved, onSave, onOffer }) => {
  const navigate  = useNavigate();
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="bg-white rounded-2xl border border-[#E0D9CF] overflow-hidden hover:border-[#C9A84C]/30 transition-all duration-200">

      {/* Buyer header */}
      <div className="flex items-start justify-between px-4 pt-4 pb-3 gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#E8D5A3] flex items-center justify-center text-[#0A1628] font-bold text-sm flex-shrink-0">
            {request.buyerAvatar}
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <p className="text-sm font-bold text-[#0A1628]">{request.buyer}</p>
              {request.buyerVerified && (
                <RiShieldCheckFill size={13} className="text-[#C9A84C]" />
              )}
            </div>
            <p className="text-[10px] text-[#6B7280] flex items-center gap-0.5 mt-0.5">
              <RiTimeLine size={10} /> {request.timePosted}
            </p>
          </div>
        </div>
        <div className="flex gap-1.5 flex-shrink-0 flex-wrap justify-end">
          <span className="bg-[#0A1628] text-[#C9A84C] text-[10px] font-bold px-2.5 py-1 rounded-full">
            {request.type}
          </span>
          {request.urgent && (
            <span className="bg-red-100 text-red-600 text-[10px] font-bold px-2.5 py-1 rounded-full">
              Urgent
            </span>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="px-4 pb-3">
        <h3 className="font-bold text-[#0A1628] text-base mb-1">{request.title}</h3>
        <p className="text-xs text-[#6B7280] flex items-center gap-1 mb-3">
          <RiMapPinLine size={11} /> {request.location}, {request.state}
        </p>

        <div className="flex flex-wrap gap-2 mb-3">
          <span className="flex items-center gap-1 bg-[#F7F4EF] border border-[#E0D9CF] text-xs text-[#0A1628] font-medium px-2.5 py-1 rounded-xl">
            <RiMoneyDollarCircleLine size={13} className="text-[#C9A84C]" />
            {request.budget}
          </span>
          {request.beds && (
            <span className="bg-[#F7F4EF] border border-[#E0D9CF] text-xs text-[#0A1628] font-medium px-2.5 py-1 rounded-xl">
              🛏 {request.beds} Bedrooms
            </span>
          )}
          <span className="bg-[#F7F4EF] border border-[#E0D9CF] text-xs text-[#0A1628] font-medium px-2.5 py-1 rounded-xl">
            📅 Move in: {request.moveIn}
          </span>
        </div>

        <p className={`text-sm text-[#6B7280] leading-relaxed ${expanded ? "" : "line-clamp-2"}`}>
          {request.description}
        </p>
        {request.description.length > 100 && (
          <button onClick={() => setExpanded((v) => !v)}
            className="text-[#C9A84C] text-xs font-semibold mt-1 hover:underline">
            {expanded ? "Show less" : "Read more"}
          </button>
        )}

        <div className="flex items-center gap-4 mt-3 pt-3 border-t border-[#E0D9CF]">
          <span className="text-xs text-[#6B7280]">
            <span className="font-bold text-[#0A1628]">{request.offers}</span> offers sent
          </span>
          <span className="text-xs text-[#6B7280]">
            <span className="font-bold text-[#0A1628]">{request.saves}</span> agents saved
          </span>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between px-4 py-3 border-t border-[#E0D9CF]">
        <div className="flex items-center gap-1">
          <button onClick={() => onSave(request.id)}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl hover:bg-[#F7F4EF] transition text-[#6B7280] hover:text-[#0A1628]">
            {saved
              ? <RiHeart3Fill size={17} className="text-red-500" />
              : <RiHeart3Line size={17} />}
            <span className="text-xs">Save</span>
          </button>
          <button onClick={() => navigate("/dashboard/agent/messages")}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl hover:bg-[#F7F4EF] transition text-[#6B7280] hover:text-[#0A1628]">
            <RiMessage3Line size={17} />
            <span className="text-xs">Message</span>
          </button>
          <button className="flex items-center gap-1.5 px-3 py-2 rounded-xl hover:bg-[#F7F4EF] transition text-[#6B7280] hover:text-[#0A1628]">
            <RiShareLine size={17} />
            <span className="text-xs hidden sm:block">Share</span>
          </button>
        </div>
        <button onClick={() => onOffer(request)}
          className="flex items-center gap-2 bg-[#C9A84C] hover:bg-[#b8943d] active:scale-95 text-[#0A1628] text-xs font-bold px-4 py-2 rounded-xl transition duration-200">
          <RiSendPlaneLine size={14} /> Send Offer
        </button>
      </div>
    </div>
  );
};

// ─── Main ─────────────────────────────────────────────────────────────────────
const AgentFeed = () => {
  const [filters,     setFilters]     = useState(INITIAL);
  const [saved,       setSaved]       = useState({});
  const [showFilters, setShowFilters] = useState(false);
  const [offerTarget, setOfferTarget] = useState(null);
  const [sentOffers,  setSentOffers]  = useState({});

  const onSave = (id) => setSaved((p) => ({ ...p, [id]: !p[id] }));
  const onSend = (id, data) => {
    setSentOffers((p) => ({ ...p, [id]: data }));
    alert("Offer sent successfully to buyer!");
  };

  const filtered = useMemo(() => {
    let list = [...BUYER_REQUESTS];
    if (filters.search)
      list = list.filter((r) =>
        r.title.toLowerCase().includes(filters.search.toLowerCase()) ||
        r.location.toLowerCase().includes(filters.search.toLowerCase()));
    if (filters.type  !== "All Types")  list = list.filter((r) => r.type  === filters.type);
    if (filters.state !== "All States") list = list.filter((r) => r.state === filters.state);
    if (filters.verifiedOnly)           list = list.filter((r) => r.buyerVerified);
    if (filters.urgentOnly)             list = list.filter((r) => r.urgent);
    list = list.filter((r) => r.budgetRaw <= filters.maxBudget);
    if (filters.sort === "Highest Budget") list = [...list].sort((a, b) => b.budgetRaw - a.budgetRaw);
    if (filters.sort === "Most Offers")    list = [...list].sort((a, b) => b.offers - a.offers);
    if (filters.sort === "Most Urgent")    list = list.filter((r) => r.urgent).concat(list.filter((r) => !r.urgent));
    return list;
  }, [filters]);

  return (
    <div className="min-h-screen bg-[#F7F4EF]">

      {/* Search */}
      <div className="bg-white border-b border-[#E0D9CF] px-4 py-3">
        <div className="flex items-center gap-2 bg-[#F7F4EF] rounded-xl px-3 py-2 border border-[#E0D9CF] focus-within:border-[#C9A84C] transition">
          <RiSearchLine size={16} className="text-[#6B7280] flex-shrink-0" />
          <input type="text" placeholder="Search buyer requests..."
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
          {filtered.length} requests
        </div>
      </div>

      {/* Advanced filters */}
      {showFilters && (
        <div className="bg-[#F7F4EF] border-b border-[#E0D9CF] px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm font-bold text-[#0A1628]">Advanced Filters</p>
            <button onClick={() => setShowFilters(false)}>
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
                Max Budget — ₦{filters.maxBudget.toLocaleString()}
              </p>
              <input type="range" min={0} max={300000000} step={500000}
                value={filters.maxBudget}
                onChange={(e) => setFilters((p) => ({ ...p, maxBudget: Number(e.target.value) }))}
                className="w-full accent-[#C9A84C]" />
            </div>
            <div>
              <p className="text-[10px] font-bold text-[#6B7280] uppercase tracking-widest mb-2">Buyer Quality</p>
              <label className="flex items-center gap-2.5 cursor-pointer mb-3">
                <div onClick={() => setFilters((p) => ({ ...p, verifiedOnly: !p.verifiedOnly }))}
                  className={`w-10 h-6 rounded-full flex items-center transition-all duration-300 px-0.5
                    ${filters.verifiedOnly ? "bg-[#C9A84C]" : "bg-[#E0D9CF]"}`}>
                  <div className={`w-5 h-5 rounded-full bg-white shadow transition-transform duration-300
                    ${filters.verifiedOnly ? "translate-x-4" : "translate-x-0"}`} />
                </div>
                <span className="text-sm font-medium text-[#0A1628]">Verified buyers only</span>
              </label>
              <label className="flex items-center gap-2.5 cursor-pointer">
                <div onClick={() => setFilters((p) => ({ ...p, urgentOnly: !p.urgentOnly }))}
                  className={`w-10 h-6 rounded-full flex items-center transition-all duration-300 px-0.5
                    ${filters.urgentOnly ? "bg-[#C9A84C]" : "bg-[#E0D9CF]"}`}>
                  <div className={`w-5 h-5 rounded-full bg-white shadow transition-transform duration-300
                    ${filters.urgentOnly ? "translate-x-4" : "translate-x-0"}`} />
                </div>
                <span className="text-sm font-medium text-[#0A1628]">Urgent requests only</span>
              </label>
            </div>
          </div>
        </div>
      )}

      {/* Feed */}
      <div className="max-w-2xl mx-auto px-4 py-6 flex flex-col gap-5">
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center py-24 text-center">
            <div className="w-16 h-16 rounded-2xl bg-[#E8D5A3]/40 border border-[#C9A84C]/20 flex items-center justify-center mb-4">
              <RiHome4Line size={28} className="text-[#C9A84C]" />
            </div>
            <p className="text-[#0A1628] font-bold text-lg">No requests found</p>
            <p className="text-[#6B7280] text-sm mt-1">Try adjusting your filters.</p>
            <button onClick={() => setFilters(INITIAL)}
              className="mt-4 bg-[#C9A84C] hover:bg-[#b8943d] text-[#0A1628] font-bold px-5 py-2.5 rounded-xl text-sm transition">
              Clear Filters
            </button>
          </div>
        ) : (
          filtered.map((request) => (
            <RequestCard
              key={request.id}
              request={request}
              saved={saved[request.id]}
              onSave={onSave}
              onOffer={setOfferTarget}
              offerSent={!!sentOffers[request.id]}
            />
          ))
        )}
      </div>

      {/* Offer modal */}
      {offerTarget && (
        <OfferModal
          request={offerTarget}
          onClose={() => setOfferTarget(null)}
          onSend={onSend}
        />
      )}
    </div>
  );
};

export default AgentFeed;