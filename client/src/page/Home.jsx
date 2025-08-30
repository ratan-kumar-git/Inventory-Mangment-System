import React from "react";
import DashboardLayout from "../components/layouts/DashboardLayout";
import HeroSection from "../components/HeroSection";

const Home = () => {
  return (
    <>
    <DashboardLayout activeMenu="/" >
      <div className="flex-1 w-full ">
        <HeroSection />
      </div>
    </DashboardLayout>
    </>
  );
};

export default Home;
