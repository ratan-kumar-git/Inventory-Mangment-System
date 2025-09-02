import { create } from "zustand";
import { axiosInstance } from "../utils/axios";
import toast from "react-hot-toast";

export const useAuthStore = create((set) => ({
  authUser: null,
  profile: null,
  isProfile: false,
  isSignup: false,
  isLogin: false,
  isCheckingAuth: false,

  checkAuth: async () => {
    try {
      set({ isCheckingAuth: true });
      const token = localStorage.getItem("token");
      if (!token) {
        set({ authUser: null, isCheckingAuth: false });
        return;
      }
      const res = await axiosInstance.get("api/auth/checkAuth");
      set({ authUser: res.data.user });
    } catch (error) {
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  signup: async (data) => {
    set({ isSignup: true });
    try {
      const res = await axiosInstance.post("api/auth/signup", data);
      const token = res.data.token;
      if (token) {
        localStorage.setItem("token", token);
        set({ authUser: res.data.user });
        toast.success("Account created successfully");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    } finally {
      set({ isSignup: false });
    }
  },

  login: async (data) => {
    set({ isLogin: true });
    try {
      const res = await axiosInstance.post("api/auth/login", data);
      const token = res.data.token;
      if (token) {
        localStorage.setItem("token", token);
        set({ authUser: res.data.user });
        toast.success("Login successfully");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    } finally {
      set({ isLogin: false });
    }
  },

  logout: () => {
    try {
      localStorage.removeItem("token");
      set({ authUser: null });
      toast.success("Logout successfully");
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  },

  getProfile: async () => {
    set({ isProfile: true });
    try {
      const res = await axiosInstance.get("/api/auth/profile");
      set({ profile: res.data });
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    } finally {
      set({ isProfile: false });
    }
  },

  updateProfile: async (formData) => {
    set({ isProfile: true });
    try {
      const res = await axiosInstance.put("/api/auth/profile", formData);

      set({ profile: res.data });

      toast.success("Profile updated successfully");
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    } finally {
      set({ isProfile: false });
    }
  },
}));
