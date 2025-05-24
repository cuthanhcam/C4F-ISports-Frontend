
import { useLocation } from "react-router";
import Footer from "./Footer";
import Header from "./Header";
import Login from "../../../pages/auth/Login";
import Register from "../../../pages/auth/Register";
import ForgotPassword from "../../../pages/auth/ForgotPassword";
import ResetPassword from "../../../pages/auth/ResetPassword";
interface LayoutProps {
  children?: React.ReactNode;
}
const Layout = ({ children }: LayoutProps) => {
  const location = useLocation();
  console.log(location.pathname);
  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      <Header/>
      <main className="flex-grow">{children}</main>
      <Footer />

      {/* Mount Login */}
      {location.pathname === '/auth/login' && (
        <div className="fixed inset-0 z-50  backdrop-blur-sm bg-surface/30">
          <Login/>
        </div>
      )}
      {/* Mount Register */}
      {location.pathname === '/auth/register' && (
        <div className="fixed inset-0 z-50 backdrop-blur-sm bg-surface/30">
          <Register/>
        </div>
      )}
      {/* Mont Forgot password */}
      {location.pathname === '/auth/fforgot-password' && (
        <div className="fixed inset-0 z-50 backdrop-blur-sm bg-surface/30">
          <ForgotPassword/>
        </div>
      )}
      {/* Mount Reset password */}
      {location.pathname === '/auth/reset-password' && (
        <div className="fixed inset-0 z-50 backdrop-blur-sm bg-surface/30">
          <ResetPassword/>
        </div>
      )}
    </div>
  );
};

export default Layout;
