import { useEffect, useState } from "react";
import { NavbarMenu } from "../../../constants/navbarMenu";
import LogoImage from "../../../assets/images/LogoC4F.png";
import { HiOutlineTranslate } from "react-icons/hi";
import { IoMdMoon, IoMdSunny } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosNotificationsOutline } from "react-icons/io";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@headlessui/react";
import MenuMobile from "../../ui/MenuMobile";
import { motion, AnimatePresence } from "framer-motion";
import { FiUser } from "react-icons/fi";
import { userAPI } from "../../../api/user.api";
import { FaRegHeart } from "react-icons/fa";
import { IoLogOutOutline } from "react-icons/io5";
import { authAPI } from "../../../api/auth.api";


const Header = () => {
  // Check if user is authenticated
  const token = localStorage.getItem("token");
  const [userName, setUserName] = useState<string>('');
  // Lấy dữ tên người dùng
  const fetchUserProfile = async () => {
    try {
      const res = await userAPI.getUserProfile();
      if (res?.data?.fullName) {
        setUserName(res.data.fullName);
      }
    } catch (error) {
      console.error("Lỗi khi lấy thông tin user:", error);
    }
  };

  // Đăng xuất
  const handleLogout = async () => {
    try {
      await authAPI.logout(); 
      
      // Xoá token lưu trong localStorage
      localStorage.removeItem("token");

      // Reset thông tin người dùng trong state
      setUserName('');

      // Điều hướng về trang chủ
      navigate('/');
    } catch (err) {
      console.error('Lỗi khi đăng xuất:', err);
    }
  };


  // Fetch user profile when component mounts
  useEffect(() => {
    fetchUserProfile();
  }, [])


  // Dark mode state
  const [isOpenDarkMode, setIsOpenDarkMode] = useState<boolean | null>(false);

  const navigate = useNavigate();
  const location = useLocation();
  // Handle close hamburger menu
  const [isOpen, setIsOpen] = useState<boolean | null>(false);
  return (
    <header className="bg-surface-2 z-[100] fixed top-0 left-0 w-full shadow-md">
      <div className="container py-6 flex items-center justify-between">
        {/* Logo website */}
        <div className="flex items-center gap-2">
          <img src={LogoImage} alt="" className="w-10 h-10 object-cover" />
          <h1 className="text-2xl text-primary font-semibold">C4F Isports</h1>
        </div>
        {/* Path page */}
        <div className="hidden lg:block">
          <ul className="flex items-center gap-8">
            {NavbarMenu.map((item) => (
              <li
                key={item.id}
                className="group relative text-base text-surface-on font-medium"
              >
                <NavLink
                  to={item.link}
                  className={({isActive}) => `relative pb-1 hover:text-primary transition-all duration-300 ${isActive ? 'text-primary' : 'text-surface-on'}`}
                >
                  {item.title}
                  <span
                    className="absolute left-0 -bottom-0.5 h-[2px] w-0 bg-primary 
                  transition-all duration-500 group-hover:w-full
                  shadow-[0_0_8px] shadow-primary/40"
                  ></span>
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
        {/* Menu section */}
        <div className="flex items-center lg:gap-6">
          <div className="text-surface-on flex items-center">
            {/* Help me */}
            <button className="hidden lg:block text-xl text-primary px-3.5 py-1 rounded-md hover:text-primary-on hover:bg-primary duration-200 transition-transform">
              <IoIosNotificationsOutline />
            </button>
            {/* Dark mode */}
            <button className="text-xl text-primary px-3.5 py-1 rounded-md hover:text-primary-on hover:bg-primary duration-200 transition-transform">
              <IoMdMoon />
            </button>
            {/* Translation */}
            <button className="flex items-center gap-1 text-xl text-primary px-3.5 py-1 rounded-md hover:text-primary-on hover:bg-primary duration-200 transition-transform">
              <HiOutlineTranslate className="text-xl" />
              <IoIosArrowDown className="text-sm" />
            </button>
          </div>
          {token ? (
            <div className="relative group">
               <button className="text-xl text-primary px-3.5 py-1 rounded-md hover:text-primary-on hover:bg-primary duration-200 transition-transform">
                  <div className="flex items-center gap-2">
                    <FiUser className="shrink-0"/>
                    {/* Name user */}
                    <span className="text-sm font-medium truncate max-w-[177px]">{userName}</span>
                  </div>
               </button>
              {/* Dropdown menu */}
              <div className="w-[180px] absolute top-full right-0 hidden group-hover:block bg-surface-3 text-sm rounded z-[10]">
                <div className='px-4 py-2.5 flex flex-col items-start gap-4 w-full'>
                  <Link to='/users/profile' className="text-primary flex items-center gap-2 border-b border-outline-variant p-2 w-full 
                  hover:bg-primary hover:text-primary-on rounded-md transition-colors duration-200 ease-in-out">
                    <FiUser className="text-lg shrink-0"/>
                    <span>Tài khoản của tôi</span>
                  </Link>
                  <button className="text-primary flex items-center gap-2 border-b border-outline-variant p-2 w-full 
                  hover:bg-primary hover:text-primary-on rounded-md transition-colors duration-200 ease-in-outl">
                    <FaRegHeart className="text-lg shrink-0" />
                    <span>Sân yêu thích</span>
                  </button>
                  <button 
                    onClick={handleLogout}
                    className="text-primary truncate flex items-center gap-2 p-2 w-full 
                  hover:bg-primary hover:text-primary-on rounded-md transition-colors duration-200 ease-in-out">
                    <IoLogOutOutline className="text-lg shrink-0" />
                    <span>Đăng xuất</span>
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              {/* Login */}
              <Button
                onClick={() => {
                  navigate('/auth/login', {
                    state: { backgroundLocation: location }
                  })
                }}
                className="hidden lg:block text-base text-surface-on font-medium px-4 py-1 border border-primary rounded-md"
              >
                Login
              </Button>
              {/* Register*/}
              <Button
                onClick={() => {
                  navigate('/auth/register', {
                    state: { backgroundLocation: location }
                  })
                }}
                className="hidden lg:block text-base text-surface-on font-medium px-4 py-1 border border-primary rounded-md"
              >
                Register
              </Button>
            </div>
          )}
          {/* Repositive menu mobile */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden flex flex-col gap-1 px-3.5 py-2 rounded-md group hover:bg-primary duration-200 transition-transform"
          >
            <span
              className={`block w-5 h-0.5 bg-primary group-hover:bg-primary-on transition-transform duration-300 ease-in-out ${
                isOpen ? "rotate-45 translate-y-1.5" : ""
              }`}
            />
            <span
              className={`block w-5 h-0.5 bg-primary group-hover:bg-primary-on transition-opacity duration-300 ease-in-out ${
                isOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`block w-5 h-0.5 bg-primary group-hover:bg-primary-on transition-transform duration-300 ease-in-out ${
                isOpen ? "-rotate-45 -translate-y-1.5" : ""
              }`}
            />
          </button>
          {/* Repositive menu layout  */}
          <AnimatePresence>
            {isOpen && (<MenuMobile key="menu-mobile"/>)}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
};

export default Header;
