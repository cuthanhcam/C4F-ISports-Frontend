import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";

type PrivateRouteProps = {
  children: ReactNode;
};

const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/auth/login" replace />;
};

export default PrivateRoute;
