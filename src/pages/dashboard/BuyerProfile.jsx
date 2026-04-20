// src/pages/dashboard/BuyerProfile.jsx
import { useState } from "react";
import {
  RiUserLine, RiShieldCheckFill,
  RiEditLine, RiSaveLine, RiCloseLine,
  RiMapPinLine, RiPhoneLine, RiMailLine,
  RiHeart3Line, RiCalendarLine, RiSearchLine,
  RiCheckboxCircleLine, RiTimeLine, RiUploadLine,
  RiCamera2Line, RiFileListLine,
} from "react-icons/ri";
import { MdBedroomParent, MdOutlineBathtub } from "react-icons/md";

// ─── Mock Data ────────────────────────────────────────────────────────────────
const BUYER = {
  name: "Chidi Nwosu",
  email: "chidi@example.com",
  phone: "+234 802 345 6789",
  avatar: "CN",
  location: "Lagos, Nigeria",
  bio: "Looking for a 3-bedroom apartment in Lekki or Victoria Island. Serious buyer, pre-approved and ready to move quickly.",
  verified: true,
  joined: "January 2024",
  preferences: ["Rent", "Lekki", "Victoria Island", "3 Bedrooms"],
};

const VERIFICATION = [
  { label: "NIN / National ID",  done: true,  docName: "national_id.pdf" },
  { label: "Phone Verification", done: true,  docName: null              },
  { label: "Email Verification", done: true,  docName: null              },
  { label: "BVN Verification",   done: false, docName: null              },
];

