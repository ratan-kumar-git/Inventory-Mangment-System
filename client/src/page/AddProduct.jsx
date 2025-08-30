import React, { useState } from "react";
import DashboardLayout from "../components/layouts/DashboardLayout";
import InputComponents from "../components/inputs/InputComponents";
import { useProductStore } from "../store/useProductStore";
import { Loader } from "lucide-react";
import toast from "react-hot-toast";
import { useLocation } from "react-router-dom";

const AddProduct = () => {
  const location = useLocation();
  const editProduct = location.state?.product;
  const [formData, setFormData] = useState(
    editProduct || {
      productName: "",
      category: "",
      supplier: "",
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
    // if (!formData.supplier.trim()) return toast.error("Supplier is required");
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
        category: "",
        supplier: "",
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
    <DashboardLayout activeMenu="/add-product">
      <div className="flex-1 w-full ">
        <form
          onSubmit={handleSubmit}
          className="space-y-4 bg-white shadow-md p-6 rounded-lg max-w-lg mx-auto"
        >
          <h2 className="text-xl font-semibold mb-4">{formData._id ? "Edit Product" : "Add Product"}</h2>

          <InputComponents
            label="Product Name"
            labelFor="productName"
            type="text"
            value={formData.productName}
            onChange={(e) =>
              setFormData({ ...formData, productName: e.target.value })
            }
            placeholder="Enter product name"
          />

          {/* <InputComponents
            label="Category ID"
            labelFor="category"
            type="text"
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value})}
            placeholder="Enter category"
          /> */}

          {/* <InputComponents
            label="Supplier ID"
            labelFor="supplier"
            type="text"
            value={formData.supplier}
            onChange={(e) =>
              setFormData({ ...formData, supplier: e.target.value })
            }
            placeholder="Enter supplier id"
          /> */}

          {/* Pricing */}
          <div className="grid grid-cols-3 gap-4">
            <InputComponents
              label="Buy Price"
              labelFor="buyPrice"
              type="number"
              value={formData.buyPrice}
              onChange={(e) =>
                setFormData({ ...formData, buyPrice: e.target.value })
              }
              placeholder="0"
            />
            <InputComponents
              label="Sell Price"
              labelFor="sellPrice"
              type="number"
              value={formData.sellPrice}
              onChange={(e) =>
                setFormData({ ...formData, sellPrice: e.target.value })
              }
              placeholder="0"
            />
            <InputComponents
              label="MRP"
              labelFor="mrp"
              type="number"
              value={formData.mrp}
              onChange={(e) =>
                setFormData({ ...formData, mrp: e.target.value })
              }
              placeholder="0"
            />
          </div>

          {/* Stock */}
          <div className="grid grid-cols-3 gap-4">
            <InputComponents
              label="Stock"
              labelFor="stock"
              type="number"
              value={formData.stock}
              onChange={(e) =>
                setFormData({ ...formData, stock: e.target.value })
              }
              placeholder="0"
            />
            <div>
              <label
                htmlFor="unit"
                className="block text-sm font-medium text-gray-700"
              >
                Unit
              </label>
              <select
                id="unit"
                name="unit"
                value={formData.unit}
                onChange={(e) =>
                  setFormData({ ...formData, unit: e.target.value })
                }
                className="input-box"
              >
                <option value="pcs">pcs</option>
                <option value="kg">kg</option>
                <option value="litre">litre</option>
                <option value="box">box</option>
                <option value="packet">packet</option>
              </select>
            </div>

            <InputComponents
              label="Low Stock"
              labelFor="lowStockLimit"
              type="number"
              value={formData.lowStockLimit}
              onChange={(e) =>
                setFormData({ ...formData, lowStockLimit: e.target.value })
              }
              placeholder="5"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-red-500 to-yellow-400 text-white py-2 px-4 rounded-lg font-medium hover:opacity-90"
          >
            {isCreateProduct ? (
              <>
                <div className="flex items-center justify-center">
                  <Loader className="animate-spin h-8 w-8" />
                </div>
              </>
            ) : (
               formData._id ? "Update Product" : "Save Product"
            )}
          </button>
        </form>
      </div>
    </DashboardLayout>
  );
};

export default AddProduct;
