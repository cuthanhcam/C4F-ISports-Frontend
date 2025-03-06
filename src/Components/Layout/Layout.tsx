import useHeader from "../../Hooks/header";
import { Header, Footer } from "./index";

const Layout = ({ children }: { children?: React.ReactNode }) => {
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
