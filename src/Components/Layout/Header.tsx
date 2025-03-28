import React, { useState } from "react";
import { menuItemsData } from "../../Data/menuData";
import LogoC4F from "/src/assets/images/LogoC4F.png"; 
import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";
import { FaRegUserCircle } from "react-icons/fa";
import { CiLogout } from "react-icons/ci";
import { HiOutlineBell } from "react-icons/hi2";
import { motion } from "framer-motion";
interface HeaderProps {
    isLogin: boolean;
    setIsLogin: (value: boolean) => void;
}



const Header: React.FC<HeaderProps> = ({ isLogin, setIsLogin }) => {
    const { isAuthenticated, logoutUser } = useAuth();
    const handleLogout = async () => {
        try {
            await logoutUser(); // 
        } catch (error) {
            console.error("Logout error:", error);
        }
    };

    const [isProfile, setIsProfile] = useState(false);
    

    return (
        <div className='fixed top-0 left-0 w-screen dark:bg-bg-dark-mode-sc bg-white z-[10] border-gray-300 border-b'>
            <div className="max-w-[1200px] mx-auto py-6">
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <Link to='/'>
                        <a href="#" className='flex gap-2 items-center'>
                            {/* Not yet fix logo */}
                            <img src={LogoC4F} alt="Logo" className="min-w-[48px] min-h-[48px] object-contain"/>
                            <h1 className="text-4xl tracking-wide text-black dark:text-white font-primary font-semibold">ISports</h1>
                        </a>
                    </Link>
                    {/* Navbar */}
                    <div>
                        <ul className="flex gap-6">
                            {menuItemsData.map((nav) => (
                                <li key={nav.id}>
                                    <div className="px-2 py-1 rounded-md">
                                        <NavLink 
                                            to={nav.path}
                                            className={({ isActive }) =>
                                                `py-2 text-xl text-text-primary dark:text-white font-secondary font-semibold
                                                hover:text-btn-primary hover:border-b-2 hover:border-bg-btn-primary duration-200 transition-transform ease-in-out
                                                ${isActive ? "!text-btn-primary border-b-2 border-btn-primary" : ""}`
                                              }
                                        >
                                            {nav.name}
                                        </NavLink>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                    {/* Login */}
                    <div className="flex items-center gap-4">
                    {isAuthenticated ? (
                        <div className="flex items-center gap-6">
                            <button className="cursor-pointer px-2 py-1.5 rounded-md bg-slate-100 group hover:bg-gray-200 duration-200 transition-colors">
                                <HiOutlineBell className="text-xl group-hover:scale-110 group-hover:-translate-y-0.5 duration-200 transition-transform ease-linear hover:animate-shake"/>
                            </button>
                            <button 
                                onClick={handleLogout}
                                className="cursor-pointer px-2 py-1.5 rounded-md bg-slate-100 group hover:bg-gray-200 duration-200 transition-colors">
                                <CiLogout className="text-xl group-hover:scale-110 duration-200 transition-transform ease-linear"/>
                            </button>
                            <button 
                                onClick={() => setIsProfile(!isProfile)}
                                className="cursor-pointer px-2 py-1.5 rounded-md bg-slate-100 group hover:bg-gray-200 duration-200 transition-colors relative">
                                <FaRegUserCircle className="text-xl group-hover:scale-110 duration-200 transition-transform ease-linear"/>
                                {isProfile 
                                ? 
                                (<div className="absolute left-0 top-1/2 translate-y-1/3 bg-amber-300 w-[180px] h-fit rounded-sm">
                                    <ul className="flex flex-col items-start gap-2 p-4">
                                        <li>
                                            <Link to='/users/profile'>Trang cá nhân</Link>
                                        </li>
                                        <li>
                                            <Link to='/'>Cài đặt</Link>
                                        </li>
                                        <li>
                                            <Link to='/'>Đăng xuất</Link>
                                        </li>
                                    </ul>
                                </div>) 
                                : 
                                ''}
                            </button>
                        </div>
                    ) : (
                        <>
                            <Link to="/auth/login" onClick={() => setIsLogin(!isLogin)} className={`text-xl text-text-primary font-secondary font-semibold px-4 py-1 rounded-md cursor-pointer hover:scale-110 transition-transform duration-300 ease-in-out ${isLogin ? "dark:text-white" : "text-white dark:text-black bg-btn-primary"}`}>
                                Login
                            </Link>
                            
                            <Link to="/auth/register" onClick={() => setIsLogin(!isLogin)} className={`text-xl text-text-primary font-primary font-semibold px-4 py-1 rounded-md cursor-pointer hover:scale-110 transition-transform duration-300 ease-in-out ${isLogin ? "bg-btn-primary text-white dark:text-black" : "dark:text-white"}`}>
                                Register
                            </Link>
                        </>
                    )}
                    </div>
                </div>            
            </div>
        </div>
    )
}

export default Header
