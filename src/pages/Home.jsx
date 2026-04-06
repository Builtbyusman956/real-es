// src/pages/Home.jsx
import Hero               from "../components/Hero";
import TrustStats         from "../components/TrustStats";
import HowItWorks         from "../components/HowItWorks";
import FeaturedProperties from "../components/FeaturedProperties";
import WhyTrustUs         from "../components/WhyTrustUs";
import CTABanner          from "../components/CTABanner";
import Footer             from "../components/Footer";

const Home = () => (
  <>
    <Hero />
    <TrustStats />
    <HowItWorks />
    <FeaturedProperties />
    <WhyTrustUs />
    <CTABanner />
    <Footer />
  </>
);

export default Home;