const SAVED = [
  { id: 1, title: "3 Bedroom Flat",  location: "Lekki Phase 1, Lagos", price: "₦2,500,000/yr", type: "Rent", beds: 3, baths: 2, image: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=800&q=80" },
  { id: 2, title: "Luxury Duplex",   location: "Maitama, Abuja",       price: "₦85,000,000",   type: "Sale", beds: 5, baths: 4, image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80" },
  { id: 3, title: "Mini Flat",       location: "Yaba, Lagos",          price: "₦900,000/yr",   type: "Rent", beds: 1, baths: 1, image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80" },
];

const REQUESTS = [
  { id: 1, title: "Looking for 3 Bedroom in Lekki", budget: "₦2M–₦3M/yr",    type: "Rent", status: "active",  offers: 4,  date: "2 days ago" },
  { id: 2, title: "Need Land in Ibadan (300–600sqm)", budget: "₦3M–₦10M",     type: "Land", status: "active",  offers: 7,  date: "5 days ago" },
  { id: 3, title: "Office Space in Abuja",            budget: "₦4M–₦6M/yr",   type: "Rent", status: "closed",  offers: 11, date: "2 weeks ago" },
];

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
          { label: "Full Name",     key: "name",     type: "text",  placeholder: "Chidi Nwosu"           },
          { label: "Phone Number",  key: "phone",    type: "tel",   placeholder: "+234 802 345 6789"      },
          { label: "Email Address", key: "email",    type: "email", placeholder: "chidi@example.com"      },
          { label: "Location",      key: "location", type: "text",  placeholder: "Lagos, Nigeria"         },
        ].map(({ label, key, type, placeholder }) => (
          <div key={key}>
            <label className="text-[10px] font-bold text-[#6B7280] uppercase tracking-widest mb-1.5 block">{label}</label>
            <input type={type} placeholder={placeholder} value={form[key] || ""}
              onChange={(e) => setForm((p) => ({ ...p, [key]: e.target.value }))}
              className="w-full px-3 py-2.5 rounded-xl border border-[#E0D9CF] text-sm text-[#0A1628] bg-[#F7F4EF] outline-none focus:ring-2 focus:ring-[#C9A84C] focus:border-[#C9A84C] transition" />
          </div>
        ))}
        <div>
          <label className="text-[10px] font-bold text-[#6B7280] uppercase tracking-widest mb-1.5 block">Bio / What You're Looking For</label>
          <textarea rows={3} placeholder="Describe what you're looking for..." value={form.bio || ""}
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
const BuyerProfile = () => {
  const [buyer,     setBuyer]     = useState(BUYER);
  const [editOpen,  setEditOpen]  = useState(false);
  const [editForm,  setEditForm]  = useState({ ...BUYER });
  const [activeTab, setActiveTab] = useState("saved");

  const handleSave = () => {
    setBuyer((p) => ({ ...p, ...editForm }));
    setEditOpen(false);
  };

  const completedVerifications = VERIFICATION.filter((v) => v.done).length;
  const verificationPercent    = Math.round((completedVerifications / VERIFICATION.length) * 100);

  return (
    <div className="flex flex-col gap-6 max-w-4xl mx-auto">

      {/* ── Profile Card ── */}
      <div className="bg-white rounded-2xl border border-[#E0D9CF] overflow-hidden">
        <div className="h-20 bg-gradient-to-r from-[#0A1628] to-[#1A2E4A] relative">
          <div className="absolute inset-0 opacity-20"
            style={{ backgroundImage: "repeating-linear-gradient(45deg, #C9A84C 0, #C9A84C 1px, transparent 0, transparent 50%)", backgroundSize: "12px 12px" }} />
        </div>

        <div className="px-5 pb-5">
          <div className="flex items-end justify-between -mt-7 mb-4">
            <div className="relative">
              <div className="w-14 h-14 rounded-2xl bg-[#C9A84C] border-4 border-white flex items-center justify-center text-[#0A1628] font-black text-lg shadow-lg">
                {buyer.avatar}
              </div>
              <button className="absolute -bottom-1 -right-1 w-6 h-6 bg-[#0A1628] rounded-full flex items-center justify-center hover:bg-[#1A2E4A] transition">
                <RiCamera2Line size={12} className="text-[#C9A84C]" />
              </button>
            </div>
            <button onClick={() => { setEditForm({ ...buyer }); setEditOpen(true); }}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-[#E0D9CF] text-xs font-semibold text-[#0A1628] hover:border-[#C9A84C]/50 hover:bg-[#F7F4EF] transition">
              <RiEditLine size={13} /> Edit Profile
            </button>
          </div>

          <div className="flex items-start justify-between gap-3 flex-wrap">
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold text-[#0A1628]">{buyer.name}</h2>
                {buyer.verified && (
                  <span className="flex items-center gap-1 bg-[#0A1628] text-[#C9A84C] text-[10px] font-bold px-2 py-0.5 rounded-full">
                    <RiShieldCheckFill size={10} /> Verified
                  </span>
                )}
              </div>
              <p className="text-[#6B7280] text-sm mt-0.5">Property Buyer</p>
            </div>
            <span className="text-xs text-[#6B7280] bg-[#F7F4EF] px-3 py-1.5 rounded-xl border border-[#E0D9CF]">
              Member since {buyer.joined}
            </span>
          </div>

          <div className="flex flex-wrap gap-4 mt-3">
            {[
              { icon: RiMapPinLine, text: buyer.location },
              { icon: RiPhoneLine,  text: buyer.phone    },
              { icon: RiMailLine,   text: buyer.email    },
            ].map(({ icon: Icon, text }) => (
              <span key={text} className="flex items-center gap-1.5 text-xs text-[#6B7280]">
                <Icon size={13} className="text-[#C9A84C]" /> {text}
              </span>
            ))}
          </div>

          <p className="text-sm text-[#6B7280] leading-relaxed mt-3 border-t border-[#E0D9CF] pt-3">
            {buyer.bio}
          </p>

          <div className="flex gap-2 flex-wrap mt-3">
            {buyer.preferences.map((p) => (
              <span key={p} className="bg-[#E8D5A3]/50 text-[#0A1628] text-xs font-semibold px-2.5 py-1 rounded-full border border-[#C9A84C]/20">
                {p}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ── Stats ── */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: "Saved Properties", value: SAVED.length,    icon: RiHeart3Line    },
          { label: "Active Requests",  value: REQUESTS.filter((r) => r.status === "active").length, icon: RiFileListLine },
          { label: "Inspections",      value: 2,               icon: RiCalendarLine  },
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

      {/* ── Verification ── */}
      <div className="bg-white rounded-2xl border border-[#E0D9CF] p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-[#0A1628] text-base">Verification Status</h3>
          <span className={`text-xs font-bold px-2.5 py-1 rounded-full
            ${verificationPercent === 100
              ? "bg-[#0A1628] text-[#C9A84C]"
              : "bg-[#E8D5A3] text-[#0A1628]"}`}>
            {completedVerifications}/{VERIFICATION.length} complete
          </span>
        </div>

        <div className="bg-[#E0D9CF] rounded-full h-2 mb-4">
          <div
            className="bg-[#C9A84C] h-2 rounded-full transition-all duration-500"
            style={{ width: `${verificationPercent}%` }}
          />
        </div>

        <div className="flex flex-col gap-3">
          {VERIFICATION.map(({ label, done, docName }) => (
            <div key={label}
              className={`flex items-center justify-between p-3 rounded-xl border
                ${done ? "bg-[#F7F4EF] border-[#E0D9CF]" : "bg-yellow-50 border-yellow-200"}`}>
              <div className="flex items-center gap-3">
                {done
                  ? <RiCheckboxCircleLine size={18} className="text-[#C9A84C] flex-shrink-0" />
                  : <RiTimeLine size={18} className="text-yellow-500 flex-shrink-0" />
                }
                <div>
                  <p className="text-sm font-semibold text-[#0A1628]">{label}</p>
                  {docName && <p className="text-[10px] text-[#6B7280]">{docName}</p>}
                </div>
              </div>
              {!done && (
                <button className="flex items-center gap-1.5 bg-[#C9A84C] hover:bg-[#b8943d] text-[#0A1628] text-xs font-bold px-3 py-1.5 rounded-lg transition">
                  <RiUploadLine size={12} /> Verify
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* ── Saved & Requests Tabs ── */}
      <div className="bg-white rounded-2xl border border-[#E0D9CF] overflow-hidden">
        <div className="flex border-b border-[#E0D9CF]">
          {["saved", "requests"].map((tab) => (
            <button key={tab} onClick={() => setActiveTab(tab)}
              className={`flex-1 py-3.5 text-sm font-semibold capitalize transition
                ${activeTab === tab
                  ? "border-b-2 border-[#C9A84C] text-[#0A1628]"
                  : "text-[#6B7280] hover:text-[#0A1628]"}`}>
              {tab === "saved" ? `Saved (${SAVED.length})` : `Requests (${REQUESTS.length})`}
            </button>
          ))}
        </div>

        <div className="p-5">
          {activeTab === "saved" && (
            <div className="flex flex-col gap-3">
              {SAVED.map((p) => (
                <div key={p.id}
                  className="flex items-center gap-3 p-3 rounded-xl border border-[#E0D9CF] hover:border-[#C9A84C]/30 hover:bg-[#F7F4EF] transition">
                  <img src={p.image} alt={p.title} className="w-14 h-14 rounded-xl object-cover flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-[#0A1628] truncate">{p.title}</p>
                    <p className="text-xs text-[#6B7280] flex items-center gap-1 mt-0.5">
                      <RiMapPinLine size={10} /> {p.location}
                    </p>
                    {p.beds && (
                      <div className="flex gap-2 mt-1">
                        <span className="text-xs text-[#6B7280] flex items-center gap-1"><MdBedroomParent size={11} /> {p.beds}</span>
                        <span className="text-xs text-[#6B7280] flex items-center gap-1"><MdOutlineBathtub size={11} /> {p.baths}</span>
                      </div>
                    )}
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="text-sm font-bold text-[#0A1628]">{p.price}</p>
                    <span className="text-[10px] bg-[#E8D5A3] text-[#0A1628] font-semibold px-2 py-0.5 rounded-full">{p.type}</span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === "requests" && (
            <div className="flex flex-col gap-3">
              {REQUESTS.map((r) => (
                <div key={r.id}
                  className="flex items-start justify-between gap-3 p-4 rounded-xl border border-[#E0D9CF] hover:border-[#C9A84C]/30 hover:bg-[#F7F4EF] transition">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className="text-sm font-bold text-[#0A1628]">{r.title}</p>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full
                        ${r.status === "active"
                          ? "bg-[#0A1628] text-[#C9A84C]"
                          : "bg-[#E0D9CF] text-[#6B7280]"}`}>
                        {r.status}
                      </span>
                    </div>
                    <p className="text-xs text-[#C9A84C] font-semibold mt-1">{r.budget}</p>
                    <div className="flex items-center gap-3 mt-1">
                      <span className="text-xs text-[#6B7280]">{r.offers} offers received</span>
                      <span className="text-xs text-[#6B7280]">• {r.date}</span>
                    </div>
                  </div>
                  <span className="bg-[#F7F4EF] text-[#0A1628] text-[10px] font-semibold px-2.5 py-1 rounded-full border border-[#E0D9CF] flex-shrink-0">
                    {r.type}
                  </span>
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

export default BuyerProfile;