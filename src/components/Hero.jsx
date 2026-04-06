import { useNavigate } from "react-router-dom";
import bgImg from "../assets/realestate.avif";

const Hero = () => {
  const navigate = useNavigate();

  return (
    <section className="relative w-full min-h-screen flex items-center overflow-hidden">

      {/* Background */}
      <div className="absolute inset-0">
        <img src={bgImg} alt="Real estate background" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A1628]/90 via-[#0A1628]/65 to-[#0A1628]/20" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 grid md:grid-cols-2 gap-12 items-center">

        {/* LEFT */}
        <div className="text-white">

          {/* Eyebrow label */}
          <div className="inline-flex items-center gap-2 border border-[#C9A84C]/40 bg-[#C9A84C]/10 text-[#C9A84C] text-xs font-semibold uppercase tracking-widest px-3 py-1.5 rounded-full mb-6">
            Nigeria's #1 Verified Property Platform
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight mb-6 text-[#F7F4EF]">
            Find Land, Houses & Rentals Without Stress
          </h1>

          <p className="text-[#8A9BB5] mb-8 text-lg max-w-xl leading-relaxed">
            Verified agents • Secure payments • Real ownership checks • Rent or buy anywhere in Nigeria
          </p>

          {/* Buttons */}
          <div className="flex gap-3 flex-wrap">
            <button
              onClick={() => navigate("/browse")}
              className="bg-[#C9A84C] hover:bg-[#b8943d] active:scale-95 text-[#0A1628] px-6 py-3 rounded-xl font-semibold transition duration-200"
            >
              Explore Homes & Land
            </button>
            <button
              onClick={() => navigate("/register")}
              className="border border-[#F7F4EF]/30 bg-[#F7F4EF]/10 hover:bg-[#F7F4EF]/20 active:scale-95 text-[#F7F4EF] px-6 py-3 rounded-xl font-semibold transition duration-200 backdrop-blur-sm"
            >
              Register as Agent
            </button>
          </div>

          {/* Trust badges */}
          <div className="flex gap-3 mt-8 flex-wrap">
            {["Verified Agents", "Secure Payments", "Fraud Protection", "Rent & Buy Options"].map((b) => (
              <span
                key={b}
                className="bg-[#E8D5A3]/15 border border-[#C9A84C]/30 text-[#E8D5A3] text-xs font-medium px-3 py-1 rounded-full"
              >
                ✔ {b}
              </span>
            ))}
          </div>
        </div>

        {/* RIGHT — Property card */}
        <div className="hidden md:flex justify-end">
          <div className="bg-[#F7F4EF] rounded-3xl shadow-2xl p-4 w-[380px] transform hover:scale-105 transition duration-300">

            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=800&q=80"
                className="rounded-2xl h-52 w-full object-cover"
                alt="Featured property"
              />
              {/* Gold badge over image */}
              <span className="absolute top-3 left-3 bg-[#C9A84C] text-[#0A1628] text-[11px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wide">
                Featured
              </span>
            </div>

            <div className="pt-3 px-1">
              <h3 className="font-bold text-xl text-[#0A1628] mb-0.5">₦25,000,000</h3>
              <p className="text-[#6B7280] text-sm mb-3">Lekki, Lagos</p>

              <div className="flex items-center justify-between">
                <div className="flex gap-2">
                  <span className="bg-[#E8D5A3] text-[#0A1628] text-xs font-semibold px-2.5 py-1 rounded-full">
                    ✔ Verified
                  </span>
                  <span className="bg-[#E8D5A3] text-[#0A1628] text-xs font-semibold px-2.5 py-1 rounded-full">
                    Low Risk
                  </span>
                </div>
                <span className="text-xs text-[#6B7280]">3 bed • 2 bath</span>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};

export default Hero;