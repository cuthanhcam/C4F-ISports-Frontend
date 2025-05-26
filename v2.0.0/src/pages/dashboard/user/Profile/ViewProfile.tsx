import { useEffect, useState } from "react"
import type { userUpdate } from "../../../../types/user"
import { userAPI } from "../../../../api/user.api";
import { CiCamera, CiEdit } from "react-icons/ci";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
const ViewProfile = () => {
    const [isEditing, setIsEditing] = useState<boolean>(false);
    
    const [userProfile, setUserProfile] = useState<userUpdate>({
        fullName: '',
        email: '',
        phone: '',
        city: '',
        district: '',
        avatarUrl: ''
    });
    
    // Lấy thông tin người dùng
    const fetchUserProfile = async () => {
        try {
            const res = await userAPI.getUserProfile();
            setUserProfile({
                fullName: res.data.fullName,
                email: res.data.email,
                phone: res.data.phone,
                city: res.data.city,
                district: res.data.district,
                avatarUrl: res.data.avatarUrl
            });
        } catch (err) { 
            console.error(err);
        }
    }

    // Hàm xử lý lưu thông tin người dùng
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const isConfirmed = window.confirm("Bạn có chắc chắn muốn lưu thay đổi?");
        if (!isConfirmed) return;

        try {
            await userAPI.updateUserProfile(userProfile);

            // Thông báo cập nhật thành công
            toast.success("Cập nhật thành công!");
            setIsEditing(false);
        } catch (err) {
            console.error(err);
            toast.error("Có lỗi xảy ra khi cập nhật.");
        }

    }

    // Render thông tin người dùng
    useEffect(() => {
        fetchUserProfile();
    }, [])
    
    return (
        <div className="bg-surface-1 rounded-3xl">
            <div className="px-12 py-6">
                {/* Thông tin */}
                <div className="py-6 border-b border-outline-variant flex flex-col gap-2">
                    <h1 className="text-3xl text-surface-on font-medium">Thông tin các nhân</h1>
                    <p className="text-base text-surface-onVariant">Quản lý thông tin hồ sơ để bảo mật tài khoản</p>
                </div>
                {/* Nội dung */}
                <div className="grid grid-cols-[1fr_auto] gap-6 mt-8">
                    <div className="border-r border-outline-variant px-8">
                        {/* Button edit */}
                        <div className="flex justify-end">
                            {!isEditing ? (
                            <button 
                                onClick={() => setIsEditing(true)}
                                className="flex items-center gap-2 bg-primary px-4 py-2 rounded-3xl text-primary-on font-medium hover:bg-primary-shade duration-200 transition-all ease-in-out">
                                <CiEdit/>
                                <span>Chỉnh sửa</span>
                            </button>) : (
                            <button 
                                onClick={() => setIsEditing(false)}
                                className="flex items-center gap-2 bg-primary px-4 py-2 rounded-3xl text-primary-on font-medium hover:bg-primary-shade duration-200 transition-all ease-in-out">
                                <CiEdit/>
                                <span>Hủy</span>
                            </button>)}
                        </div>
                        {/* Thông tin users */}
                        <form onSubmit={handleSubmit} className="flex flex-col gap-6 text-surface-on mt-8">
                            {/* Họ và tên */}
                            <div className="grid grid-cols-[150px_1fr] items-center gap-2">
                                <label htmlFor="">Họ và tên</label>
                                <input 
                                    type="text" 
                                    name="fullName"
                                    value={userProfile.fullName} 
                                    onChange={(e) => setUserProfile({...userProfile, fullName: e.target.value})}
                                    disabled={!isEditing}
                                    className="w-full rounded-md p-2 outline-none bg-surface border border-outline-variant"
                                />
                            </div>
                            {/* Email */}
                            <div className="grid grid-cols-[150px_1fr] items-center gap-2">
                                <label htmlFor="">Email</label>
                                <input 
                                    type="email" 
                                    name="email"
                                    value={userProfile.email} 
                                    onChange={(e) => setUserProfile({...userProfile, email: e.target.value})}
                                    disabled={!isEditing}
                                    className="w-full rounded-md p-2 outline-none bg-surface border border-outline-variant"
                                />
                            </div>
                            {/* Số điện thoại */}
                            <div className="grid grid-cols-[150px_1fr] items-center gap-2">
                                <label htmlFor="">Số điện thoại</label>
                                <input 
                                    type="text" 
                                    name="phone"
                                    value={userProfile.phone} 
                                    onChange={(e) => setUserProfile({...userProfile, phone: e.target.value})}
                                    disabled={!isEditing}
                                    className="w-full rounded-md p-2 outline-none bg-surface border border-outline-variant"
                                />
                            </div>
                            {/* Thành phố */}
                            <div className="grid grid-cols-[150px_1fr] items-center gap-2">
                                <label htmlFor="">Thành phố</label>
                                <input 
                                    type="text" 
                                    name="city"
                                    value={userProfile.city} 
                                    onChange={(e) => setUserProfile({...userProfile, city: e.target.value})}
                                    disabled={!isEditing}
                                    className="w-full rounded-md p-2 outline-none bg-surface border border-outline-variant"
                                />
                            </div>
                            {/* Quận */}
                            <div className="grid grid-cols-[150px_1fr] items-center gap-2">
                                <label htmlFor="">Quận</label>
                                <input 
                                    type="text" 
                                    name="district"
                                    value={userProfile.district} 
                                    onChange={(e) => setUserProfile({...userProfile, district: e.target.value})}
                                    disabled={!isEditing}
                                    className="w-full rounded-md p-2 outline-none bg-surface border border-outline-variant"
                                />
                            </div>
                            <button
                                type="submit"
                                disabled={!isEditing}
                                className={`px-8 py-2 rounded-3xl font-medium 
                                w-fit mt-8 ${isEditing ? 'bg-primary text-primary-on hover:bg-primary-shade duration-200 transition-colors ease-in-out' 
                                : 'bg-slate-400'}`}>Lưu</button>
                        </form>
                    </div>
                    {/* Hình ảnh */}
                    <div className="flex flex-col gap-10 px-10">
                        {/* Ảnh user */}
                        <motion.div
                            initial="initial"
                            whileHover="hover"
                            className="relative w-32 h-32 rounded-full overflow-hidden cursor-pointer"
                        >
                            <img
                                src=""
                                alt=""
                                className="bg-slate-300 rounded-full w-full h-full object-cover"
                            />
                            <motion.div
                                variants={{
                                    initial: { y: '100%' },
                                    hover: { y: '0%' },
                                }}
                                transition={{ duration: 0.4, ease: 'easeOut' }}
                                className="absolute top-0 left-0 w-full h-full rounded-full flex justify-center items-center backdrop-blur-md"
                            >
                                <CiCamera className="text-6xl text-white" />
                            </motion.div>
                        </motion.div>
                        <button className="bg-primary text-primary-on px-4 py-2 rounded-3xl font-medium 
                        hover:bg-primary-shade duration-200 transition-colors ease-in-out">Chọn ảnh</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ViewProfile
