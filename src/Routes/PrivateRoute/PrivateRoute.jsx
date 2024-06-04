import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";
import useAdmin from "../../Hooks/useAdmin";
import useModerator from "../../Hooks/useModerator";

const PrivateRoute = ({ children }) => {
  // Loader and user
  const { user, loading } = useAuth();
  const [isAdmin, isAdminLoading] = useAdmin();
  const [isModerator, isModeratorLoading] = useModerator();

  // Go to clicked route after login
  const location = useLocation();

  if (loading || isAdminLoading || isModeratorLoading) {
    return <span className="loading loading-spinner loading-lg"></span>;
  }

  // if (user?.email) {
  //   return children;
  // }

  // if (user) {
  //   return children;
  // }

  if (user && !isAdmin && !isModerator) {
    return children;
  }

  return <Navigate to="/" state={{ from: location }} replace></Navigate>;
};

export default PrivateRoute;
