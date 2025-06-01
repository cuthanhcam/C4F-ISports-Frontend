import { FiUser } from "react-icons/fi";
import { CiEdit } from "react-icons/ci";
import { Link } from "react-router-dom";
import { ProfileItems } from "../../../../constants/profile";
import { useUser } from "../../../../context/UserContext";
import { useState } from "react";

const Navbar = () => {
  const { user } = useUser();
  const [activeLink, setActiveLink] = useState<string>("/users/profile");
  const DEFAULT_AVATAR_URL =
    "https://res.cloudinary.com/dzgxdkass/image/upload/v1748497926/default-avatar.png";

  return (
    <div className="bg-surface-1/30 dark:bg-dark-surface-1/30 backdrop-blur-md p-4 sm:p-6 md:p-8 lg:p-12 rounded-3xl border border-outline-variant dark:border-dark-outline-variant shadow-navigation dark:shadow-navigation-dark">
      {/* Avatar user */}
      <Link to="/users/profile" className="flex items-center gap-4 mb-6 sm:mb-8 md:mb-10">
        <div className="rounded-full border border-outline-variant dark:border-dark-outline-variant w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 overflow-hidden">
          <img
            src={user?.avatarUrl || DEFAULT_AVATAR_URL}
            alt={user?.fullName || "User Avatar"}
            loading="lazy"
            className="w-full h-full rounded-full object-cover"
          />
        </div>
        <div className="flex flex-col gap-2">
          <h3 className="text-base sm:text-lg font-medium text-primary dark:text-dark-primary truncate max-w-[150px] sm:max-w-[200px] lg:max-w-[250px]">
            {user?.fullName || "Tên người dùng"}
          </h3>
          <button className="flex items-center gap-2 text-surface-on dark:text-dark-surface-on hover:text-primary dark:hover:text-dark-primary transition-colors duration-200">
            <CiEdit className="text-xl sm:text-2xl" />
            <span className="text-sm sm:text-base">Chỉnh sửa</span>
          </button>
        </div>
      </Link>

      {/* Feature user */}
      <div className="flex flex-col gap-4 sm:gap-6 md:gap-8">
        {ProfileItems.map((item) => (
          <div key={item.id} className="flex flex-col gap-3">
            {/* Mục cha */}
            <Link
              to={item.features[0]?.link || "#"}
              onClick={() => setActiveLink(item.features[0]?.link || "")}
              className="flex items-center gap-3 group"
            >
              <item.icon className="text-2xl sm:text-3xl text-primary dark:text-dark-primary" />
              <h1
                className={`text-base sm:text-lg font-medium transition-colors group-hover:text-primary dark:group-hover:text-dark-primary ${
                  item.features.some((f) => f.link === activeLink)
                    ? "text-primary dark:text-dark-primary font-semibold"
                    : "text-surface-on dark:text-dark-surface-on"
                }`}
              >
                {item.title}
              </h1>
            </Link>

            {/* Mục con */}
            <ul className="ml-6 sm:ml-8 flex flex-col gap-2 text-surface-onVariant dark:text-dark-surface-onVariant">
              {item.features.map((feature) => (
                <li key={feature.id}>
                  <Link
                    to={feature.link}
                    onClick={() => setActiveLink(feature.link)}
                    className={`block text-sm sm:text-base transition-colors duration-200 ${
                      activeLink === feature.link
                        ? "text-primary dark:text-dark-primary font-medium"
                        : "hover:text-primary dark:hover:text-dark-primary"
                    }`}
                  >
                    {feature.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Navbar;