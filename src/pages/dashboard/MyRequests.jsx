// src/pages/dashboard/MyRequests.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  RiAddCircleLine, RiMapPinLine, RiTimeLine,
  RiMessage3Line, RiCloseLine, RiCheckboxCircleLine,
  RiFireLine, RiMoneyDollarCircleLine, RiEyeLine,
} from "react-icons/ri";

const REQUESTS = [
  {
    id: 1,
    title: "Looking for 3 Bedroom Flat in Lekki",
    purpose: "Rent",
    propertyType: "Apartment / Flat",
    location: "Lekki Phase 1, Lagos",
    budget: "₦2,000,000 — ₦3,000,000/yr",
    moveIn: "Immediately",
    beds: "3", baths: "2",
    mustHave: ["24hr Power Supply", "Water Supply", "Security / Gateman"],
    description: "I need a clean, secure 3 bedroom flat in Lekki Phase 1 or 2. Must have good power supply. Ready to move in immediately.",
    urgent: true,
    status: "active",
    postedDate: "2 days ago",
    offers: [
      { id: 1, agent: "Emeka Okafor", avatar: "EO", price: "₦2,500,000/yr", property: "3 Bedroom Flat, Lekki Phase 1", message: "Hi, I have a perfect match for your request. This property ticks all your boxes.", time: "1h ago",  status: "new"      },
      { id: 2, agent: "Fatima Bello", avatar: "FB", price: "₦2,800,000/yr", property: "3 Bedroom Flat, Lekki Phase 2", message: "Available 3 bedroom flat in a serviced estate. 24hr power, good security.", time: "3h ago",  status: "new"      },
      { id: 3, agent: "Tunde Adeyemi",avatar: "TA", price: "₦2,200,000/yr", property: "3 Bedroom Flat, Lekki Phase 1", message: "Newly renovated flat. Clean and ready. Landlord is open to negotiation.", time: "5h ago",  status: "viewed"   },
      { id: 4, agent: "Ngozi Eze",    avatar: "NE", price: "₦2,400,000/yr", property: "3 Bedroom Serviced Apartment",  message: "Fully furnished option also available at slight premium. Great location.", time: "1d ago",  status: "viewed"   },
    ],
    views: 124,
  },
  {
    id: 2,
    title: "Seeking Land for Sale in Ibadan",
    purpose: "Buy",
    propertyType: "Land",
    location: "Bodija / Agodi, Oyo",
    budget: "₦3,000,000 — ₦10,000,000",
    moveIn: "Flexible",
    beds: "Not applicable", baths: "Not applicable",
    mustHave: ["C of O", "Registered Survey", "Government Approved"],
    description: "Looking for a plot between 300–600sqm in Bodija, Agodi or Jericho. Must have C of O.",
    urgent: false,
    status: "active",
    postedDate: "5 days ago",
    offers: [
      { id: 1, agent: "Kemi Adesanya", avatar: "KA", price: "₦7,500,000", property: "500sqm Land, Bodija", message: "Clean land with full C of O. Survey plan available. Very negotiable.", time: "2d ago", status: "viewed" },
      { id: 2, agent: "Chukwudi Eze",  avatar: "CE", price: "₦5,000,000", property: "300sqm Land, Agodi", message: "300sqm corner piece. Government excised. Title documents intact.", time: "3d ago", status: "viewed" },
    ],
    views: 67,
  },
  {
    id: 3,
    title: "Office Space Needed in Abuja",
    purpose: "Lease",
    propertyType: "Office Space",
    location: "Wuse 2, Abuja",
    budget: "₦4,000,000 — ₦6,000,000/yr",
    moveIn: "Within 1 month",
    beds: "Not applicable", baths: "Not applicable",
    mustHave: ["24hr Power Supply", "Parking Space", "Security / Gateman"],
    description: "Medium-sized office for a team of 15. Open plan preferred. Must have reliable power.",
    urgent: false,
    status: "closed",
    postedDate: "3 weeks ago",
    offers: [
      { id: 1, agent: "Sandra Okeke", avatar: "SO", price: "₦5,500,000/yr", property: "Office Suite, Wuse 2", message: "200sqm open plan office. All amenities. Ready for immediate occupation.", time: "2w ago", status: "accepted" },
    ],
    views: 43,
  },
];

