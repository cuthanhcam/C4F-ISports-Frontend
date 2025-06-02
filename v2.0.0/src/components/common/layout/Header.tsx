//Header.tsx
import { useState } from "react";
import { NavbarMenu } from "../../../constants/navbarMenu";
import LogoImage from "../../../assets/images/Logo_C4F.svg";
import { HiOutlineTranslate } from "react-icons/hi";
import { IoMdMoon, IoMdSunny } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosNotificationsOutline } from "react-icons/io";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@headlessui/react";
import MenuMobile from "../../ui/MenuMobile";
import { AnimatePresence } from "framer-motion";
import { FiUser } from "react-icons/fi";
import { FaRegHeart } from "react-icons/fa";
import { IoLogOutOutline } from "react-icons/io5";
import { authAPI } from "../../../api/auth.api";
import { useUser } from "../../../context/UserContext";
import useDarkMode from "../../../hooks/useDarkMode";

const Header = () => {
  
  const token = localStorage.getItem("token");
  const filteredMenu = NavbarMenu.filter(item => {
  if (item.title === 'Dashboard') {
    return !!token; // chỉ giữ Dashboard nếu có token
  }
  return true; // các mục khác luôn giữ
});

  // Check if user is authenticated
  const { user, logout } = useUser();
  const DEFAULT_AVATAR_URL =
    "https://res.cloudinary.com/dzgxdkass/image/upload/v1748497926/default-avatar.png";

  // Dark mode hook
  const { darkMode, setDarkMode } = useDarkMode();

  // State cho dropdown dark mode
  const [isThemeDropdownOpen, setIsThemeDropdownOpen] = useState(false);

  // Đăng xuất
  const handleLogout = async () => {
    try {
      await authAPI.logout();
      logout();
      navigate("/");
    } catch (err) {
      console.error("Lỗi khi đăng xuất:", err);
    }
  };

  const navigate = useNavigate();
  const location = useLocation();
  // Handle close hamburger menu
  const [isOpen, setIsOpen] = useState<boolean | null>(false);

  // Hàm xử lý chọn chế độ
  const handleThemeChange = (mode: 'light' | 'dark') => {
    setDarkMode(mode === 'dark');
    setIsThemeDropdownOpen(false); // Đóng dropdown sau khi chọn
  };

  return (
    <header className="bg-surface-2 dark:bg-dark-surface-2 z-[100] fixed top-0 left-0 w-full shadow-md">
      <div className="container py-6 flex items-center justify-between">
        {/* Logo website */}
        <div className="flex items-center gap-2">
          <img src={LogoImage} alt="" className="w-10 h-10 object-cover" />
          <h1 className="text-2xl text-primary dark:text-dark-primary font-semibold">C4F-ISports</h1>
        </div>
        
        {/* Path page */}
        <div className="hidden lg:block">
          <ul className="flex items-center gap-8">
            {filteredMenu.map((item) => (
              <li
                key={item.id}
                className="group relative text-base text-surface-on dark:text-dark-surface-on font-medium"
              >
                <NavLink
                  to={item.link}
                  className={({isActive}) => `relative pb-1 hover:text-primary dark:hover:text-dark-primary transition-all duration-300 ${
                    isActive 
                      ? 'text-primary dark:text-dark-primary' 
                      : 'text-surface-on dark:text-dark-surface-on'
                  }`}
                >
                  {item.title}
                  <span
                    className="absolute left-0 -bottom-0.5 h-[2px] w-0 bg-primary dark:bg-dark-primary 
                  transition-all duration-500 group-hover:w-full
                  shadow-[0_0_8px] shadow-primary/40 dark:shadow-dark-primary/40"
                  ></span>
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
        
        {/* Menu section */}
        <div className="flex items-center lg:gap-6">
          <div className="text-surface-on dark:text-dark-surface-on flex items-center">
            {/* Help me */}
            <button className="hidden lg:block text-xl text-primary dark:text-dark-primary px-3.5 py-1 rounded-md hover:text-surface-1 dark:hover:text-dark-primary-on hover:bg-primary-shade dark:hover:bg-dark-primary duration-200 transition-transform">
              <IoIosNotificationsOutline />
            </button>
            
           {/* Dark mode toggle with dropdown */}
            <div className="relative group">
              <button
                onClick={() => setIsThemeDropdownOpen(!isThemeDropdownOpen)}
                onMouseEnter={() => setIsThemeDropdownOpen(true)}
                className="flex items-center gap-1 text-xl text-primary dark:text-dark-primary px-3.5 py-1 rounded-md hover:text-surface-1 dark:hover:text-dark-primary-on hover:bg-primary-shade dark:hover:bg-dark-primary duration-200 transition-transform"
                aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
              >
                {darkMode ? <IoMdSunny /> : <IoMdMoon />}
                <IoIosArrowDown className="text-sm" />
              </button>
              
              {/* Dropdown menu cho dark mode */}
              <div
                className={`w-[140px] absolute top-full right-0 ${
                  isThemeDropdownOpen ? "block" : "hidden"
                } group-hover:block bg-surface-3 dark:bg-dark-surface-3 text-sm rounded z-[10]`}
                onMouseLeave={() => setIsThemeDropdownOpen(false)}
              >
                <div className="px-4 py-2.5 flex flex-col items-start gap-2 w-full">
                  <button
                    onClick={() => handleThemeChange('light')}
                    className="text-primary dark:text-dark-primary flex items-center gap-2 p-2 w-full border-b border-outline-variant dark:border-dark-outline-variant
                    hover:bg-primary-shade dark:hover:bg-dark-primary hover:text-surface-1 dark:hover:text-dark-primary-on rounded-md transition-colors duration-200 ease-in-out"
                  >
                    <IoMdSunny className="text-lg shrink-0" />
                    <span>Light</span>
                  </button>
                  <button
                    onClick={() => handleThemeChange('dark')}
                    className="text-primary dark:text-dark-primary flex items-center gap-2 p-2 w-full 
                    hover:bg-primary-shade dark:hover:bg-dark-primary hover:text-surface-1 dark:hover:text-dark-primary-on rounded-md transition-colors duration-200 ease-in-out"
                  >
                    <IoMdMoon className="text-lg shrink-0" />
                    <span>Dark</span>
                  </button>
                </div>
              </div>
            </div>
            
            {/* Translation */}
            <button className="flex items-center gap-1 text-xl text-primary dark:text-dark-primary px-3.5 py-1 rounded-md hover:text-surface-1 dark:hover:text-dark-primary-on hover:bg-primary-shade dark:hover:bg-dark-primary duration-200 transition-transform">
              <HiOutlineTranslate className="text-xl" />
              <IoIosArrowDown className="text-sm" />
            </button>
          </div>
          
          {token ? (
            <div className="relative group">
               <button className="text-xl text-primary dark:text-dark-primary px-3.5 py-1 rounded-md hover:text-surface-1 dark:hover:text-dark-primary-on hover:bg-primary-shade dark:hover:bg-dark-primary duration-200 transition-transform">
                  <div className="flex items-center gap-2">
                    <img 
                      src={user?.avatarUrl || DEFAULT_AVATAR_URL} 
                      alt="" 
                      className="w-5 h-5 rounded-full object-cover border border-outline-variant dark:border-dark-outline-variant"
                    />
                    {/* Name user */}
                    <span className="text-sm font-medium truncate max-w-[177px]">{user?.fullName}</span>
                  </div>
               </button>
               
              {/* Dropdown menu */}
              <div className="w-[180px] absolute top-full right-0 hidden group-hover:block bg-surface-3 dark:bg-dark-surface-3 text-sm rounded z-[10]">
                <div className='px-4 py-2.5 flex flex-col items-start gap-4 w-full'>
                  <Link 
                    to='/users/profile' 
                    className="text-primary dark:text-dark-primary flex items-center gap-2 border-b border-outline-variant dark:border-dark-outline-variant p-2 w-full 
                    hover:bg-primary-shade dark:hover:bg-dark-primary hover:text-surface-1 dark:hover:text-dark-primary-on rounded-md transition-colors duration-200 ease-in-out"
                  >
                    <FiUser className="text-lg shrink-0"/>
                    <span>Tài khoản của tôi</span>
                  </Link>
                  <Link 
                    to={'/users/favorites'}
                  className="text-primary dark:text-dark-primary flex items-center gap-2 border-b border-outline-variant dark:border-dark-outline-variant p-2 w-full 
                  hover:bg-primary-shade dark:hover:bg-dark-primary hover:text-surface-1 dark:hover:text-dark-primary-on rounded-md transition-colors duration-200 ease-in-out">
                    <FaRegHeart className="text-lg shrink-0" />
                    <span>Sân yêu thích</span>
                  </Link>
                  <button 
                    onClick={handleLogout}
                    className="text-primary dark:text-dark-primary truncate flex items-center gap-2 p-2 w-full 
                    hover:bg-primary-shade dark:hover:bg-dark-primary hover:text-surface-1 dark:hover:text-dark-primary-on rounded-md transition-colors duration-200 ease-in-out"
                  >
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
                className="hidden lg:block text-base text-surface-on dark:text-dark-surface-on font-medium px-4 py-1 border border-primary dark:border-dark-primary rounded-md hover:bg-primary/10 dark:hover:bg-dark-primary/10 transition-colors"
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
                className="hidden lg:block text-base text-surface-on dark:text-dark-surface-on font-medium px-4 py-1 border border-primary dark:border-dark-primary rounded-md hover:bg-primary/10 dark:hover:bg-dark-primary/10 transition-colors"
              >
                Register
              </Button>
            </div>
          )}
          
          {/* Responsive menu mobile */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden flex flex-col gap-1 px-3.5 py-2 rounded-md group hover:bg-primary dark:hover:bg-dark-primary duration-200 transition-transform"
          >
            <span
              className={`block w-5 h-0.5 bg-primary dark:bg-dark-primary group-hover:bg-primary-on dark:group-hover:bg-dark-primary-on transition-transform duration-300 ease-in-out ${
                isOpen ? "rotate-45 translate-y-1.5" : ""
              }`}
            />
            <span
              className={`block w-5 h-0.5 bg-primary dark:bg-dark-primary group-hover:bg-primary-on dark:group-hover:bg-dark-primary-on transition-opacity duration-300 ease-in-out ${
                isOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`block w-5 h-0.5 bg-primary dark:bg-dark-primary group-hover:bg-primary-on dark:group-hover:bg-dark-primary-on transition-transform duration-300 ease-in-out ${
                isOpen ? "-rotate-45 -translate-y-1.5" : ""
              }`}
            />
          </button>
          
          {/* Responsive menu layout  */}
          <AnimatePresence>
            {isOpen && (<MenuMobile key="menu-mobile"/>)}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
};

export default Header;