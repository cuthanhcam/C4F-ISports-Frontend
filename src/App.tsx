import { Routes, Route } from "react-router";
import Home from "./Pages/Home.tsx";
import Contact from "./Pages/Contact.tsx";
import Services from "./Pages/Services.tsx";
import SignIn from "./Pages/SignIn.tsx";
import Register from "./Pages/Register.tsx";
import FloatingMenu from "./Components/Layout/FloatingMenu.tsx";
import Layout from "./Components/Layout/Layout";
import { useDarkMode } from "./Hooks/useDarkMode.ts";
import { AuthProvider } from "./Hooks/useAuth.ts";


const App = () => {

  const { darkMode, setDarkMode } = useDarkMode();

  return (
    <div className="overflow-hidden">
      <Routes>
        <Route path="/" element={<Home />} />
        {/* Các trang khác chỉ cần bọc bởi Layout */}
        <Route path="/contact" element={<Layout><Contact /></Layout>} />
        <Route path="/services" element={<Layout><Services /></Layout>} />
        <Route path="/signup" element={<Layout><SignIn /></Layout>} />
        <Route path="/register" element={<Layout><Register /></Layout>} />
      </Routes>
      <FloatingMenu darkMode={darkMode} setDarkMode={setDarkMode}/>
    </div>
  );
};

export default App;
