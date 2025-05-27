import { useEffect, useState } from "react";
import { FiUser } from "react-icons/fi"
import { userAPI } from "../../../../api/user.api";
import { CiEdit } from "react-icons/ci";
import { Link } from "react-router-dom";
import { ProfileItems } from "../../../../constants/profile";
const Navbar = () => {  

    // Lấy tên người dùng
    const [userName, setUserName] = useState<string>('');
    const fetchUserProfile = async () => {
        try {
          const res = await userAPI.getUserProfile();
          if (res?.data?.fullName) {
            setUserName(res.data.fullName);
          }
        } catch (error) {
          console.error("Lỗi khi lấy thông tin user:", error);
        }
      };
    
    // Fetch user profile when component mounts
    useEffect(() => {
    fetchUserProfile();
    }, []) 

    return (
        <div className="inset-0 backdrop-blur-md bg-surface/30 p-12 rounded-3xl">
            {/* Avatar user */}
            <Link 
                to='/users/profile'
                className="flex items-center gap-4">
                <div className="p-4 rounded-full border border-outline-variant">
                    <FiUser className="text-primary text-3xl"/>
                </div>
                <div className="flex flex-col gap-1">
                    <h3 className="text-base font-medium text-primary truncate max-w-[177px]">{userName}</h3>
                    <button className="flex text-surface-on gap-2">
                        <CiEdit className="text-2xl"/>
                        <span className="text-sm ">Chỉnh sửa</span>
                    </button>
                </div>
            </Link>
            {/* Feature user */} 
            <div className="mt-16 flex flex-col gap-6">
                {ProfileItems.map((item) => (
                    <div key={item.id} className="flex flex-col gap-2">
                        <Link
                            to={item.link} 
                            className="flex items-center gap-2">
                            <item.icon className="shrink text-2xl text-primary"/>
                            <h1 className="text-surface-on">{item.title}</h1>
                        </Link>
                        <ul className="ml-10 text-surface-onVariant flex flex-col gap-2">
                            {item.features.map((feature) => (
                                <li key={feature.id}>
                                    <Link to={feature.link}>
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
