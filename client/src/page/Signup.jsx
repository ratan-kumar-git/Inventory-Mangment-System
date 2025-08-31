import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Eye, EyeClosed, Loader } from "lucide-react";
import logo from "../assets/logo.webp";
import toast from "react-hot-toast";
import { useAuthStore } from "../store/useAuthStore";

const Signup = () => {
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    shopName: "",
    address: "",
    contact: "",
    userName: "",
    email: "",
    password: "",
  });

  const { signup, isSignup } = useAuthStore();

  const validateForm = () => {
    if (!formData.shopName.trim()) return toast.error("Shop name is required");
    if (!formData.address.trim()) return toast.error("Address is required");
    if (!formData.contact.trim()) return toast.error("Contact is required");
    if (formData.contact.length !== 10)
      return toast.error("Contact must be exactly 10 digits");
    if (!formData.userName.trim()) return toast.error("Name is required");
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
      signup(formData);
    }
  };

  return (
    <div className="min-h-screen w-full bg-gray-50 flex items-center justify-center">
      <div className="bg-white shadow-lg rounded-xl p-8 my-10 w-full mx-5 sm:max-w-3xl">
        {/* Logo + Title */}
        <Link to="/" className="flex items-center justify-center space-x-2 mb-6">
          <img src={logo} alt="logo" className="w-12 h-12" />
          <h1 className="text-2xl font-bold text-gray-900">IM System</h1>
        </Link>

        {/* Subtitle */}
        <h2 className="text-lg font-semibold text-gray-800 mb-6 text-center">
          Signup to IM System
        </h2>

        {/* Form */}
        <form onSubmit={handleFormSubmit} className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="space-y-5">
              {/* Shop Name */}
              <div>
                <label
                  htmlFor="shopName"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Shop Name
                </label>
                <input
                  id="shopName"
                  type="text"
                  value={formData.shopName}
                  onChange={(e) =>
                    setFormData({ ...formData, shopName: e.target.value })
                  }
                  placeholder="Enter your Shop Name"
                  className="input-box"
                />
              </div>

              {/* Address */}
              <div>
                <label
                  htmlFor="address"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Shop Address
                </label>
                <input
                  id="address"
                  type="text"
                  value={formData.address}
                  onChange={(e) =>
                    setFormData({ ...formData, address: e.target.value })
                  }
                  placeholder="Enter your Shop Address"
                  className="input-box"
                />
              </div>

              {/* Contact */}
              <div>
                <label
                  htmlFor="contact"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Contact No.
                </label>
                <input
                  id="contact"
                  type="tel"
                  inputMode="numeric"
                  maxLength={10}
                  value={formData.contact}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, "");
                    setFormData({ ...formData, contact: value });
                  }}
                  placeholder="Enter your contact no."
                  className="input-box"
                />
              </div>
            </div>

            <div className="space-y-5">
              {/* Name */}
              <div>
                <label
                  htmlFor="userName"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Name
                </label>
                <input
                  id="userName"
                  type="text"
                  value={formData.userName}
                  onChange={(e) =>
                    setFormData({ ...formData, userName: e.target.value })
                  }
                  placeholder="Enter your Name"
                  className="input-box"
                />
              </div>

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
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
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
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
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
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSignup}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed text-white py-2.5 rounded-lg font-medium transition duration-200 flex items-center justify-center"
          >
            {isSignup ? <Loader className="w-5 h-5 animate-spin" /> : "Signup"}
          </button>
        </form>

        {/* Footer */}
        <p className="text-sm text-gray-600 text-center mt-6">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
