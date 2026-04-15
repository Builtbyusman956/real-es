// src/pages/dashboard/BuyerSettings.jsx
import { useState } from "react";
import {
  User, Lock, Bell, Shield, Eye, EyeOff,
  Mail, Phone, Camera, CheckCircle, LogOut, Smartphone,
  Heart, Search, MapPin, Trash2, X
} from "lucide-react";

const BuyerSettings = () => {
  const [activeTab, setActiveTab] = useState("profile");
  
  const [profile, setProfile] = useState({
    name: "Chidi Nwosu",
    email: "chidi@example.com",
    phone: "+234 802 345 6789",
    avatar: "CN",
    preferences: {
      budgetMin: 500000,
      budgetMax: 5000000,
      locations: ["Lekki", "Yaba", "Ikeja"],
      propertyTypes: ["Rent", "Sale"]
    }
  });

  const [security, setSecurity] = useState({
    twoFactor: false,
    loginAlerts: true
  });

  const [notifications, setNotifications] = useState({
    email: { newListings: true, priceDrops: true, inspections: true, messages: true },
    sms: { inspections: true, messages: false }
  });

  const [savedSearches] = useState([
    { id: 1, query: "3 bedroom flat Lekki", alerts: true },
    { id: 2, query: "Duplex Abuja under ₦100m", alerts: false }
  ]);

  const tabs = [
    { id: "profile", label: "Profile", icon: User },
    { id: "preferences", label: "Preferences", icon: Heart },
    { id: "security", label: "Security", icon: Lock },
    { id: "notifications", label: "Notifications", icon: Bell },
  ];

  return (
    <div className="flex flex-col gap-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="bg-white rounded-2xl border border-[#E0D9CF] p-6">
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="w-20 h-20 rounded-full bg-[#C9A84C] flex items-center justify-center text-[#0A1628] text-2xl font-bold">
              {profile.avatar}
            </div>
            <button className="absolute bottom-0 right-0 w-8 h-8 bg-[#0A1628] rounded-full flex items-center justify-center text-white">
              <Camera size={16} />
            </button>
          </div>
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-[#0A1628]">{profile.name}</h1>
            <p className="text-[#6B7280]">{profile.email}</p>
            <div className="flex items-center gap-2 mt-2">
              <span className="inline-flex items-center gap-1 bg-green-100 text-green-700 text-xs font-bold px-2.5 py-1 rounded-full">
                <CheckCircle size={12} /> Verified Buyer
              </span>
            </div>
          </div>
          <button className="flex items-center gap-2 text-red-500 hover:bg-red-50 px-4 py-2 rounded-xl transition">
            <LogOut size={18} /> Sign Out
          </button>
        </div>
      </div>

      <div className="grid lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="lg:col-span-1 space-y-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-left
                ${activeTab === tab.id ? "bg-[#C9A84C] text-[#0A1628] font-semibold" : "text-[#6B7280] hover:bg-white"}`}
            >
              <tab.icon size={18} />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="lg:col-span-3 space-y-4">
          
          {/* Profile Tab */}
          {activeTab === "profile" && (
            <div className="bg-white rounded-2xl border border-[#E0D9CF] p-6 space-y-6">
              <h2 className="text-lg font-bold text-[#0A1628]">Personal Information</h2>
              
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-[#0A1628] mb-1">Full Name</label>
                  <input
                    type="text"
                    value={profile.name}
                    onChange={(e) => setProfile({...profile, name: e.target.value})}
                    className="w-full px-4 py-3 border border-[#E0D9CF] rounded-xl focus:border-[#C9A84C] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[#0A1628] mb-1">Email</label>
                  <div className="relative">
                    <Mail size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6B7280]" />
                    <input type="email" value={profile.email} disabled className="w-full pl-10 pr-4 py-3 border border-[#E0D9CF] rounded-xl bg-[#F7F4EF]" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[#0A1628] mb-1">Phone</label>
                  <div className="relative">
                    <Phone size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6B7280]" />
                    <input
                      type="tel"
                      value={profile.phone}
                      onChange={(e) => setProfile({...profile, phone: e.target.value})}
                      className="w-full pl-10 pr-4 py-3 border border-[#E0D9CF] rounded-xl focus:border-[#C9A84C] focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-[#E0D9CF] flex justify-end">
                <button className="bg-[#C9A84C] hover:bg-[#b8943d] text-[#0A1628] font-bold px-6 py-2.5 rounded-xl">
                  Save Changes
                </button>
              </div>
            </div>
          )}

          {/* Preferences Tab */}
          {activeTab === "preferences" && (
            <div className="space-y-4">
              <div className="bg-white rounded-2xl border border-[#E0D9CF] p-6">
                <h2 className="text-lg font-bold text-[#0A1628] mb-4">Property Preferences</h2>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-[#0A1628] mb-2">Budget Range (₦)</label>
                    <div className="flex items-center gap-4">
                      <input
                        type="number"
                        value={profile.preferences.budgetMin}
                        onChange={(e) => setProfile({
                          ...profile,
                          preferences: {...profile.preferences, budgetMin: e.target.value}
                        })}
                        className="flex-1 px-4 py-3 border border-[#E0D9CF] rounded-xl"
                        placeholder="Min"
                      />
                      <span className="text-[#6B7280]">to</span>
                      <input
                        type="number"
                        value={profile.preferences.budgetMax}
                        onChange={(e) => setProfile({
                          ...profile,
                          preferences: {...profile.preferences, budgetMax: e.target.value}
                        })}
                        className="flex-1 px-4 py-3 border border-[#E0D9CF] rounded-xl"
                        placeholder="Max"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-[#0A1628] mb-2">Preferred Locations</label>
                    <div className="flex flex-wrap gap-2">
                      {profile.preferences.locations.map((loc) => (
                        <span key={loc} className="inline-flex items-center gap-1 bg-[#F7F4EF] text-[#0A1628] px-3 py-1.5 rounded-lg text-sm">
                          <MapPin size={14} /> {loc}
                          <button className="ml-1 text-[#6B7280] hover:text-red-500"><X size={14} /></button>
                        </span>
                      ))}
                      <button className="text-[#C9A84C] text-sm font-semibold px-3 py-1.5">+ Add Location</button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Saved Searches */}
              <div className="bg-white rounded-2xl border border-[#E0D9CF] p-6">
                <h2 className="text-lg font-bold text-[#0A1628] mb-4">Saved Searches & Alerts</h2>
                <div className="space-y-3">
                  {savedSearches.map((search) => (
                    <div key={search.id} className="flex items-center justify-between p-4 bg-[#F7F4EF] rounded-xl">
                      <div className="flex items-center gap-3">
                        <Search size={18} className="text-[#C9A84C]" />
                        <span className="font-medium text-[#0A1628]">{search.query}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <label className="flex items-center gap-2 text-sm text-[#6B7280]">
                          <input
                            type="checkbox"
                            checked={search.alerts}
                            className="accent-[#C9A84C]"
                          />
                          Alert me
                        </label>
                        <button className="text-red-400 hover:text-red-600">
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Security Tab */}
          {activeTab === "security" && (
            <div className="space-y-4">
              <div className="bg-white rounded-2xl border border-[#E0D9CF] p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#F7F4EF] flex items-center justify-center">
                      <Lock size={20} className="text-[#C9A84C]" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-[#0A1628]">Password</h3>
                      <p className="text-sm text-[#6B7280]">Last changed 30 days ago</p>
                    </div>
                  </div>
                  <button className="text-[#C9A84C] font-semibold text-sm">Change</button>
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-[#E0D9CF] p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center">
                      <Smartphone size={20} className="text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-[#0A1628]">Two-Factor Authentication</h3>
                      <p className="text-sm text-[#6B7280]">Add extra security to your account</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setSecurity({...security, twoFactor: !security.twoFactor})}
                    className={`w-12 h-6 rounded-full transition-colors relative ${security.twoFactor ? "bg-green-500" : "bg-[#E0D9CF]"}`}
                  >
                    <div className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-all ${security.twoFactor ? "left-6" : "left-0.5"}`} />
                  </button>
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-[#E0D9CF] p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#F7F4EF] flex items-center justify-center">
                      <Bell size={20} className="text-[#C9A84C]" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-[#0A1628]">Login Alerts</h3>
                      <p className="text-sm text-[#6B7280]">Email me when someone logs in</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setSecurity({...security, loginAlerts: !security.loginAlerts})}
                    className={`w-12 h-6 rounded-full transition-colors relative ${security.loginAlerts ? "bg-green-500" : "bg-[#E0D9CF]"}`}
                  >
                    <div className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-all ${security.loginAlerts ? "left-6" : "left-0.5"}`} />
                  </button>
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-[#E0D9CF] p-6">
                <h3 className="font-semibold text-[#0A1628] mb-4">Active Sessions</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-[#F7F4EF] rounded-xl">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center">
                        <Smartphone size={18} className="text-[#6B7280]" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-[#0A1628]">Chrome on Windows</p>
                        <p className="text-xs text-[#6B7280]">Lagos, Nigeria • Current session</p>
                      </div>
                    </div>
                    <span className="text-xs text-green-600 font-semibold">Active</span>
                  </div>
                </div>
                <button className="mt-4 text-red-500 text-sm font-semibold hover:underline">
                  Log out all other devices
                </button>
              </div>
            </div>
          )}

          {/* Notifications Tab */}
          {activeTab === "notifications" && (
            <div className="bg-white rounded-2xl border border-[#E0D9CF] p-6">
              <h2 className="text-lg font-bold text-[#0A1628] mb-6">Notification Settings</h2>
              
              <div className="space-y-6">
                {Object.entries({
                  newListings: "New listings matching my preferences",
                  priceDrops: "Price drops on saved properties",
                  inspections: "Inspection reminders & updates",
                  messages: "New messages from agents"
                }).map(([key, label]) => (
                  <div key={key} className="py-4 border-b border-[#E0D9CF] last:border-0">
                    <p className="font-semibold text-[#0A1628] mb-3">{label}</p>
                    <div className="grid grid-cols-2 gap-4">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={notifications.email[key]}
                          onChange={(e) => setNotifications({
                            ...notifications,
                            email: { ...notifications.email, [key]: e.target.checked }
                          })}
                          className="w-4 h-4 accent-[#C9A84C]"
                        />
                        <span className="text-sm text-[#6B7280]">Email</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={notifications.sms[key] || false}
                          onChange={(e) => setNotifications({
                            ...notifications,
                            sms: { ...notifications.sms, [key]: e.target.checked }
                          })}
                          className="w-4 h-4 accent-[#C9A84C]"
                        />
                        <span className="text-sm text-[#6B7280]">SMS</span>
                      </label>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-4 border-t border-[#E0D9CF]">
                <button className="w-full bg-[#C9A84C] hover:bg-[#b8943d] text-[#0A1628] font-bold py-3 rounded-xl transition">
                  Save Preferences
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BuyerSettings;