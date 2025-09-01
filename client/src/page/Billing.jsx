import React, { useEffect, useState } from "react";
import { Loader, Plus, X } from "lucide-react";
import toast from "react-hot-toast";
import dayjs from 'dayjs';
import { useProductStore } from "../store/useProductStore";
import { useBillingStore } from "../store/useBillingStore";


const Billing = () => {
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const { getProduct, products } = useProductStore();
  const { createBill, isCreateBill } = useBillingStore();

  const [formData, setFormData] = useState({
    customer: {
      cName: "",
      cContact: "",
      cAddress: "",
    },
    products: [],
    totalAmount: 0,
  });

  useEffect(() => {
    getProduct();
  }, [getProduct]);

  // Filter products by search
  const filteredProducts = products.filter((p) =>
    (p.productName || "").toLowerCase().includes(search.toLowerCase())
  );

  const date = new Date().toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  // Add product to cart
  const onAddProduct = (product) => {
    setFormData((prev) => {
      const exists = prev.products.find((p) => p.productId === product._id);
      let updatedProducts;

      if (exists) {
        updatedProducts = prev.products.map((p) =>
          p.productId === product._id
            ? {
                ...p,
                quantity: p.quantity + 1,
                subtotal: (p.quantity + 1) * p.sellPrice,
              }
            : p
        );
      } else {
        updatedProducts = [
          ...prev.products,
          {
            productId: product._id,
            productName: product.productName,
            buyPrice: product.buyPrice,
            sellPrice: product.sellPrice,
            quantity: 1,
            unit: product.unit,
            subtotal: product.sellPrice,
          },
        ];
      }

      return {
        ...prev,
        products: updatedProducts,
        totalAmount: updatedProducts.reduce((sum, p) => sum + p.subtotal, 0),
      };
    });
    setShowModal(false);
  };

  // Update quantity
  const updateQty = (productId, qty) => {
    setFormData((prev) => {
      let updatedProducts;
      if (qty < 1) {
        updatedProducts = prev.products.filter(
          (p) => p.productId !== productId
        );
      } else {
        updatedProducts = prev.products.map((p) =>
          p.productId === productId
            ? { ...p, quantity: qty, subtotal: qty * p.sellPrice }
            : p
        );
      }
      return {
        ...prev,
        products: updatedProducts,
        totalAmount: updatedProducts.reduce((sum, p) => sum + p.subtotal, 0),
      };
    });
  };

  // Remove product
  const removeItem = (productId) => {
    setFormData((prev) => {
      const updatedProducts = prev.products.filter(
        (p) => p.productId !== productId
      );
      return {
        ...prev,
        products: updatedProducts,
        totalAmount: updatedProducts.reduce((sum, p) => sum + p.subtotal, 0),
      };
    });
  };

  const validateForm = () => {
    if (!formData.customer.cName.trim())
      return toast.error("Customer name is required");
    if (!formData.customer.cContact) return toast.error("Contact No. is required");
    if (!formData.customer.cAddress) return toast.error("Customer address is required");
    if (formData.products == 0) return toast.error("At least one product is required");
    return true;
  };

  const handleSubmit = () => {
    const success = validateForm();
    if (success === true) {
      createBill(formData);
      setFormData({
        customer: {
          cName: "",
          cContact: "",
          cAddress: "",
        },
        products: [],
        totalAmount: 0,
      });
    }
  };

  return (
    <div className="flex-1 w-full min-h-screen relative">
      {/* Header */}
      <h1 className="text-2xl font-semibold text-gray-800 mb-4">
        Billing
      </h1>
      <div className="bg-white rounded-2xl shadow-md p-6 mx-auto">
        {/* Header */}
        <h1 className="text-center text-xl font-bold mb-6">Billing</h1>

        {/* Customer Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-sm font-medium">Customer Name</label>
            <input
              type="text"
              value={formData.customer.cName}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  customer: { ...formData.customer, cName: e.target.value },
                })
              }
              className="w-full mt-1 border rounded-lg px-3 py-2"
              placeholder="Enter customer name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Phone No.</label>
            <input
              type="text"
              value={formData.customer.cContact}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  customer: { ...formData.customer, cContact: e.target.value },
                })
              }
              className="w-full mt-1 border rounded-lg px-3 py-2"
              placeholder="Enter phone number"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium">Address</label>
            <input
              type="text"
              value={formData.customer.cAddress}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  customer: { ...formData.customer, cAddress: e.target.value },
                })
              }
              className="w-full mt-1 border rounded-lg px-3 py-2"
              placeholder="Enter address"
            />
          </div>
        </div>

        {/* Date */}
        <div className="text-right mb-4 text-sm text-gray-600">
          Date: {dayjs(new Date()).format("DD MMM YYYY")}
        </div>

        {/* Add Product Button */}
        <button
          onClick={() => setShowModal(true)}
          className="mb-4 px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:scale-105 text-white rounded-lg"
        >
          + Add Product
        </button>

        {/* Products Table */}
        <div className="overflow-y-auto overflow-x-auto max-h-80 border rounded-lg">
          <table className="w-full text-sm text-left border-collapse">
            <thead className="bg-gray-200">
              <tr>
                <th className="py-2 px-3 text-nowrap">SNO.</th>
                <th className="py-2 px-3 text-nowrap">PRODUCT NAME</th>
                <th className="py-2 px-3 text-nowrap">QUANTITY</th>
                <th className="py-2 px-3 text-nowrap">MRP</th>
                <th className="py-2 px-3 text-nowrap">SELL PRICE</th>
                <th className="py-2 px-3 text-nowrap">UNIT</th>
                <th className="py-2 px-3 text-nowrap">TOTAL</th>
                <th className="py-2 px-3 text-nowrap">REMOVE</th>
              </tr>
            </thead>
            <tbody>
              {formData.products.map((item, i) => (
                <tr key={item.productId} className="border-b">
                  <td className="py-2 px-3">{i + 1}</td>
                  <td className="py-2 px-3">{item.productName}</td>
                  <td className="py-2 px-3 flex items-center gap-2">
                    <button
                      onClick={() =>
                        updateQty(item.productId, item.quantity - 1)
                      }
                      className="px-2 py-1 bg-gray-200 rounded"
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      onClick={() =>
                        updateQty(item.productId, item.quantity + 1)
                      }
                      className="px-2 py-1 bg-gray-200 rounded"
                    >
                      +
                    </button>
                  </td>
                  <td className="py-2 px-3">{item.buyPrice}</td>
                  <td className="py-2 px-3">{item.sellPrice}</td>
                  <td className="py-2 px-3">{item.unit}</td>
                  <td className="py-2 px-3">{item.subtotal.toFixed(2)}</td>
                  <td className="py-2 px-3 text-red-500 cursor-pointer">
                    <button onClick={() => removeItem(item.productId)}>
                      ✕
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Total */}
        <div className="mt-4 text-right space-y-2">
          <p className="font-semibold text-lg">
            Grand Total: ₹{formData.totalAmount.toFixed(2)}
          </p>
        </div>

        {/* Create Bill */}
        <button
          type="submit"
          onClick={handleSubmit}
          className="mt-6 w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:opacity-95 text-white rounded-lg font-semibold"
        >
          { isCreateBill ? (
            <>
              <div className="flex items-center justify-center gap-2">
                <Loader className="animate-spin h-5 w-5" /> Creating bill...
              </div>
            </>
          ) : "Create Bill"}
        </button>
      </div>

      {/* Product Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-3xl rounded-2xl shadow-lg p-6 m-5">
            {/* Header */}
            <div className="flex justify-between items-center border-b pb-3">
              <h2 className="text-xl font-semibold text-gray-800">
                Product List
              </h2>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Search */}
            <div className="mt-4 mb-2">
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search product"
                className="w-full px-4 py-3 text-sm border rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {search && (
                <button
                  onClick={() => setSearch("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>

            {/* Table */}
            <div className="overflow-y-auto overflow-x-auto max-h-80 border rounded-lg">
              <table className="w-full text-left border-collapse">
                <thead className="bg-gray-100 text-gray-700">
                  <tr>
                    <th className="px-4 py-2 border text-nowrap">SNO</th>
                    <th className="px-4 py-2 border text-nowrap">ADD</th>
                    <th className="px-4 py-2 border text-nowrap">
                      PRODUCT NAME
                    </th>
                    <th className="px-4 py-2 border text-nowrap">SELL PRICE</th>
                    <th className="px-4 py-2 border text-nowrap">STOCK</th>
                    <th className="px-4 py-2 border text-nowrap">UNIT</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProducts.map((product, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-4 py-2 border">{index + 1}</td>
                      <td className="px-4 py-2 border text-blue-600">
                        <button
                          onClick={() => onAddProduct(product)}
                          className="hover:text-blue-800"
                        >
                          <Plus className="w-5 h-5" />
                        </button>
                      </td>
                      <td className="px-4 py-2 border">
                        {product.productName}
                      </td>
                      <td className="px-4 py-2 border">{product.sellPrice}</td>
                      <td className="px-4 py-2 border">{product.stock}</td>
                      <td className="px-4 py-2 border">{product.unit}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Billing;
