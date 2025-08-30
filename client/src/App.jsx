import React, { useEffect } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Dashboard from "./page/Dashboard";
import Users from "./page/Users";
import Products from "./page/Products";
import Signup from "./page/Signup";
import Login from "./page/Login";
import Home from "./page/Home";
import ProtectedRoute from "./components/layouts/ProtectedRoute";
import { useAuthStore } from "./store/useAuthStore";
import AddProduct from "./page/AddProduct";
import PageNotFound from "./page/PageNotFound";
import { Loader } from "lucide-react";
import Layout from "./components/layouts/Layout";

const App = () => {
  const { authUser, isCheckingAuth, checkAuth } = useAuthStore();

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
          {/* Public routes */}
          <Route
            path="/signup"
            element={authUser ? <Navigate to="/dashboard" /> : <Signup />}
          />
          <Route
            path="/login"
            element={authUser ? <Navigate to="/dashboard" /> : <Login />}
          />

          {/* Protected routes with layout */}
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route
              path="dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="products"
              element={
                <ProtectedRoute>
                  <Products />
                </ProtectedRoute>
              }
            />
            <Route
              path="add-product"
              element={
                <ProtectedRoute>
                  <AddProduct />
                </ProtectedRoute>
              }
            />
            <Route
              path="users"
              element={
                <ProtectedRoute>
                  <Users />
                </ProtectedRoute>
              }
            />
          </Route>
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
      <Toaster />
    </>
  );
};

export default App;
