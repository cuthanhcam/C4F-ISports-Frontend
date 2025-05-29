import { FiUser } from "react-icons/fi"
import { CiEdit } from "react-icons/ci";
import { Link } from "react-router-dom";
import { ProfileItems } from "../../../../constants/profile";
import { useUser } from "../../../../context/UserContext";
import { useState } from "react";
const Navbar = () => {  
    const { user } = useUser();
    const [activeLink, setActiveLink] = useState<string>("/users/profile");
    const DEFAULT_AVATAR_URL = "https://res.cloudinary.com/dzgxdkass/image/upload/v1748497926/default-avatar.png";
    return (
        <div className="inset-0 backdrop-blur-md bg-surface/30 p-12 rounded-3xl">
            {/* Avatar user */}
            <Link 
                to='/users/profile'
                className="flex items-center gap-4">
                <div className="rounded-full border border-outline-variant w-[76px] h-[76px]">
                    <img src={user?.avatarUrl || DEFAULT_AVATAR_URL} alt="" className="w-full h-full rounded-full object-cover"/>
                </div>
                <div className="flex flex-col gap-1">
                    <h3 className="text-base font-medium text-primary truncate max-w-[177px]">{user?.fullName}</h3>
                    <button className="flex text-surface-on gap-2">
                        <CiEdit className="text-2xl"/>
                        <span className="text-sm ">Chỉnh sửa</span>
                    </button>
                </div>
            </Link>
            {/* Feature user */} 
           <div className="mt-16 flex flex-col gap-6">
                {ProfileItems.map((item) => (
                    <div key={item.id} className="flex flex-col gap-3">
                        {/* Mục cha */}
                        <Link
                            to={item.features[0]?.link || "#"}
                            onClick={() => setActiveLink(item.features[0]?.link || "")}
                            className="flex items-center gap-2 group"
                        >
                            <item.icon className="text-2xl text-primary" />
                            <h1 className={`group-hover:text-primary transition ${
                                item.features.some(f => f.link === activeLink) ? "text-primary font-semibold" : "text-surface-on"
                            }`}>
                                {item.title}
                            </h1>
                        </Link>

                        {/* Mục con */}
                        <ul className="ml-10 flex flex-col gap-2 text-surface-onVariant">
                            {item.features.map((feature) => (
                                <li key={feature.id}>
                                    <Link
                                        to={feature.link}
                                        onClick={() => setActiveLink(feature.link)}
                                        className={`block transition duration-200 ${
                                            activeLink === feature.link
                                                ? "text-primary font-medium"
                                                : "hover:text-primary"
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
    )
}

export default Navbar
