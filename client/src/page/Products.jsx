import React, { useEffect, useState } from "react";
import { useProductStore } from "../store/useProductStore";
import ContentLoader from "../components/layouts/ContentLoader";
import { Circle, Pencil, Trash2, X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";

const Products = () => {
  const [search, setSearch] = useState("");
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);

  const navigate = useNavigate();
  const {
    isProductLoading,
    isProductDelete,
    getProduct,
    products,
    deleteProduct,
  } = useProductStore();
  const { authUser } = useAuthStore();

  useEffect(() => {
    getProduct();
  }, [getProduct]);

  // Filter products by search
  const filteredProducts = products.filter((p) =>
    (p.productName || "").toLowerCase().includes(search.toLowerCase())
  );

  // loader animation
  if (isProductLoading) {
    return <ContentLoader message="Products Loading..." />;
  }

  const handleClick = (p) => {
    navigate("/add-product", { state: { product: p } });
  };

  // open delete modal
  const openDeleteModal = (product) => {
    setProductToDelete(product);
    setDeleteModalOpen(true);
  };

  // confirm delete
  const confirmDelete = () => {
    if (productToDelete) {
      deleteProduct(productToDelete._id);
    }
    setDeleteModalOpen(false);
    setProductToDelete(null);
  };

  // cancel delete
  const cancelDelete = () => {
    setDeleteModalOpen(false);
    setProductToDelete(null);
  };

  return (
    <div className="flex-1 w-full relative min-h-screen">
      {/* Header */}
      <h1 className="text-2xl font-semibold text-gray-800 mb-4">Products</h1>
      <div className="bg-white shadow-md rounded-lg overflow-auto">
        {/* Search + Actions */}
        <div className="flex flex-col md:flex-row items-center justify-between p-4">
          <div className="w-full md:w-1/2 relative">
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
          {authUser.role === "admin" && (
            <Link
              to="/add-product"
              className="w-full text-center md:w-auto mt-3 md:mt-0 px-4 py-3 text-sm bg-gradient-to-r from-blue-600 to-indigo-600 hover:opacity-90 text-white rounded-lg hover:bg-blue-700"
            >
              Add Product
            </Link>
          )}
        </div>

        {/* Table for md+ screens */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full min-w-[800px] text-sm text-left text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th className="px-4 py-3">SN</th>
                <th className="px-4 py-3">Product name</th>
                <th className="px-4 py-3">Buy Price</th>
                <th className="px-4 py-3">Sell Price</th>
                <th className="px-4 py-3">MRP</th>
                <th className="px-4 py-3">Quantity</th>
                <th className="px-4 py-3">Min Qty</th>
                {authUser.role === "admin" && (
                  <>
                    <th className="px-4 py-3">Edit</th>
                    <th className="px-4 py-3">Delete</th>
                  </>
                )}
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((p, index) => (
                <tr key={p._id} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium text-gray-900">
                    {index + 1}
                  </td>
                  <td className="px-4 py-3 font-medium text-nowrap text-gray-900">
                    {p.productName}
                  </td>
                  <td className="px-4 py-3">₹{p.buyPrice}</td>
                  <td className="px-4 py-3">₹{p.sellPrice}</td>
                  <td className="px-4 py-3">₹{p.mrp}</td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2 items-center">
                      <Circle
                        className={`h-4 w-4 rounded-full ${
                          p.stock >= p.lowStockLimit
                            ? "bg-green-500 text-green-500"
                            : "bg-red-500 text-red-500"
                        }`}
                      />
                      {p.stock} {p.unit}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    {p.lowStockLimit} {p.unit}
                  </td>
                  {authUser.role === "admin" && (
                    <>
                      <td className="px-4 py-3">
                        <button
                          onClick={() => handleClick(p)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                        >
                          <Pencil className="w-4 h-4" />
                        </button>
                      </td>
                      <td className="px-4 py-3">
                        <button
                          onClick={() => openDeleteModal(p)}
                          disabled={isProductDelete}
                          className={`p-2 text-red-600 rounded-lg hover:bg-red-50 ${
                            isProductDelete
                              ? "opacity-50 cursor-not-allowed"
                              : ""
                          }`}
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </>
                  )}
                </tr>
              ))}
              {filteredProducts.length === 0 && (
                <tr>
                  <td colSpan="10" className="text-center py-6 text-gray-500">
                    No products found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Cards for mobile */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:hidden p-4">
          {filteredProducts.map((p) => (
            <div
              key={p._id}
              className="bg-white shadow-sm rounded-xl border border-gray-100 p-4 hover:shadow-md transition-all"
            >
              <div className="flex justify-between items-start">
                <h3 className="flex gap-2 items-center text-lg font-semibold text-gray-800">
                  {p.productName}
                </h3>
                {authUser.role === "admin" && (
                  <div className="flex items-center gap-2">
                    {/* edit button */}
                    <button
                      onClick={() => handleClick(p)}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                    >
                      <Pencil className="w-4 h-4" />
                    </button>
                    {/* delete button */}
                    <button
                      onClick={() => openDeleteModal(p)}
                      disabled={isProductDelete}
                      className={`p-2 text-red-600 rounded-lg hover:bg-red-50 ${
                        isProductDelete ? "opacity-50 cursor-not-allowed" : ""
                      }`}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>
              <div className="mt-2 grid grid-cols-2 gap-y-2 text-sm text-gray-600">
                <p>
                  <span className="font-medium">Buy:</span> ₹{p.buyPrice}
                </p>
                <p className="flex items-center gap-2">
                  <span className="font-medium">Indicator:</span>{" "}
                  <Circle
                    className={`h-3 w-3 rounded-full ${
                      p.stock >= p.lowStockLimit
                        ? "bg-green-500 text-green-500"
                        : "bg-red-500 text-red-500"
                    }`}
                  />
                </p>
                <p>
                  <span className="font-medium">Sell:</span> ₹{p.sellPrice}
                </p>
                <p>
                  <span className="font-medium">Qty:</span> {p.stock} {p.unit}
                </p>
                <p>
                  <span className="font-medium">MRP:</span> ₹{p.mrp}
                </p>
                <p>
                  <span className="font-medium">Min Qty:</span>{" "}
                  {p.lowStockLimit} {p.unit}
                </p>
              </div>
            </div>
          ))}
          {filteredProducts.length === 0 && (
            <p className="col-span-full text-center text-gray-500">
              No products found.
            </p>
          )}
        </div>

        {/* Delete Confirmation Modal */}
        {deleteModalOpen && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-6 m-5">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-gray-800">
                  Confirm Delete
                </h2>
                <button
                  onClick={cancelDelete}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <p className="text-gray-600 mb-6">
                Are you sure you want to delete{" "}
                <span className="font-medium">
                  {productToDelete?.productName}
                </span>
                ?
              </p>
              <div className="flex justify-end gap-3">
                <button
                  onClick={cancelDelete}
                  className="px-4 py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmDelete}
                  disabled={isProductDelete}
                  className={`px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 ${
                    isProductDelete ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                >
                  {isProductDelete ? "Deleting..." : "Delete"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;
