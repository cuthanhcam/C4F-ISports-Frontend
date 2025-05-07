import React from "react";
import { PiMouseScroll } from "react-icons/pi";

interface ScrollToTopProps {        
    showButton: boolean; 
    scrollToTop: () => void;
}

const ScrollToTop: React.FC<ScrollToTopProps> = ({ showButton,  scrollToTop}) => {

    
    return (
        <button
            onClick={scrollToTop}
            className={`fixed bottom-2 right-6 p-3 bg-blue-500 text-white rounded-full shadow-lg transition-all duration-300 cursor-pointer ${
            showButton ? "opacity-100 scale-100" : "opacity-0 scale-0"
        }`}
    >
      <PiMouseScroll className="text-xl" />
    </button>
    )
}

export default ScrollToTop
