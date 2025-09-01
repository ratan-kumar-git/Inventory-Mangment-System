import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { Loader } from "lucide-react";
import Dashboard from "./page/Dashboard";
import Users from "./page/Users";
import Products from "./page/Products";
import Signup from "./page/Signup";
import Login from "./page/Login";
import Home from "./page/Home";
import ProtectedRoute from "./components/layouts/ProtectedRoute";
import AddProduct from "./page/AddProduct";
import PageNotFound from "./page/PageNotFound";
import { useAuthStore } from "./store/useAuthStore";

import Layout from "./components/layouts/Layout";
import GuestRoute from "./components/layouts/GuestRoute";
import Billing from "./page/Billing";
import BillingHistory from "./page/BillingHistory";

const App = () => {
  const { isCheckingAuth, checkAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth) {
    return (
      <div className="w-full h-screen flex justify-center items-center gap-2 bg-gray-50">
        <Loader className="size-10 animate-spin" />
        <p className="text-lg">Checking authentication...</p>
      </div>
    );
  }

  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* Guest-only routes */}
          <Route element={<GuestRoute />}>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Route>

          {/* Layout */}
          <Route index element={<Home />} />
          <Route path="/" element={<Layout />}>
            

            {/* Protected  */}
            <Route element={<ProtectedRoute />}>
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="products" element={<Products />} />
              <Route path="add-product" element={<AddProduct />} />
              <Route path="staff" element={<Users />} />
              <Route path="billing" element={<Billing />} />
              <Route path="billing-history" element={<BillingHistory />} />
            </Route>
          </Route>

          {/* 404 */}
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
      <Toaster />
    </>
  );
};

export default App;
