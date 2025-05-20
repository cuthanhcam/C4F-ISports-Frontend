import type { LoginRegisterProps } from "../constants/login-register";
import { useNavigate } from "react-router-dom";
import React, { useRef, useState } from "react";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { FaRegEyeSlash } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";

const Login = ({
  setShowPageLogin,
  setShowPageRegister,
  setConfirmPage,
}: LoginRegisterProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
    inputRef.current?.focus();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && password) {
      setTimeout(() => {
        setShowPageLogin(false);
        setConfirmPage("");
        navigate("/");
      }, 3000);
    } else {
      alert("Vui lòng nhập email và mật khẩu!");
    }
  };

  const handleRegisterClick = () => {
    setShowPageLogin(false);
    setShowPageRegister(true);
  };

  return (
    <div className="fixed inset-0 bg-black/70 z-50 backdrop-blur-md flex items-center justify-center p-4">
      <div className="mx-auto">
        <div className="w-full max-w-4xl bg-surface-2 rounded-2xl shadow-xl overflow-hidden flex flex-col md:flex-row transform transition-all">
          {/* Image */}
          <div className="hidden md:block w-full md:w-1/2 h-64 md:h-auto bg-surface-1 relative">
            <img
              src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2070&auto=format&fit=crop"
              alt="Background"
              className="w-full h-full object-cover opacity-50"
            />
            <div className="absolute bottom-6 left-6 flex items-center">
              <img src="" alt="Logo" className="w-12 h-12 mr-3" />
              <h2 className="text-2xl font-bold text-surface-on">ISporst</h2>
            </div>
          </div>

          {/* Form */}
          <div className="w-[400px] sm:w-[450px] md:w-1/2 lg:p-12 md:p-14 sm:p-8 p-6 relative">
            {/* Close button */}
            <button
              className="absolute top-4 right-4 text-surface-on hover:text-primary-default transition-colors"
              onClick={() => {
                setShowPageLogin(false);
                setShowPassword(false);
                setConfirmPage("");
              }}
            >
              <IoClose className="text-2xl" />
            </button>

            {/* Title */}
            <div className="items-center mb-4">
              <h1 className="text-2xl mt-6 font-bold text-surface-on">
                Đăng nhập
              </h1>
            </div>

            <div>
              <p className="text-sm sm:text-xs text-surface-onVariant mb-8 sm:mb-6">
                Nếu bạn chưa có tài khoản,{" "}
                <a
                  href="#"
                  onClick={handleRegisterClick}
                  className="text-primary-default text-primary-shade font-bold hover:underline"
                >
                  Đăng ký ngay
                </a>
              </p>
            </div>

            {/* Form */}
            <form className="space-y-4" onSubmit={handleSubmit}>
              {/* Email field */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-surface-on mb-2"
                ></label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2 bg-surface-3 text-white rounded-md border border-outline-default focus:outline-none focus:ring-2 focus:ring-primary-default transition"
                  placeholder="Email"
                />
              </div>

              {/* Password field */}
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-surface-on mb-2"
                ></label>
                <div className="relative">
                  <input
                    id="password"
                    ref={inputRef}
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-2 bg-surface-3 text-white rounded-md border border-outline-default focus:outline-none focus:ring-2 focus:ring-primary-default transition pr-12"
                    placeholder="Mật khẩu"
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white hover:text-primary-default"
                    onClick={handleShowPassword}
                  >
                    {showPassword ? (
                      <MdOutlineRemoveRedEye className="text-xl" />
                    ) : (
                      <FaRegEyeSlash className="text-xl" />
                    )}
                  </button>
                </div>
              </div>

              {/* Forgot password */}
              <div className="flex justify-end">
                <button
                  type="button"
                  className="text-sm text-surface-onVariant hover:underline"
                >
                  Quên mật khẩu?
                </button>
              </div>
            </form>

            <div>
              {/* Submit button */}
              <button
                type="submit"
                className="w-full bg-primary text-surface-variant py-2 px-4 mt-10 rounded-md font-medium hover:bg-primary-shade transition duration-200 shadow-lg"
              >
                Đăng nhập
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
