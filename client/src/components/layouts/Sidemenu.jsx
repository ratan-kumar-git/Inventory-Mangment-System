import React from "react";
import {
  CreditCard,
  History,
  Home,
  LayoutDashboard,
  LogIn,
  LogOut,
  Package,
  PackagePlus,
  User,
  UserCheck2Icon,
  UserPlus,
} from "lucide-react";
import { Link, NavLink } from "react-router-dom";
import { useAuthStore } from "../../store/useAuthStore";

const menuItems = [
  { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
  { name: "Products", path: "/products", icon: Package },
  { name: "Add Product", path: "/add-product", icon: PackagePlus },
  { name: "Billing", path: "/billing", icon: CreditCard },
  { name: "Billing History", path: "/billing-history", icon: History },
  { name: "Profile", path: "/profile", icon: UserCheck2Icon },
  { name: "Staff", path: "/staff", icon: User },
];

const Sidemenu = ({ onClose }) => {
  const { authUser, logout } = useAuthStore();

  return (
    <aside className="w-64 h-[calc(100vh-64.8px)] bg-gradient-to-br from-blue-50 via-white to-indigo-50 border-r border-gray-200 shadow-lg sticky top-[64.8px] z-20">
      <div className="flex flex-col p-4">
        {authUser ? (
          <>
            {menuItems.map((item) => (
              <NavLink
                to={item.path}
                key={item.name}
                onClick={onClose}
                className={({
                  isActive,
                }) => `w-full flex items-center gap-3 text-base font-semibold py-3 px-5 mb-4 rounded-lg transition-all duration-200
                ${
                  isActive
                    ? "text-blue-600 bg-blue-50 border border-blue-200 shadow-sm"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <item.icon className="w-5 h-5" />
                {item.name}
              </NavLink>
            ))}

            <button onClick={() => logout()} className="w-full flex items-center gap-3 text-base font-semibold py-3 px-5 mb-4 rounded-lg transition-all duration-200 text-gray-700 hover:bg-gray-100">
              <LogOut className="w-5 h-5" />
              Logout

            </button>
          </>
        ) : (
          <>
            <NavLink
              to="/"
              className={({
                isActive,
              }) => `w-full flex items-center gap-3 text-[15px] font-medium py-3 px-5 mb-4 rounded-lg transition-all duration-200
                ${
                  isActive
                    ? "text-blue-600 bg-blue-50 border border-blue-200 shadow-sm"
                    : "hover:text-blue-600 hover:bg-blue-50 border hover:border-blue-200 shadow-sm"
                }`}
            >
              <Home className="w-5 h-5" />
              Home
            </NavLink>
            <Link
              to="/signup"
              className="w-full flex items-center gap-3 text-[15px] font-medium py-3 px-5 mb-4 rounded-lg transition-all duration-200 text-gray-700 hover:text-blue-600 hover:bg-blue-50 hover:border hover:border-blue-200 hover:shadow-sm"
            >
              <UserPlus className="w-5 h-5" />
              Signup
            </Link>
            <Link
              to="/login"
              className="w-full flex items-center gap-3 text-[15px] font-medium py-3 px-5 mb-4 rounded-lg transition-all duration-200 text-gray-700 hover:text-blue-600 hover:bg-blue-50 hover:border hover:border-blue-200 hover:shadow-sm"
            >
              <LogIn className="w-5 h-5" />
              Login
            </Link>
          </>
        )}
      </div>
    </aside>
  );
};

export default Sidemenu;
