import React from "react";
import Navbar from "./Navbar";
import Sidemenu from "./Sidemenu";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />
      <div className="flex">
        {/* Desktop Sidebar */}
        <div className="max-lg:hidden">
          <Sidemenu />
        </div>

        {/* Main Content */}
        <main className="flex-1 p-5 overflow-y-auto overflow-x-auto"><Outlet /></main>
      </div>
    </div>
  );
};

export default Layout;
