import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";

const PrivateRoute2 = ({ children }) => {
  // Loader and user
  const { user, loading } = useAuth();

  // Go to clicked route after login
  const location = useLocation();

  if (loading) {
    return <span className="loading loading-spinner loading-lg"></span>;
  }

  if (user?.email) {
    return children;
  }

  // if (user) {
  //   return children;
  // }

  return <Navigate to="/login" state={{ from: location }} replace></Navigate>;
};

export default PrivateRoute2;