// ─── Offer Card ───────────────────────────────────────────────────────────────
const OfferCard = ({ offer, onMessage }) => (
  <div className={`flex items-start gap-3 p-4 rounded-xl border transition
    ${offer.status === "new"
      ? "bg-[#E8D5A3]/15 border-[#C9A84C]/30"
      : offer.status === "accepted"
      ? "bg-green-50 border-green-200"
      : "bg-white border-[#E0D9CF]"}`}>
    <div className="w-9 h-9 rounded-xl bg-[#0A1628] flex items-center justify-center text-[#C9A84C] font-bold text-xs flex-shrink-0">
      {offer.avatar}
    </div>
    <div className="flex-1 min-w-0">
      <div className="flex items-start justify-between gap-2 flex-wrap">
        <div>
          <p className="text-sm font-bold text-[#0A1628]">{offer.agent}</p>
          <p className="text-[#C9A84C] text-xs font-bold mt-0.5">{offer.price}</p>
        </div>
        <div className="flex items-center gap-1.5 flex-wrap">
          {offer.status === "new" && (
            <span className="bg-[#C9A84C] text-[#0A1628] text-[9px] font-bold px-2 py-0.5 rounded-full">NEW</span>
          )}
          {offer.status === "accepted" && (
            <span className="bg-green-500 text-white text-[9px] font-bold px-2 py-0.5 rounded-full flex items-center gap-0.5">
              <RiCheckboxCircleLine size={9} /> Accepted
            </span>
          )}
          <span className="text-[10px] text-[#6B7280]">{offer.time}</span>
        </div>
      </div>
      <p className="text-xs text-[#6B7280] mt-1">{offer.property}</p>
      <p className="text-xs text-[#6B7280] mt-1 leading-relaxed line-clamp-2">{offer.message}</p>
      <button onClick={() => onMessage(offer)}
        className="flex items-center gap-1.5 text-xs text-[#C9A84C] font-semibold mt-2 hover:underline">
        <RiMessage3Line size={13} /> Reply to offer
      </button>
    </div>
  </div>
);

// ─── Request Card ─────────────────────────────────────────────────────────────
const RequestCard = ({ request, onMessage, onClose }) => {
  const [expanded, setExpanded] = useState(false);
  const newOffers = request.offers.filter((o) => o.status === "new").length;

  return (
    <div className={`bg-white rounded-2xl border overflow-hidden transition-all duration-200
      ${request.status === "closed" ? "border-[#E0D9CF] opacity-80" : "border-[#E0D9CF] hover:border-[#C9A84C]/30"}`}>

      {/* Header */}
      <div className="px-5 py-4 border-b border-[#E0D9CF]">
        <div className="flex items-start justify-between gap-3 flex-wrap">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap mb-1">
              <span className="bg-[#0A1628] text-[#C9A84C] text-[10px] font-bold px-2.5 py-1 rounded-full">{request.purpose}</span>
              <span className="bg-[#F7F4EF] text-[#6B7280] text-[10px] font-semibold px-2.5 py-1 rounded-full border border-[#E0D9CF]">{request.propertyType}</span>
              {request.urgent && (
                <span className="bg-red-100 text-red-600 text-[10px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1">
                  <RiFireLine size={10} /> Urgent
                </span>
              )}
              {request.status === "closed" && (
                <span className="bg-[#E0D9CF] text-[#6B7280] text-[10px] font-semibold px-2.5 py-1 rounded-full">Closed</span>
              )}
            </div>
            <h3 className="font-bold text-[#0A1628] text-base">{request.title}</h3>
            <div className="flex items-center gap-4 mt-1.5 flex-wrap">
              <span className="text-xs text-[#6B7280] flex items-center gap-1"><RiMapPinLine size={11} /> {request.location}</span>
              <span className="text-xs text-[#6B7280] flex items-center gap-1"><RiMoneyDollarCircleLine size={11} /> {request.budget}</span>
              <span className="text-xs text-[#6B7280] flex items-center gap-1"><RiTimeLine size={11} /> Posted {request.postedDate}</span>
            </div>
          </div>

          {request.status === "active" && (
            <button onClick={() => onClose(request.id)}
              className="w-8 h-8 rounded-lg border border-[#E0D9CF] flex items-center justify-center text-[#6B7280] hover:border-red-300 hover:text-red-400 transition flex-shrink-0">
              <RiCloseLine size={16} />
            </button>
          )}
        </div>

        {/* Engagement stats */}
        <div className="flex items-center gap-4 mt-3">
          <span className="text-xs text-[#6B7280] flex items-center gap-1">
            <RiEyeLine size={12} /> {request.views} views
          </span>
          <span className="text-xs font-bold text-[#0A1628] flex items-center gap-1">
            <RiMessage3Line size={12} className="text-[#C9A84C]" />
            {request.offers.length} offers
            {newOffers > 0 && (
              <span className="bg-[#C9A84C] text-[#0A1628] text-[9px] font-bold px-1.5 py-0.5 rounded-full ml-1">
                {newOffers} new
              </span>
            )}
          </span>
        </div>
      </div>

      {/* Offers section */}
      <div className="px-5 py-4">
        <button onClick={() => setExpanded((v) => !v)}
          className="flex items-center justify-between w-full text-left mb-3">
          <p className="text-sm font-bold text-[#0A1628]">
            Offers Received ({request.offers.length})
          </p>
          <span className="text-xs text-[#C9A84C] font-semibold">
            {expanded ? "Hide" : "View all"} →
          </span>
        </button>

        {/* Always show first 2, expand for more */}
        <div className="flex flex-col gap-3">
          {(expanded ? request.offers : request.offers.slice(0, 2)).map((offer) => (
            <OfferCard key={offer.id} offer={offer} onMessage={onMessage} />
          ))}
        </div>

        {!expanded && request.offers.length > 2 && (
          <button onClick={() => setExpanded(true)}
            className="w-full mt-3 border border-[#E0D9CF] hover:border-[#C9A84C]/50 text-[#6B7280] hover:text-[#0A1628] text-xs font-semibold py-2.5 rounded-xl transition">
            View {request.offers.length - 2} more offers
          </button>
        )}
      </div>
    </div>
  );
};

