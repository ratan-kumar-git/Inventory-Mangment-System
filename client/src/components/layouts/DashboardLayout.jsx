import React from "react";
import Navbar from "./Navbar";
import Sidemenu from "./Sidemenu";
import { useAuthStore } from "../../store/useAuthStore";

const DashboardLayout = ({ children, activeMenu }) => {
  const { authUser } = useAuthStore();
  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar activeMenu={activeMenu} />
      
      <div className="flex">
        {/* Desktop Sidebar */}
        <div className="max-lg:hidden">
          <Sidemenu activeMenu={activeMenu} />
        </div>

        {/* Main Content */}
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
};

export default DashboardLayout;
