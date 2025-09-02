import React, { useState } from "react";
import {
  Boxes,
  IndianRupee,
  Loader,
  Package,
  TrendingDown,
} from "lucide-react";
import toast from "react-hot-toast";
import { useLocation } from "react-router-dom";
import Input from "../components/inputs/Input";
import { useProductStore } from "../store/useProductStore";

const AddProduct = () => {
  const location = useLocation();
  const editProduct = location.state?.product;
  const [formData, setFormData] = useState(
    editProduct || {
      productName: "",
      buyPrice: "",
      sellPrice: "",
      mrp: "",
      stock: "",
      unit: "pcs",
      lowStockLimit: "",
    }
  );

  const { createProduct, isCreateProduct, updateProduct } = useProductStore();

  const validateForm = () => {
    if (!formData.productName.trim())
      return toast.error("Product name is required");
    if (!formData.buyPrice) return toast.error("Buy Price is required");
    if (!formData.sellPrice) return toast.error("Sell Price is required");
    if (!formData.mrp) return toast.error("MRP is required");
    if (!formData.stock) return toast.error("Stock is required");
    if (!formData.lowStockLimit)
      return toast.error("Low Stock Limit is required");
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const success = validateForm();
    if (success === true) {
      if (formData._id) {
        // update
        updateProduct(formData);
      } else {
        // create
        createProduct(formData);
      }
      setFormData({
        productName: "",
        buyPrice: "",
        sellPrice: "",
        mrp: "",
        stock: "",
        unit: "pcs",
        lowStockLimit: "",
      });
    }
  };
  return (
    <div className="flex-1 w-full relative">
      {/* Header */}
      <h1 className="text-2xl font-semibold text-gray-800 mb-4">
        {formData._id ? "Edit Product" : "Add Product"}
      </h1>
      <form
        onSubmit={handleSubmit}
        className="space-y-4 bg-white shadow-md p-6 rounded-lg mx-auto"
      >
        <h2 className="text-xl font-semibold mb-4">
          {formData._id ? "Edit Product" : "Add Product"}
        </h2>

        {/* product name */}
        <Input
          label="Product Name"
          labelFor="productName"
          icon={Package}
          type="text"
          value={formData.productName}
          onChange={(e) =>
            setFormData({ ...formData, productName: e.target.value })
          }
          placeholder="Enter product name"
        />

        {/* Pricing */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <Input
            label="Buy Price"
            labelFor="buyPrice"
            icon={IndianRupee}
            type="number"
            value={formData.buyPrice}
            onChange={(e) =>
              setFormData({ ...formData, buyPrice: e.target.value })
            }
            placeholder="0"
          />
          <Input
            label="Sell Price"
            labelFor="sellPrice"
            icon={IndianRupee}
            type="number"
            value={formData.sellPrice}
            onChange={(e) =>
              setFormData({ ...formData, sellPrice: e.target.value })
            }
            placeholder="0"
          />
          <div className="col-span-3 md:col-span-1">
            <Input
              label="MRP"
              labelFor="mrp"
              icon={IndianRupee}
              type="number"
              value={formData.mrp}
              onChange={(e) =>
                setFormData({ ...formData, mrp: e.target.value })
              }
              placeholder="0"
            />
          </div>
        </div>

        {/* Stock */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <Input
            label="Stock"
            labelFor="stock"
            icon={Boxes}
            type="text"
            value={formData.stock}
            onChange={(e) =>
              setFormData({
                ...formData,
                stock: e.target.value.replace(/\D/g, ""),
              })
            }
            placeholder="0"
          />

          <Input
            label="Low Stock"
            labelFor="lowStockLimit"
            icon={TrendingDown}
            type="text"
            value={formData.lowStockLimit}
            onChange={(e) =>
              setFormData({
                ...formData,
                lowStockLimit: e.target.value.replace(/\D/g, ""),
              })
            }
            placeholder="5"
          />

          <div className="col-span-3 md:col-span-1">
            <label
              htmlFor="unit"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Unit
            </label>
            <div className="relative">
              <select
                id="unit"
                name="unit"
                value={formData.unit}
                onChange={(e) =>
                  setFormData({ ...formData, unit: e.target.value })
                }
                className="block w-full pl-3 pr-3 py-3 border border-gray-300 rounded-lg 
                 focus:ring-2 focus:ring-blue-500 focus:border-transparent 
                 transition-all duration-200 bg-white/50"
              >
                <option value="pcs">pcs</option>
                <option value="kg">kg</option>
                <option value="litre">litre</option>
                <option value="box">box</option>
                <option value="packet">packet</option>
              </select>
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="py-2 px-4 w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:opacity-95 text-white rounded-lg font-semibold"
        >
          {isCreateProduct ? (
            <>
              <div className="flex items-center justify-center">
                <Loader className="animate-spin h-8 w-8" />
              </div>
            </>
          ) : formData._id ? (
            "Update Product"
          ) : (
            "Add Product"
          )}
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
