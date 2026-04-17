// src/pages/dashboard/MyListings.jsx
import { useState } from "react";
import {
  Eye, Heart, MessageCircle, TrendingUp, Plus,
  MapPin, MoreVertical, CheckCircle, Clock,
  XCircle, ChevronRight, Bed, Bath, Video,
  BarChart2, Filter
} from "lucide-react";

const STATUS_CONFIG = {
  active:   { label: "Active",   color: "bg-[#0A1628] text-[#C9A84C]",      icon: CheckCircle },
  pending:  { label: "Pending",  color: "bg-[#E8D5A3] text-[#6B7280]",      icon: Clock       },
  rejected: { label: "Rejected", color: "bg-red-50 text-red-500 border border-red-200", icon: XCircle },
};

const LISTINGS = [
  {
    id: 1,
    title: "3 Bedroom Flat",
    location: "Lekki Phase 1, Lagos",
    price: "₦2,500,000/yr",
    type: "For Rent",
    propertyType: "Flat / Apartment",
    beds: 3, baths: 2,
    status: "active",
    hasVideo: true,
    submittedAt: "Apr 5, 2026",
    approvedAt: "Apr 6, 2026",
    image: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=800&q=80",
    stats: { views: 340, saves: 28, inquiries: 12, earnings: "₦0" },
    weekly: [40, 65, 55, 80, 110, 90, 120],
  },
  {
    id: 2,
    title: "Land (600sqm)",
    location: "Ibadan, Oyo",
    price: "₦8,000,000",
    type: "For Sale",
    propertyType: "Land",
    beds: null, baths: null,
    status: "pending",
    hasVideo: false,
    submittedAt: "Apr 13, 2026",
    approvedAt: null,
    image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80",
    stats: { views: 0, saves: 0, inquiries: 0, earnings: "₦0" },
    weekly: [0,0,0,0,0,0,0],
  },
  {
    id: 3,
    title: "2 Bedroom Bungalow",
    location: "Abuja, FCT",
    price: "₦1,800,000/yr",
    type: "For Rent",
    propertyType: "Bungalow",
    beds: 2, baths: 1,
    status: "rejected",
    hasVideo: false,
    submittedAt: "Apr 2, 2026",
    approvedAt: null,
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80",
    stats: { views: 0, saves: 0, inquiries: 0, earnings: "₦0" },
    weekly: [0,0,0,0,0,0,0],
    rejectReason: "Insufficient photos. Please add at least 3 clear interior photos.",
  },
];

// Mini sparkline bar chart
const Sparkline = ({ data }) => {
  const max = Math.max(...data, 1);
  return (
    <div className="flex items-end gap-0.5 h-8">
      {data.map((v, i) => (
        <div key={i}
          style={{ height: `${(v / max) * 100}%` }}
          className="flex-1 rounded-sm bg-[#C9A84C]/60 min-h-[2px]" />
      ))}
    </div>
  );
};

const StatBadge = ({ icon: Icon, label, value, color = "text-[#0A1628]" }) => (
  <div className="flex flex-col gap-0.5">
    <div className="flex items-center gap-1 text-[#6B7280]">
      <Icon size={11} />
      <span className="text-[10px] font-semibold uppercase tracking-wide">{label}</span>
    </div>
    <p className={`text-base font-bold ${color}`}>{value}</p>
  </div>
);

