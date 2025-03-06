import { PiMoonFill } from "react-icons/pi";
import { PiSunFill } from "react-icons/pi";
import { IoMdChatboxes } from "react-icons/io";
import { FaGithubAlt } from "react-icons/fa6";
import useFloatingMenu from "../../Hooks/FloatingMenu";
import ScrollToTop from "./ScrollToTop";
const FloatingMenu = () => {

    const { showButton, scrollToTop } = useFloatingMenu();

    return (
        <div className="fixed bottom-15 right-5 border-2 border-gray-300 z-[20] rounded-full">
            <ul className="flex flex-col gap-4 p-2">
                <li className="hover:bg-btn-primary p-1 rounded-full group transition-colors duration-300">
                    <a href="#" className="text-2xl">
                        <PiMoonFill className="group-hover:scale-110 transition-transform duration-300 text-[#abc7ff] group-hover:text-black group-hover:transition-colors"/>
                    </a>
                </li>
                <li className="hover:bg-btn-primary p-1 rounded-full group transition-colors duration-300">
                    <a href="#" className="text-2xl">
                        <IoMdChatboxes className="group-hover:scale-110 transition-transform duration-300 text-[#abc7ff] group-hover:text-black group-hover:transition-colors"/>
                    </a>
                </li>
                <li className="hover:bg-btn-primary p-1 rounded-full group transition-colors duration-300">
                    <a href="#" className="text-2xl">
                        <FaGithubAlt className="group-hover:scale-110 transition-transform duration-300 text-[#abc7ff] group-hover:text-black group-hover:transition-colors"/>
                    </a>
                </li>    
            </ul>
            <ScrollToTop showButton={showButton} scrollToTop={scrollToTop}/>
        </div>
    )
}

export default FloatingMenu
