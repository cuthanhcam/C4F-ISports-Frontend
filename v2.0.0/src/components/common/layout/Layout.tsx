import { useState } from "react";
import Footer from "./Footer";
import Header from "./Header";
import Login from "../../../pages/Login";
import Register from "../../../pages/Register";

interface LayoutProps {
  children?: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [confirmPage, setConfirmPage] = useState("");

  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      <Header setShowLogin={setShowLogin} setShowRegister={setShowRegister} />
      <main className="flex-grow">{children}</main>
      <Footer />

      {showLogin && (
        <div className="fixed inset-0 z-50">
          <Login
            setShowPageLogin={setShowLogin}
            setConfirmPage={setConfirmPage}
            setShowPageRegister={setShowRegister}
          />
        </div>
      )}
      {showRegister && (
        <div className="fixed inset-0 z-50">
          <Register
            setShowPageLogin={setShowLogin}
            setConfirmPage={setConfirmPage}
            setShowPageRegister={setShowRegister}
          />
        </div>
      )}
    </div>
  );
};

export default Layout;
