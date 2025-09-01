import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Menu, Package, X } from "lucide-react";
import Sidemenu from "./Sidemenu";
import Profile from "../Profile";
import { useAuthStore } from "../../store/useAuthStore";

const Navbar = () => {
  const [openSideMenu, setOpenSideMenu] = useState(false);
  const sideMenuRef = useRef(null);
  const { authUser } = useAuthStore();

  const navItems = [
    { href: '#features', label: 'Features' },
    { href: '#how-it-works', label: 'How it Works' },
    { href: '#testimonials', label: 'Testimonials' },
    { href: '#pricing', label: 'Pricing' },
  ];

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

    <nav className="flex items-center justify-between bg-gradient-to-br from-blue-50 via-white to-indigo-50 border-b border-gray-200 shadow-sm py-3 px-6 sticky top-0 z-30">
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
        <Link to="/" className="flex items-center space-x-2">
          <div className="p-2 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg">
            <Package className="w-6 h-6 text-white" />
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            InventoryPro
          </span>
        </Link>
      </div>

      {/* Desktop Navigation */}
      {!authUser && <nav className="hidden md:flex items-center space-x-8">
        {navItems.map((item) => (
          <a
            key={item.href}
            href={item.href}
            className="text-gray-700 hover:text-blue-600 transition-colors duration-200 font-medium"
          >
            {item.label}
          </a>
        ))}
      </nav>}

      {authUser ? (
        <Profile />
      ) : (
        <div className="flex items-center space-x-4">
          <Link
            to="/login"
            className="hidden md:block text-gray-700 hover:text-blue-600 transition-colors duration-200 font-medium"
          >
            Sign In
          </Link>
          <Link
            to="/signup"
            className="hidden md:block bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-2 rounded-lg hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200"
          >
            Start Free Trial
          </Link>
        </div>
      )}

      {/* Mobile Sidebar */}
      {openSideMenu && (
        <div
          ref={sideMenuRef}
          className="fixed top-[64.8px] left-0 w-64 h-[calc(100vh-64.8px)] bg-white shadow-md z-40"
        >
          <Sidemenu onClose={() => setOpenSideMenu(false)} />
        </div>
      )}
    </nav>
  );
};

export default Navbar;
