import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  const token = localStorage.getItem("accessToken"); // Kiểm tra token
  return token ? <Outlet /> : <Navigate to="/auth/booking" replace />;
};
  
export default PrivateRoute;