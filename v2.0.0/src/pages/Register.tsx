import type { LoginRegisterProps } from "../constants/login-register";
import React, { useRef, useState } from "react";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { FaRegEyeSlash } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";

const Register = ({
  setShowPageLogin,
  setShowPageRegister,
  setConfirmPage,
}: LoginRegisterProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("User");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
    inputRef.current?.focus();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && password && confirmPassword && role) {
      if (password !== confirmPassword) {
        alert("Mật khẩu và xác nhận mật khẩu không khớp!");
        return;
      }
      setTimeout(() => {
        setShowPageLogin(false);
        setShowPageRegister(false);
        setConfirmPage("");
      }, 3000);
    } else {
      alert("Vui lòng điền đầy đủ thông tin!");
    }
  };

  const handleLoginClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setShowPageRegister(false);
    setShowPageLogin(true);
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
                setShowPageRegister(false);
                setShowPassword(false);
                setConfirmPage("");
              }}
            >
              <IoClose className="text-2xl" />
            </button>

            {/* Title */}
            <div className="items-center mb-4">
              <h1 className="text-2xl mt-6 font-bold text-surface-on">
                Đăng ký
              </h1>
            </div>

            <div>
              <p className="text-sm sm:text-xs text-surface-onVariant mb-8 sm:mb-6">
                Bạn đã có tài khoản?{" "}
                <a
                  href="#"
                  onClick={handleLoginClick}
                  className="text-primary-default text-primary-shade font-bold hover:underline"
                >
                  Đăng nhập ngay
                </a>
              </p>
            </div>

            {/* Form */}
            <form className="space-y-4" onSubmit={handleSubmit}>
              {/* Tên hiển thị */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm sm:text-xs font-medium text-surface-on mb-2 sm:mb-1"
                ></label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2 bg-surface-3 text-white rounded-md border border-outline-default focus:outline-none focus:ring-2 focus:ring-primary-default transition"
                  placeholder="Tên hiển thị"
                />
              </div>
              {/* Email */}
              <div>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2 bg-surface-3 text-white rounded-md border border-outline-default focus:outline-none focus:ring-2 focus:ring-primary-default transition"
                  placeholder="Email"
                />
              </div>

              {/* Password */}
              <div>
                <div className="relative">
                  <input
                    id="password"
                    ref={inputRef}
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-2 pr-12 bg-surface-3 text-white rounded-md border border-outline-default focus:outline-none focus:ring-2 focus:ring-primary-default transition"
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

              {/* Confirm Password */}
              <div>
                <input
                  type={showPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-4 py-2 bg-surface-3 text-white rounded-md border border-outline-default focus:outline-none focus:ring-2 focus:ring-primary-default transition"
                  placeholder="Xác nhận mật khẩu"
                />
              </div>

              {/* Role field */}
              <div>
                <label
                  htmlFor="role"
                  className="block text-sm sm:text-xs font-medium text-surface-on mb-2 sm:mb-1"
                ></label>
                <select
                  id="role"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full px-4 py-2 bg-surface-3 text-white rounded-md border border-outline-default focus:outline-none focus:ring-2 focus:ring-primary-default transition"
                ></select>
              </div>

              {/* Forgot password */}
              <div className="flex justify-end">
                <button
                  type="button"
                  className="text-sm sm:text-xs text-surface-onVariant hover:underline"
                ></button>
              </div>
            </form>

            {/* Submit button */}
            <div>
              <button
                type="submit"
                onClick={handleSubmit}
                className="w-full bg-primary text-surface-variant py-2 px-4 mt-10 rounded-md font-medium hover:bg-primary-shade transition duration-200 shadow-lg"
              >
                Đăng ký
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
