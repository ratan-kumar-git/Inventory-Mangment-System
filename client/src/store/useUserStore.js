import { create } from "zustand";
import { axiosInstance } from "../utils/axios";
import toast from "react-hot-toast";

export const useUserStore = create((set, get) => ({
  users: [],
  isUserloading: false,
  isUserCreate: false,
  isUserDelete: false,

  createUser: async (data) => {
    set({ isUserCreate: true });
    try {
      const res = await axiosInstance.post("api/users", data);
      set((state) => ({
        users: [...state.users, res.data],
      }));
      toast.success("User added successfully");
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    } finally {
      set({ isUserCreate: false });
    }
  },

  getUsers: async () => {
    set({ isUserloading: true });
    try {
      const res = await axiosInstance.get("/api/users");
      set({ users: res.data });
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    } finally {
      set({ isUserloading: false });
    }
  },

  deleteUser: async (userId) => {
    set({ isUserDelete: true });
    try {
      const res = await axiosInstance.delete(`/api/users/${userId}`);
      await get().getUsers()
      toast.success("User deleted successfully");
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    } finally {
      set({ isUserDelete: false });
    }
  },
}));
