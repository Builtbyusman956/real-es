// src/components/FeaturedProperties.jsx
import { MapPin, Eye, Bed, Bath, ShieldCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";

const PROPERTIES = [
  {
    id: 1,
    title: "3 Bedroom Flat",
    location: "Lekki Phase 1, Lagos",
    price: "₦2,500,000/yr",
    type: "Rent",
    beds: 3, baths: 2, views: 340,
    verified: true,
    risk: "Low Risk",
    image: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=800&q=80",
    agent: "Emeka Okafor",
  },
  {
    id: 2,
    title: "Luxury Duplex",
    location: "Maitama, Abuja",
    price: "₦85,000,000",
    type: "Sale",
    beds: 5, baths: 4, views: 210,
    verified: true,
    risk: "Low Risk",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80",
    agent: "Fatima Bello",
  },
  {
    id: 3,
    title: "Commercial Land (600sqm)",
    location: "Bodija, Ibadan",
    price: "₦8,000,000",
    type: "Sale",
    beds: null, baths: null, views: 180,
    verified: true,
    risk: "Low Risk",
    image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80",
    agent: "Tunde Adeyemi",
  },
  {
    id: 4,
    title: "Mini Flat",
    location: "Yaba, Lagos",
    price: "₦900,000/yr",
    type: "Rent",
    beds: 1, baths: 1, views: 95,
    verified: true,
    risk: "Low Risk",
    image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80",
    agent: "Ngozi Eze",
  },
];

const PropertyCard = ({ property }) => {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate(`/property/${property.id}`)}
      className="bg-white rounded-2xl border border-[#E0D9CF] overflow-hidden hover:border-[#C9A84C]/50 hover:shadow-xl hover:shadow-[#C9A84C]/8 transition-all duration-300 cursor-pointer group"
    >
      {/* Image */}
      <div className="relative overflow-hidden h-48">
        <img
          src={property.image}
          alt={property.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {/* Badges */}
        <div className="absolute top-3 left-3 flex gap-2">
          <span className="bg-[#0A1628] text-[#C9A84C] text-[10px] font-bold px-2.5 py-1 rounded-full">
            {property.type}
          </span>
          {property.verified && (
            <span className="bg-[#C9A84C] text-[#0A1628] text-[10px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1">
              <ShieldCheck size={10} /> Verified
            </span>
          )}
        </div>
        {/* Views */}
        <div className="absolute top-3 right-3 bg-black/50 backdrop-blur-sm text-white text-[10px] px-2 py-1 rounded-full flex items-center gap-1">
          <Eye size={10} /> {property.views}
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-bold text-[#0A1628] text-base mb-1">{property.title}</h3>
        <p className="text-[#6B7280] text-xs flex items-center gap-1 mb-3">
          <MapPin size={11} /> {property.location}
        </p>

        {/* Beds/baths */}
        {property.beds && (
          <div className="flex gap-3 mb-3">
            <span className="text-xs text-[#6B7280] flex items-center gap-1">
              <Bed size={12} /> {property.beds} Beds
            </span>
            <span className="text-xs text-[#6B7280] flex items-center gap-1">
              <Bath size={12} /> {property.baths} Baths
            </span>
          </div>
        )}

        <div className="flex items-center justify-between pt-3 border-t border-[#E0D9CF]">
          <p className="text-[#0A1628] font-bold text-sm">{property.price}</p>
          <span className="bg-[#E8D5A3] text-[#0A1628] text-[10px] font-semibold px-2.5 py-1 rounded-full">
            {property.risk}
          </span>
        </div>

        {/* Agent */}
        <div className="flex items-center gap-2 mt-3 pt-3 border-t border-[#E0D9CF]">
          <div className="w-6 h-6 rounded-full bg-[#0A1628] flex items-center justify-center text-[#C9A84C] text-[9px] font-bold flex-shrink-0">
            {property.agent.split(" ").map((n) => n[0]).join("")}
          </div>
          <p className="text-xs text-[#6B7280]">
            Listed by <span className="font-semibold text-[#0A1628]">{property.agent}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

const FeaturedProperties = () => {
  const navigate = useNavigate();
  return (
    <section className="bg-[#F7F4EF] py-24 px-6 sm:px-8 lg:px-12">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
          <div>
            <span className="inline-block text-[#C9A84C] text-xs font-bold uppercase tracking-[0.18em] mb-3">
              Featured Listings
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#0A1628] leading-tight">
              Verified Properties, <br className="hidden sm:block" /> Ready to View
            </h2>
          </div>
          <button
            onClick={() => navigate("/browse")}
            className="bg-[#0A1628] hover:bg-[#1A2E4A] active:scale-95 text-[#F7F4EF] px-5 py-2.5 rounded-xl text-sm font-semibold transition duration-200 flex-shrink-0"
          >
            View All Properties →
          </button>
        </div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {PROPERTIES.map((p) => <PropertyCard key={p.id} property={p} />)}
        </div>

      </div>
    </section>
  );
};

export default FeaturedProperties;