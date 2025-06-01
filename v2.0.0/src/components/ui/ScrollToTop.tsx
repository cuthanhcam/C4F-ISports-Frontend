// ScrollToTop.tsx

import { useEffect, useState } from "react";
import { HiArrowUp } from "react-icons/hi";

const ScrollToTop = () => {
  const [showButton, setShowButton] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      onClick={scrollToTop}
      className={`fixed group bottom-6 right-6 p-3 bg-primary dark:bg-dark-primary text-surface-1 dark:text-dark-primary-on rounded-full shadow-navigation dark:shadow-navigation-dark transition-all ease-in-out duration-300 cursor-pointer hover:bg-primary-shade dark:hover:bg-dark-primary-shade ${
        showButton ? "opacity-100 scale-100" : "opacity-0 scale-0"
      }`}
    >
      <HiArrowUp className="text-xl group-hover:-translate-y-1 duration-200 transition-all ease-in-out" />
    </button>
  );
};

export default ScrollToTop;