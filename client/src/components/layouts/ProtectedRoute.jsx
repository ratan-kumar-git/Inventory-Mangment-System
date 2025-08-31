import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuthStore } from "../../store/useAuthStore";

const ProtectedRoute = () => {
  const { authUser } = useAuthStore();
  const location = useLocation();

  // If no authenticated user, redirect to login page
  if (!authUser) return <Navigate to="/login" replace state={{ from: location }}/>

  //  allow authenticated user
  return <Outlet />;
};

export default ProtectedRoute;
