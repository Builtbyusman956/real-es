// src/pages/dashboard/AgentDashboard.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Home, Rss, FileText, Calendar, MessageCircle, TrendingUp, User,
  ShieldCheck, Settings, Plus, X, AlertTriangle, Eye, Heart, Clock,
  CheckCircle, MapPin, Bed, Bath, Video, BarChart2, XCircle,
  ArrowLeft, Camera, Share2, Phone, Mail, Zap, DollarSign,
  TrendingDown, Users, SlidersHorizontal, Search
} from "lucide-react";

import AgentFeed         from "./AgentFeed";
import Messages          from "./Messages";
import AgentVerification from "./AgentVerification";
import AgentSettings     from "./AgentSettings";
import AgentProfile      from "./AgentProfile";
import AgentEarnings     from "./AgentEarnings";
import AgentInspections  from "./AgentInspections"; // ✅ added

const NAV = [
  { icon: Home,          label: "Overview",     id: "overview"     },
  { icon: Rss,           label: "Feed",         id: "feed"         },
  { icon: FileText,      label: "My Listings",  id: "listings"     },
  { icon: Calendar,      label: "Inspections",  id: "inspections"  },
  { icon: MessageCircle, label: "Messages",     id: "messages"     },
  { icon: TrendingUp,    label: "Earnings",     id: "earnings"     },
  { icon: User,          label: "Profile",      id: "profile"      },
  { icon: ShieldCheck,   label: "Verification", id: "verification" },
  { icon: Settings,      label: "Settings",     id: "settings"     },
];