// ─── Main ─────────────────────────────────────────────────────────────────────
const MyRequests = ({ onPostNew }) => {
  const navigate = useNavigate();
  const [requests, setRequests] = useState(REQUESTS);
  const [filter,   setFilter]   = useState("all");

  const closeRequest = (id) =>
    setRequests((prev) => prev.map((r) => r.id === id ? { ...r, status: "closed" } : r));

  const filtered = filter === "all"    ? requests
    : filter === "active" ? requests.filter((r) => r.status === "active")
    : requests.filter((r) => r.status === "closed");

  const activeCount = requests.filter((r) => r.status === "active").length;
  const totalOffers = requests.reduce((a, r) => a + r.offers.length, 0);
  const newOffers   = requests.reduce((a, r) => a + r.offers.filter((o) => o.status === "new").length, 0);

  return (
    <div className="flex flex-col gap-5">

      {/* Header */}
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h2 className="text-lg font-bold text-[#0A1628]">My Requests</h2>
          <p className="text-xs text-[#6B7280] mt-0.5">
            {activeCount} active · {totalOffers} offers total
            {newOffers > 0 && <span className="text-[#C9A84C] font-bold"> · {newOffers} new</span>}
          </p>
        </div>
        <button onClick={onPostNew}
          className="flex items-center gap-2 bg-[#C9A84C] hover:bg-[#b8943d] active:scale-95 text-[#0A1628] text-sm font-bold px-4 py-2.5 rounded-xl transition duration-200">
          <RiAddCircleLine size={16} /> Post New Request
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { label: "Active Requests", value: activeCount,  color: "text-[#C9A84C]" },
          { label: "Total Offers",    value: totalOffers,  color: "text-blue-600"  },
          { label: "New Offers",      value: newOffers,    color: "text-green-600" },
        ].map(({ label, value, color }) => (
          <div key={label} className="bg-white rounded-xl border border-[#E0D9CF] p-3 text-center">
            <p className={`text-2xl font-bold ${color}`}>{value}</p>
            <p className="text-[10px] text-[#6B7280] mt-0.5">{label}</p>
          </div>
        ))}
      </div>

      {/* Filter tabs */}
      <div className="flex gap-2">
        {["all", "active", "closed"].map((f) => (
          <button key={f} onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-xl border text-xs font-semibold capitalize transition duration-200
              ${filter === f
                ? "bg-[#0A1628] text-[#C9A84C] border-[#0A1628]"
                : "bg-white text-[#6B7280] border-[#E0D9CF] hover:border-[#C9A84C]/50"}`}>
            {f} ({f === "all" ? requests.length : requests.filter((r) => r.status === f).length})
          </button>
        ))}
      </div>

      {/* Request list */}
      {filtered.length === 0 ? (
        <div className="flex flex-col items-center py-16 text-center">
          <div className="w-16 h-16 rounded-2xl bg-[#E8D5A3]/40 border border-[#C9A84C]/20 flex items-center justify-center mb-4">
            <RiAddCircleLine size={28} className="text-[#C9A84C]" />
          </div>
          <p className="text-[#0A1628] font-bold">No requests yet</p>
          <p className="text-[#6B7280] text-sm mt-1">Post a request and let agents come to you.</p>
          <button onClick={onPostNew}
            className="mt-4 bg-[#C9A84C] hover:bg-[#b8943d] text-[#0A1628] font-bold px-5 py-2.5 rounded-xl text-sm transition">
            Post Your First Request
          </button>
        </div>
      ) : (
        filtered.map((r) => (
          <RequestCard
            key={r.id}
            request={r}
            onMessage={(offer) => navigate("/dashboard/buyer/messages")}
            onClose={closeRequest}
          />
        ))
      )}
    </div>
  );
};

export default MyRequests;