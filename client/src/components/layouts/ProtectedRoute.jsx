import { Navigate } from "react-router-dom";
import { useAuthStore } from "../../store/useAuthStore";

const ProtectedRoute = ({children}) => {
  const { authUser, isCheckingAuth } = useAuthStore();

    if (isCheckingAuth) {
    return (
      <div className="w-full h-screen flex justify-center items-center gap-2 bg-gray-50">
        <Loader className="size-10 animate-spin" />
        <p className="text-lg">Checking authentication...</p>
      </div>
    );
  }

  return authUser ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
