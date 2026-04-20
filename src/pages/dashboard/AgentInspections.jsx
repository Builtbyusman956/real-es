// src/pages/dashboard/AgentInspections.jsx
import { useState } from "react";
import {
  Calendar, Clock, MapPin, User, Phone, Mail,
  CheckCircle, XCircle, AlertTriangle, MessageCircle,
  ChevronDown, ChevronUp, Filter, Search, Plus,
  Home, Video, FileText, MoreVertical, Send,
  ArrowRight, Bell, CalendarDays, Clock3
} from "lucide-react";

const INSPECTIONS = [
  {
    id: 1,
    property: "3 Bedroom Flat with Swimming Pool",
    propertyId: 1,
    propertyImage: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=400&q=80",
    location: "Lekki Phase 1, Lagos",
    buyer: {
      name: "Chidi Nwosu",
      email: "chidi@example.com",
      phone: "+234 802 345 6789",
      avatar: "CN",
      verified: true,
      previousInspections: 2
    },
    date: "2026-04-20",
    time: "10:00 AM",
    duration: "30 mins",
    status: "confirmed",
    type: "Physical",
    notes: "Buyer is coming with his wife. They want to see the kitchen and master bedroom specifically.",
    createdAt: "Apr 15, 2026",
    reminderSent: true,
    followUpRequired: false
  },
  {
    id: 2,
    property: "Land (600sqm) - Dry & Fenced",
    propertyId: 2,
    propertyImage: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=400&q=80",
    location: "Moniya, Ibadan, Oyo",
    buyer: {
      name: "Fatima Bello",
      email: "fatima@example.com",
      phone: "+234 803 456 7890",
      avatar: "FB",
      verified: true,
      previousInspections: 0
    },
    date: "2026-04-21",
    time: "2:00 PM",
    duration: "45 mins",
    status: "pending",
    type: "Virtual",
    notes: "Buyer is based in Abuja and wants a video call tour first before physical visit.",
    createdAt: "Apr 13, 2026",
    reminderSent: false,
    followUpRequired: true
  },
  {
    id: 3,
    property: "2 Bedroom Bungalow - Fully Furnished",
    propertyId: 3,
    propertyImage: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=400&q=80",
    location: "Gwarinpa, Abuja, FCT",
    buyer: {
      name: "Tunde Adeyemi",
      email: "tunde@example.com",
      phone: "+234 805 678 9012",
      avatar: "TA",
      verified: false,
      previousInspections: 1
    },
    date: "2026-04-19",
    time: "11:00 AM",
    duration: "1 hour",
    status: "completed",
    type: "Physical",
    notes: "Buyer loved the property. Negotiating on price. Offered ₦1.5M, asking ₦1.8M.",
    createdAt: "Apr 10, 2026",
    reminderSent: true,
    followUpRequired: true,
    outcome: "Interested - Negotiating",
    rating: 5
  },
  {
    id: 4,
    property: "5 Bedroom Duplex with BQ",
    propertyId: 5,
    propertyImage: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=400&q=80",
    location: "Maitama, Abuja, FCT",
    buyer: {
      name: "Ngozi Okonkwo",
      email: "ngozi@example.com",
      phone: "+234 807 890 1234",
      avatar: "NO",
      verified: true,
      previousInspections: 3
    },
    date: "2026-04-18",
    time: "3:00 PM",
    duration: "1.5 hours",
    status: "cancelled",
    type: "Physical",
    notes: "Buyer cancelled last minute. Family emergency.",
    createdAt: "Apr 12, 2026",
    reminderSent: true,
    followUpRequired: false,
    cancellationReason: "Family emergency",
    cancelledBy: "buyer"
  },
  {
    id: 5,
    property: "3 Bedroom Flat with Swimming Pool",
    propertyId: 1,
    propertyImage: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=400&q=80",
    location: "Lekki Phase 1, Lagos",
    buyer: {
      name: "Amara Obi",
      email: "amara@example.com",
      phone: "+234 809 012 3456",
      avatar: "AO",
      verified: true,
      previousInspections: 0
    },
    date: "2026-04-22",
    time: "9:00 AM",
    duration: "30 mins",
    status: "confirmed",
    type: "Physical",
    notes: "First-time buyer. Needs detailed explanation of the neighborhood.",
    createdAt: "Apr 16, 2026",
    reminderSent: false,
    followUpRequired: false
  },
  {
    id: 6,
    property: "Commercial Shop Space",
    propertyId: 4,
    propertyImage: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=400&q=80",
    location: "Computer Village, Ikeja, Lagos",
    buyer: {
      name: "Kunle Adeleke",
      email: "kunle@example.com",
      phone: "+234 811 234 5678",
      avatar: "KA",
      verified: false,
      previousInspections: 0
    },
    date: "2026-04-23",
    time: "4:00 PM",
    duration: "20 mins",
    status: "pending",
    type: "Physical",
    notes: "Wants to use it for phone accessories business. Check power supply.",
    createdAt: "Apr 17, 2026",
    reminderSent: false,
    followUpRequired: true
  }
];

