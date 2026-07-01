import { Navigate, useLocation } from "react-router";
import { AuthContext } from "../../context/AuthContext";
import { use } from "react";

const PrivetRoute = ({ children }) => {
  const { user, loading } = use(AuthContext);
  const location = useLocation();

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!user) {
    return <Navigate state={location?.pathname} to="/login" />;
  }
  return children;
};

export default PrivetRoute;
