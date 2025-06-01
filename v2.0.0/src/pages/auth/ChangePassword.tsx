import { useState } from "react";
import { LuEye, LuEyeClosed } from "react-icons/lu";
import { authAPI } from "../../api/auth.api";
import { toast } from "react-toastify";

const ChangePassword = () => {
    const [openPassword, setOpenPassword] = useState<boolean>(false);
    
    const [currentPassword, setCurrentPassword] = useState<string>('');
    const [newPassword, setNewPassword] = useState<string>('');
    const [confirmNewPassword, setConfirmNewPassword] = useState<string>('');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (newPassword !== confirmNewPassword) {
            toast.error('Mật khẩu mới và xác nhận mật khẩu không khớp!');
            return;
        }

        const isConfirmed = window.confirm("Bạn có chắc chắn muốn thay đổi mật khẩu?");
        if (!isConfirmed) return;

        try {
            await authAPI.changePassword({ currentPassword, newPassword });

            // Thông báo đổi mật khẩu thành công
            toast.success('Đổi mật khẩu thành công!');
            // Reset value input
            setCurrentPassword('');
            setNewPassword('');
            setConfirmNewPassword('');
        } catch (err) { 
            toast.error('Đổi mật khẩu thất bại');
            console.error(err.response?.data);
        }
    };

    return (
        <div className="bg-surface-1 dark:bg-dark-surface-1 rounded-3xl shadow-navigation dark:shadow-navigation-dark border border-outline-variant dark:border-dark-outline-variant">
            <div className="px-12 py-6">
                {/* Thông tin tiêu đề */}
                <div className="py-6 border-b border-outline-variant dark:border-dark-outline-variant flex flex-col gap-2">
                    <h1 className="text-3xl text-surface-on dark:text-dark-surface-on font-medium">
                        Thay đổi mật khẩu người dùng
                    </h1>
                    <p className="text-base text-surface-onVariant dark:text-dark-surface-onVariant">
                        Cho phép người dùng thay đổi mật khẩu hiện tại sang mật khẩu mới nhằm đảm bảo tính bảo mật cho tài khoản của họ
                    </p>
                </div>
                {/* Nội dung */}
                <div className="my-8 max-w-2xl">
                    {/* Button hiện thị mật khẩu */}
                    <div className="flex justify-end">
                        <button
                            onClick={() => setOpenPassword(!openPassword)}
                            className="flex items-center gap-2 bg-primary dark:bg-dark-primary text-surface-1 dark:text-dark-primary-on px-4 py-2 rounded-3xl font-medium mb-10 hover:bg-primary-shade dark:hover:bg-dark-primary-shade duration-200 transition-colors ease-in-out"
                        >
                            {openPassword ? (
                                <LuEye className=" dark:text-dark-primary translate-y-0.5 text-lg" />
                            ) : (
                                <LuEyeClosed className=" dark:text-dark-primary translate-y-0.5 text-lg" />
                            )}
                            <span>{openPassword ? 'Hiển thị' : 'Không hiển thị'}</span>
                        </button>
                    </div>
                    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                        <div className="grid grid-cols-[180px_1fr] items-center gap-6">
                            <label htmlFor="currentPassword" className="text-surface-onVariant dark:text-dark-surface-onVariant">
                                Mật khẩu hiện tại
                            </label>
                            <input 
                                id="currentPassword"
                                value={currentPassword}
                                onChange={(e) => setCurrentPassword(e.target.value)}
                                type={openPassword ? "text" : "password"} 
                                placeholder="Current Password"
                                className="w-full rounded-md p-2 outline-none bg-surface dark:bg-dark-surface border border-outline-variant dark:border-dark-outline-variant text-surface-on dark:text-dark-surface-on focus:ring-2 focus:ring-primary dark:focus:ring-dark-primary focus:border-primary dark:focus:border-dark-primary"
                            />
                        </div>
                        <div className="grid grid-cols-[180px_1fr] items-center gap-6">
                            <label htmlFor="newPassword" className="text-surface-onVariant dark:text-dark-surface-onVariant">
                                Mật khẩu mới
                            </label>
                            <input 
                                id="newPassword"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                type={openPassword ? "text" : "password"} 
                                placeholder="New Password"
                                className="w-full rounded-md p-2 outline-none bg-surface dark:bg-dark-surface border border-outline-variant dark:border-dark-outline-variant text-surface-on dark:text-dark-surface-on focus:ring-2 focus:ring-primary dark:focus:ring-dark-primary focus:border-primary dark:focus:border-dark-primary"
                            />
                        </div>
                        <div className="grid grid-cols-[180px_1fr] items-center gap-6">
                            <label htmlFor="confirmNewPassword" className="text-surface-onVariant dark:text-dark-surface-onVariant">
                                Xác nhận mật khẩu mới
                            </label>
                            <input 
                                id="confirmNewPassword"
                                value={confirmNewPassword}
                                onChange={(e) => setConfirmNewPassword(e.target.value)}
                                type={openPassword ? "text" : "password"} 
                                placeholder="Confirm New Password"
                                className="w-full rounded-md p-2 outline-none bg-surface dark:bg-dark-surface border border-outline-variant dark:border-dark-outline-variant text-surface-on dark:text-dark-surface-on focus:ring-2 focus:ring-primary dark:focus:ring-dark-primary focus:border-primary dark:focus:border-dark-primary"
                            />
                        </div>
                        {/* Button đổi mật khẩu */}
                        <button 
                            type="submit" 
                            className="bg-primary dark:bg-dark-primary text-surface-1 dark:text-dark-primary-on px-4 py-2 rounded-3xl font-medium hover:bg-primary-shade dark:hover:bg-dark-primary-shade duration-200 transition-colors ease-in-out w-fit mt-10"
                        >
                            Thay đổi mật khẩu
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ChangePassword;