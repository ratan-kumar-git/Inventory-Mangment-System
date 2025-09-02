import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import {
  Building,
  Eye,
  EyeOff,
  Mail,
  MapPin,
  Phone,
  User2,
  Lock,
} from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import ContentLoader from "../components/layouts/ContentLoader";
import Input from "../components/inputs/Input";

const Profile = () => {
  const { profile, getProfile, isProfile, updateProfile } = useAuthStore();
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [isChangePassword, setIsChangePassword] = useState(false);
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    shopName: "",
    address: "",
    contact: "",
    currentPassword: "",
    newPassword: "",
  });

  useEffect(() => {
    getProfile();
  }, [getProfile]);

  useEffect(() => {
    if (profile) {
      setFormData((prev) => ({
        ...prev,
        userName: profile.userName || "",
        email: profile.email || "",
        shopName: profile.shop?.shopName || "",
        address: profile.shop?.address || "",
        contact: profile.shop?.contact || "",
      }));
    }
  }, [profile]);

  const validateForm = () => {
    if (!formData.shopName.trim()) return toast.error("Shop name is required");
    if (!formData.contact) return toast.error("Contact is required");
    if (!formData.address.trim()) return toast.error("Address is required");
    if (!formData.userName.trim()) return toast.error("User name is required");
    if (!formData.email.trim()) return toast.error("Email is required");
    if (!/\S+@\S+\.\S+/.test(formData.email))
      return toast.error("Invalid email format");

    if (!formData.currentPassword) {
      return toast.error("Current Password is required to update profile");
    }

    if (formData.currentPassword.length < 6) {
      return toast.error("Current password must be at least 6 characters");
    }

    if (isChangePassword && formData.newPassword.length < 6) {
      return toast.error("New password must be at least 6 characters");
    }

    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const success = validateForm();
    if (success === true) {
      updateProfile(formData);
      setFormData({ ...formData, currentPassword: "", newPassword: "" });
      setIsChangePassword(false);
    }
  };

  if (isProfile) {
    return <ContentLoader message="Profile is loading..." />;
  }

  return (
    <div className="flex-1 w-full relative min-h-screen">
      <h1 className="text-2xl font-semibold text-gray-800 mb-4">Profile</h1>
      <div className="mx-auto bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-6">
          Edit Profile & Shop Details
        </h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6" >
          {/* Shop Name */}
          <Input
            label="Shop Name"
            labelFor="shopName"
            icon={Building}
            type="text"
            value={formData.shopName}
            onChange={(e) => setFormData({ ...formData, shopName: e.target.value })}
            placeholder="Enter your shop name"
          />

          {/* Contact */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Contact No.
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Phone className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="tel"
                maxLength={10}
                value={formData.contact}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    contact: e.target.value.replace(/\D/g, ""),
                  })
                }
                className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white/50"
                placeholder="Enter your contact number"
              />
            </div>
          </div>

          {/* Shop Address */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Shop Address
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 pt-3 pointer-events-none">
                <MapPin className="h-5 w-5 text-gray-400" />
              </div>
              <textarea
                value={formData.address}
                onChange={(e) =>
                  setFormData({ ...formData, address: e.target.value })
                }
                rows={2}
                className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white/50 resize-none"
                placeholder="Enter your shop address"
              />
            </div>
          </div>

          {/* User Section */}
          <Input
            label="Full Name"
            labelFor="userName"
            icon={User2}
            type="text"
            value={formData.userName}
            onChange={(e) =>
              setFormData({ ...formData, userName: e.target.value })
            }
            placeholder="Enter your name"
          />

          {/* Email */}
          <Input
            label="Email"
            labelFor="email"
            icon={Mail}
            type="email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            placeholder="Enter your email"
          />

          {/* Security Section */}
          <div className="md:col-span-2 border-t pt-4 mt-4">
            <h3 className="text-lg font-semibold text-gray-700 mb-3">
              Security
            </h3>

            {/* Current Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Current Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type={isShowPassword ? "text" : "password"}
                  value={formData.currentPassword}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      currentPassword: e.target.value,
                    })
                  }
                  className="block w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white/50"
                  placeholder="Current password is required"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setIsShowPassword(!isShowPassword)}
                >
                  {isShowPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  )}
                </button>
              </div>
            </div>

            {/* Checkbox to toggle new password */}
            <div className="flex items-center mt-4">
              <input
                type="checkbox"
                checked={isChangePassword}
                onChange={() => setIsChangePassword(!isChangePassword)}
                className="h-4 w-4 text-blue-600 border-gray-300 rounded"
              />
              <label
                htmlFor="changePassword"
                className="ml-2 block text-sm text-gray-700"
              >
                Change Password
              </label>
            </div>

            {/* New Password (only visible if checked) */}
            {isChangePassword && (
              <div className="mt-3">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  New Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type={isShowPassword ? "text" : "password"}
                    value={formData.newPassword}
                    onChange={(e) =>
                      setFormData({ ...formData, newPassword: e.target.value })
                    }
                    className="block w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white/50"
                    placeholder="Enter new password"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setIsShowPassword(!isShowPassword)}
                  >
                    {isShowPassword ? (
                      <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                    ) : (
                      <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                    )}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Save Button */}
          <div className="md:col-span-2 flex justify-end">
            <button
              type="submit"
              className="px-6 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:scale-x-105 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;
