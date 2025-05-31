import { useLocation } from "react-router";
import { useUser } from "../../../context/UserContext";

const Header = () => {
    const { user } = useUser();
    const DEFAULT_AVATAR_URL = "https://res.cloudinary.com/dzgxdkass/image/upload/v1748497926/default-avatar.png";
    const location = useLocation();
    const pathToContent: { [key: string]: string } = {
        '/dashboard': 'Dashboard',
        '/dashboard/management-yard': 'Quản lý sân',
        '/dashboard/set-yard': 'Đặt sân',
        '/dashboard/statistical': 'Thống kê',
        '/dashboard/setting': 'Cài đặt',
    };
    const title = pathToContent[location.pathname || ''];
    return (
        <div>
            <div className="p-4 py-6 flex justify-between">
                <h1 className="text-xl font-bold">{title}</h1>
                <div className="flex items-center gap-6">
                    {/* Quyền */}
                    <select name="" id="" className="px-2 border border-outline-variant rounded-md outline-none">
                        <option value="User">User</option>
                        <option value="Owner">Owner</option>
                        <option value="Admin">Admin</option>
                    </select>
                    {/* Thông tin */}
                    <div className="flex items-center gap-2">
                        <div className="w-5 h-5 border border-outline-variant rounded-full overflow-hidden">
                            <img src={user?.avatarUrl || DEFAULT_AVATAR_URL} alt="" className="w-full h-full object-cover"/>
                        </div>
                        <h1 className="text-sm font-medium">{user?.fullName}</h1>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header
