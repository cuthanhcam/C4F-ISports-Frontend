import { PiMoonFill } from "react-icons/pi";
import { PiSunFill } from "react-icons/pi";
import { IoMdChatboxes } from "react-icons/io";
import { FaGithubAlt } from "react-icons/fa6";
import useFloatingMenu from "../../Hooks/FloatingMenu";
import ScrollToTop from "./ScrollToTop";
import React from "react";

interface FloatingMenuProps {
    darkMode: boolean;
    setDarkMode: (value: boolean) => void;
}

const FloatingMenu: React.FC<FloatingMenuProps> = ({ darkMode, setDarkMode }) => {

    const { showButton, scrollToTop } = useFloatingMenu();

    return (
        <div className="fixed bottom-15 right-5 border-2 border-gray-300 z-[20] rounded-full">
            <ul className="flex flex-col gap-4 p-2">
                <li className="hover:bg-btn-primary p-1 rounded-full group transition-colors duration-300">
                    <a href="#" className="text-2xl perspective-1000">
                        {darkMode ? 
                        <PiMoonFill className="group-hover:scale-110 transition-transform duration-300 text-[#abc7ff] group-hover:text-black group-hover:transition-colors animate-earth-spin"
                        onClick={() => setDarkMode(!darkMode)}/>
                        : <PiSunFill className="group-hover:scale-110 transition-transform duration-300 text-[#abc7ff] group-hover:text-black group-hover:transition-colors animate-earth-spin"
                        onClick={() => setDarkMode(!darkMode)}/>}
                    </a>
                </li>
                <li className="hover:bg-btn-primary p-1 rounded-full group transition-colors duration-300">
                    <a href="#" className="text-2xl perspective-1000">
                        <IoMdChatboxes className="animate-earth-spin group-hover:scale-110 transition-transform duration-300 text-[#abc7ff] group-hover:text-black group-hover:transition-colors"/>
                    </a>
                </li>
                <li className="hover:bg-btn-primary p-1 rounded-full group transition-colors duration-300">
                    <a href="#" className="text-2xl perspective-1000">
                        <FaGithubAlt className="animate-earth-spin group-hover:scale-110 transition-transform duration-300 text-[#abc7ff] group-hover:text-black group-hover:transition-colors"/>
                    </a>
                </li>    
            </ul>
            <ScrollToTop showButton={showButton} scrollToTop={scrollToTop}/>
        </div>
    )
}

export default FloatingMenu
