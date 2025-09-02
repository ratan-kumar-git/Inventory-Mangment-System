import { create } from "zustand";
import { axiosInstance } from "../utils/axios";
import toast from "react-hot-toast";

export const useProductStore = create((set, get) => ({
  products: [],
  isProductLoading: false,
  isCreateProduct: false,
  isAddStock: false,
  isProductDelete: false,

  createProduct: async (productData) => {
    set({ isCreateProduct: true });
    try {
      const res = await axiosInstance.post("/api/products", productData);
      set((state) => ({
        products: [...state.products, res.data.product],
      }));
      toast.success("Product created successfully");
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    } finally {
      set({ isCreateProduct: false });
    }
  },

  getProduct: async () => {
    set({ isProductLoading: true });
    try {
      const res = await axiosInstance.get("/api/products");
      set({ products: res.data });
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    } finally {
      set({ isProductLoading: false });
    }
  },

  updateProduct: async (formData) => {
    set({ isCreateProduct: true });
    try {
      const res = await axiosInstance.put(
        `/api/products/${formData._id}`,
        formData
      );

      set((state) => ({
        products: state.products.map((p) =>
          p._id === formData._id ? res.data : p
        ),
      }));

      toast.success("Product updated successfully");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to update product");
    } finally {
      set({ isCreateProduct: false });
    }
  },

  addStock: async (formData) => {
    set({ isAddStock: true });
    try {
      const res = await axiosInstance.put(
        `/api/products/add-stock/${formData._id}`,
        formData
      );

      set((state) => ({
        products: state.products.map((p) =>
          p._id === formData._id ? res.data : p
        ),
      }));
      toast.success("Add Stock successfully");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to add stock");
    } finally {
      set({ isAddStock: false });
    }
  },

  deleteProduct: async (productID) => {
    set({ isProductDelete: true });
    try {
      const res = await axiosInstance.delete(`/api/products/${productID}`);
      await get().getProduct();
      toast.success("Product deleted successfully");
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    } finally {
      set({ isProductDelete: false });
    }
  },
}));
