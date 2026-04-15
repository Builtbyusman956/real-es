import { useState } from "react";
import {
  User, Lock, Bell, CreditCard,
  CheckCircle, LogOut, Smartphone
} from "lucide-react";

const Card = ({ children, className = "" }) => (
  <div className={`bg-white rounded-2xl border border-[#E0D9CF] ${className}`}>
    {children}
  </div>
);

const AgentSettings = () => {
  const [activeTab, setActiveTab] = useState("profile");

  const [profile, setProfile] = useState({
    name: "Emeka Okafor",
    email: "emeka@example.com",
    phone: "+234 801 234 5678",
    company: "Prime Properties Ltd",
  });

  const [security, setSecurity] = useState({
    twoFactor: true,
    loginAlerts: true,
  });

  const tabs = [
    { id: "profile", label: "Profile", icon: User },
    { id: "security", label: "Security", icon: Lock },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "payments", label: "Payments", icon: CreditCard },
  ];

  return (
    <div className="flex flex-col gap-6">

      {/* Page Header */}
      <div>
        <h1 className="text-xl font-bold text-[#0A1628]">Settings</h1>
        <p className="text-sm text-[#6B7280]">
          Manage your account preferences and security
        </p>
      </div>

      <div className="grid lg:grid-cols-4 gap-6">

        {/* Sidebar */}
        <div className="space-y-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition text-left
                ${activeTab === tab.id
                  ? "bg-[#C9A84C] text-[#0A1628] font-semibold"
                  : "text-[#8A9BB5] hover:bg-[#F7F4EF] hover:text-[#0A1628]"}`}
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
        <div className="lg:col-span-3 space-y-6">

          {/* Profile */}
          {activeTab === "profile" && (
            <Card className="p-6 space-y-4">
              <h2 className="font-bold text-[#0A1628]">Profile Information</h2>

              <div className="grid sm:grid-cols-2 gap-4">
                <input
                  value={profile.name}
                  onChange={(e) =>
                    setProfile({ ...profile, name: e.target.value })
                  }
                  className="input"
                  placeholder="Full Name"
                />
                <input
                  value={profile.email}
                  disabled
                  className="input bg-[#F7F4EF]"
                />
                <input
                  value={profile.phone}
                  onChange={(e) =>
                    setProfile({ ...profile, phone: e.target.value })
                  }
                  className="input"
                  placeholder="Phone"
                />
                <input
                  value={profile.company}
                  onChange={(e) =>
                    setProfile({ ...profile, company: e.target.value })
                  }
                  className="input"
                  placeholder="Company"
                />
              </div>

              <button className="btn-primary ml-auto">
                Save Changes
              </button>
            </Card>
          )}

          {/* Security */}
          {activeTab === "security" && (
            <>
              <Card className="p-5 flex justify-between items-center">
                <div>
                  <p className="font-semibold text-[#0A1628]">Password</p>
                  <p className="text-sm text-[#6B7280]">Last changed recently</p>
                </div>
                <button className="text-[#C9A84C] text-sm font-semibold">
                  Change
                </button>
              </Card>

              <Card className="p-5 flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <Smartphone className="text-green-600" />
                  <p className="font-semibold text-[#0A1628]">
                    Two-Factor Authentication
                  </p>
                </div>
                <button
                  onClick={() =>
                    setSecurity({
                      ...security,
                      twoFactor: !security.twoFactor,
                    })
                  }
                  className={`w-12 h-6 rounded-full ${
                    security.twoFactor ? "bg-green-500" : "bg-gray-300"
                  }`}
                />
              </Card>
            </>
          )}

          {/* Notifications */}
          {activeTab === "notifications" && (
            <Card className="p-6">
              <h2 className="font-bold text-[#0A1628] mb-4">
                Notification Preferences
              </h2>

              <div className="space-y-3 text-sm text-[#6B7280]">
                <label><input type="checkbox" /> Email Alerts</label>
                <label><input type="checkbox" /> SMS Alerts</label>
                <label><input type="checkbox" /> Push Notifications</label>
              </div>
            </Card>
          )}

          {/* Payments */}
          {activeTab === "payments" && (
            <Card className="p-6">
              <h2 className="font-bold text-[#0A1628] mb-2">
                Wallet Balance
              </h2>
              <p className="text-2xl font-bold text-[#0A1628]">
                ₦125,000
              </p>

              <button className="btn-primary mt-4">
                Withdraw
              </button>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default AgentSettings;