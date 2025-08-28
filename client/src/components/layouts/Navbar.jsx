import React, { useState } from "react";
import Sidemenu from "./Sidemenu";
import { Link } from "react-router-dom";
import { Menu, User, X } from "lucide-react";
import { useAuthStore } from "../../store/useAuthStore";

const Navbar = ({ activeMenu }) => {
  const [openSideMenu, setOpenSideMenu] = useState(false);
  const { authUser, logout } = useAuthStore();

  return (
    <nav className="flex items-center justify-between bg-white shadow-sm border-b border-gray-200 py-3 px-6 sticky top-0 z-30">
      <div className="flex items-center gap-5">
        {/* Mobile Menu Toggle */}
        <button
          className="block lg:hidden text-gray-700"
          onClick={() => setOpenSideMenu(!openSideMenu)}
        >
          {openSideMenu ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>

        {/* Logo */}
        <Link
          to="/"
          className="no-underline text-xl font-bold px-3 py-1 rounded-lg bg-gradient-to-r from-red-500 to-yellow-400 text-white shadow-sm"
        >
          IM System
        </Link>
      </div>

      {authUser ? (
        <>
          <div class="flex items-center justify-center w-8 h-8 overflow-hidden bg-gray-200 rounded-full">
            <User />
          </div>
          <button onClick={() => logout()}>Logout</button>
        </>
      ) : (
        <div className="space-x-4">
          <Link
            to="/signup"
            className="no-underline text-lg  px-3 py-1 rounded-lg bg-blue-700 text-white shadow-sm"
          >
            Signup
          </Link>
          <Link
            to="/login"
            className="no-underline text-lg  px-3 py-1 rounded-lg bg-blue-700 text-white shadow-sm"
          >
            Login
          </Link>
        </div>
      )}

      {/* Mobile Sidebar */}
      {openSideMenu && (
        <div className="fixed top-[61px] left-0 w-64 h-[calc(100vh-61px)] bg-white shadow-md z-40">
          <Sidemenu activeMenu={activeMenu} />
        </div>
      )}
    </nav>
  );
};

export default Navbar;
