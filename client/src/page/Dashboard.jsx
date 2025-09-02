import React, { useEffect } from "react";
import { AlertTriangle, Package, ShoppingCart, TrendingUp } from "lucide-react";
import ContentLoader from "../components/layouts/ContentLoader";
import { useDashboardStore } from "../store/useDashboardStore";
import AddStock from "../components/AddStock";

const Dashboard = () => {
  const { stats, getDashboard, loading } = useDashboardStore();

  useEffect(() => {
    getDashboard();
  }, [getDashboard]);

  if (loading) return <ContentLoader message="Dashboard data loading..." />;

  return (
    <div className="flex-1 w-full relative min-h-screen">
      {/* Header */}
      <h1 className="text-2xl font-semibold text-gray-800 mb-4">
        Inventory Dashboard
      </h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white shadow-md rounded-2xl p-5 flex items-center gap-4">
          <Package className="text-blue-600 w-10 h-10" />
          <div>
            <p className="text-sm text-gray-500">Total Products</p>
            <h2 className="text-2xl font-bold text-gray-800">
              {stats.totalProducts}
            </h2>
          </div>
        </div>
        <div className="bg-white shadow-md rounded-2xl p-5 flex items-center gap-4">
          <ShoppingCart className="text-green-600 w-10 h-10" />
          <div>
            <p className="text-sm text-gray-500">Total Sales</p>
            <h2 className="text-2xl font-bold text-gray-800">
              ₹{stats.totalSales}
            </h2>
          </div>
        </div>
        {/* Today's Sales */}
        <div className="bg-white shadow-md rounded-2xl p-5 flex items-center gap-4">
          <TrendingUp className="text-purple-600 w-10 h-10" />
          <div>
            <p className="text-sm text-gray-500">Today's Sales</p>
            <h2 className="text-2xl font-bold text-gray-800">
              ₹{stats.todaySales}
            </h2>
          </div>
        </div>
        <div className="bg-white shadow-md rounded-2xl p-5 flex items-center gap-4">
          <AlertTriangle className="text-red-600 w-10 h-10" />
          <div>
            <p className="text-sm text-gray-500">Low Stock Items</p>
            <h2 className="text-2xl font-bold text-gray-800">
              {stats.lowStockCount}
            </h2>
          </div>
        </div>
      </div>

      {/* Add Stock + Low Stock Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Add stock */}
        <AddStock />

        {/* Low Stock Alerts */}
        <div className="bg-white max-h-80 shadow-md rounded-2xl p-6 overflow-y-auto">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">
            Low Stock Alerts
          </h2>
          <ul className="space-y-3">
            {stats.lowStockItems.length > 0 ? (
              stats.lowStockItems.map((item) => (
                <li className="flex justify-between items-center p-3 bg-red-50 rounded-xl">
                  <span className="text-gray-700">{item.productName}</span>
                  <span className="text-red-600 font-semibold">
                    Only {item.stock} left
                  </span>
                </li>
              ))
            ) : (
              <li className="flex justify-between items-center p-3 bg-red-50 rounded-xl">
                <span className="text-gray-700">No Product Found</span>
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
