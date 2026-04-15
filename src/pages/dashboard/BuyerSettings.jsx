// src/pages/dashboard/BuyerSettings.jsx
import { useState } from "react";
import {
  User, Lock, Bell, Heart,
  Mail, Phone, Camera, CheckCircle, LogOut
} from "lucide-react";

const tabs = [
  { id: "profile", label: "Profile", icon: User },
  { id: "preferences", label: "Preferences", icon: Heart },
  { id: "security", label: "Security", icon: Lock },
  { id: "notifications", label: "Notifications", icon: Bell },
];

const BuyerSettings = () => {
  const [activeTab, setActiveTab] = useState("profile");

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 flex flex-col gap-6">
      
      {/* Header */}
      <div className="bg-white border border-[#E0D9CF] rounded-2xl p-5 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-[#C9A84C] flex items-center justify-center font-bold text-[#0A1628]">
            CN
          </div>
          <div>
            <p className="font-bold text-[#0A1628]">Chidi Nwosu</p>
            <p className="text-xs text-[#6B7280]">chidi@example.com</p>
            <span className="inline-flex items-center gap-1 mt-1 text-[10px] font-bold bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
              <CheckCircle size={10}/> Verified
            </span>
          </div>
        </div>

        <button className="text-sm text-red-500 hover:underline flex items-center gap-1">
          <LogOut size={14}/> Logout
        </button>
      </div>

      <div className="grid lg:grid-cols-4 gap-6">
        
        {/* Sidebar */}
        <div className="flex lg:flex-col gap-2 overflow-x-auto">
          {tabs.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm whitespace-nowrap transition
                ${activeTab === id
                  ? "bg-[#C9A84C] text-[#0A1628] font-semibold"
                  : "text-[#6B7280] hover:bg-white border border-transparent hover:border-[#E0D9CF]"
                }`}
            >
              <Icon size={14}/>
              {label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="lg:col-span-3 flex flex-col gap-4">

          {/* PROFILE */}
          {activeTab === "profile" && (
            <div className="bg-white border border-[#E0D9CF] rounded-2xl p-5 space-y-4">
              <p className="font-bold text-[#0A1628]">Profile Info</p>

              <div className="grid sm:grid-cols-2 gap-4">
                <input className="input" defaultValue="Chidi Nwosu" />
                <div className="relative">
                  <Mail size={14} className="absolute left-3 top-3 text-[#6B7280]" />
                  <input disabled className="input pl-9 bg-[#F7F4EF]" defaultValue="chidi@example.com"/>
                </div>
                <div className="relative">
                  <Phone size={14} className="absolute left-3 top-3 text-[#6B7280]" />
                  <input className="input pl-9" defaultValue="+234..." />
                </div>
              </div>

              <div className="flex justify-end">
                <button className="btn-primary">Save</button>
              </div>
            </div>
          )}

          {/* PREFERENCES */}
          {activeTab === "preferences" && (
            <div className="bg-white border border-[#E0D9CF] rounded-2xl p-5">
              <p className="font-bold text-[#0A1628] mb-3">Preferences</p>

              <div className="grid sm:grid-cols-2 gap-4">
                <input className="input" placeholder="Min Budget"/>
                <input className="input" placeholder="Max Budget"/>
              </div>
            </div>
          )}

          {/* SECURITY */}
          {activeTab === "security" && (
            <div className="bg-white border border-[#E0D9CF] rounded-2xl p-5">
              <p className="font-bold text-[#0A1628] mb-3">Security</p>

              <button className="text-sm text-[#C9A84C] font-semibold">
                Change Password
              </button>
            </div>
          )}

          {/* NOTIFICATIONS */}
          {activeTab === "notifications" && (
            <div className="bg-white border border-[#E0D9CF] rounded-2xl p-5">
              <p className="font-bold text-[#0A1628] mb-3">Notifications</p>

              <label className="flex items-center gap-2 text-sm text-[#6B7280]">
                <input type="checkbox" className="accent-[#C9A84C]" defaultChecked />
                Email notifications
              </label>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BuyerSettings;