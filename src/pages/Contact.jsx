// src/pages/Contact.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  RiPhoneLine, RiMailLine, RiMapPinLine, RiTimeLine,
  RiWhatsappLine, RiCustomerService2Line, RiQuestionLine,
  RiBuildingLine, RiShieldCheckFill, RiArrowRightLine,
  RiSendPlaneLine, RiCheckLine, RiErrorWarningLine
} from "react-icons/ri";
import { HiArrowRight } from "react-icons/hi";

// Contact methods data
const CONTACT_METHODS = [
  {
    icon: RiPhoneLine,
    title: "Phone Support",
    details: "+234 800 NRET SAFE",
    subtext: "Mon-Fri, 8am - 6pm WAT",
    action: "tel:+2348006733723",
    color: "bg-[#0A1628]"
  },
  {
    icon: RiWhatsappLine,
    title: "WhatsApp",
    details: "+234 800 673 3723",
    subtext: "Quick responses, 24/7",
    action: "https://wa.me/2348006733723",
    color: "bg-green-600"
  },
  {
    icon: RiMailLine,
    title: "Email Us",
    details: "support@nret.ng",
    subtext: "For detailed inquiries",
    action: "mailto:support@nret.ng",
    color: "bg-[#C9A84C]"
  },
  {
    icon: RiMapPinLine,
    title: "Visit Office",
    details: "Lekki Phase 1, Lagos",
    subtext: "Main HQ - Open 9am-5pm",
    action: "#locations",
    color: "bg-[#1A2E4A]"
  }
];

// Office locations
const OFFICES = [
  {
    city: "Lagos (HQ)",
    address: "Plot 14, Admiralty Way, Lekki Phase 1, Lagos",
    phone: "+234 800 673 3723",
    email: "lagos@nret.ng",
    hours: "Mon-Fri: 9:00 AM - 5:00 PM"
  },
  {
    city: "Abuja",
    address: "Suite 4B, Wuse 2, Federal Capital Territory",
    phone: "+234 800 673 3724",
    email: "abuja@nret.ng",
    hours: "Mon-Fri: 9:00 AM - 5:00 PM"
  },
  {
    city: "Port Harcourt",
    address: "23 Trans Amadi Industrial Layout, Rivers State",
    phone: "+234 800 673 3725",
    email: "ph@nret.ng",
    hours: "Mon-Fri: 9:00 AM - 5:00 PM"
  }
];

// Quick FAQ
const QUICK_FAQ = [
  {
    q: "How do I verify a property?",
    a: "Use our inspection booking system or check the verification badge on listings. All verified properties have green checkmarks."
  },
  {
    q: "What if I get scammed?",
    a: "Report immediately via our emergency line. We have a fraud protection fund for verified transactions."
  },
  {
    q: "How to become an agent?",
    a: "Click 'Register as Agent' and complete verification. You'll need CAC documents and valid ID."
  }
];

