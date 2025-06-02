import { Link, useNavigate } from "react-router-dom";
import { SidebarItem } from "../../../constants/Sidebar";
import { useUser } from "../../../context/UserContext"
import { IoLogOutOutline } from "react-icons/io5";
import { CiSearch } from "react-icons/ci";
import { authAPI } from "../../../api/auth.api";
import { useState } from "react";
import Logo from '../../../assets/images/Logo_C4F.svg';
const Sidebar = () => {
    const { user } = useUser();
    const DEFAULT_AVATAR_URL = "https://res.cloudinary.com/dzgxdkass/image/upload/v1748497926/default-avatar.png";
    const role = localStorage.getItem('role');
    const navigate = useNavigate();
    const [active, setActive] = useState<number>(1);

    // Đăng xuất
      const handleLogout = async () => {
        try {
          await authAPI.logout(); 
          
          // Xoá token lưu trong localStorage
          localStorage.removeItem("token");
          localStorage.removeItem("refreshToken");
    
          // Điều hướng về trang chủ
          navigate('/');
        } catch (err) {
          console.error('Lỗi khi đăng xuất:', err);
        }
    };

    return (
        <div className="backdrop-blur-md bg-surface-5">
            <div className="min-w-[274px] h-full px-4 py-6 flex flex-col justify-between">
                <div className="flex flex-col gap-8">
                    {/* Logo */}
                    <img src={Logo} alt="" className="w-12 h-12 object-cover"/>
                    {/* Tìm kiếm chức năng */}
                    <div className="relative">
                        <input type="search" placeholder="Search" className="outline-none w-full pl-2.5 pr-10 py-1.5 rounded-full"/>
                        <button className="absolute top-0 right-0 text-primary-on bg-primary px-2.5 h-9 rounded-r-full hover:bg-primary-shade duration-200 transition-colors ease-in-out">
                            <CiSearch className="text-xl"/>
                        </button>
                    </div>
                    {/* Chức năng */}
                    <div className="mt-2">
                        <ul className="flex flex-col gap-6">
                            {SidebarItem.map((item) => (
                                <li key={item.id}>
                                    <Link 
                                        to={item.link}
                                        onClick={() => setActive(item.id)}
                                        className={`flex items-center gap-2 p-2 rounded-md ${active === item.id ? 'bg-primary border border-primary-inverse' : ''}`}
                                    >
                                       
                                        <img src={item.icon} alt="" className="w-5 h-5 object-cover"/>
                                        <span className={`font-semibold ${item.id === active ? 'text-white' : 'text-surface-on'}`}>{item.title}</span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
                {/* Thông tin admin */}
                <div className="flex items-center justify-between border-t border-outline-variant pt-6">
                    <div className="flex items-center gap-2">
                        <div className="w-10 h-10 border border-outline-variant rounded-full overflow-hidden">
                            <img src={user?.avatarUrl || DEFAULT_AVATAR_URL} alt="" className="w-full h-full object-cover"/>
                        </div>
                        <div className="flex flex-col gap-1">
                            <h1 className="text-surface-on text-sm">{user?.fullName}</h1>
                            <h4 className="text-xs text-surface-onVariant">{role}</h4>
                        </div>
                    </div>    
                    <IoLogOutOutline 
                        onClick={handleLogout}
                        className="text-2xl text-primary cursor-pointer"
                    />
                </div>
            </div>
        </div>
    )
}

export default Sidebar
