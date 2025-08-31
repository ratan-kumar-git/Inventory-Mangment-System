import { create } from "zustand";
import { axiosInstance } from "../utils/axios";


export const useDashboardStore = create((set) => ({
  stats: {
    totalProducts: 0,
    totalSales: 0,
    todaySales: 0,
    lowStockCount: 0,
  },
  loading: false,

  getDashboard: async () => {
    try {
      set({ loading: true});
      const res = await axiosInstance.get("/api/dashboard");
      set({ stats: res.data, loading: false });
    } catch (err) {
      set({ error: err.response?.data?.message || "Failed to load stats", loading: false });
    }
  },
}));
