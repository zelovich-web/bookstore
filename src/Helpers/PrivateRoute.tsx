import { Navigate, Outlet, useLocation } from "react-router-dom";
import useAuth from "./useAuth";

export const PrivateRoute = () => {

  const { isAuthenticated } = useAuth()

  const location = useLocation()

  return (
    isAuthenticated === true ?
      <Outlet />
      :
      <Navigate to="/login" state={{ from: location }} replace />
  )
};

export default PrivateRoute;
