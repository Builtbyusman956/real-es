// src/pages/dashboard/AgentProfile.jsx
import { useState } from "react";
import {
  RiUserLine, RiShieldCheckFill, RiAlertLine,
  RiEditLine, RiSaveLine, RiCloseLine,
  RiMapPinLine, RiPhoneLine, RiMailLine,
  RiStarFill, RiEyeLine, RiHomeSmileLine,
  RiCheckboxCircleLine, RiTimeLine, RiUploadLine,
  RiCamera2Line, RiBuildingLine,
} from "react-icons/ri";

// ─── Mock Data ────────────────────────────────────────────────────────────────
const AGENT = {
  name: "Emeka Okafor",
  email: "emeka@example.com",
  phone: "+234 801 234 5678",
  avatar: "EO",
  location: "Lagos, Nigeria",
  officeAddress: "12 Admiralty Way, Lekki Phase 1, Lagos",
  bio: "Verified real estate agent with 8+ years experience in Lagos and Abuja. Specialised in residential and commercial properties. I prioritize transparency and client satisfaction above all.",
  verified: false,
  rating: 4.7,
  reviews: 23,
  joined: "March 2024",
  specializations: ["Residential", "Commercial", "Land"],
};

const VERIFICATION = [
  { label: "NIN / National ID",    done: true,  docName: "national_id.pdf"    },
  { label: "BVN Verification",     done: false, docName: null                 },
  { label: "Face Verification",    done: false, docName: null                 },
  { label: "Office Address",       done: true,  docName: "office_proof.pdf"   },
  { label: "CAC Registration",     done: false, docName: null                 },
];

