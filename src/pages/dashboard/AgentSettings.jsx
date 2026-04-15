// src/pages/dashboard/AgentSettings.jsx
import { useState } from "react";
import {
  User, Lock, Bell, CreditCard, Shield, Eye, EyeOff,
  Mail, Phone, MapPin, Camera, CheckCircle, AlertTriangle,
  ChevronRight, LogOut, Smartphone, Globe, Moon, Sun
} from "lucide-react";

const AgentSettings = () => {
  const [activeTab, setActiveTab] = useState("profile");
  
  // Profile state
  const [profile, setProfile] = useState({
    name: "Emeka Okafor",
    email: "emeka@example.com",
    phone: "+234 801 234 5678",
    bio: "Licensed real estate agent with 5+ years experience in Lagos property market.",
    company: "Prime Properties Ltd",
    licenseNumber: "RE-2024-001234",
    avatar: "EO"
  });

  // Security state
  const [security, setSecurity] = useState({
    twoFactor: true,
    loginAlerts: true,
    transactionPin: true,
    lastPasswordChange: "2024-03-15"
  });

  // Notification state
  const [notifications, setNotifications] = useState({
    email: { inquiries: true, inspections: true, payments: true, marketing: false },
    sms: { inquiries: true, inspections: false, payments: true, marketing: false },
    push: { inquiries: true, inspections: true, payments: true, marketing: false }
  });

  // Payment methods
  const [paymentMethods] = useState([
    { id: 1, type: "bank", name: "Guaranty Trust Bank", number: "****4567", default: true },
    { id: 2, type: "wallet", name: "Platform Wallet", balance: "₦125,000", default: false }
  ]);

  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showPinModal, setShowPinModal] = useState(false);

  const tabs = [
    { id: "profile", label: "Profile", icon: User },
    { id: "security", label: "Security", icon: Lock },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "payments", label: "Payments", icon: CreditCard },
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
            <button className="absolute bottom-0 right-0 w-8 h-8 bg-[#0A1628] rounded-full flex items-center justify-center text-white hover:bg-[#C9A84C] transition">
              <Camera size={16} />
            </button>
          </div>
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-[#0A1628]">{profile.name}</h1>
            <p className="text-[#6B7280]">{profile.email}</p>
            <div className="flex items-center gap-2 mt-2">
              <span className="inline-flex items-center gap-1 bg-[#0A1628] text-[#C9A84C] text-xs font-bold px-2.5 py-1 rounded-full">
                <Shield size={12} /> Verified Agent
              </span>
              <span className="text-xs text-[#6B7280]">Member since March 2024</span>
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
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 text-left
                ${activeTab === tab.id 
                  ? "bg-[#C9A84C] text-[#0A1628] font-semibold" 
                  : "text-[#6B7280] hover:bg-white hover:text-[#0A1628]"}`}
            >
              <tab.icon size={18} />
              {tab.label}
              {tab.id === "security" && security.twoFactor && (
                <CheckCircle size={14} className="ml-auto text-green-600" />
              )}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="lg:col-span-3">
          
          {/* Profile Tab */}
          {activeTab === "profile" && (
            <div className="bg-white rounded-2xl border border-[#E0D9CF] p-6 space-y-6">
              <h2 className="text-lg font-bold text-[#0A1628]">Profile Information</h2>
              
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
                    <input
                      type="email"
                      value={profile.email}
                      disabled
                      className="w-full pl-10 pr-4 py-3 border border-[#E0D9CF] rounded-xl bg-[#F7F4EF] text-[#6B7280]"
                    />
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
                <div>
                  <label className="block text-sm font-semibold text-[#0A1628] mb-1">Company Name</label>
                  <input
                    type="text"
                    value={profile.company}
                    onChange={(e) => setProfile({...profile, company: e.target.value})}
                    className="w-full px-4 py-3 border border-[#E0D9CF] rounded-xl focus:border-[#C9A84C] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#0A1628] mb-1">License Number</label>
                <input
                  type="text"
                  value={profile.licenseNumber}
                  disabled
                  className="w-full px-4 py-3 border border-[#E0D9CF] rounded-xl bg-[#F7F4EF] text-[#6B7280]"
                />
                <p className="text-xs text-[#6B7280] mt-1">Contact support to update license information</p>
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#0A1628] mb-1">Bio</label>
                <textarea
                  value={profile.bio}
                  onChange={(e) => setProfile({...profile, bio: e.target.value})}
                  rows={4}
                  className="w-full px-4 py-3 border border-[#E0D9CF] rounded-xl focus:border-[#C9A84C] focus:outline-none resize-none"
                />
              </div>

              <div className="pt-4 border-t border-[#E0D9CF] flex justify-end">
                <button className="bg-[#C9A84C] hover:bg-[#b8943d] text-[#0A1628] font-bold px-6 py-2.5 rounded-xl transition">
                  Save Changes
                </button>
              </div>
            </div>
          )}

          {/* Security Tab */}
          {activeTab === "security" && (
            <div className="space-y-4">
              {/* Password */}
              <div className="bg-white rounded-2xl border border-[#E0D9CF] p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#F7F4EF] flex items-center justify-center">
                      <Lock size={20} className="text-[#C9A84C]" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-[#0A1628]">Password</h3>
                      <p className="text-sm text-[#6B7280]">Last changed {security.lastPasswordChange}</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => setShowPasswordModal(true)}
                    className="text-[#C9A84C] font-semibold text-sm hover:underline"
                  >
                    Change
                  </button>
                </div>
              </div>

              {/* 2FA */}
              <div className="bg-white rounded-2xl border border-[#E0D9CF] p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center">
                      <Smartphone size={20} className="text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-[#0A1628]">Two-Factor Authentication</h3>
                      <p className="text-sm text-[#6B7280]">SMS verification enabled</p>
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

              {/* Transaction PIN */}
              <div className="bg-white rounded-2xl border border-[#E0D9CF] p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#F7F4EF] flex items-center justify-center">
                      <CreditCard size={20} className="text-[#C9A84C]" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-[#0A1628]">Transaction PIN</h3>
                      <p className="text-sm text-[#6B7280]">Required for withdrawals</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => setShowPinModal(true)}
                    className="text-[#C9A84C] font-semibold text-sm hover:underline"
                  >
                    {security.transactionPin ? "Change PIN" : "Set PIN"}
                  </button>
                </div>
              </div>

              {/* Login Alerts */}
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

              {/* Active Sessions */}
              <div className="bg-white rounded-2xl border border-[#E0D9CF] p-6">
                <h3 className="font-semibold text-[#0A1628] mb-4">Active Sessions</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-[#F7F4EF] rounded-xl">
                    <div className="flex items-center gap-3">
                      <Globe size={18} className="text-[#6B7280]" />
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
              <h2 className="text-lg font-bold text-[#0A1628] mb-6">Notification Preferences</h2>
              
              {Object.entries({
                inquiries: "New property inquiries",
                inspections: "Inspection requests & updates",
                payments: "Payment receipts & withdrawals",
                marketing: "Marketing & promotional offers"
              }).map(([key, label]) => (
                <div key={key} className="py-4 border-b border-[#E0D9CF] last:border-0">
                  <p className="font-semibold text-[#0A1628] mb-3">{label}</p>
                  <div className="grid grid-cols-3 gap-4">
                    {["email", "sms", "push"].map((channel) => (
                      <label key={channel} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={notifications[channel][key]}
                          onChange={(e) => setNotifications({
                            ...notifications,
                            [channel]: { ...notifications[channel], [key]: e.target.checked }
                          })}
                          className="w-4 h-4 accent-[#C9A84C]"
                        />
                        <span className="text-sm text-[#6B7280] capitalize">{channel}</span>
                      </label>
                    ))}
                  </div>
                </div>
              ))}

              <div className="mt-6 pt-4 border-t border-[#E0D9CF]">
                <button className="w-full bg-[#C9A84C] hover:bg-[#b8943d] text-[#0A1628] font-bold py-3 rounded-xl transition">
                  Save Preferences
                </button>
              </div>
            </div>
          )}

          {/* Payments Tab */}
          {activeTab === "payments" && (
            <div className="space-y-4">
              {/* Wallet */}
              <div className="bg-gradient-to-r from-[#0A1628] to-[#1A2E4A] rounded-2xl p-6 text-white">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[#8A9BB5] text-sm">Platform Wallet Balance</span>
                  <span className="text-xs bg-[#C9A84C]/20 text-[#C9A84C] px-2 py-1 rounded-full">Instant Payout</span>
                </div>
                <p className="text-3xl font-bold mb-4">₦125,000.00</p>
                <div className="flex gap-3">
                  <button className="flex-1 bg-[#C9A84C] hover:bg-[#b8943d] text-[#0A1628] font-bold py-2.5 rounded-xl transition">
                    Withdraw
                  </button>
                  <button className="flex-1 border border-[#8A9BB5] hover:bg-white/10 text-white font-semibold py-2.5 rounded-xl transition">
                    View History
                  </button>
                </div>
              </div>

              {/* Bank Accounts */}
              <div className="bg-white rounded-2xl border border-[#E0D9CF] p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-[#0A1628]">Bank Accounts</h3>
                  <button className="text-[#C9A84C] font-semibold text-sm hover:underline">
                    + Add Account
                  </button>
                </div>
                <div className="space-y-3">
                  {paymentMethods.filter(m => m.type === "bank").map((method) => (
                    <div key={method.id} className="flex items-center justify-between p-4 border border-[#E0D9CF] rounded-xl">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-[#F7F4EF] rounded-lg flex items-center justify-center">
                          <CreditCard size={20} className="text-[#C9A84C]" />
                        </div>
                        <div>
                          <p className="font-semibold text-[#0A1628]">{method.name}</p>
                          <p className="text-sm text-[#6B7280]">{method.number}</p>
                        </div>
                      </div>
                      {method.default && (
                        <span className="text-xs bg-[#C9A84C]/20 text-[#C9A84C] px-2 py-1 rounded-full font-semibold">
                          Default
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Escrow Info */}
              <div className="bg-[#F7F4EF] rounded-2xl p-6">
                <div className="flex items-start gap-3">
                  <AlertTriangle size={20} className="text-[#C9A84C] flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-[#0A1628] mb-1">Escrow Protection</h4>
                    <p className="text-sm text-[#6B7280]">
                      All payments are held in secure escrow until the buyer confirms satisfaction. 
                      This protects both parties from fraud and ensures fair dispute resolution.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AgentSettings;