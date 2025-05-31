import { NavLink } from "react-router-dom";
import { MenuSections } from "../../constants/menuMobile";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { useLocation } from "react-router";

const MenuMobile = () => {
  const [activeTab, setActiveTab] = useState<number>(1);
  const location = useLocation();

  useEffect(() => {
    const el = document.getElementById("menu-mobile");
    if (el) el.scrollTop = 0;
  }, [activeTab, location.pathname]);

  return (
    <motion.div
      id="menu-mobile"
      initial={{ opacity: 0, y: -100 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -100 }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
      className="fixed top-[88px] left-0 w-full bg-surface-3 dark:bg-dark-surface-3 z-[999] overflow-y-auto p-6 gap-4 lg:hidden shadow-navigation dark:shadow-navigation-dark"
    >
      {/* Tab */}
      <div className="relative border-b-[1.5px] border-outline-variant dark:border-dark-outline-variant pb-1">
        <div className="flex justify-around">
          {MenuSections.map((section) => (
            <button
              key={section.sectionId}
              onClick={() => setActiveTab(section.sectionId)}
              className="relative w-full text-base md:text-xl text-surface-on dark:text-dark-surface-on text-center py-2 font-semibold"
            >
              {section.title}
              {activeTab === section.sectionId && (
                <motion.div
                  layoutId="underline"
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                  className="absolute left-0 right-0 -bottom-1 h-[1.5px] bg-primary dark:bg-dark-primary"
                />
              )}
            </button>
          ))}
        </div>
        <div className="absolute bottom-0 left-0 w-full h-[1.5px] bg-outline-variant dark:bg-dark-outline-variant" />
      </div>
      {/* Tab content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.4 }}
          className="space-y-2 mt-6"
        >
          {MenuSections[activeTab - 1].groups.map((group) => (
            <div key={group.id} className="space-y-2 md:space-y-4">
              <h3 className="text-lg md:text-2xl text-surface-on dark:text-dark-surface-on font-medium">{group.title}</h3>
              <ul className="pl-6 border-l border-outline-variant dark:border-dark-outline-variant flex flex-col gap-2 md:gap-4">
                {group.items.map((item) => (
                  <li key={item.link}>
                    <NavLink
                      to={item.link}
                      className="text-surface-onVariant dark:text-dark-surface-onVariant text-sm md:text-base hover:text-primary dark:hover:text-dark-primary transition-colors duration-200"
                    >
                      {item.labal}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
};

export default MenuMobile;