const MyListings = ({ onAddListing }) => {
  const [filter,   setFilter]   = useState("all");
  const [expanded, setExpanded] = useState(null);

  const filters = [
    { id: "all",      label: "All",      count: LISTINGS.length },
    { id: "active",   label: "Active",   count: LISTINGS.filter(l => l.status === "active").length   },
    { id: "pending",  label: "Pending",  count: LISTINGS.filter(l => l.status === "pending").length  },
    { id: "rejected", label: "Rejected", count: LISTINGS.filter(l => l.status === "rejected").length },
  ];

  const shown = filter === "all" ? LISTINGS : LISTINGS.filter(l => l.status === filter);

  // Total stats
  const totalViews    = LISTINGS.reduce((s, l) => s + l.stats.views, 0);
  const totalSaves    = LISTINGS.reduce((s, l) => s + l.stats.saves, 0);
  const totalInquiries = LISTINGS.reduce((s, l) => s + l.stats.inquiries, 0);
  const activeCount   = LISTINGS.filter(l => l.status === "active").length;

  return (
    <div className="flex flex-col gap-6 max-w-4xl">

      {/* Header */}
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div>
          <h1 className="text-xl font-bold text-[#0A1628]">My Listings</h1>
          <p className="text-sm text-[#6B7280]">{LISTINGS.length} total listings</p>
        </div>
        <button onClick={onAddListing}
          className="flex items-center gap-2 bg-[#C9A84C] hover:bg-[#b8943d] active:scale-95 text-[#0A1628] font-bold px-4 py-2.5 rounded-xl text-sm transition duration-200">
          <Plus size={15} /> Add Listing
        </button>
      </div>

      {/* Summary stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: "Active",     value: activeCount,     icon: CheckCircle, color: "text-green-600"  },
          { label: "Total Views",value: totalViews,      icon: Eye,         color: "text-[#0A1628]"  },
          { label: "Saves",      value: totalSaves,      icon: Heart,       color: "text-[#C9A84C]"  },
          { label: "Inquiries",  value: totalInquiries,  icon: MessageCircle, color: "text-blue-600" },
        ].map(({ label, value, icon: Icon, color }) => (
          <div key={label} className="bg-white rounded-2xl border border-[#E0D9CF] p-4">
            <div className="w-8 h-8 rounded-lg bg-[#F7F4EF] flex items-center justify-center mb-2">
              <Icon size={15} className={color} />
            </div>
            <p className={`text-xl font-bold ${color}`}>{value}</p>
            <p className="text-xs text-[#6B7280] mt-0.5">{label}</p>
          </div>
        ))}
      </div>

      {/* Filter tabs */}
      <div className="flex gap-2 overflow-x-auto pb-1">
        {filters.map(({ id, label, count }) => (
          <button key={id} onClick={() => setFilter(id)}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold whitespace-nowrap transition
              ${filter === id ? "bg-[#0A1628] text-[#C9A84C]" : "bg-white border border-[#E0D9CF] text-[#6B7280] hover:border-[#C9A84C]/40"}`}>
            {label}
            <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${filter === id ? "bg-[#C9A84C]/20 text-[#C9A84C]" : "bg-[#F7F4EF] text-[#6B7280]"}`}>
              {count}
            </span>
          </button>
        ))}
      </div>

      {/* Listing cards */}
      <div className="flex flex-col gap-4">
        {shown.map((listing) => {
          const statusCfg = STATUS_CONFIG[listing.status];
          const StatusIcon = statusCfg.icon;
          const isExpanded = expanded === listing.id;

          return (
            <div key={listing.id} className="bg-white rounded-2xl border border-[#E0D9CF] overflow-hidden hover:border-[#C9A84C]/30 transition-all duration-200">

              {/* Card header */}
              <div className="flex gap-4 p-4 sm:p-5">
                <div className="relative flex-shrink-0">
                  <img src={listing.image} alt={listing.title}
                    className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl object-cover" />
                  {listing.hasVideo && (
                    <div className="absolute bottom-1 right-1 w-5 h-5 bg-[#0A1628] rounded-full flex items-center justify-center">
                      <Video size={9} className="text-[#C9A84C]" />
                    </div>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 flex-wrap">
                    <div className="min-w-0">
                      <h3 className="font-bold text-[#0A1628] truncate">{listing.title}</h3>
                      <p className="text-xs text-[#6B7280] flex items-center gap-1 mt-0.5">
                        <MapPin size={10} /> {listing.location}
                      </p>
                    </div>
                    <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1 flex-shrink-0 ${statusCfg.color}`}>
                      <StatusIcon size={10} /> {statusCfg.label}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 mt-2 flex-wrap">
                    <p className="text-sm font-bold text-[#0A1628]">{listing.price}</p>
                    <span className="text-[10px] bg-[#F7F4EF] border border-[#E0D9CF] text-[#6B7280] font-semibold px-2 py-0.5 rounded-full">{listing.type}</span>
                    <span className="text-[10px] bg-[#F7F4EF] border border-[#E0D9CF] text-[#6B7280] font-semibold px-2 py-0.5 rounded-full">{listing.propertyType}</span>
                    {listing.beds && <span className="text-[10px] text-[#6B7280]">{listing.beds}bd · {listing.baths}ba</span>}
                  </div>

                  {/* Quick stats row */}
                  {listing.status === "active" && (
                    <div className="flex items-center gap-4 mt-3">
                      <span className="flex items-center gap-1 text-xs text-[#6B7280]"><Eye size={12} /> {listing.stats.views}</span>
                      <span className="flex items-center gap-1 text-xs text-[#6B7280]"><Heart size={12} /> {listing.stats.saves}</span>
                      <span className="flex items-center gap-1 text-xs text-[#6B7280]"><MessageCircle size={12} /> {listing.stats.inquiries}</span>
                    </div>
                  )}

                  {listing.status === "rejected" && listing.rejectReason && (
                    <p className="text-xs text-red-500 mt-2 flex items-start gap-1">
                      <XCircle size={11} className="flex-shrink-0 mt-0.5" /> {listing.rejectReason}
                    </p>
                  )}

                  {listing.status === "pending" && (
                    <p className="text-xs text-[#6B7280] mt-2 flex items-center gap-1">
                      <Clock size={11} /> Submitted {listing.submittedAt} — awaiting admin review
                    </p>
                  )}
                </div>
              </div>

              {/* Expand analytics — only for active listings */}
              {listing.status === "active" && (
                <>
                  <div className="border-t border-[#E0D9CF] px-4 sm:px-5 py-2 flex items-center justify-between">
                    <button onClick={() => setExpanded(isExpanded ? null : listing.id)}
                      className="flex items-center gap-1.5 text-xs font-semibold text-[#C9A84C] hover:underline">
                      <BarChart2 size={13} /> {isExpanded ? "Hide" : "View"} Analytics
                    </button>
                    <div className="flex gap-2">
                      <button className="text-xs text-[#6B7280] hover:text-[#0A1628] font-semibold border border-[#E0D9CF] hover:border-[#C9A84C]/40 px-3 py-1.5 rounded-lg transition">
                        Edit
                      </button>
                      <button className="text-xs text-red-400 hover:text-red-500 font-semibold border border-red-100 hover:border-red-200 px-3 py-1.5 rounded-lg transition">
                        Unpublish
                      </button>
                    </div>
                  </div>

                  {isExpanded && (
                    <div className="border-t border-[#E0D9CF] p-4 sm:p-5 bg-[#F7F4EF]/50">
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-5">
                        <StatBadge icon={Eye}           label="Views"     value={listing.stats.views}     />
                        <StatBadge icon={Heart}         label="Saves"     value={listing.stats.saves}     color="text-[#C9A84C]" />
                        <StatBadge icon={MessageCircle} label="Inquiries" value={listing.stats.inquiries} color="text-blue-600" />
                        <StatBadge icon={TrendingUp}    label="Earnings"  value={listing.stats.earnings}  color="text-green-600" />
                      </div>

                      <div>
                        <p className="text-xs font-bold text-[#6B7280] uppercase tracking-wide mb-2">Views — Last 7 Days</p>
                        <Sparkline data={listing.weekly} />
                        <div className="flex justify-between mt-1">
                          {["Mon","Tue","Wed","Thu","Fri","Sat","Sun"].map(d => (
                            <span key={d} className="text-[9px] text-[#6B7280] flex-1 text-center">{d}</span>
                          ))}
                        </div>
                      </div>

                      <p className="text-[10px] text-[#6B7280] mt-3">
                        Approved {listing.approvedAt} · Listing ID #{listing.id}
                      </p>
                    </div>
                  )}
                </>
              )}

              {/* Rejected — re-submit action */}
              {listing.status === "rejected" && (
                <div className="border-t border-[#E0D9CF] px-4 sm:px-5 py-3 flex gap-2">
                  <button onClick={onAddListing}
                    className="flex items-center gap-1.5 text-xs font-bold bg-[#C9A84C] hover:bg-[#b8943d] text-[#0A1628] px-4 py-2 rounded-lg transition">
                    <Plus size={12} /> Re-submit Listing
                  </button>
                </div>
              )}
            </div>
          );
        })}

        {shown.length === 0 && (
          <div className="flex flex-col items-center py-20 text-center">
            <div className="w-14 h-14 rounded-2xl bg-[#E8D5A3]/40 border border-[#C9A84C]/20 flex items-center justify-center mb-4">
              <Filter size={24} className="text-[#C9A84C]" />
            </div>
            <p className="font-bold text-[#0A1628]">No {filter} listings</p>
            <p className="text-sm text-[#6B7280] mt-1">
              {filter === "all" ? "You haven't added any listings yet." : `No listings with "${filter}" status.`}
            </p>
            {filter === "all" && (
              <button onClick={onAddListing}
                className="mt-4 flex items-center gap-2 bg-[#C9A84C] hover:bg-[#b8943d] text-[#0A1628] font-bold px-5 py-2.5 rounded-xl text-sm transition">
                <Plus size={14} /> Add Your First Listing
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyListings;