import { create } from "zustand";
import { axiosInstance } from "../utils/axios";
import toast from "react-hot-toast";

export const useBillingStore = create((set, get) => ({
  bills: [],
  bill: null,
  isBillLoading: false,
  isCreateBill: false,

  // Create a bill
  createBill: async (billData) => {
    set({ isCreateBill: true });
    try {
      const res = await axiosInstance.post("/api/billing", billData);
      toast.success("Bill created successfully");

      // update local store with new bill
      set((state) => ({
        bills: [res.data, ...state.bills],
      }));
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    } finally {
      set({ isCreateBill: false });
    }
  },

  // Get all bills
  getBills: async () => {
    set({ isBillLoading: true });
    try {
      const res = await axiosInstance.get("/api/billing");
      set({ bills: res.data });
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    } finally {
      set({ isBillLoading: false });
    }
  },

  // Get single bill by id
  getBillById: async (id) => {
    set({ isBillLoading: true });
    try {
      const res = await axiosInstance.get(`/api/billing/${id}`);
      set({ bill: res.data });
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    } finally {
      set({ isBillLoading: false });
    }
  },
}));
