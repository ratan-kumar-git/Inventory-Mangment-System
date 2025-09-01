import React from "react";
import HeroSection from "../components/homePage/HeroSection";
import FeaturesSection from "../components/homePage/FeaturesSection";
import Footer from "../components/homePage/Footer";
import HowItWorksSection from "../components/homePage/HowItWorksSection";
import TestimonialsSection from "../components/homePage/TestimonialsSection";
import Navbar from "../components/layouts/Navbar";

const Home = () => {
  return (
    <>
      <div className="flex-1 w-full ">
        <Navbar />
        <HeroSection />
        <FeaturesSection />
        <HowItWorksSection />
        <TestimonialsSection />
        <Footer />
      </div>
    </>
  );
};

export default Home;
