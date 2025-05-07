import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  const token = localStorage.getItem("accessToken"); // Kiểm tra token
  return token ? <Outlet /> : <Navigate to="/users/profile" replace />;
};
  
export default PrivateRoute;