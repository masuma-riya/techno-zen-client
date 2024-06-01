import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";
import useModerator from "../../Hooks/useModerator";

const ModeratorRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const [isModerator, isModeratorLoading] = useModerator();
  const location = useLocation();
  if (loading || isModeratorLoading) {
    return <span className="loading loading-spinner loading-lg"></span>;
  }

  if (user && isModerator) {
    return children;
  }

  return <Navigate to="/" state={{ from: location }} replace></Navigate>;
};

export default ModeratorRoute;
