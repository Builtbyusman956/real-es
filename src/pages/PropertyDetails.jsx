// src/pages/PropertyDetails.jsx
import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  RiMapPinLine, RiHotelBedLine, RiEyeLine,
  RiHeart3Line, RiHeart3Fill, RiShareLine,
  RiArrowLeftLine, RiShieldCheckFill, RiCalendarLine,
  RiRulerLine, RiCheckLine, RiErrorWarningLine,
  RiSendPlaneLine, RiLockLine, RiTimeLine,
  RiUserLine, RiMessage3Line, RiPhoneLine,
  RiMailLine, RiVerifiedBadgeLine, RiFlagLine,
  RiAttachment2, RiEmotionLine, RiMoreLine
} from "react-icons/ri";
import { MdOutlineBathtub } from "react-icons/md";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";

// Mock property data (same as Browse.jsx)
const PROPERTIES = [
  { id: 1,  title: "3 Bedroom Flat",           location: "Lekki Phase 1",  state: "Lagos", price: 2500000,   priceLabel: "₦2,500,000/yr",  type: "Rent", beds: 3,    baths: 2,    views: 340, verified: true,  sqft: 1200, year: 2019, image: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=800&q=80", images: ["https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=800&q=80", "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=80", "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=800&q=80"], agent: "Emeka Okafor",   agentTitle: "Premium Agent", agentResponse: "Usually responds in 10 mins", agentAvatar: "EO", description: "Luxurious 3-bedroom apartment in the heart of Lekki Phase 1. Features modern fittings, 24/7 power, security, and proximity to major amenities.", features: ["24/7 Power", "Security", "Parking", "Water Supply", "Internet Ready"] },
  { id: 2,  title: "Luxury Duplex",             location: "Maitama",        state: "Abuja", price: 85000000,  priceLabel: "₦85,000,000",     type: "Sale", beds: 5,    baths: 4,    views: 210, verified: true,  sqft: 4500, year: 2021, image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80", images: ["https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80", "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80"], agent: "Fatima Bello",   agentTitle: "Verified Agent", agentResponse: "Usually responds in 30 mins", agentAvatar: "FB", description: "Stunning luxury duplex in Maitama with premium finishes, swimming pool, and smart home features.", features: ["Swimming Pool", "Smart Home", "BQ", "Garden", "Gym"] },
  { id: 3,  title: "Commercial Land (600sqm)",  location: "Bodija",         state: "Oyo",   price: 8000000,   priceLabel: "₦8,000,000",      type: "Land", beds: null, baths: null, views: 180, verified: true,  sqft: 6000, year: null, image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80", images: ["https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80"], agent: "Tunde Adeyemi",  agentTitle: "Land Specialist", agentResponse: "Usually responds in 1 hour", agentAvatar: "TA", description: "Prime commercial land in Bodija suitable for shopping complex, office building, or residential development.", features: ["C of O", "Fenced", "Road Access", "Dry Land"] },
  { id: 4,  title: "Mini Flat",                 location: "Yaba",           state: "Lagos", price: 900000,    priceLabel: "₦900,000/yr",     type: "Rent", beds: 1,    baths: 1,    views: 95,  verified: true,  sqft: 450,  year: 2018, image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80", images: ["https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80"], agent: "Ngozi Eze",      agentTitle: "Rental Expert", agentResponse: "Usually responds in 15 mins", agentAvatar: "NE", description: "Affordable mini flat perfect for students or young professionals. Close to UNILAG and tech hubs.", features: ["Prepaid Meter", "Parking", "Security"] },
  { id: 5,  title: "4 Bedroom Terrace",         location: "Gwarinpa",       state: "Abuja", price: 45000000,  priceLabel: "₦45,000,000",     type: "Sale", beds: 4,    baths: 3,    views: 178, verified: true,  sqft: 2800, year: 2020, image: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=800&q=80", images: ["https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=800&q=80"], agent: "Kemi Adesanya",  agentTitle: "Premium Agent", agentResponse: "Usually responds in 20 mins", agentAvatar: "KA", description: "Modern terrace duplex in Gwarinpa with excellent road network and family-friendly environment.", features: ["Family Area", "Modern Kitchen", "Guest Toilet", "Store"] },
  { id: 6,  title: "Residential Land (300sqm)", location: "Agodi",          state: "Oyo",   price: 3500000,   priceLabel: "₦3,500,000",      type: "Land", beds: null, baths: null, views: 134, verified: false, sqft: 3000, year: null, image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80", images: ["https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80"], agent: "Dele Ogun",      agentTitle: "Agent", agentResponse: "Usually responds in 2 hours", agentAvatar: "DO", description: "Affordable residential land in developing area of Agodi. Good for future investment.", features: ["Survey Plan", "Accessible Road"] },
  { id: 7,  title: "2 Bedroom Apartment",       location: "Victoria Island", state: "Lagos", price: 3200000,  priceLabel: "₦3,200,000/yr",   type: "Rent", beds: 2,    baths: 2,    views: 290, verified: true,  sqft: 1100, year: 2017, image: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=800&q=80", images: ["https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=800&q=80"], agent: "Amaka Obi",      agentTitle: "Luxury Specialist", agentResponse: "Usually responds in 5 mins", agentAvatar: "AO", description: "Premium 2-bedroom in VI with ocean view, gym access, and concierge service.", features: ["Ocean View", "Gym", "Concierge", "Elevator"] },
  { id: 8,  title: "5 Bedroom Mansion",         location: "Banana Island",  state: "Lagos", price: 250000000, priceLabel: "₦250,000,000",    type: "Sale", beds: 5,    baths: 6,    views: 520, verified: true,  sqft: 8000, year: 2022, image: "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=800&q=80", images: ["https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=800&q=80"], agent: "Chukwudi Eze",   agentTitle: "Elite Agent", agentResponse: "Usually responds in 30 mins", agentAvatar: "CE", description: "Ultra-luxury mansion in Banana Island with private jetty, cinema, and 5-car garage.", features: ["Private Jetty", "Cinema", "5-Car Garage", "Wine Cellar", "Smart Home"] },
  { id: 9,  title: "Self-Con Room",             location: "Surulere",       state: "Lagos", price: 400000,    priceLabel: "₦400,000/yr",     type: "Rent", beds: 1,    baths: 1,    views: 67,  verified: false, sqft: 200,  year: 2015, image: "https://images.unsplash.com/photo-1554995207-c18c203602cb?auto=format&fit=crop&w=800&q=80", images: ["https://images.unsplash.com/photo-1554995207-c18c203602cb?auto=format&fit=crop&w=800&q=80"], agent: "Tobi Lawson",    agentTitle: "Agent", agentResponse: "Usually responds in 1 hour", agentAvatar: "TL", description: "Budget self-contained room in Surulere. Good for single person starting out.", features: ["Fan", "Water Supply"] },
  { id: 10, title: "3 Bedroom Bungalow",        location: "Trans-Ekulu",    state: "Enugu", price: 12000000,  priceLabel: "₦12,000,000",     type: "Sale", beds: 3,    baths: 2,    views: 145, verified: true,  sqft: 1500, year: 2016, image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=800&q=80", images: ["https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=800&q=80"], agent: "Ifeoma Nwosu",   agentTitle: "Verified Agent", agentResponse: "Usually responds in 45 mins", agentAvatar: "IN", description: "Well-maintained bungalow in Enugu with compound space and security house.", features: ["Compound Space", "Security House", "Borehole"] },
  { id: 11, title: "Office Space (200sqm)",     location: "Wuse 2",         state: "Abuja", price: 6000000,   priceLabel: "₦6,000,000/yr",   type: "Rent", beds: null, baths: null, views: 88,  verified: true,  sqft: 2150, year: 2019, image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80", images: ["https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80"], agent: "Bola Tinubu Jr", agentTitle: "Commercial Expert", agentResponse: "Usually responds in 25 mins", agentAvatar: "BT", description: "Premium office space in Wuse 2 business district. Suitable for corporate headquarters.", features: ["Elevator", "Generator", "Parking", "Reception Area"] },
  { id: 12, title: "Land (1 Plot)",             location: "Ikoyi",          state: "Lagos", price: 120000000, priceLabel: "₦120,000,000",    type: "Land", beds: null, baths: null, views: 310, verified: true,  sqft: 6000, year: null, image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80", images: ["https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80"], agent: "Sandra Okeke",   agentTitle: "Premium Agent", agentResponse: "Usually responds in 15 mins", agentAvatar: "SO", description: "Prime land in Ikoyi suitable for high-rise residential or commercial development.", features: ["C of O", "Governor's Consent", "Corner Piece"] },
];

// Mock initial messages
const INITIAL_MESSAGES = [
  {
    id: 1,
    sender: "agent",
    text: "Hello! I'm interested in this property. Is it still available?",
    time: "10:30 AM",
    status: "read"
  },
  {
    id: 2,
    sender: "user",
    text: "Hi there! Yes, this property is still available. When would you like to schedule a viewing?",
    time: "10:32 AM",
    status: "read"
  },
  {
    id: 3,
    sender: "agent",
    text: "Great! I'm available this weekend. Can you tell me more about the neighborhood security?",
    time: "10:35 AM",
    status: "read"
  }
];

const PropertyDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [currentImage, setCurrentImage] = useState(0);
  const [liked, setLiked] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [newMessage, setNewMessage] = useState("");
  const [chatStarted, setChatStarted] = useState(false);
  const messagesEndRef = useRef(null);

  const property = PROPERTIES.find(p => p.id === Number(id));

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  if (!property) {
    return (
      <div className="min-h-screen bg-[#F7F4EF] flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 rounded-2xl bg-[#E8D5A3]/40 border border-[#C9A84C]/20 flex items-center justify-center mb-4 mx-auto">
            <RiErrorWarningLine size={28} className="text-[#C9A84C]" />
          </div>
          <h1 className="text-2xl font-bold text-[#0A1628] mb-2">Property Not Found</h1>
          <p className="text-[#6B7280] mb-6">The property you're looking for doesn't exist.</p>
          <button 
            onClick={() => navigate('/browse')}
            className="bg-[#C9A84C] hover:bg-[#b8943d] text-[#0A1628] font-bold px-6 py-3 rounded-xl transition duration-200"
          >
            Back to Browse
          </button>
        </div>
      </div>
    );
  }

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const msg = {
      id: messages.length + 1,
      sender: "user",
      text: newMessage,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: "sent"
    };

    setMessages([...messages, msg]);
    setNewMessage("");
    setChatStarted(true);

    // Simulate agent reply after 2 seconds
    setTimeout(() => {
      const reply = {
        id: messages.length + 2,
        sender: "agent",
        text: "Thanks for your message! I'll get back to you shortly with more details about this property.",
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        status: "read"
      };
      setMessages(prev => [...prev, reply]);
    }, 2000);
  };

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % property.images.length);
  };

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + property.images.length) % property.images.length);
  };

  return (
    <div className="min-h-screen bg-[#F7F4EF]">
      {/* Navigation Bar */}
      <div className="bg-[#0A1628] pt-6 pb-6 px-4 sm:px-8 lg:px-12">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <button 
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-[#F7F4EF] hover:text-[#C9A84C] transition"
          >
            <RiArrowLeftLine size={20} />
            <span className="text-sm font-medium">Back</span>
          </button>
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 text-[#C9A84C] text-xs font-medium bg-[#C9A84C]/10 px-3 py-1.5 rounded-full">
              <RiLockLine size={14} />
              <span>Secure Platform</span>
            </div>
            <button 
              onClick={() => setLiked(!liked)}
              className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition"
            >
              {liked ? <RiHeart3Fill size={20} className="text-red-500" /> : <RiHeart3Line size={20} className="text-white" />}
            </button>
            <button className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition">
              <RiShareLine size={20} className="text-white" />
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 py-8">
        {/* Image Gallery */}
        <div className="mb-8">
          <div className="relative h-[400px] sm:h-[500px] rounded-2xl overflow-hidden">
            <img 
              src={property.images[currentImage]} 
              alt={property.title}
              className="w-full h-full object-cover"
            />
            {property.images.length > 1 && (
              <>
                <button 
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/90 flex items-center justify-center hover:bg-white transition shadow-lg"
                >
                  <HiChevronLeft size={24} className="text-[#0A1628]" />
                </button>
                <button 
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/90 flex items-center justify-center hover:bg-white transition shadow-lg"
                >
                  <HiChevronRight size={24} className="text-[#0A1628]" />
                </button>
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                  {property.images.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentImage(idx)}
                      className={`w-2 h-2 rounded-full transition ${currentImage === idx ? 'bg-white' : 'bg-white/50'}`}
                    />
                  ))}
                </div>
              </>
            )}
            <div className="absolute top-4 left-4 flex gap-2">
              <span className="bg-[#0A1628] text-[#C9A84C] text-xs font-bold px-3 py-1.5 rounded-full">
                {property.type}
              </span>
              {property.verified && (
                <span className="bg-[#C9A84C] text-[#0A1628] text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1">
                  <RiShieldCheckFill size={12} /> Verified
                </span>
              )}
            </div>
          </div>
          
          {property.images.length > 1 && (
            <div className="flex gap-2 mt-4 overflow-x-auto pb-2">
              {property.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentImage(idx)}
                  className={`flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden border-2 transition ${currentImage === idx ? 'border-[#C9A84C]' : 'border-transparent'}`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Header */}
            <div>
              <div className="flex items-start justify-between gap-4 mb-2">
                <h1 className="text-2xl sm:text-3xl font-bold text-[#0A1628]">{property.title}</h1>
                <div className="flex items-center gap-1 text-[#C9A84C] bg-[#C9A84C]/10 px-3 py-1 rounded-full">
                  <RiVerifiedBadgeLine size={16} />
                  <span className="text-xs font-bold">NRET Secure</span>
                </div>
              </div>
              <p className="text-[#6B7280] flex items-center gap-1 mb-4">
                <RiMapPinLine size={18} /> {property.location}, {property.state}
              </p>
              <div className="flex items-center gap-4 text-sm text-[#6B7280]">
                <span className="flex items-center gap-1">
                  <RiEyeLine size={16} /> {property.views} views
                </span>
                <span className="flex items-center gap-1">
                  <RiCalendarLine size={16} /> Listed {property.year || 'Recently'}
                </span>
              </div>
            </div>

            {/* Price */}
            <div className="bg-white rounded-2xl border border-[#E0D9CF] p-6">
              <p className="text-3xl font-bold text-[#0A1628]">{property.priceLabel}</p>
              <p className="text-sm text-[#6B7280] mt-1">
                {property.type === 'Rent' ? 'per year' : 'One-time payment'}
              </p>
            </div>

            {/* Quick Stats */}
            {property.beds && (
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-white rounded-2xl border border-[#E0D9CF] p-4 text-center">
                  <RiHotelBedLine size={24} className="text-[#C9A84C] mx-auto mb-2" />
                  <p className="text-lg font-bold text-[#0A1628]">{property.beds}</p>
                  <p className="text-xs text-[#6B7280]">Bedrooms</p>
                </div>
                <div className="bg-white rounded-2xl border border-[#E0D9CF] p-4 text-center">
                  <MdOutlineBathtub size={24} className="text-[#C9A84C] mx-auto mb-2" />
                  <p className="text-lg font-bold text-[#0A1628]">{property.baths}</p>
                  <p className="text-xs text-[#6B7280]">Bathrooms</p>
                </div>
                <div className="bg-white rounded-2xl border border-[#E0D9CF] p-4 text-center">
                  <RiRulerLine size={24} className="text-[#C9A84C] mx-auto mb-2" />
                  <p className="text-lg font-bold text-[#0A1628]">{property.sqft?.toLocaleString()}</p>
                  <p className="text-xs text-[#6B7280]">Sq Ft</p>
                </div>
              </div>
            )}

            {/* Description */}
            <div className="bg-white rounded-2xl border border-[#E0D9CF] p-6">
              <h2 className="text-lg font-bold text-[#0A1628] mb-4">Description</h2>
              <p className="text-[#6B7280] leading-relaxed">{property.description}</p>
            </div>

            {/* Features */}
            {property.features && (
              <div className="bg-white rounded-2xl border border-[#E0D9CF] p-6">
                <h2 className="text-lg font-bold text-[#0A1628] mb-4">Features</h2>
                <div className="grid sm:grid-cols-2 gap-3">
                  {property.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-[#6B7280]">
                      <div className="w-5 h-5 rounded-full bg-[#C9A84C]/20 flex items-center justify-center">
                        <RiCheckLine size={12} className="text-[#C9A84C]" />
                      </div>
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Platform Notice */}
            <div className="bg-[#0A1628] rounded-2xl p-6">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-[#C9A84C] flex items-center justify-center flex-shrink-0">
                  <RiShieldCheckFill size={20} className="text-[#0A1628]" />
                </div>
                <div>
                  <h3 className="font-bold text-[#F7F4EF] mb-1">Stay Protected on NRET</h3>
                  <p className="text-[#8A9BB5] text-sm leading-relaxed">
                    Never share your contact details or make payments outside the platform. 
                    All communications are monitored for your safety. Report suspicious activity immediately.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar - Agent & Chat */}
          <div className="lg:col-span-1">
            {!showChat ? (
              <div className="bg-white rounded-2xl border border-[#E0D9CF] p-6 sticky top-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-14 h-14 rounded-full bg-[#0A1628] flex items-center justify-center text-[#C9A84C] text-lg font-bold">
                    {property.agentAvatar}
                  </div>
                  <div>
                    <p className="font-bold text-[#0A1628]">{property.agent}</p>
                    <p className="text-xs text-[#C9A84C] font-semibold">{property.agentTitle}</p>
                    <p className="text-xs text-[#6B7280] flex items-center gap-1 mt-0.5">
                      <RiTimeLine size={12} /> {property.agentResponse}
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                  <button 
                    onClick={() => setShowChat(true)}
                    className="w-full bg-[#C9A84C] hover:bg-[#b8943d] text-[#0A1628] font-bold py-3 rounded-xl transition duration-200 flex items-center justify-center gap-2"
                  >
                    <RiMessage3Line size={20} /> Message Agent
                  </button>
                  <button 
                    className="w-full border border-[#E0D9CF] hover:border-[#C9A84C] text-[#0A1628] font-semibold py-3 rounded-xl transition duration-200 flex items-center justify-center gap-2"
                  >
                    <RiCalendarLine size={20} /> Schedule Visit
                  </button>
                </div>

                <div className="border-t border-[#E0D9CF] pt-4 mt-4 space-y-3">
                  <div className="flex items-center gap-2 text-xs text-[#6B7280]">
                    <RiLockLine size={14} className="text-[#C9A84C]" />
                    <span>End-to-end encrypted messages</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-[#6B7280]">
                    <RiShieldCheckFill size={14} className="text-[#C9A84C]" />
                    <span>Verified agent identity</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-[#6B7280]">
                    <RiFlagLine size={14} className="text-[#C9A84C]" />
                    <span>Report suspicious activity</span>
                  </div>
                </div>

                <div className="bg-[#E8D5A3]/30 rounded-xl p-4 mt-4">
                  <p className="text-xs text-[#0A1628] font-medium text-center">
                    Reference ID: PROP-{property.id.toString().padStart(4, '0')}
                  </p>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-2xl border border-[#E0D9CF] overflow-hidden sticky top-6 flex flex-col h-[600px]">
                {/* Chat Header */}
                <div className="bg-[#0A1628] p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#C9A84C] flex items-center justify-center text-[#0A1628] font-bold text-sm">
                      {property.agentAvatar}
                    </div>
                    <div>
                      <p className="font-bold text-[#F7F4EF] text-sm">{property.agent}</p>
                      <p className="text-xs text-[#C9A84C] flex items-center gap-1">
                        <span className="w-2 h-2 rounded-full bg-green-500"></span> Online
                      </p>
                    </div>
                  </div>
                  <button 
                    onClick={() => setShowChat(false)}
                    className="text-[#F7F4EF]/60 hover:text-[#F7F4EF] text-xs underline"
                  >
                    Close
                  </button>
                </div>

                {/* Security Notice */}
                <div className="bg-[#C9A84C]/10 border-b border-[#C9A84C]/20 p-2 text-center">
                  <p className="text-[10px] text-[#0A1628] font-medium flex items-center justify-center gap-1">
                    <RiLockLine size={10} /> Messages are encrypted and monitored for safety
                  </p>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#F7F4EF]">
                  {!chatStarted && messages.length === 0 && (
                    <div className="text-center py-8">
                      <div className="w-12 h-12 rounded-full bg-[#C9A84C]/20 flex items-center justify-center mx-auto mb-2">
                        <RiMessage3Line size={20} className="text-[#C9A84C]" />
                      </div>
                      <p className="text-xs text-[#6B7280]">Start a conversation with {property.agent}</p>
                      <p className="text-[10px] text-[#6B7280]/60 mt-1">Never share personal contact info</p>
                    </div>
                  )}
                  
                  {messages.map((msg) => (
                    <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-[80%] ${msg.sender === 'user' ? 'bg-[#0A1628]' : 'bg-white border border-[#E0D9CF]'} rounded-2xl px-4 py-2.5`}>
                        <p className={`text-sm ${msg.sender === 'user' ? 'text-[#F7F4EF]' : 'text-[#0A1628]'}`}>
                          {msg.text}
                        </p>
                        <div className={`flex items-center gap-1 mt-1 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                          <span className={`text-[10px] ${msg.sender === 'user' ? 'text-[#C9A84C]' : 'text-[#6B7280]'}`}>
                            {msg.time}
                          </span>
                          {msg.sender === 'user' && (
                            <RiCheckLine size={10} className="text-[#C9A84C]" />
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>

                {/* Input */}
                <form onSubmit={handleSendMessage} className="p-4 border-t border-[#E0D9CF] bg-white">
                  <div className="flex items-center gap-2 mb-2">
                    <button type="button" className="text-[#6B7280] hover:text-[#C9A84C] transition">
                      <RiAttachment2 size={18} />
                    </button>
                    <button type="button" className="text-[#6B7280] hover:text-[#C9A84C] transition">
                      <RiEmotionLine size={18} />
                    </button>
                    <span className="text-[10px] text-[#6B7280] flex-1 text-center">
                      Protected by NRET SecureChat™
                    </span>
                    <button type="button" className="text-[#6B7280] hover:text-red-500 transition">
                      <RiFlagLine size={18} />
                    </button>
                  </div>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      placeholder="Type your message..."
                      className="flex-1 px-4 py-2.5 rounded-xl border border-[#E0D9CF] focus:border-[#C9A84C] focus:outline-none text-sm text-[#0A1628] placeholder-[#6B7280]"
                    />
                    <button
                      type="submit"
                      disabled={!newMessage.trim()}
                      className="w-10 h-10 rounded-xl bg-[#C9A84C] flex items-center justify-center disabled:opacity-50 hover:bg-[#b8943d] transition"
                    >
                      <RiSendPlaneLine size={18} className="text-[#0A1628]" />
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Safety Tips - Only show when chat is closed */}
            {!showChat && (
              <div className="bg-[#E8D5A3]/30 rounded-2xl border border-[#C9A84C]/20 p-4 mt-4">
                <div className="flex items-start gap-2">
                  <RiShieldCheckFill size={20} className="text-[#C9A84C] flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-semibold text-[#0A1628] mb-1">Safety First</p>
                    <ul className="text-xs text-[#6B7280] space-y-1 list-disc list-inside">
                      <li>Never share contact details</li>
                      <li>Don't make external payments</li>
                      <li>Report suspicious messages</li>
                      <li>Use our inspection service</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetails;