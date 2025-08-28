import React, { useEffect } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Dashboard from "./page/Dashboard";
import Users from "./page/Users";
import Products from "./page/Products";
import Signup from "./page/Signup";
import Login from "./page/Login";
import Home from "./page/Home";
import ProtectedRoute from "./components/ProtectedRoute";
import { useAuthStore } from "./store/useAuthStore";


const App = () => {
  const { authUser, isCheckingAuth, checkAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth) {
    return <p className="text-center mt-10">Checking authentication...</p>;
  }

  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* auth */}
          <Route
            path="/signup"
            element={!authUser ? <Signup /> : <Navigate to="/dashboard" />}
          />
          <Route
            path="/login"
            element={!authUser ? <Login /> : <Navigate to="/dashboard" />}
          />

          <Route path="/" element={<Home />} />

          {/* protected */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/products"
            element={
              <ProtectedRoute>
                <Products />
              </ProtectedRoute>
            }
          />
          <Route
            path="/users"
            element={
              <ProtectedRoute>
                <Users />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
      <Toaster />
    </>
  );
};

export default App;