const AgentSidebar = ({ active, setActive, open, setOpen, agent, hidden }) => {
  const navigate = useNavigate();
  if (hidden) return null;
  return (
    <>
      {open && (
        <div className="fixed inset-0 bg-black/50 z-20 md:hidden" onClick={() => setOpen(false)} />
      )}
      <aside className={`fixed top-0 left-0 h-screen w-60 bg-[#0A1628] z-30 flex flex-col transition-transform duration-300
        ${open ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 md:static md:z-auto`}>

        <div className="px-5 py-4 border-b border-[#1A2E4A]">
          <button onClick={() => navigate("/")} className="flex items-center gap-2 group w-full">
            <div className="w-8 h-8 rounded-lg bg-[#C9A84C] flex items-center justify-center flex-shrink-0">
              <Home size={15} className="text-[#0A1628]" />
            </div>
            <span className="text-[#F7F4EF] text-sm font-bold group-hover:text-[#C9A84C] transition-colors">RealEstate</span>
          </button>
        </div>

        <div className="px-5 py-4 border-b border-[#1A2E4A]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#C9A84C] flex items-center justify-center text-[#0A1628] font-bold text-sm flex-shrink-0">
              {agent?.avatar || "AG"}
            </div>
            <div className="min-w-0">
              <p className="text-[#F7F4EF] text-sm font-semibold truncate">{agent?.name || "Agent"}</p>
              <span className="text-yellow-400 text-[10px] font-semibold flex items-center gap-1">
                <AlertTriangle size={10} /> Unverified
              </span>
            </div>
          </div>
        </div>

        <nav className="flex-1 px-3 py-4 flex flex-col gap-1 overflow-y-auto">
          {NAV.map(({ icon: Icon, label, id }) => (
            <button key={id} onClick={() => { setActive(id); setOpen(false); }}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 w-full text-left
                ${active === id ? "bg-[#C9A84C] text-[#0A1628]" : "text-[#8A9BB5] hover:bg-[#1A2E4A] hover:text-[#F7F4EF]"}`}>
              <Icon size={17} /> {label}
            </button>
          ))}
        </nav>
      </aside>
    </>
  );
};

const AddListingModal = ({ open, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    title: "", price: "", location: "", description: "",
    beds: "", baths: "", type: "for-rent", propertyType: "flat",
    image: null, imagePreview: null, video: null,
  });
  const [errors, setErrors]   = useState({});
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: "" }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setFormData(prev => ({ ...prev, image: file, imagePreview: event.target?.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.title.trim())       newErrors.title       = "Property name is required";
    if (!formData.price.trim())       newErrors.price       = "Price is required";
    if (!formData.location.trim())    newErrors.location    = "Location is required";
    if (!formData.description.trim()) newErrors.description = "Description is required";
    if (!formData.imagePreview)       newErrors.image       = "At least one image is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setLoading(true);
    setTimeout(() => {
      onSubmit({
        ...formData,
        id: Date.now(),
        status: "pending",
        submittedAt: new Date().toLocaleDateString(),
        stats: { views: 0, saves: 0, inquiries: 0, earnings: "₦0" },
      });
      setLoading(false);
      setFormData({ title: "", price: "", location: "", description: "", beds: "", baths: "", type: "for-rent", propertyType: "flat", image: null, imagePreview: null, video: null });
      onClose();
    }, 1500);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl w-full max-w-2xl my-8 shadow-2xl">
        <div className="flex items-center justify-between p-6 border-b border-[#E0D9CF]">
          <h2 className="text-2xl font-bold text-[#0A1628]">Add New Listing</h2>
          <button onClick={onClose} disabled={loading}
            className="w-10 h-10 rounded-lg border border-[#E0D9CF] flex items-center justify-center hover:bg-[#F7F4EF] transition disabled:opacity-50">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6 max-h-[calc(100vh-200px)] overflow-y-auto">
          <div>
            <label className="block text-sm font-semibold text-[#0A1628] mb-2">Property Name *</label>
            <input type="text" name="title" value={formData.title} onChange={handleInputChange}
              placeholder="e.g., 3 Bedroom Flat in Lekki"
              className={`w-full px-4 py-3 rounded-xl border ${errors.title ? "border-red-500 bg-red-50" : "border-[#E0D9CF]"} text-[#0A1628] focus:outline-none focus:ring-2 focus:ring-[#C9A84C]`} />
            {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title}</p>}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-[#0A1628] mb-2">Price (₦) *</label>
              <input type="text" name="price" value={formData.price} onChange={handleInputChange} placeholder="e.g., 2500000"
                className={`w-full px-4 py-3 rounded-xl border ${errors.price ? "border-red-500 bg-red-50" : "border-[#E0D9CF]"} text-[#0A1628] focus:outline-none focus:ring-2 focus:ring-[#C9A84C]`} />
            </div>
            <div>
              <label className="block text-sm font-semibold text-[#0A1628] mb-2">Location *</label>
              <input type="text" name="location" value={formData.location} onChange={handleInputChange} placeholder="e.g., Lekki, Lagos"
                className={`w-full px-4 py-3 rounded-xl border ${errors.location ? "border-red-500 bg-red-50" : "border-[#E0D9CF]"} text-[#0A1628] focus:outline-none focus:ring-2 focus:ring-[#C9A84C]`} />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-[#0A1628] mb-2">List Type</label>
              <select name="type" value={formData.type} onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-xl border border-[#E0D9CF] text-[#0A1628]">
                <option value="for-rent">For Rent</option>
                <option value="for-sale">For Sale</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-[#0A1628] mb-2">Property Type</label>
              <select name="propertyType" value={formData.propertyType} onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-xl border border-[#E0D9CF] text-[#0A1628]">
                <option value="flat">Flat / Apartment</option>
                <option value="house">House</option>
                <option value="bungalow">Bungalow</option>
                <option value="land">Land</option>
                <option value="office">Office Space</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-[#0A1628] mb-2">Bedrooms</label>
              <input type="number" name="beds" value={formData.beds} onChange={handleInputChange}
                placeholder="e.g., 3" min="0" className="w-full px-4 py-3 rounded-xl border border-[#E0D9CF] text-[#0A1628]" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-[#0A1628] mb-2">Bathrooms</label>
              <input type="number" name="baths" value={formData.baths} onChange={handleInputChange}
                placeholder="e.g., 2" min="0" className="w-full px-4 py-3 rounded-xl border border-[#E0D9CF] text-[#0A1628]" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-[#0A1628] mb-2">Description *</label>
            <textarea name="description" value={formData.description} onChange={handleInputChange}
              placeholder="Describe the property..." rows={4}
              className={`w-full px-4 py-3 rounded-xl border ${errors.description ? "border-red-500 bg-red-50" : "border-[#E0D9CF]"} text-[#0A1628] resize-none`} />
          </div>

          <div>
            <label className="block text-sm font-semibold text-[#0A1628] mb-2">Property Image *</label>
            <label className="flex flex-col items-center justify-center border-2 border-dashed border-[#C9A84C]/40 rounded-xl p-6 cursor-pointer hover:bg-[#F7F4EF] transition">
              {formData.imagePreview ? (
                <div className="w-full">
                  <img src={formData.imagePreview} alt="Preview" className="w-full h-48 object-cover rounded-lg" />
                  <button type="button"
                    onClick={(e) => { e.preventDefault(); setFormData(prev => ({ ...prev, image: null, imagePreview: null })); }}
                    className="mt-3 text-xs text-red-500 font-semibold hover:underline">
                    Remove image
                  </button>
                </div>
              ) : (
                <div className="text-center">
                  <Camera size={32} className="text-[#C9A84C] mx-auto mb-2" />
                  <p className="text-[#0A1628] font-semibold">Click to upload</p>
                </div>
              )}
              <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
            </label>
            {errors.image && <p className="text-red-500 text-xs mt-1">{errors.image}</p>}
          </div>
        </form>

        <div className="flex gap-3 p-6 border-t border-[#E0D9CF] bg-[#F7F4EF]">
          <button onClick={onClose} disabled={loading}
            className="flex-1 px-4 py-3 rounded-xl border border-[#E0D9CF] text-[#0A1628] font-semibold hover:bg-white transition">
            Cancel
          </button>
          <button onClick={handleSubmit} disabled={loading}
            className="flex-1 px-4 py-3 rounded-xl bg-[#C9A84C] hover:bg-[#b8943d] text-[#0A1628] font-bold transition flex items-center justify-center gap-2">
            {loading
              ? <><div className="w-4 h-4 border-2 border-[#0A1628] border-t-transparent rounded-full animate-spin" />Submitting...</>
              : <><Plus size={18} /> Create Listing</>}
          </button>
        </div>
      </div>
    </div>
  );
};

const SuccessNotification = ({ show, onClose }) => {
  if (!show) return null;
  setTimeout(onClose, 4000);
  return (
    <div className="fixed bottom-6 right-6 z-40">
      <div className="bg-[#0A1628] text-[#F7F4EF] rounded-xl p-4 shadow-lg border border-[#C9A84C]">
        <div className="flex items-center gap-3">
          <div className="w-5 h-5 rounded-full bg-[#C9A84C] flex items-center justify-center flex-shrink-0">
            <CheckCircle size={14} className="text-[#0A1628]" />
          </div>
          <div>
            <p className="font-semibold">Listing Created Successfully!</p>
            <p className="text-xs text-[#8A9BB5]">Pending admin review.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const PropertyDetailsModal = ({ listing, open, onClose }) => {
  if (!open || !listing) return null;
  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl w-full max-w-4xl my-8 shadow-2xl overflow-hidden relative">
        <button onClick={onClose}
          className="absolute top-6 right-6 z-10 w-10 h-10 rounded-lg bg-white border border-[#E0D9CF] flex items-center justify-center hover:bg-[#F7F4EF] transition">
          <X size={20} />
        </button>
        <div className="relative h-96 bg-[#F7F4EF]">
          <img src={listing.imagePreview || listing.image || "https://via.placeholder.com/800x400"}
            alt={listing.title} className="w-full h-full object-cover" />
        </div>
        <div className="p-8">
          <div className="mb-8">
            <div className="flex items-start justify-between gap-4 mb-4">
              <div>
                <h1 className="text-3xl font-bold text-[#0A1628] mb-2">{listing.title}</h1>
                <p className="text-lg text-[#C9A84C] font-bold">₦{listing.price}</p>
              </div>
              <span className={`text-sm font-bold px-3 py-1.5 rounded-full
                ${listing.status === "active"  ? "bg-green-100 text-green-700"  :
                  listing.status === "pending" ? "bg-yellow-100 text-yellow-700" :
                  "bg-red-100 text-red-600"}`}>
                {listing.status.charAt(0).toUpperCase() + listing.status.slice(1)}
              </span>
            </div>
            <p className="flex items-center gap-2 text-[#6B7280] text-lg">
              <MapPin size={20} className="text-[#C9A84C]" /> {listing.location}
            </p>
            {listing.description && (
              <p className="text-[#6B7280] mt-4 leading-relaxed">{listing.description}</p>
            )}
          </div>
          <div className="flex gap-3 mt-8">
            <button onClick={onClose}
              className="flex-1 px-4 py-3 rounded-xl border border-[#E0D9CF] text-[#0A1628] font-semibold hover:bg-[#F7F4EF] transition">
              Close
            </button>
            <button className="flex-1 px-4 py-3 rounded-xl bg-[#C9A84C] hover:bg-[#b8943d] text-[#0A1628] font-bold transition flex items-center justify-center gap-2">
              <Share2 size={16} /> Share
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const OverviewTab = ({ onAddListing, listingsCount, recentListings, stats }) => (
  <div className="space-y-8">
    <div className="bg-gradient-to-br from-[#0A1628] via-[#1A2E4A] to-[#0A1628] rounded-2xl p-12 text-white border border-[#C9A84C]/20">
      <div className="grid md:grid-cols-2 gap-8 items-center">
        <div>
          <h1 className="text-4xl font-bold mb-4">
            {listingsCount === 0 ? "Grow Your Real Estate Business" : "Welcome Back!"}
          </h1>
          <p className="text-lg text-[#8A9BB5] mb-6">
            {listingsCount === 0
              ? "List properties, reach verified buyers, and scale your agency with our trusted platform."
              : `You have ${listingsCount} listing${listingsCount > 1 ? "s" : ""} with ${stats?.active || 0} active. Keep up the great work!`}
          </p>
          <button onClick={onAddListing}
            className="inline-flex items-center gap-2 bg-[#C9A84C] hover:bg-[#b8943d] text-[#0A1628] font-bold px-8 py-4 rounded-xl transition transform hover:scale-105">
            <Plus size={20} />
            {listingsCount === 0 ? "Add Your First Listing" : "Add New Listing"}
          </button>
        </div>
        <div className="text-right opacity-20 md:opacity-100">
          <div className="text-6xl">{listingsCount === 0 ? "📍" : "🏠"}</div>
        </div>
      </div>
    </div>

    <div>
      <h2 className="text-2xl font-bold text-[#0A1628] mb-6">Your Performance</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Total Listings", value: listingsCount,           icon: FileText,      color: "text-[#C9A84C]"  },
          { label: "Active",         value: stats?.active || 0,      icon: CheckCircle,   color: "text-green-600"  },
          { label: "Total Views",    value: stats?.totalViews || 0,  icon: Eye,           color: "text-blue-600"   },
          { label: "Inquiries",      value: stats?.totalInquiries || 0, icon: MessageCircle, color: "text-purple-600" },
        ].map(({ label, value, icon: Icon, color }) => (
          <div key={label} className="bg-white rounded-2xl border border-[#E0D9CF] p-6 hover:shadow-lg transition">
            <div className="flex items-center justify-between mb-3">
              <p className="text-xs font-semibold text-[#6B7280] uppercase">{label}</p>
              <Icon size={20} className={color} />
            </div>
            <p className="text-3xl font-bold text-[#0A1628]">{value}</p>
          </div>
        ))}
      </div>
    </div>

    {recentListings && recentListings.length > 0 && (
      <div className="bg-white rounded-2xl border border-[#E0D9CF] overflow-hidden">
        <div className="p-6 border-b border-[#E0D9CF]">
          <h2 className="text-xl font-bold text-[#0A1628]">Recent Listings</h2>
        </div>
        <div className="divide-y divide-[#E0D9CF]">
          {recentListings.slice(0, 5).map(listing => (
            <div key={listing.id} className="p-5 hover:bg-[#F7F4EF] transition flex items-center gap-4 cursor-pointer group">
              <img src={listing.imagePreview || listing.image || "https://via.placeholder.com/60"}
                alt={listing.title} className="w-16 h-16 rounded-lg object-cover flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-[#0A1628] truncate group-hover:text-[#C9A84C] transition">{listing.title}</p>
                <p className="text-sm text-[#6B7280] flex items-center gap-1 mt-1"><MapPin size={14} /> {listing.location}</p>
                <p className="text-sm font-bold text-[#0A1628] mt-1">₦{listing.price}</p>
              </div>
              <span className={`text-xs font-bold px-3 py-1 rounded-full
                ${listing.status === "active" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}>
                {listing.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    )}

    {listingsCount === 0 && (
      <div className="bg-gradient-to-r from-[#E8D5A3]/20 to-[#C9A84C]/10 rounded-2xl p-6 border border-[#C9A84C]/30">
        <h3 className="text-lg font-bold text-[#0A1628] mb-4">Pro Tips to Get More Views</h3>
        <ul className="space-y-3">
          {[
            "Add high-quality images and a video tour for better engagement",
            "Write detailed descriptions with property highlights",
            "Respond quickly to buyer inquiries to build trust",
          ].map((tip, i) => (
            <li key={i} className="flex items-start gap-3">
              <CheckCircle size={18} className="text-[#C9A84C] flex-shrink-0 mt-1" />
              <span className="text-[#6B7280]">{tip}</span>
            </li>
          ))}
        </ul>
      </div>
    )}
  </div>
);

const MyListingsTab = ({ listings, onAddListing, onSelectListing }) => {
  const [filter, setFilter] = useState("all");
  const filters = [
    { id: "all",     label: "All",     count: listings.length },
    { id: "active",  label: "Active",  count: listings.filter(l => l.status === "active").length  },
    { id: "pending", label: "Pending", count: listings.filter(l => l.status === "pending").length },
  ];
  const shown = filter === "all" ? listings : listings.filter(l => l.status === filter);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#0A1628]">My Listings</h1>
          <p className="text-sm text-[#6B7280] mt-1">{listings.length} total listings</p>
        </div>
        <button onClick={onAddListing}
          className="flex items-center gap-2 bg-[#C9A84C] hover:bg-[#b8943d] text-[#0A1628] font-bold px-5 py-3 rounded-xl transition">
          <Plus size={18} /> Add Listing
        </button>
      </div>

      <div className="flex gap-2 overflow-x-auto">
        {filters.map(({ id, label, count }) => (
          <button key={id} onClick={() => setFilter(id)}
            className={`px-4 py-2 rounded-xl text-sm font-semibold whitespace-nowrap transition
              ${filter === id ? "bg-[#0A1628] text-[#C9A84C]" : "bg-white border border-[#E0D9CF] text-[#6B7280]"}`}>
            {label} <span className="ml-2 text-xs opacity-70">({count})</span>
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {shown.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-[#0A1628] font-semibold mb-2">No listings yet</p>
            <button onClick={onAddListing}
              className="inline-flex items-center gap-2 bg-[#C9A84C] hover:bg-[#b8943d] text-[#0A1628] font-bold px-5 py-2.5 rounded-xl transition">
              <Plus size={16} /> Add Your First Listing
            </button>
          </div>
        ) : (
          shown.map(listing => (
            <div key={listing.id} onClick={() => onSelectListing(listing)}
              className="bg-white rounded-2xl border border-[#E0D9CF] overflow-hidden hover:shadow-lg transition cursor-pointer">
              <div className="flex gap-4 p-5">
                <img src={listing.imagePreview || listing.image || "https://via.placeholder.com/120"}
                  alt={listing.title} className="w-24 h-24 rounded-xl object-cover flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h3 className="font-bold text-[#0A1628] text-sm">{listing.title}</h3>
                    <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full
                      ${listing.status === "active" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}>
                      {listing.status}
                    </span>
                  </div>
                  <p className="font-bold text-[#0A1628] text-sm mb-2">₦{listing.price}</p>
                  <p className="text-xs text-[#6B7280] flex items-center gap-1"><MapPin size={12} /> {listing.location}</p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

const PlaceholderTab = ({ label }) => (
  <div className="flex flex-col items-center justify-center py-24 text-center">
    <div className="w-16 h-16 rounded-2xl bg-[#E8D5A3]/40 border border-[#C9A84C]/20 flex items-center justify-center mb-4">
      <Clock size={32} className="text-[#C9A84C]" />
    </div>
    <p className="text-[#0A1628] font-bold text-lg">{label} Coming Soon</p>
    <p className="text-[#6B7280] text-sm mt-2">This section is being built</p>
  </div>
);

export default function AgentDashboard() {
  const navigate = useNavigate();
  const [active,              setActive]              = useState("overview");
  const [sidebarOpen,         setSidebarOpen]         = useState(false);
  const [showAddListingModal, setShowAddListingModal] = useState(false);
  const [showSuccess,         setShowSuccess]         = useState(false);
  const [selectedListing,     setSelectedListing]     = useState(null);

  const [agent] = useState({ name: "Emeka Okafor", avatar: "EO", email: "emeka@example.com" });

  const [listings, setListings] = useState([
    {
      id: 1,
      title: "3 Bedroom Flat with Pool",
      location: "Lekki, Lagos",
      price: "2,500,000",
      description: "Spacious 3-bedroom apartment with modern amenities...",
      beds: 3, baths: 2, type: "for-rent", propertyType: "flat",
      status: "active",
      submittedAt: "Apr 5, 2026",
      image: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=800&q=80",
      stats: { views: 340, saves: 28, inquiries: 12, earnings: "₦0" },
    },
    {
      id: 2,
      title: "Land (600sqm) Prime Location",
      location: "Ibadan, Oyo",
      price: "8,000,000",
      description: "Prime land location in a fast-developing area...",
      type: "for-sale", propertyType: "land",
      status: "pending",
      submittedAt: "Apr 13, 2026",
      image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80",
      stats: { views: 0, saves: 0, inquiries: 0, earnings: "₦0" },
    },
  ]);

  const stats = {
    active:          listings.filter(l => l.status === "active").length,
    totalViews:      listings.reduce((s, l) => s + (l.stats?.views || 0), 0),
    totalInquiries:  listings.reduce((s, l) => s + (l.stats?.inquiries || 0), 0),
  };

  const handleAddListing = (newListing) => {
    setListings(prev => [newListing, ...prev]);
    setShowSuccess(true);
  };

  const renderContent = () => {
    switch (active) {
      case "overview":
        return <OverviewTab onAddListing={() => setShowAddListingModal(true)} listingsCount={listings.length} recentListings={listings} stats={stats} />;
      case "feed":
        return <AgentFeed />;
      case "listings":
        return <MyListingsTab listings={listings} onAddListing={() => setShowAddListingModal(true)} onSelectListing={setSelectedListing} />;
      case "inspections":
        return <AgentInspections />; // ✅ wired in - no longer placeholder
      case "messages":
        return <Messages />;
      case "earnings":
        return <AgentEarnings />;
      case "profile":
        return <AgentProfile />;
      case "verification":
        return <AgentVerification />;
      case "settings":
        return <AgentSettings />;
      default:
        return <OverviewTab onAddListing={() => setShowAddListingModal(true)} listingsCount={listings.length} recentListings={listings} stats={stats} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F4EF]">
      <div className="flex h-screen">
        <AgentSidebar
          active={active}
          setActive={setActive}
          open={sidebarOpen}
          setOpen={setSidebarOpen}
          agent={agent}
          hidden={false}
        />

        <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
          <div className="bg-white border-b border-[#E0D9CF] px-4 py-3 flex items-center gap-3 flex-shrink-0">
            <button onClick={() => setSidebarOpen(true)}
              className="md:hidden w-9 h-9 rounded-lg border border-[#E0D9CF] flex items-center justify-center text-[#0A1628]">
              <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="3" y1="6" x2="15" y2="6" />
                <line x1="3" y1="12" x2="15" y2="12" />
                <line x1="3" y1="18" x2="15" y2="18" />
              </svg>
            </button>
            <p className="text-sm font-bold text-[#0A1628] flex-1 capitalize">
              {NAV.find(n => n.id === active)?.label || "Dashboard"}
            </p>
            <button onClick={() => navigate("/")}
              className="w-9 h-9 rounded-lg bg-[#0A1628] flex items-center justify-center">
              <Home size={16} className="text-[#C9A84C]" />
            </button>
          </div>

          <main className="flex-1 overflow-y-auto p-4 sm:p-6">
            {renderContent()}
          </main>
        </div>
      </div>

      <AddListingModal
        open={showAddListingModal}
        onClose={() => setShowAddListingModal(false)}
        onSubmit={handleAddListing}
      />
      <PropertyDetailsModal
        listing={selectedListing}
        open={!!selectedListing}
        onClose={() => setSelectedListing(null)}
      />
      <SuccessNotification show={showSuccess} onClose={() => setShowSuccess(false)} />
    </div>
  );
}