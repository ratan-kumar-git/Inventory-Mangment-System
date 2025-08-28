import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Eye, EyeClosed, Loader } from "lucide-react";
import logo from "../assets/logo.webp";
import { useAuthStore } from "../store/useAuthStore";
import toast from "react-hot-toast";

const Login = () => {
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  })

  const { isLogin, login } = useAuthStore();
  const validateForm = () => {
    if (!formData.email.trim()) return toast.error("Email is required");
    if (!/\S+@\S+\.\S+/.test(formData.email))
      return toast.error("Invalid email format");
    if (!formData.password) return toast.error("Password is required");
    if (formData.password.length < 6)
      return toast.error("Password must be at least 6 characters");
    return true;
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const success = validateForm();
    if (success === true) {
      login(formData);
    }
  };

  return (
    <div className="h-screen w-full bg-gray-50 flex items-center justify-center">
      <div className="w-full max-w-xs sm:max-w-md bg-white shadow-lg rounded-xl p-8">
        {/* Logo + Title */}
        <Link to="/" className="flex items-center justify-center space-x-2 mb-6">
          <img src={logo} alt="logo" className="w-12 h-12" />
          <h1 className="text-2xl font-bold text-gray-900">IM System</h1>
        </Link>

        {/* Subtitle */}
        <h2 className="text-lg font-semibold text-gray-800 mb-6 text-center">
          Login to IM System
        </h2>

        {/* Form */}
        <form onSubmit={handleFormSubmit} className="space-y-5">
          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value})}
              placeholder="Enter your email"
              className="input-box"
            />
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Password
            </label>
            <div className="flex items-center gap-2">
              <input
                id="password"
                type={isShowPassword ? "text" : "password"}
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value})}
                placeholder="Enter your password"
                className="input-box flex-1"
              />
              {isShowPassword ? (
                <EyeClosed
                  className="w-5 h-5 text-gray-500 cursor-pointer"
                  onClick={() => setIsShowPassword(false)}
                />
              ) : (
                <Eye
                  className="w-5 h-5 text-gray-500 cursor-pointer"
                  onClick={() => setIsShowPassword(true)}
                />
              )}
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLogin}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed text-white py-2.5 rounded-lg font-medium transition duration-200 flex items-center justify-center"
          >
            {isLogin ? <Loader className="w-5 h-5 animate-spin" /> : "Login"}
          </button>
        </form>

        {/* Footer */}
        <p className="text-sm text-gray-600 text-center mt-6">
          Don’t have an account?{" "}
          <Link
            to="/signup"
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            Signup
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
