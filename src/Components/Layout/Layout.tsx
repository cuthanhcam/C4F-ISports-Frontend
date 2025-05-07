import React from "react";
import useHeader from "../../Hooks/header";
import { Header, Footer } from "./index";

interface LayoutProps {
  children?: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { isLogin, setIsLogin } = useHeader();

  return (
    <div>
      <Header isLogin={isLogin} setIsLogin={setIsLogin} />
      {children} {/* Phần nội dung của từng trang */}
      <Footer />
    </div>
  );
};

export default Layout;
