import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuthStore } from "../../store/useAuthStore";

const GuestRoute = () => {
  const { authUser } = useAuthStore();
  const location = useLocation();

  // If logged in → redirect back where user came from or dashboard
  if (authUser) {
    const redirectTo = location.state?.from?.pathname || "/dashboard";
    return <Navigate to={redirectTo} replace />;
  }

  // Otherwise → allow guest page (login/signup)
  return <Outlet />;
};

export default GuestRoute;
