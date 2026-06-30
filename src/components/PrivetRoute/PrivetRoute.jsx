import useAuth from "../hooks/useAuth";
import { Navigate, useLocation } from "react-router";
// import Loder from "../components/Loder/Loder";

const PrivetRoute = ({ children }) => {
  const { user, loading } = useAuth();
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
