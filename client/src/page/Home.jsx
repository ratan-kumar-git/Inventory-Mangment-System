import React from "react";
import DashboardLayout from "../components/layouts/DashboardLayout";

const Home = () => {
  return (
    <>
    <DashboardLayout activeMenu="/" >
      <div className="flex-1 w-full ">
        <h1>Ratan Hpme </h1>
      </div>
    </DashboardLayout>
    </>
  );
};

export default Home;
