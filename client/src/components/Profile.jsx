import React, { useRef, useState, useEffect } from "react";
import { getNameFirstLetter } from "../utils/helper";
import { useAuthStore } from "../store/useAuthStore";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);
  const avatarRef = useRef(null);
  const { authUser, logout } = useAuthStore();
  const navigate = useNavigate();

  // Toggle dropdown
  const toggleDropdown = () => setOpen((prev) => !prev);

  // Close on outside click
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        avatarRef.current &&
        !avatarRef.current.contains(event.target)
      ) {
        setOpen(false);
      }
    };

    if (open) {
      document.addEventListener("mousedown", handleOutsideClick);
    }
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [open]);

  const handleLogout = () => {
    logout();
    setOpen(false);
    navigate("/login");
  };

  return (
    <div className="relative">
      {/* Avatar */}
      <div
        ref={avatarRef}
        onClick={toggleDropdown}
        className="flex items-center justify-center w-10 h-10 bg-orange-500 text-white font-semibold cursor-pointer rounded-full select-none"
      >
        {getNameFirstLetter(authUser?.userName || "G")}
      </div>

      {/* Dropdown */}
      {open && (
        <div
          ref={dropdownRef}
          className="absolute top-12 right-0 w-48 bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden z-50"
        >
          {/* Header */}
          <div className="px-4 py-3 border-b bg-gray-50">
            <p className="text-sm font-medium text-gray-800">
              {authUser?.userName || "Guest"}
            </p>
            <p className="text-xs text-gray-500">
              {authUser?.email || ""}
            </p>
          </div>

          {/* Menu */}
          <button
            onClick={() => {
              setOpen(false);
              navigate("/profile");
            }}
            className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 transition"
          >
            Profile
          </button>
          <button
            onClick={handleLogout}
            className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default Profile;
