import { useState } from "react";
import { NavbarMenu } from "../../../constants/navBarMenu";
import LogoImage from "../../../assets/images/LogoC4F.png";
import { HiOutlineTranslate } from "react-icons/hi";
import { IoMdMoon, IoMdSunny } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosHelpCircleOutline } from "react-icons/io";
import { NavLink } from "react-router";

const Header = () => {
    const [isOpenDarkMode, setIsOpenDarkMode] = useState<boolean | null>(false);

    // Handle close hamburger menu
    const [isOpen, setIsOpen] = useState<boolean | null>(false);
    return (
        <header className="bg-surface-2">
            <div className="container py-6 flex items-center justify-between">
                {/* Logo website */}
                <div className="flex items-center gap-2">   
                    <img src="" alt="" className="w-10 h-10 object-cover"/>
                    <h1 className="text-2xl text-primary font-semibold">C4F Isports</h1>
                </div>
                {/* Path page */}
                <div className="hidden lg:block">
                    <ul className="flex items-center gap-8">
                        {NavbarMenu.map((item) => (
                            <li key={item.id} className="text-base text-surface-on font-medium">
                                <NavLink to={item.link}>{item.title}</NavLink>
                            </li>
                        ))}
                    </ul>      
                </div>
                {/* Menu section */}
                <div className="flex items-center lg:gap-6">
                    <div className="text-surface-on flex items-center">
                        {/* Help me */}
                        <button className="hidden lg:block text-xl text-primary px-3.5 py-1 rounded-md hover:text-primary-on hover:bg-primary duration-200 transition-transform">
                            <IoIosHelpCircleOutline/>
                        </button>
                        {/* Dark mode */}
                        {/* <button
                            type="button"
                            onClick={() => setIsOpenDarkMode(!isOpenDarkMode)}
                            className="w-14 h-7 flex items-center rounded-full p-1 transition-colors duration-400 bg-primary border border-outline-variant"
                            >
                            <div
                                className={`h-[22px] w-[22px] flex items-center justify-center rounded-full shadow-md transform transition-transform duration-300 ${
                                isOpenDarkMode ? 'translate-x-6 bg-white' : 'translate-x bg-white'
                                }`}
                            >
                                {isOpenDarkMode ? <IoMdMoon className="text-primary-on" /> : <IoMdSunny className="text-primary" />}
                            </div>
                        </button> */}
                        <button className="text-xl text-primary px-3.5 py-1 rounded-md hover:text-primary-on hover:bg-primary duration-200 transition-transform">
                            <IoMdMoon/>
                        </button>
                        {/* Translation */}
                        <button className="flex items-center gap-1 text-xl text-primary px-3.5 py-1 rounded-md hover:text-primary-on hover:bg-primary duration-200 transition-transform">
                            <HiOutlineTranslate className="text-xl"/>
                            <IoIosArrowDown className="text-sm"/>
                        </button>
                    </div>
                    {/* Login */}
                    <button className="hidden lg:block text-base text-surface-on font-medium px-4 py-1 border border-primary rounded-md">
                        Login
                    </button>
                    {/* Repositive menu mobile */}
                    <button 
                        onClick={() => setIsOpen(!isOpen)}
                        className="lg:hidden flex flex-col gap-1 px-3.5 py-2 rounded-md group hover:bg-primary duration-200 transition-transform">
                        <span
                            className={`block w-5 h-0.5 bg-primary group-hover:bg-primary-on transition-transform duration-300 ease-in-out ${
                            isOpen ? 'rotate-45 translate-y-1.5' : ''
                            }`}
                        />
                        <span
                            className={`block w-5 h-0.5 bg-primary group-hover:bg-primary-on transition-opacity duration-300 ease-in-out ${
                            isOpen ? 'opacity-0' : ''
                            }`}
                        />
                        <span
                            className={`block w-5 h-0.5 bg-primary group-hover:bg-primary-on transition-transform duration-300 ease-in-out ${
                            isOpen ? '-rotate-45 -translate-y-1.5' : ''
                            }`}
                        />
                    </button>
                </div>
            </div>
        </header>
    )
}

export default Header
