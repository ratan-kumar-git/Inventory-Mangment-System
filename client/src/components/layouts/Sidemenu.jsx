import React from "react";
import { Home, LayoutDashboard, LogIn, Package, PackagePlus, User, UserPlus } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/useAuthStore";

const menuItems = [
  { name: "Home", path: "/", icon: Home }, 
  { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
  { name: "Products", path: "/products", icon: Package },
  { name: "Add Product", path: "/add-product", icon: PackagePlus },
  { name: "Users", path: "/users", icon: User },
];

const Sidemenu = ({ activeMenu }) => {
  const navigate = useNavigate();
  const { authUser } = useAuthStore();

  const handleClick = (path) => {
    navigate(path);
  };

  return (
    <aside className="w-64 h-[calc(100vh-64.8px)] bg-white border-r border-gray-200 shadow-sm sticky top-[64.8px] z-20">
      <div className="flex flex-col p-4">
        {authUser ? (
          menuItems.map((item) => (
            <button
              key={item.name}
              onClick={() => handleClick(item.path)}
              className={`w-full flex items-center gap-3 text-base font-semibold py-3 px-5 mb-4 rounded-lg transition-all duration-200
                ${
                  activeMenu === item.path
                    ? "text-blue-600 bg-blue-50 border border-blue-200 shadow-sm"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
            >
              <item.icon className="w-5 h-5" />
              {item.name}
            </button>
          ))
        ) : (
          <>
            <button
              onClick={() => handleClick("/")}
              className={`w-full flex items-center gap-3 text-[15px] font-medium py-3 px-5 mb-4 rounded-lg transition-all duration-200
                ${
                  activeMenu === "/"
                    ? "text-blue-600 bg-blue-50 border border-blue-200 shadow-sm"
                    : "hover:text-blue-600 hover:bg-blue-50 border hover:border-blue-200 shadow-sm"
                }`}
            >
              <Home className="w-5 h-5" />
              Home
            </button>
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
