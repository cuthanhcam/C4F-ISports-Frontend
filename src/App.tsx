import { Routes, Route } from "react-router";
import Home from "./Pages/Home.tsx";
import Contact from "./Pages/Contact.tsx";
import Services from "./Pages/Services.tsx";
import Login from "./Pages/Login.tsx";
import Register from "./Pages/Register.tsx";
import FloatingMenu from "./Components/Layout/FloatingMenu.tsx";
import Layout from "./Components/Layout/Layout";
import { useDarkMode } from "./Hooks/useDarkMode.ts";
import Dashboard from "./Pages/Dashboard.tsx";
import BookingPage from "./Pages/BookingPage.tsx";
import VerifyEmail from "./Components/VerifyEmail.tsx";
import ForgotPassword from "./Components/ForgotPassword.tsx";
import ResetPasswordForm from "./Components/ResetPasswordForm.tsx";


const App = () => {

  const { darkMode, setDarkMode } = useDarkMode();

  return (
    <div className="overflow-hidden">
      <Routes>
        {/* Trang chính */}
        <Route path="/" element={<Home />} />
        {/* Auth */}
        <Route path="/contact" element={<Layout><Contact /></Layout>} />
        <Route path="/services" element={<Layout><Services /></Layout>} />
        <Route path="/auth/login" element={<Layout><Login /></Layout>} />
        <Route path="/auth/register" element={<Layout><Register /></Layout>} />
        <Route path="/auth/verify-email" element={<Layout><VerifyEmail /></Layout>} />
        <Route path="/auth/forgot-password" element={<Layout><ForgotPassword /></Layout>} />
        <Route path="/auth/reset-password" element={<Layout><ResetPasswordForm /></Layout>} />
        {/* Trang quản trị viên */}
        <Route path="/dashboard" element={<Layout><Dashboard /></Layout>} />
        {/* Trang người dùng */}
        <Route path="/booking" element={<Layout><BookingPage /></Layout>} />
      </Routes>
      {/* Setting layout */}
      <FloatingMenu darkMode={darkMode} setDarkMode={setDarkMode}/>
    </div>
  );
};

export default App;