const LISTINGS = [
  { id: 1, title: "3 Bedroom Flat",     location: "Lekki, Lagos",  price: "₦2,500,000/yr", status: "active",  views: 340, image: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=400&q=80" },
  { id: 2, title: "Land (600sqm)",      location: "Ibadan, Oyo",   price: "₦8,000,000",    status: "pending", views: 120, image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=400&q=80" },
  { id: 3, title: "2 Bedroom Bungalow", location: "Abuja, FCT",    price: "₦1,800,000/yr", status: "active",  views: 210, image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=400&q=80" },
];

const REVIEWS = [
  { id: 1, name: "Chidi Nwosu",   avatar: "CN", rating: 5, text: "Very professional and transparent. Helped me find my apartment in 2 weeks.", date: "2 weeks ago" },
  { id: 2, name: "Fatima Bello",  avatar: "FB", rating: 4, text: "Great agent! Very knowledgeable about the Lagos market. Would recommend.", date: "1 month ago"  },
  { id: 3, name: "Tola Adeyemi",  avatar: "TA", rating: 5, text: "Emeka was honest and patient throughout the whole process. No hidden fees.", date: "2 months ago" },
];

// ─── Section Header ───────────────────────────────────────────────────────────
const SectionHeader = ({ title, action }) => (
  <div className="flex items-center justify-between mb-4">
    <h3 className="font-bold text-[#0A1628] text-base">{title}</h3>
    {action}
  </div>
);

// ─── Edit Modal ───────────────────────────────────────────────────────────────
const EditModal = ({ form, setForm, onClose, onSave }) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
    <div className="absolute inset-0 bg-black/50" onClick={onClose} />
    <div className="relative bg-white rounded-2xl w-full max-w-md shadow-2xl overflow-hidden">
      <div className="bg-[#0A1628] px-5 py-4 flex items-center justify-between">
        <div>
          <p className="text-[#C9A84C] text-[10px] font-bold uppercase tracking-widest">Edit Profile</p>
          <p className="text-[#F7F4EF] font-bold text-sm mt-0.5">Update your information</p>
        </div>
        <button onClick={onClose} className="text-[#8A9BB5] hover:text-white transition">
          <RiCloseLine size={20} />
        </button>
      </div>
      <div className="p-5 flex flex-col gap-4 max-h-[70vh] overflow-y-auto">
        {[
          { label: "Full Name",       key: "name",          type: "text",  placeholder: "Emeka Okafor"                   },
          { label: "Phone Number",    key: "phone",         type: "tel",   placeholder: "+234 801 234 5678"               },
          { label: "Email Address",   key: "email",         type: "email", placeholder: "emeka@example.com"               },
          { label: "Location",        key: "location",      type: "text",  placeholder: "Lagos, Nigeria"                  },
          { label: "Office Address",  key: "officeAddress", type: "text",  placeholder: "12 Admiralty Way, Lekki..."      },
        ].map(({ label, key, type, placeholder }) => (
          <div key={key}>
            <label className="text-[10px] font-bold text-[#6B7280] uppercase tracking-widest mb-1.5 block">{label}</label>
            <input type={type} placeholder={placeholder} value={form[key] || ""}
              onChange={(e) => setForm((p) => ({ ...p, [key]: e.target.value }))}
              className="w-full px-3 py-2.5 rounded-xl border border-[#E0D9CF] text-sm text-[#0A1628] bg-[#F7F4EF] outline-none focus:ring-2 focus:ring-[#C9A84C] focus:border-[#C9A84C] transition" />
          </div>
        ))}
        <div>
          <label className="text-[10px] font-bold text-[#6B7280] uppercase tracking-widest mb-1.5 block">Bio</label>
          <textarea rows={3} placeholder="Tell buyers about yourself..." value={form.bio || ""}
            onChange={(e) => setForm((p) => ({ ...p, bio: e.target.value }))}
            className="w-full px-3 py-2.5 rounded-xl border border-[#E0D9CF] text-sm text-[#0A1628] bg-[#F7F4EF] outline-none focus:ring-2 focus:ring-[#C9A84C] focus:border-[#C9A84C] transition resize-none" />
        </div>
      </div>
      <div className="px-5 py-4 border-t border-[#E0D9CF] flex gap-2">
        <button onClick={onClose}
          className="flex-1 border border-[#E0D9CF] text-[#6B7280] hover:border-red-300 hover:text-red-400 py-2.5 rounded-xl text-sm font-semibold transition">
          Cancel
        </button>
        <button onClick={onSave}
          className="flex-1 flex items-center justify-center gap-2 bg-[#C9A84C] hover:bg-[#b8943d] active:scale-95 text-[#0A1628] py-2.5 rounded-xl text-sm font-bold transition">
          <RiSaveLine size={15} /> Save Changes
        </button>
      </div>
    </div>
  </div>
);

// ─── Main ─────────────────────────────────────────────────────────────────────
const AgentProfile = () => {
  const [agent,     setAgent]     = useState(AGENT);
  const [editOpen,  setEditOpen]  = useState(false);
  const [editForm,  setEditForm]  = useState({ ...AGENT });
  const [activeTab, setActiveTab] = useState("listings");

  const handleSave = () => {
    setAgent((p) => ({ ...p, ...editForm }));
    setEditOpen(false);
  };

  const completedVerifications = VERIFICATION.filter((v) => v.done).length;
  const verificationPercent    = Math.round((completedVerifications / VERIFICATION.length) * 100);

  return (
    <div className="flex flex-col gap-6 max-w-4xl mx-auto">

      {/* ── Profile Card ── */}
      <div className="bg-white rounded-2xl border border-[#E0D9CF] overflow-hidden">
        {/* Banner */}
        <div className="h-24 bg-gradient-to-r from-[#0A1628] to-[#1A2E4A] relative">
          <div className="absolute inset-0 opacity-20"
            style={{ backgroundImage: "repeating-linear-gradient(45deg, #C9A84C 0, #C9A84C 1px, transparent 0, transparent 50%)", backgroundSize: "12px 12px" }} />
        </div>

        <div className="px-5 pb-5">
          {/* Avatar row */}
          <div className="flex items-end justify-between -mt-8 mb-4">
            <div className="relative">
              <div className="w-16 h-16 rounded-2xl bg-[#C9A84C] border-4 border-white flex items-center justify-center text-[#0A1628] font-black text-xl shadow-lg">
                {agent.avatar}
              </div>
              <button className="absolute -bottom-1 -right-1 w-6 h-6 bg-[#0A1628] rounded-full flex items-center justify-center hover:bg-[#1A2E4A] transition">
                <RiCamera2Line size={12} className="text-[#C9A84C]" />
              </button>
            </div>
            <button onClick={() => { setEditForm({ ...agent }); setEditOpen(true); }}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-[#E0D9CF] text-xs font-semibold text-[#0A1628] hover:border-[#C9A84C]/50 hover:bg-[#F7F4EF] transition">
              <RiEditLine size={13} /> Edit Profile
            </button>
          </div>

          {/* Name + verification */}
          <div className="flex items-start justify-between gap-3 flex-wrap">
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold text-[#0A1628]">{agent.name}</h2>
                {agent.verified
                  ? <span className="flex items-center gap-1 bg-[#0A1628] text-[#C9A84C] text-[10px] font-bold px-2 py-0.5 rounded-full"><RiShieldCheckFill size={10} /> Verified</span>
                  : <span className="flex items-center gap-1 bg-yellow-100 text-yellow-600 text-[10px] font-bold px-2 py-0.5 rounded-full"><RiAlertLine size={10} /> Unverified</span>
                }
              </div>
              <p className="text-[#6B7280] text-sm mt-1">Real Estate Agent</p>
            </div>
            <div className="flex items-center gap-1.5 bg-[#F7F4EF] px-3 py-1.5 rounded-xl border border-[#E0D9CF]">
              <RiStarFill size={14} className="text-[#C9A84C]" />
              <span className="text-sm font-bold text-[#0A1628]">{agent.rating}</span>
              <span className="text-xs text-[#6B7280]">({agent.reviews} reviews)</span>
            </div>
          </div>

          {/* Contact info */}
          <div className="flex flex-wrap gap-4 mt-3">
            {[
              { icon: RiMapPinLine,  text: agent.location      },
              { icon: RiPhoneLine,   text: agent.phone         },
              { icon: RiMailLine,    text: agent.email         },
              { icon: RiBuildingLine, text: agent.officeAddress },
            ].map(({ icon: Icon, text }) => (
              <span key={text} className="flex items-center gap-1.5 text-xs text-[#6B7280]">
                <Icon size={13} className="text-[#C9A84C] flex-shrink-0" /> {text}
              </span>
            ))}
          </div>

          {/* Bio */}
          <p className="text-sm text-[#6B7280] leading-relaxed mt-3 border-t border-[#E0D9CF] pt-3">
            {agent.bio}
          </p>

          {/* Specializations + joined */}
          <div className="flex items-center justify-between mt-3 flex-wrap gap-3">
            <div className="flex gap-2 flex-wrap">
              {agent.specializations.map((s) => (
                <span key={s} className="bg-[#E8D5A3]/50 text-[#0A1628] text-xs font-semibold px-2.5 py-1 rounded-full border border-[#C9A84C]/20">
                  {s}
                </span>
              ))}
            </div>
            <span className="text-xs text-[#6B7280]">Member since {agent.joined}</span>
          </div>
        </div>
      </div>

      {/* ── Stats row ── */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: "Total Listings", value: LISTINGS.length,                           icon: RiHomeSmileLine },
          { label: "Total Views",    value: LISTINGS.reduce((a, l) => a + l.views, 0), icon: RiEyeLine       },
          { label: "Reviews",        value: REVIEWS.length,                             icon: RiStarFill      },
        ].map(({ label, value, icon: Icon }) => (
          <div key={label} className="bg-white rounded-2xl border border-[#E0D9CF] p-4 text-center hover:border-[#C9A84C]/30 transition">
            <div className="w-10 h-10 rounded-xl bg-[#0A1628] flex items-center justify-center mx-auto mb-2">
              <Icon size={18} className="text-[#C9A84C]" />
            </div>
            <p className="text-2xl font-bold text-[#0A1628]">{value}</p>
            <p className="text-xs text-[#6B7280] mt-0.5">{label}</p>
          </div>
        ))}
      </div>

      {/* ── Verification Status ── */}
      <div className="bg-white rounded-2xl border border-[#E0D9CF] p-5">
        <SectionHeader
          title="Verification Status"
          action={
            <span className={`text-xs font-bold px-2.5 py-1 rounded-full
              ${verificationPercent === 100
                ? "bg-[#0A1628] text-[#C9A84C]"
                : "bg-[#E8D5A3] text-[#0A1628]"}`}>
              {completedVerifications}/{VERIFICATION.length} complete
            </span>
          }
        />

        {/* Progress bar */}
        <div className="bg-[#E0D9CF] rounded-full h-2 mb-4">
          <div
            className="bg-[#C9A84C] h-2 rounded-full transition-all duration-500"
            style={{ width: `${verificationPercent}%` }}
          />
        </div>

        <div className="flex flex-col gap-3">
          {VERIFICATION.map(({ label, done, docName }) => (
            <div key={label}
              className={`flex items-center justify-between p-3 rounded-xl border transition
                ${done
                  ? "bg-[#F7F4EF] border-[#E0D9CF]"
                  : "bg-yellow-50 border-yellow-200"}`}>
              <div className="flex items-center gap-3">
                {done
                  ? <RiCheckboxCircleLine size={18} className="text-[#C9A84C] flex-shrink-0" />
                  : <RiTimeLine size={18} className="text-yellow-500 flex-shrink-0" />
                }
                <div>
                  <p className="text-sm font-semibold text-[#0A1628]">{label}</p>
                  {docName && <p className="text-[10px] text-[#6B7280] mt-0.5">{docName}</p>}
                </div>
              </div>
              {!done && (
                <button className="flex items-center gap-1.5 bg-[#C9A84C] hover:bg-[#b8943d] text-[#0A1628] text-xs font-bold px-3 py-1.5 rounded-lg transition">
                  <RiUploadLine size={12} /> Upload
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* ── Listings & Reviews Tabs ── */}
      <div className="bg-white rounded-2xl border border-[#E0D9CF] overflow-hidden">
        <div className="flex border-b border-[#E0D9CF]">
          {["listings", "reviews"].map((tab) => (
            <button key={tab} onClick={() => setActiveTab(tab)}
              className={`flex-1 py-3.5 text-sm font-semibold capitalize transition
                ${activeTab === tab
                  ? "border-b-2 border-[#C9A84C] text-[#0A1628]"
                  : "text-[#6B7280] hover:text-[#0A1628]"}`}>
              {tab} {tab === "listings" ? `(${LISTINGS.length})` : `(${REVIEWS.length})`}
            </button>
          ))}
        </div>

        <div className="p-5">
          {activeTab === "listings" && (
            <div className="flex flex-col gap-3">
              {LISTINGS.map((l) => (
                <div key={l.id}
                  className="flex items-center gap-3 p-3 rounded-xl border border-[#E0D9CF] hover:border-[#C9A84C]/30 hover:bg-[#F7F4EF] transition">
                  <img src={l.image} alt={l.title} className="w-14 h-14 rounded-xl object-cover flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-[#0A1628] truncate">{l.title}</p>
                    <p className="text-xs text-[#6B7280] flex items-center gap-1 mt-0.5">
                      <RiMapPinLine size={10} /> {l.location}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs text-[#6B7280] flex items-center gap-1">
                        <RiEyeLine size={11} /> {l.views} views
                      </span>
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="text-sm font-bold text-[#0A1628]">{l.price}</p>
                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full
                      ${l.status === "active"
                        ? "bg-[#0A1628] text-[#C9A84C]"
                        : "bg-[#E8D5A3] text-[#6B7280]"}`}>
                      {l.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === "reviews" && (
            <div className="flex flex-col gap-4">
              {REVIEWS.map((r) => (
                <div key={r.id} className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#E8D5A3] flex items-center justify-center text-[#0A1628] font-bold text-xs flex-shrink-0">
                    {r.avatar}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <p className="text-sm font-bold text-[#0A1628]">{r.name}</p>
                      <span className="text-xs text-[#6B7280]">{r.date}</span>
                    </div>
                    <div className="flex gap-0.5 my-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <RiStarFill key={i} size={12}
                          className={i < r.rating ? "text-[#C9A84C]" : "text-[#E0D9CF]"} />
                      ))}
                    </div>
                    <p className="text-sm text-[#6B7280] leading-relaxed">{r.text}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {editOpen && (
        <EditModal
          form={editForm}
          setForm={setEditForm}
          onClose={() => setEditOpen(false)}
          onSave={handleSave}
        />
      )}
    </div>
  );
};

export default AgentProfile;