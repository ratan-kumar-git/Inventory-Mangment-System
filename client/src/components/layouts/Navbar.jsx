import React, { useEffect, useRef, useState } from "react";
import Sidemenu from "./Sidemenu";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import Profile from "../profile";
import logo from "../../assets/logo.webp";
import { useAuthStore } from "../../store/useAuthStore";

const Navbar = ({ activeMenu }) => {
  const [openSideMenu, setOpenSideMenu] = useState(false);
  const sideMenuRef = useRef(null);
  const { authUser } = useAuthStore();

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        sideMenuRef.current &&
        !sideMenuRef.current.contains(event.target) &&
        !event.target.closest("button")
      ) {
        setOpenSideMenu(false);
      }
    };

    if (openSideMenu) {
      document.addEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [openSideMenu]);

  return (
    <nav className="flex items-center justify-between bg-white shadow-sm border-b border-gray-200 py-3 px-6 sticky top-0 z-30">
      <div className="flex items-center gap-2">
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
          className="flex items-center justify-center gap-2 no-underline text-xl font-bold px-3 py-1 text-gray-800 hover:opacity-85"
        >
          <img src={logo} alt="logo" className="w-10 h-10" />
          IM System
        </Link>
      </div>

      {authUser ? (
        <Profile />
      ) : (
        <Link
          to="/signup"
          className="no-underline text-base px-3 py-1.5 rounded-lg bg-emerald-500 text-white shadow-sm"
        >
          Get Satarted
        </Link>
      )}

      {/* Mobile Sidebar */}
      {openSideMenu && (
        <div
          ref={sideMenuRef}
          className="fixed top-[61px] left-0 w-64 h-[calc(100vh-61px)] bg-white shadow-md z-40"
        >
          <Sidemenu activeMenu={activeMenu} />
        </div>
      )}
    </nav>
  );
};

export default Navbar;