const STATUS_CONFIG = {
  confirmed: {
    label: "Confirmed",
    color: "bg-[#0A1628] text-[#C9A84C]",
    icon: CheckCircle,
    borderColor: "border-[#0A1628]"
  },
  pending: {
    label: "Pending",
    color: "bg-[#E8D5A3] text-[#6B7280]",
    icon: Clock,
    borderColor: "border-[#E8D5A3]"
  },
  completed: {
    label: "Completed",
    color: "bg-green-100 text-green-700",
    icon: CheckCircle,
    borderColor: "border-green-200"
  },
  cancelled: {
    label: "Cancelled",
    color: "bg-red-50 text-red-500 border border-red-200",
    icon: XCircle,
    borderColor: "border-red-200"
  }
};

const TYPE_CONFIG = {
  Physical: { icon: Home, label: "In-Person" },
  Virtual: { icon: Video, label: "Video Call" }
};

const AgentInspections = () => {
  const [filter, setFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedId, setExpandedId] = useState(null);
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [dateFilter, setDateFilter] = useState("all");
  const [sortBy, setSortBy] = useState("date-asc");

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  // Filter inspections
  let filtered = [...INSPECTIONS];

  if (filter !== "all") {
    filtered = filtered.filter(i => i.status === filter);
  }

  if (searchQuery) {
    const q = searchQuery.toLowerCase();
    filtered = filtered.filter(i => 
      i.buyer.name.toLowerCase().includes(q) ||
      i.property.toLowerCase().includes(q) ||
      i.location.toLowerCase().includes(q)
    );
  }

  // Date filter
  const today = new Date("2026-04-19");
  if (dateFilter === "today") {
    filtered = filtered.filter(i => new Date(i.date).toDateString() === today.toDateString());
  } else if (dateFilter === "week") {
    const weekFromNow = new Date(today);
    weekFromNow.setDate(weekFromNow.getDate() + 7);
    filtered = filtered.filter(i => {
      const d = new Date(i.date);
      return d >= today && d <= weekFromNow;
    });
  } else if (dateFilter === "past") {
    filtered = filtered.filter(i => new Date(i.date) < today);
  }

  // Sort
  filtered.sort((a, b) => {
    const dateA = new Date(a.date + " " + a.time);
    const dateB = new Date(b.date + " " + b.time);
    if (sortBy === "date-asc") return dateA - dateB;
    if (sortBy === "date-desc") return dateB - dateA;
    return 0;
  });

  // Stats
  const stats = {
    total: INSPECTIONS.length,
    upcoming: INSPECTIONS.filter(i => i.status === "confirmed" || i.status === "pending").length,
    completed: INSPECTIONS.filter(i => i.status === "completed").length,
    cancelled: INSPECTIONS.filter(i => i.status === "cancelled").length,
    today: INSPECTIONS.filter(i => new Date(i.date).toDateString() === today.toDateString()).length
  };

  const filters = [
    { id: "all", label: "All", count: stats.total },
    { id: "confirmed", label: "Confirmed", count: INSPECTIONS.filter(i => i.status === "confirmed").length },
    { id: "pending", label: "Pending", count: INSPECTIONS.filter(i => i.status === "pending").length },
    { id: "completed", label: "Completed", count: stats.completed },
    { id: "cancelled", label: "Cancelled", count: stats.cancelled }
  ];

  const getInitials = (name) => name.split(" ").map(n => n[0]).join("");

  return (
    <div className="flex flex-col gap-6 max-w-5xl">

      {/* Header */}
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div>
          <h1 className="text-xl font-bold text-[#0A1628]">Inspections</h1>
          <p className="text-sm text-[#6B7280]">Manage property viewings and meetings</p>
        </div>
        <button 
          onClick={() => setShowScheduleModal(true)}
          className="flex items-center gap-2 bg-[#C9A84C] hover:bg-[#b8943d] active:scale-95 text-[#0A1628] font-bold px-4 py-2.5 rounded-xl text-sm transition duration-200"
        >
          <Plus size={15} /> Schedule New
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: "Upcoming", value: stats.upcoming, icon: CalendarDays, color: "text-[#C9A84C]", bg: "bg-[#E8D5A3]/20" },
          { label: "Today", value: stats.today, icon: Clock3, color: "text-blue-600", bg: "bg-blue-50" },
          { label: "Completed", value: stats.completed, icon: CheckCircle, color: "text-green-600", bg: "bg-green-50" },
          { label: "Cancelled", value: stats.cancelled, icon: XCircle, color: "text-red-500", bg: "bg-red-50" }
        ].map(({ label, value, icon: Icon, color, bg }) => (
          <div key={label} className={`${bg} rounded-2xl border border-[#E0D9CF] p-4`}>
            <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center mb-2 shadow-sm">
              <Icon size={15} className={color} />
            </div>
            <p className={`text-2xl font-bold ${color}`}>{value}</p>
            <p className="text-xs text-[#6B7280] mt-0.5">{label}</p>
          </div>
        ))}
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6B7280]" />
          <input
            type="text"
            placeholder="Search by buyer, property, or location..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border border-[#E0D9CF] rounded-xl focus:border-[#C9A84C] focus:outline-none text-sm"
          />
        </div>
        <select
          value={dateFilter}
          onChange={(e) => setDateFilter(e.target.value)}
          className="px-4 py-2.5 border border-[#E0D9CF] rounded-xl focus:border-[#C9A84C] focus:outline-none text-sm bg-white"
        >
          <option value="all">All Dates</option>
          <option value="today">Today</option>
          <option value="week">Next 7 Days</option>
          <option value="past">Past</option>
        </select>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="px-4 py-2.5 border border-[#E0D9CF] rounded-xl focus:border-[#C9A84C] focus:outline-none text-sm bg-white"
        >
          <option value="date-asc">Soonest First</option>
          <option value="date-desc">Latest First</option>
        </select>
      </div>

      {/* Status tabs */}
      <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
        {filters.map(({ id, label, count }) => (
          <button key={id} onClick={() => setFilter(id)}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold whitespace-nowrap transition-all
              ${filter === id 
                ? "bg-[#0A1628] text-[#C9A84C] shadow-md" 
                : "bg-white border border-[#E0D9CF] text-[#6B7280] hover:border-[#C9A84C]/40"}`}>
            {label}
            <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${
              filter === id ? "bg-[#C9A84C]/20 text-[#C9A84C]" : "bg-[#F7F4EF] text-[#6B7280]"
            }`}>
              {count}
            </span>
          </button>
        ))}
      </div>

      {/* Inspections List */}
      <div className="flex flex-col gap-3">
        {filtered.map((inspection) => {
          const statusCfg = STATUS_CONFIG[inspection.status];
          const StatusIcon = statusCfg.icon;
          const typeCfg = TYPE_CONFIG[inspection.type];
          const TypeIcon = typeCfg.icon;
          const isExpanded = expandedId === inspection.id;
          const isToday = new Date(inspection.date).toDateString() === today.toDateString();
          const isPast = new Date(inspection.date) < today && inspection.status !== "cancelled";

          return (
            <div 
              key={inspection.id}
              className={`bg-white rounded-2xl border overflow-hidden transition-all duration-200
                ${isExpanded ? "border-[#C9A84C] shadow-lg" : "border-[#E0D9CF] hover:border-[#C9A84C]/30 hover:shadow-sm"}
                ${isToday ? "ring-1 ring-[#C9A84C]/30" : ""}`}
            >
              {/* Main Row */}
              <div 
                className="p-4 sm:p-5 cursor-pointer"
                onClick={() => toggleExpand(inspection.id)}
              >
                <div className="flex gap-4">
                  {/* Property Image */}
                  <div className="relative flex-shrink-0">
                    <img 
                      src={inspection.propertyImage} 
                      alt={inspection.property}
                      className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl object-cover"
                    />
                    <div className={`absolute top-1.5 left-1.5 text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-white/90 backdrop-blur flex items-center gap-1 ${inspection.type === "Virtual" ? "text-blue-600" : "text-[#0A1628]"}`}>
                      <TypeIcon size={8} /> {inspection.type}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="font-bold text-[#0A1628] truncate">{inspection.property}</h3>
                          {isToday && (
                            <span className="text-[10px] font-bold bg-[#C9A84C] text-[#0A1628] px-2 py-0.5 rounded-full">
                              TODAY
                            </span>
                          )}
                          {inspection.followUpRequired && inspection.status === "completed" && (
                            <span className="text-[10px] font-bold bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full flex items-center gap-1">
                              <Bell size={8} /> Follow-up
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-[#6B7280] flex items-center gap-1 mt-1">
                          <MapPin size={10} /> {inspection.location}
                        </p>
                      </div>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1 ${statusCfg.color}`}>
                          <StatusIcon size={10} /> {statusCfg.label}
                        </span>
                        {isExpanded ? <ChevronUp size={16} className="text-[#6B7280]" /> : <ChevronDown size={16} className="text-[#6B7280]" />}
                      </div>
                    </div>

                    {/* Date & Time */}
                    <div className="flex items-center gap-4 mt-2">
                      <span className="flex items-center gap-1.5 text-sm text-[#0A1628] font-semibold">
                        <Calendar size={14} className="text-[#C9A84C]" />
                        {new Date(inspection.date).toLocaleDateString("en-US", { 
                          weekday: "short", 
                          month: "short", 
                          day: "numeric" 
                        })}
                      </span>
                      <span className="flex items-center gap-1.5 text-sm text-[#6B7280]">
                        <Clock size={14} />
                        {inspection.time}
                      </span>
                      <span className="text-xs text-[#6B7280] bg-[#F7F4EF] px-2 py-0.5 rounded-full">
                        {inspection.duration}
                      </span>
                    </div>

                    {/* Buyer Preview */}
                    <div className="flex items-center gap-2 mt-3">
                      <div className="w-6 h-6 rounded-full bg-[#C9A84C] flex items-center justify-center text-[#0A1628] text-[10px] font-bold">
                        {inspection.buyer.avatar}
                      </div>
                      <span className="text-xs text-[#6B7280]">{inspection.buyer.name}</span>
                      {inspection.buyer.verified && (
                        <CheckCircle size={10} className="text-green-500" />
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Expanded Details */}
              {isExpanded && (
                <div className="border-t border-[#E0D9CF] p-4 sm:p-5 bg-[#F7F4EF]/30">
                  <div className="grid lg:grid-cols-2 gap-6">
                    
                    {/* Buyer Details */}
                    <div className="space-y-4">
                      <h4 className="text-sm font-bold text-[#0A1628] uppercase tracking-wide">Buyer Information</h4>
                      
                      <div className="bg-white rounded-xl border border-[#E0D9CF] p-4">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-12 h-12 rounded-full bg-[#C9A84C] flex items-center justify-center text-[#0A1628] font-bold">
                            {inspection.buyer.avatar}
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <p className="font-semibold text-[#0A1628]">{inspection.buyer.name}</p>
                              {inspection.buyer.verified && (
                                <span className="text-[10px] bg-green-100 text-green-600 px-1.5 py-0.5 rounded-full font-bold">
                                  Verified
                                </span>
                              )}
                            </div>
                            <p className="text-xs text-[#6B7280]">{inspection.buyer.previousInspections} previous inspections</p>
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <a href={`tel:${inspection.buyer.phone}`} className="flex items-center gap-2 text-sm text-[#0A1628] hover:text-[#C9A84C] transition">
                            <Phone size={14} className="text-[#6B7280]" /> {inspection.buyer.phone}
                          </a>
                          <a href={`mailto:${inspection.buyer.email}`} className="flex items-center gap-2 text-sm text-[#0A1628] hover:text-[#C9A84C] transition">
                            <Mail size={14} className="text-[#6B7280]" /> {inspection.buyer.email}
                          </a>
                        </div>
                      </div>

                      {/* Notes */}
                      {inspection.notes && (
                        <div className="bg-white rounded-xl border border-[#E0D9CF] p-4">
                          <div className="flex items-center gap-2 mb-2">
                            <FileText size={14} className="text-[#C9A84C]" />
                            <p className="text-sm font-semibold text-[#0A1628]">Notes</p>
                          </div>
                          <p className="text-sm text-[#6B7280] leading-relaxed">{inspection.notes}</p>
                        </div>
                      )}

                      {/* Cancellation Reason */}
                      {inspection.status === "cancelled" && inspection.cancellationReason && (
                        <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                          <p className="text-xs text-red-600 font-semibold flex items-center gap-1 mb-1">
                            <AlertTriangle size={12} /> Cancelled by {inspection.cancelledBy}
                          </p>
                          <p className="text-sm text-red-500">{inspection.cancellationReason}</p>
                        </div>
                      )}
                    </div>

                    {/* Actions & Timeline */}
                    <div className="space-y-4">
                      <h4 className="text-sm font-bold text-[#0A1628] uppercase tracking-wide">Actions</h4>

                      {/* Action Buttons */}
                      <div className="grid grid-cols-2 gap-2">
                        {inspection.status === "pending" && (
                          <>
                            <button className="flex items-center justify-center gap-2 bg-[#0A1628] hover:bg-[#1A2E4A] text-[#C9A84C] font-bold py-2.5 rounded-xl text-sm transition">
                              <CheckCircle size={14} /> Confirm
                            </button>
                            <button className="flex items-center justify-center gap-2 border border-red-200 hover:bg-red-50 text-red-500 font-semibold py-2.5 rounded-xl text-sm transition">
                              <XCircle size={14} /> Decline
                            </button>
                          </>
                        )}
                        
                        {inspection.status === "confirmed" && (
                          <>
                            <button className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-bold py-2.5 rounded-xl text-sm transition">
                              <CheckCircle size={14} /> Mark Complete
                            </button>
                            <button className="flex items-center justify-center gap-2 border border-[#E0D9CF] hover:border-[#C9A84C]/40 text-[#0A1628] font-semibold py-2.5 rounded-xl text-sm transition">
                              <MessageCircle size={14} /> Message
                            </button>
                          </>
                        )}

                        {inspection.status === "completed" && (
                          <>
                            <button className="flex items-center justify-center gap-2 bg-[#C9A84C] hover:bg-[#b8943d] text-[#0A1628] font-bold py-2.5 rounded-xl text-sm transition">
                              <FileText size={14} /> Add Outcome
                            </button>
                            <button className="flex items-center justify-center gap-2 border border-[#E0D9CF] hover:border-[#C9A84C]/40 text-[#0A1628] font-semibold py-2.5 rounded-xl text-sm transition">
                              <Calendar size={14} /> Re-schedule
                            </button>
                          </>
                        )}

                        {inspection.status === "cancelled" && (
                          <button className="col-span-2 flex items-center justify-center gap-2 bg-[#C9A84C] hover:bg-[#b8943d] text-[#0A1628] font-bold py-2.5 rounded-xl text-sm transition">
                            <Calendar size={14} /> Re-schedule Inspection
                          </button>
                        )}
                      </div>

                      {/* Quick Message */}
                      <div className="bg-white rounded-xl border border-[#E0D9CF] p-4">
                        <p className="text-xs font-semibold text-[#6B7280] mb-2">Quick Message</p>
                        <div className="flex gap-2">
                          <input 
                            type="text" 
                            placeholder="Type a message..."
                            className="flex-1 px-3 py-2 border border-[#E0D9CF] rounded-lg text-sm focus:border-[#C9A84C] focus:outline-none"
                          />
                          <button className="w-9 h-9 bg-[#0A1628] hover:bg-[#1A2E4A] text-[#C9A84C] rounded-lg flex items-center justify-center transition">
                            <Send size={14} />
                          </button>
                        </div>
                      </div>

                      {/* Timeline */}
                      <div className="bg-white rounded-xl border border-[#E0D9CF] p-4">
                        <p className="text-xs font-semibold text-[#6B7280] mb-3">Timeline</p>
                        <div className="space-y-3">
                          <div className="flex items-start gap-3">
                            <div className="w-2 h-2 rounded-full bg-[#C9A84C] mt-1.5 flex-shrink-0" />
                            <div>
                              <p className="text-xs text-[#0A1628] font-semibold">Inspection Requested</p>
                              <p className="text-[10px] text-[#6B7280]">{inspection.createdAt}</p>
                            </div>
                          </div>
                          {inspection.reminderSent && (
                            <div className="flex items-start gap-3">
                              <div className="w-2 h-2 rounded-full bg-blue-400 mt-1.5 flex-shrink-0" />
                              <div>
                                <p className="text-xs text-[#0A1628] font-semibold">Reminder Sent</p>
                                <p className="text-[10px] text-[#6B7280]">24 hours before inspection</p>
                              </div>
                            </div>
                          )}
                          {inspection.status === "completed" && (
                            <div className="flex items-start gap-3">
                              <div className="w-2 h-2 rounded-full bg-green-500 mt-1.5 flex-shrink-0" />
                              <div>
                                <p className="text-xs text-[#0A1628] font-semibold">Completed</p>
                                <p className="text-[10px] text-[#6B7280]">
                                  {inspection.outcome || "No outcome recorded"}
                                </p>
                              </div>
                            </div>
                          )}
                          {inspection.status === "cancelled" && (
                            <div className="flex items-start gap-3">
                              <div className="w-2 h-2 rounded-full bg-red-400 mt-1.5 flex-shrink-0" />
                              <div>
                                <p className="text-xs text-[#0A1628] font-semibold">Cancelled</p>
                                <p className="text-[10px] text-[#6B7280]">{inspection.cancellationReason}</p>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}

        {filtered.length === 0 && (
          <div className="flex flex-col items-center py-20 text-center bg-white rounded-2xl border border-[#E0D9CF]">
            <div className="w-16 h-16 rounded-2xl bg-[#E8D5A3]/40 border border-[#C9A84C]/20 flex items-center justify-center mb-4">
              <Calendar size={24} className="text-[#C9A84C]" />
            </div>
            <p className="font-bold text-[#0A1628] text-lg">No inspections found</p>
            <p className="text-sm text-[#6B7280] mt-1">
              {searchQuery ? "No results match your search." : "No inspections in this category."}
            </p>
          </div>
        )}
      </div>

      {/* Schedule Modal Overlay */}
      {showScheduleModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-[#E0D9CF] flex items-center justify-between">
              <h2 className="text-lg font-bold text-[#0A1628]">Schedule Inspection</h2>
              <button 
                onClick={() => setShowScheduleModal(false)}
                className="w-8 h-8 rounded-lg hover:bg-[#F7F4EF] flex items-center justify-center"
              >
                <XCircle size={18} className="text-[#6B7280]" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-semibold text-[#0A1628] mb-1">Select Property</label>
                <select className="w-full px-4 py-3 border border-[#E0D9CF] rounded-xl focus:border-[#C9A84C] focus:outline-none text-sm">
                  <option>3 Bedroom Flat with Swimming Pool</option>
                  <option>2 Bedroom Bungalow - Fully Furnished</option>
                  <option>5 Bedroom Duplex with BQ</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#0A1628] mb-1">Buyer Email</label>
                <input 
                  type="email" 
                  placeholder="buyer@example.com"
                  className="w-full px-4 py-3 border border-[#E0D9CF] rounded-xl focus:border-[#C9A84C] focus:outline-none text-sm"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-semibold text-[#0A1628] mb-1">Date</label>
                  <input 
                    type="date" 
                    className="w-full px-4 py-3 border border-[#E0D9CF] rounded-xl focus:border-[#C9A84C] focus:outline-none text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[#0A1628] mb-1">Time</label>
                  <input 
                    type="time" 
                    className="w-full px-4 py-3 border border-[#E0D9CF] rounded-xl focus:border-[#C9A84C] focus:outline-none text-sm"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#0A1628] mb-1">Type</label>
                <div className="flex gap-2">
                  <button className="flex-1 flex items-center justify-center gap-2 py-3 border-2 border-[#C9A84C] bg-[#C9A84C]/5 rounded-xl text-sm font-semibold text-[#0A1628]">
                    <Home size={14} /> Physical
                  </button>
                  <button className="flex-1 flex items-center justify-center gap-2 py-3 border border-[#E0D9CF] rounded-xl text-sm font-semibold text-[#6B7280] hover:border-[#C9A84C]/40">
                    <Video size={14} /> Virtual
                  </button>
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#0A1628] mb-1">Notes</label>
                <textarea 
                  rows={3}
                  placeholder="Any special instructions..."
                  className="w-full px-4 py-3 border border-[#E0D9CF] rounded-xl focus:border-[#C9A84C] focus:outline-none text-sm resize-none"
                />
              </div>
            </div>
            <div className="p-6 border-t border-[#E0D9CF] flex gap-3">
              <button 
                onClick={() => setShowScheduleModal(false)}
                className="flex-1 border border-[#E0D9CF] hover:border-[#C9A84C]/40 text-[#0A1628] font-semibold py-3 rounded-xl text-sm transition"
              >
                Cancel
              </button>
              <button 
                onClick={() => setShowScheduleModal(false)}
                className="flex-1 bg-[#C9A84C] hover:bg-[#b8943d] text-[#0A1628] font-bold py-3 rounded-xl text-sm transition"
              >
                Schedule Inspection
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AgentInspections;