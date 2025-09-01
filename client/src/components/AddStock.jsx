import React, { useEffect, useState } from "react";
import axios from "axios";
import { useProductStore } from "../store/useProductStore";

const AddStock = () => {
  const [selectedProduct, setSelectedProduct] = useState("");
  const [quantity, setQuantity] = useState("");
  const { getProduct, products  } = useProductStore()

  // Fetch product list
  useEffect(() => {
    getProduct()
  }, []);

  // Handle stock update
  const handleAddStock = async (e) => {
    e.preventDefault();
    if (!selectedProduct || !quantity) return;

    try {
      await axios.put(`/api/products/${selectedProduct}/add-stock`, {
        quantity: Number(quantity),
      });

      alert("Stock updated successfully!");
      setQuantity("");
      setSelectedProduct("");
    } catch (error) {
      console.error("Error updating stock:", error);
      alert("Failed to update stock");
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-lg font-semibold mb-4">Add Stock</h2>
      <form onSubmit={handleAddStock} className="space-y-4">
        {/* Select Product */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Product
          </label>
          <select
            value={selectedProduct}
            onChange={(e) => setSelectedProduct(e.target.value)}
            className="block w-full pl-3 pr-3 py-3 border border-gray-300 rounded-lg 
                       focus:ring-2 focus:ring-blue-500 focus:border-transparent 
                       transition-all duration-200 bg-white/50"
          >
            <option value="">Select a product</option>
            {products.map((p) => (
              <option key={p._id} value={p._id}>
                {p.productName} ({p.stock} {p.unit} in stock)
              </option>
            ))}
          </select>
        </div>

        {/* Quantity Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Quantity to Add
          </label>
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            className="block w-full pl-3 pr-3 py-3 border border-gray-300 rounded-lg 
                       focus:ring-2 focus:ring-blue-500 focus:border-transparent 
                       transition-all duration-200 bg-white/50"
            placeholder="Enter quantity"
            min="1"
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 
                     focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-blue-500"
        >
          Update Stock
        </button>
      </form>
    </div>
  );
};

export default AddStock;
