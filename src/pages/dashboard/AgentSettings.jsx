// src/pages/dashboard/AgentSettings.jsx
import { useState } from "react";
import {
  User, Lock, Bell, CreditCard, CheckCircle,
  LogOut, Smartphone, Mail, Phone, Building,
  Eye, EyeOff, AlertTriangle, ChevronRight, Wallet
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const TABS = [
  { id: "profile",       label: "Profile",       icon: User       },
  { id: "security",      label: "Security",       icon: Lock       },
  { id: "notifications", label: "Notifications",  icon: Bell       },
  { id: "payments",      label: "Payments",       icon: CreditCard },
];

const Toggle = ({ value, onChange }) => (
  <button
    onClick={() => onChange(!value)}
    className={`relative w-12 h-6 rounded-full transition-colors duration-200 flex-shrink-0
      ${value ? "bg-green-500" : "bg-[#E0D9CF]"}`}>
    <span className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-transform duration-200
      ${value ? "translate-x-7" : "translate-x-1"}`} />
  </button>
);

const AgentSettings = () => {
  const { logout, user } = useAuth();
  const navigate         = useNavigate();

  const [activeTab,    setActiveTab]    = useState("profile");
  const [showPassword, setShowPassword] = useState(false);
  const [saved,        setSaved]        = useState(false);
  const [loggingOut,   setLoggingOut]   = useState(false);

  const [profile, setProfile] = useState({
    name:    user?.displayName || "Emeka Okafor",
    email:   user?.email       || "emeka@example.com",
    phone:   "+234 801 234 5678",
    company: "Prime Properties Ltd",
    bio:     "",
  });

  const [security, setSecurity] = useState({
    twoFactor:   true,
    loginAlerts: true,
    newPassword: "",
  });

  const [notifications, setNotifications] = useState({
    email:     true,
    sms:       false,
    push:      true,
    newLead:   true,
    inspection:true,
    payment:   true,
  });

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const handleLogout = async () => {
    setLoggingOut(true);
    await logout();
    navigate("/login");
  };

  return (
    <div className="flex flex-col gap-6 max-w-4xl">

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-[#0A1628]">Settings</h1>
          <p className="text-sm text-[#6B7280]">Manage your account, security and preferences</p>
        </div>
        <button
          onClick={handleLogout}
          disabled={loggingOut}
          className="flex items-center gap-2 border border-red-200 text-red-500 hover:bg-red-50 active:scale-95 px-4 py-2.5 rounded-xl text-sm font-semibold transition duration-200 disabled:opacity-60">
          <LogOut size={15} />
          {loggingOut ? "Logging out..." : "Logout"}
        </button>
      </div>

      {/* Profile card */}
      <div className="bg-white rounded-2xl border border-[#E0D9CF] p-5 flex items-center gap-4">
        <div className="w-14 h-14 rounded-full bg-[#C9A84C] flex items-center justify-center text-[#0A1628] font-bold text-lg flex-shrink-0">
          {profile.name.split(" ").map(n => n[0]).join("").slice(0,2)}
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-bold text-[#0A1628]">{profile.name}</p>
          <p className="text-sm text-[#6B7280] truncate">{profile.email}</p>
          <span className="inline-flex items-center gap-1 mt-1 text-[10px] font-bold bg-yellow-50 text-yellow-600 border border-yellow-200 px-2 py-0.5 rounded-full">
            <AlertTriangle size={9} /> Unverified Agent
          </span>
        </div>
      </div>

      <div className="grid lg:grid-cols-4 gap-6">

        {/* Tab nav */}
        <div className="flex lg:flex-col gap-2 overflow-x-auto lg:overflow-visible pb-1 lg:pb-0">
          {TABS.map(({ id, label, icon: Icon }) => (
            <button key={id} onClick={() => setActiveTab(id)}
              className={`flex items-center gap-2.5 px-4 py-3 rounded-xl text-sm font-medium whitespace-nowrap transition-all duration-200 w-full text-left
                ${activeTab === id
                  ? "bg-[#C9A84C] text-[#0A1628] font-semibold"
                  : "text-[#6B7280] hover:bg-white hover:text-[#0A1628] border border-transparent hover:border-[#E0D9CF]"}`}>
              <Icon size={16} />
              {label}
              {id === "security" && security.twoFactor && (
                <CheckCircle size={12} className="ml-auto text-green-500 flex-shrink-0" />
              )}
            </button>
          ))}
        </div>

        {/* Tab content */}
        <div className="lg:col-span-3 flex flex-col gap-4">

          {/* ── Profile ── */}
          {activeTab === "profile" && (
            <div className="bg-white rounded-2xl border border-[#E0D9CF] p-6 flex flex-col gap-5">
              <h2 className="font-bold text-[#0A1628]">Profile Information</h2>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-[#6B7280] uppercase tracking-wide">Full Name</label>
                  <div className="relative">
                    <User size={14} className="absolute left-3 top-3.5 text-[#6B7280]" />
                    <input value={profile.name} onChange={e => setProfile({...profile, name: e.target.value})}
                      className="w-full border border-[#E0D9CF] rounded-xl pl-9 pr-4 py-3 text-sm text-[#0A1628] focus:outline-none focus:border-[#C9A84C] transition" />
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-[#6B7280] uppercase tracking-wide">Email</label>
                  <div className="relative">
                    <Mail size={14} className="absolute left-3 top-3.5 text-[#6B7280]" />
                    <input value={profile.email} disabled
                      className="w-full border border-[#E0D9CF] rounded-xl pl-9 pr-4 py-3 text-sm text-[#6B7280] bg-[#F7F4EF] cursor-not-allowed" />
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-[#6B7280] uppercase tracking-wide">Phone</label>
                  <div className="relative">
                    <Phone size={14} className="absolute left-3 top-3.5 text-[#6B7280]" />
                    <input value={profile.phone} onChange={e => setProfile({...profile, phone: e.target.value})}
                      className="w-full border border-[#E0D9CF] rounded-xl pl-9 pr-4 py-3 text-sm text-[#0A1628] focus:outline-none focus:border-[#C9A84C] transition" />
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-[#6B7280] uppercase tracking-wide">Company</label>
                  <div className="relative">
                    <Building size={14} className="absolute left-3 top-3.5 text-[#6B7280]" />
                    <input value={profile.company} onChange={e => setProfile({...profile, company: e.target.value})}
                      className="w-full border border-[#E0D9CF] rounded-xl pl-9 pr-4 py-3 text-sm text-[#0A1628] focus:outline-none focus:border-[#C9A84C] transition" />
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-[#6B7280] uppercase tracking-wide">Bio</label>
                <textarea value={profile.bio} onChange={e => setProfile({...profile, bio: e.target.value})}
                  placeholder="Tell buyers a bit about yourself..."
                  rows={3}
                  className="w-full border border-[#E0D9CF] rounded-xl px-4 py-3 text-sm text-[#0A1628] focus:outline-none focus:border-[#C9A84C] transition resize-none" />
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-[#E0D9CF]">
                {saved && (
                  <span className="flex items-center gap-1.5 text-green-600 text-sm font-semibold">
                    <CheckCircle size={15} /> Changes saved
                  </span>
                )}
                <button onClick={handleSave}
                  className="ml-auto flex items-center gap-2 bg-[#C9A84C] hover:bg-[#b8943d] active:scale-95 text-[#0A1628] font-bold px-5 py-2.5 rounded-xl text-sm transition duration-200">
                  Save Changes
                </button>
              </div>
            </div>
          )}

          {/* ── Security ── */}
          {activeTab === "security" && (
            <div className="flex flex-col gap-4">
              <div className="bg-white rounded-2xl border border-[#E0D9CF] p-5 flex flex-col gap-4">
                <h2 className="font-bold text-[#0A1628]">Change Password</h2>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={security.newPassword}
                    onChange={e => setSecurity({...security, newPassword: e.target.value})}
                    placeholder="Enter new password"
                    className="w-full border border-[#E0D9CF] rounded-xl px-4 py-3 pr-11 text-sm text-[#0A1628] focus:outline-none focus:border-[#C9A84C] transition" />
                  <button onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3.5 text-[#6B7280] hover:text-[#0A1628] transition">
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
                <button className="flex items-center gap-2 bg-[#0A1628] hover:bg-[#1A2E4A] text-[#C9A84C] font-bold px-5 py-2.5 rounded-xl text-sm transition duration-200 self-end">
                  Update Password <ChevronRight size={15} />
                </button>
              </div>

              <div className="bg-white rounded-2xl border border-[#E0D9CF] p-5 flex flex-col gap-3">
                <h2 className="font-bold text-[#0A1628]">Security Options</h2>

                {[
                  { key: "twoFactor",   label: "Two-Factor Authentication", sub: "Get a code via SMS when you sign in", icon: Smartphone },
                  { key: "loginAlerts", label: "Login Alerts",               sub: "Email me when a new device signs in",  icon: Mail       },
                ].map(({ key, label, sub, icon: Icon }) => (
                  <div key={key} className="flex items-center justify-between gap-4 py-3 border-b border-[#E0D9CF] last:border-0">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-[#F7F4EF] flex items-center justify-center flex-shrink-0">
                        <Icon size={16} className="text-[#6B7280]" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-[#0A1628]">{label}</p>
                        <p className="text-xs text-[#6B7280]">{sub}</p>
                      </div>
                    </div>
                    <Toggle value={security[key]} onChange={v => setSecurity({...security, [key]: v})} />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ── Notifications ── */}
          {activeTab === "notifications" && (
            <div className="bg-white rounded-2xl border border-[#E0D9CF] p-6 flex flex-col gap-5">
              <h2 className="font-bold text-[#0A1628]">Notification Preferences</h2>

              <div className="flex flex-col gap-1">
                <p className="text-xs font-bold text-[#6B7280] uppercase tracking-wide mb-2">Channels</p>
                {[
                  { key: "email", label: "Email Notifications", sub: "Receive updates via email" },
                  { key: "sms",   label: "SMS Notifications",   sub: "Receive updates via text message" },
                  { key: "push",  label: "Push Notifications",  sub: "Receive alerts in your browser" },
                ].map(({ key, label, sub }) => (
                  <div key={key} className="flex items-center justify-between py-3 border-b border-[#E0D9CF] last:border-0">
                    <div>
                      <p className="text-sm font-semibold text-[#0A1628]">{label}</p>
                      <p className="text-xs text-[#6B7280]">{sub}</p>
                    </div>
                    <Toggle value={notifications[key]} onChange={v => setNotifications({...notifications, [key]: v})} />
                  </div>
                ))}
              </div>

              <div className="flex flex-col gap-1 pt-2">
                <p className="text-xs font-bold text-[#6B7280] uppercase tracking-wide mb-2">Alert Types</p>
                {[
                  { key: "newLead",    label: "New Lead",        sub: "When a buyer contacts you" },
                  { key: "inspection", label: "Inspections",     sub: "Upcoming inspection reminders" },
                  { key: "payment",    label: "Payments",        sub: "When you receive a payment" },
                ].map(({ key, label, sub }) => (
                  <div key={key} className="flex items-center justify-between py-3 border-b border-[#E0D9CF] last:border-0">
                    <div>
                      <p className="text-sm font-semibold text-[#0A1628]">{label}</p>
                      <p className="text-xs text-[#6B7280]">{sub}</p>
                    </div>
                    <Toggle value={notifications[key]} onChange={v => setNotifications({...notifications, [key]: v})} />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ── Payments ── */}
          {activeTab === "payments" && (
            <div className="flex flex-col gap-4">
              <div className="bg-[#0A1628] rounded-2xl p-6 flex items-center justify-between">
                <div>
                  <p className="text-[#8A9BB5] text-xs font-semibold uppercase tracking-wide">Wallet Balance</p>
                  <p className="text-[#F7F4EF] text-3xl font-bold mt-1">₦125,000</p>
                  <p className="text-[#C9A84C] text-xs mt-1">Available for withdrawal</p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-[#C9A84C]/20 flex items-center justify-center">
                  <Wallet size={22} className="text-[#C9A84C]" />
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-[#E0D9CF] p-5 flex flex-col gap-4">
                <h2 className="font-bold text-[#0A1628]">Bank Account</h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-[#6B7280] uppercase tracking-wide">Account Number</label>
                    <input placeholder="0123456789"
                      className="w-full border border-[#E0D9CF] rounded-xl px-4 py-3 text-sm text-[#0A1628] focus:outline-none focus:border-[#C9A84C] transition" />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-[#6B7280] uppercase tracking-wide">Bank Name</label>
                    <input placeholder="e.g. GTBank"
                      className="w-full border border-[#E0D9CF] rounded-xl px-4 py-3 text-sm text-[#0A1628] focus:outline-none focus:border-[#C9A84C] transition" />
                  </div>
                </div>
                <button className="flex items-center gap-2 bg-[#C9A84C] hover:bg-[#b8943d] active:scale-95 text-[#0A1628] font-bold px-5 py-2.5 rounded-xl text-sm transition duration-200 self-end">
                  Withdraw Funds <ChevronRight size={15} />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AgentSettings;