import React from "react";
import { menuItemsData } from "../../Data/menuData";
import LogoC4F from "/src/assets/images/LogoC4F.png"; 
import { Link } from "react-router-dom";


interface HeaderProps {
    isLogin: boolean;
    setIsLogin: (value: boolean) => void;
}


const Header: React.FC<HeaderProps> = ({ isLogin, setIsLogin }) => {
    return (
        <div className='fixed top-0 left-0 w-screen bg-white z-[10] border-gray-300 border-b'>
            <div className="max-w-[1200px] mx-auto py-6">
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <a href="#" className='flex gap-2 items-center'>
                        {/* Not yet fix logo */}
                        <img src={LogoC4F} alt="Logo" className="min-w-[48px] min-h-[48px] object-contain"/>
                        <h1 className="text-4xl tracking-wide text-black font-primary font-semibold">ISports</h1>
                    </a>
                    {/* Navbar */}
                    <div>
                        <ul className="flex gap-6">
                            {menuItemsData.map((nav) => (
                                <li key={nav.id}>
                                    <div className="px-2 py-1 rounded-md">
                                        <Link 
                                            to={nav.path}
                                            className="py-2 text-xl text-text-primary font-secondary font-semibold 
                                            hover:text-btn-primary hover:border-b-2 hover:border-bg-btn-primary duration-200 transition-transform ease-in-out"
                                        >
                                            {nav.name}
                                        </Link>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                    {/* Login */}
                    <div className="flex items-center gap-4">
                        <Link
                            to="/signup"
                            onClick={() => setIsLogin(!isLogin)}
                            className={`text-xl text-text-primary font-secondary font-semibold px-4 py-1 rounded-md cursor-pointer hover:scale-110 transition-transform duration-300 ease-in-out ${isLogin ? "" : "text-white bg-btn-primary"}`}
                        >Sign up
                        </Link>
                        
                        <Link 
                            to="/register"
                            onClick={() => setIsLogin(!isLogin)}
                            className={`text-xl text-text-primary font-primary font-semibold px-4 py-1 rounded-md cursor-pointer hover:scale-110 transition-transform duration-300 ease-in-out ${isLogin ? "bg-btn-primary text-white" : ""}`}
                        >Register
                        </Link>
                    </div>
                </div>            
            </div>
        </div>
    )
}

export default Header