const Contact = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "general",
    message: ""
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      setFormData({ name: "", email: "", phone: "", subject: "general", message: "" });
    }, 1500);
  };

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className="min-h-screen bg-[#F7F4EF]">

      {/* ── Hero ── */}
      <div className="bg-[#0A1628] pt-32 pb-20 px-4 sm:px-8 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <span className="inline-block text-[#C9A84C] text-xs font-bold uppercase tracking-[0.18em] mb-4">
            Get In Touch
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#F7F4EF] leading-tight max-w-3xl mb-6">
            We're Here to{" "}
            <span className="text-[#C9A84C]">Help You</span>
          </h1>
          <p className="text-[#8A9BB5] text-base sm:text-lg leading-relaxed max-w-2xl mb-8">
            Have questions about a property? Need help with verification? Or want to report fraud? Our team is ready to assist you every step of the way.
          </p>
          <div className="flex flex-wrap gap-3">
            <a href="#contact-form"
              className="flex items-center gap-2 bg-[#C9A84C] hover:bg-[#b8943d] active:scale-95 text-[#0A1628] px-6 py-3 rounded-xl font-bold text-sm transition duration-200">
              Send Message <HiArrowRight size={16} />
            </a>
            <a href="tel:+2348006733723"
              className="flex items-center gap-2 border border-[#F7F4EF]/20 hover:bg-[#F7F4EF]/8 text-[#F7F4EF] px-6 py-3 rounded-xl font-semibold text-sm transition duration-200">
              <RiPhoneLine size={16} /> Emergency Line
            </a>
          </div>
        </div>
      </div>

      {/* ── Contact Methods ── */}
      <section className="py-16 px-4 sm:px-8 lg:px-12 -mt-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {CONTACT_METHODS.map(({ icon: Icon, title, details, subtext, action, color }) => (
              <a
                key={title}
                href={action}
                className="bg-white rounded-2xl border border-[#E0D9CF] p-6 hover:border-[#C9A84C]/50 hover:shadow-lg transition-all duration-300 group"
              >
                <div className={`w-12 h-12 rounded-xl ${color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon size={24} className="text-white" />
                </div>
                <h3 className="font-bold text-[#0A1628] text-base mb-1">{title}</h3>
                <p className="text-[#C9A84C] font-semibold text-sm mb-1">{details}</p>
                <p className="text-[#6B7280] text-xs">{subtext}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── Main Contact Section ── */}
      <section id="contact-form" className="py-12 px-4 sm:px-8 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-5 gap-8">
            
            {/* Form */}
            <div className="lg:col-span-3">
              <div className="bg-white rounded-3xl border border-[#E0D9CF] p-6 sm:p-8">
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-[#0A1628] mb-2">Send us a Message</h2>
                  <p className="text-[#6B7280] text-sm">Fill out the form below and we'll get back to you within 24 hours.</p>
                </div>

                {submitted ? (
                  <div className="bg-green-50 border border-green-200 rounded-2xl p-8 text-center">
                    <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                      <RiCheckLine size={32} className="text-green-600" />
                    </div>
                    <h3 className="text-xl font-bold text-[#0A1628] mb-2">Message Sent!</h3>
                    <p className="text-[#6B7280] mb-4">Thank you for reaching out. We'll respond shortly.</p>
                    <button 
                      onClick={() => setSubmitted(false)}
                      className="text-[#C9A84C] font-semibold text-sm hover:underline"
                    >
                      Send another message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-xs font-bold text-[#0A1628] uppercase tracking-wider mb-2">
                          Full Name
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 rounded-xl border border-[#E0D9CF] focus:border-[#C9A84C] focus:outline-none transition text-sm text-[#0A1628] placeholder-[#6B7280]"
                          placeholder="John Doe"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-[#0A1628] uppercase tracking-wider mb-2">
                          Email Address
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 rounded-xl border border-[#E0D9CF] focus:border-[#C9A84C] focus:outline-none transition text-sm text-[#0A1628] placeholder-[#6B7280]"
                          placeholder="john@example.com"
                        />
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-xs font-bold text-[#0A1628] uppercase tracking-wider mb-2">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-xl border border-[#E0D9CF] focus:border-[#C9A84C] focus:outline-none transition text-sm text-[#0A1628] placeholder-[#6B7280]"
                          placeholder="+234 800 000 0000"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-[#0A1628] uppercase tracking-wider mb-2">
                          Subject
                        </label>
                        <select
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-xl border border-[#E0D9CF] focus:border-[#C9A84C] focus:outline-none transition text-sm text-[#0A1628] bg-white"
                        >
                          <option value="general">General Inquiry</option>
                          <option value="property">Property Question</option>
                          <option value="verification">Verification Help</option>
                          <option value="fraud">Report Fraud</option>
                          <option value="agent">Become an Agent</option>
                          <option value="partnership">Partnership</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#0A1628] uppercase tracking-wider mb-2">
                        Message
                      </label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={5}
                        className="w-full px-4 py-3 rounded-xl border border-[#E0D9CF] focus:border-[#C9A84C] focus:outline-none transition text-sm text-[#0A1628] placeholder-[#6B7280] resize-none"
                        placeholder="How can we help you today?"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full bg-[#0A1628] hover:bg-[#1A2E4A] text-[#C9A84C] font-bold py-4 rounded-xl transition duration-200 flex items-center justify-center gap-2 disabled:opacity-70"
                    >
                      {loading ? (
                        <span>Sending...</span>
                      ) : (
                        <>
                          Send Message <RiSendPlaneLine size={18} />
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </div>

            {/* Sidebar Info */}
            <div className="lg:col-span-2 space-y-6">
              {/* Quick FAQ */}
              <div className="bg-[#0A1628] rounded-3xl p-6">
                <div className="flex items-center gap-2 mb-4">
                  <RiQuestionLine size={20} className="text-[#C9A84C]" />
                  <h3 className="font-bold text-[#F7F4EF]">Quick Answers</h3>
                </div>
                <div className="space-y-4">
                  {QUICK_FAQ.map(({ q, a }, i) => (
                    <div key={i} className="border-b border-[#1A2E4A] last:border-0 pb-3 last:pb-0">
                      <p className="text-[#C9A84C] text-sm font-semibold mb-1">{q}</p>
                      <p className="text-[#8A9BB5] text-xs leading-relaxed">{a}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Emergency Card */}
              <div className="bg-[#C9A84C] rounded-3xl p-6">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#0A1628] flex items-center justify-center flex-shrink-0">
                    <RiErrorWarningLine size={20} className="text-[#C9A84C]" />
                  </div>
                  <div>
                    <h3 className="font-bold text-[#0A1628] mb-1">Fraud Emergency?</h3>
                    <p className="text-[#0A1628]/80 text-xs mb-3">
                      If you suspect fraud or are in a dangerous situation, call our emergency line immediately.
                    </p>
                    <a 
                      href="tel:+2348006733723"
                      className="inline-flex items-center gap-1 text-[#0A1628] font-bold text-sm hover:underline"
                    >
                      <RiPhoneLine size={14} /> +234 800 NRET SAFE
                    </a>
                  </div>
                </div>
              </div>

              {/* Trust Badges */}
              <div className="bg-white rounded-3xl border border-[#E0D9CF] p-6">
                <h3 className="font-bold text-[#0A1628] mb-4 text-sm">Why Trust NRET?</h3>
                <div className="space-y-3">
                  {[
                    "Verified by CAC & EFCC",
                    "Insurance backed transactions",
                    "24/7 Customer support",
                    "100% fraud protection"
                  ].map((item) => (
                    <div key={item} className="flex items-center gap-2 text-sm text-[#6B7280]">
                      <RiShieldCheckFill size={14} className="text-[#C9A84C]" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Office Locations ── */}
      <section id="locations" className="bg-[#0A1628] py-20 px-4 sm:px-8 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-2xl mb-12">
            <span className="inline-block text-[#C9A84C] text-xs font-bold uppercase tracking-[0.18em] mb-3">
              Visit Us
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#F7F4EF] leading-tight">
              Our Offices
            </h2>
            <p className="text-[#8A9BB5] mt-4">
              Visit any of our locations for in-person support and property viewings.
            </p>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {OFFICES.map(({ city, address, phone, email, hours }) => (
              <div key={city}
                className="bg-[#1A2E4A] rounded-2xl p-6 border border-[#1A2E4A] hover:border-[#C9A84C]/20 transition-all duration-300 group">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-[#0A1628] flex items-center justify-center group-hover:bg-[#C9A84C] transition-colors duration-300">
                    <RiBuildingLine size={20} className="text-[#C9A84C] group-hover:text-[#0A1628]" />
                  </div>
                  <h3 className="font-bold text-[#F7F4EF] text-lg">{city}</h3>
                </div>
                <div className="space-y-2 text-sm">
                  <p className="flex items-start gap-2 text-[#8A9BB5]">
                    <RiMapPinLine size={16} className="text-[#C9A84C] flex-shrink-0 mt-0.5" />
                    <span>{address}</span>
                  </p>
                  <p className="flex items-center gap-2 text-[#8A9BB5]">
                    <RiPhoneLine size={16} className="text-[#C9A84C]" />
                    <span>{phone}</span>
                  </p>
                  <p className="flex items-center gap-2 text-[#8A9BB5]">
                    <RiMailLine size={16} className="text-[#C9A84C]" />
                    <span>{email}</span>
                  </p>
                  <p className="flex items-center gap-2 text-[#8A9BB5]">
                    <RiTimeLine size={16} className="text-[#C9A84C]" />
                    <span>{hours}</span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-20 px-4 sm:px-8 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="bg-[#C9A84C] rounded-3xl p-8 sm:p-12 text-center">
            <div className="max-w-2xl mx-auto">
              <h2 className="text-2xl sm:text-3xl font-bold text-[#0A1628] mb-4">
                Ready to Find Your Dream Property?
              </h2>
              <p className="text-[#0A1628]/80 mb-8">
                Join thousands of Nigerians who trust NRET for safe, verified real estate transactions.
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <button 
                  onClick={() => navigate("/browse")}
                  className="flex items-center gap-2 bg-[#0A1628] hover:bg-[#1A2E4A] text-[#C9A84C] px-8 py-3 rounded-xl font-bold text-sm transition duration-200"
                >
                  Browse Properties <RiArrowRightLine size={16} />
                </button>
                <button 
                  onClick={() => navigate("/register")}
                  className="flex items-center gap-2 border-2 border-[#0A1628] hover:bg-[#0A1628] hover:text-[#C9A84C] text-[#0A1628] px-8 py-3 rounded-xl font-semibold text-sm transition duration-200"
                >
                  <RiCustomerService2Line size={16} /> Become an Agent
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Contact;