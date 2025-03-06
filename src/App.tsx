import { Routes, Route } from "react-router";
import Home from "./Pages/Home.tsx";
import Contact from "./Pages/Contact.tsx";
import Services from "./Pages/Services.tsx";
import SignUp from "./Pages/SignUp.tsx";
import Register from "./Pages/Register.tsx";
import FloatingMenu from "./Components/Layout/FloatingMenu.tsx";
import Layout from "./Components/Layout/Layout";

const App = () => {
  return (
    <div className="overflow-hidden">
      <Routes>
        <Route path="/" element={<Home />} />

        {/* Các trang khác chỉ cần bọc bởi Layout */}
        <Route path="/contact" element={<Layout><Contact /></Layout>} />
        <Route path="/services" element={<Layout><Services /></Layout>} />
        <Route path="/signup" element={<Layout><SignUp /></Layout>} />
        <Route path="/register" element={<Layout><Register /></Layout>} />
      </Routes>
      <FloatingMenu />
    </div>
  );
};

export default App;
