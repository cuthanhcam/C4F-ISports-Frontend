
import { useState } from "react";
import { LuEye, LuEyeClosed } from "react-icons/lu";
import { authAPI } from "../../api/auth.api";
import { toast } from "react-toastify";
const ChangePassword = () => {
    
    const [openPassword, setOpenPassword] = useState<boolean>(false);
    
    const [CurrentPassword, setCurrentPassword] = useState<string>('');
    const [NewPassword, setNewPassword] = useState<string>('');
    const [confirmNewPassword, setConfirmNewPassword] = useState<string>('');
    console.log(CurrentPassword, NewPassword);
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (NewPassword !== confirmNewPassword) {
            return;
        }

        const isConfirmed = window.confirm("Bạn có chắc chắn muốn thay đổi mật khẩu?");
        if (!isConfirmed) return;

        try {
            await authAPI.changePassword({ CurrentPassword, NewPassword });

            // Thông báo đổi mật khẩu thành công
            toast.success('Đổi mật khẩu thành công!');
            // Reset value input
            setCurrentPassword('');
            setNewPassword('');
            setConfirmNewPassword('');
        } catch (err) { 
            console.log(err.response.data);
        }
    }


    return (
        <div className="bg-surface-1 rounded-3xl">
            <div className="px-12 py-6">
                {/* Thông tin tiêu đề */}
                <div className="py-6 border-b border-outline-variant flex flex-col gap-2">
                    <h1 className="text-3xl text-surface-on font-medium">Thay đổi mật khẩu người dùng</h1>
                    <p className="text-base text-surface-onVariant">Cho phép người dùng thay đổi mật khẩu hiện tại sang mật khẩu mới nhằm đảm bảo tính bảo mật cho tài khoản của họ</p>
                </div>
                {/* Nội dung */}
                <div className="my-8 max-w-2xl">
                    {/* Button hiện thị mật khẩu */}
                    <div className="flex justify-end">
                        <button
                            onClick={() => setOpenPassword(!openPassword)}
                            className="flex items-start gap-2 bg-primary text-primary-on px-4 py-2 rounded-3xl font-medium mb-10 hover:bg-primary-shade duration-200 transition-colors ease-in-out"
                            >
                            {openPassword ? <LuEye className="translate-y-1 text-lg"/> : <LuEyeClosed className="text-lg translate-y-1"/>}
                            <span>{openPassword ? 'Hiện thị' : 'Không hiển thị'}</span>
                        </button>
                    </div>
                    <form onSubmit={handleSubmit} className=" text-surface-on flex flex-col gap-6">
                        <div className="grid grid-cols-[180px_1fr] items-center gap-6">
                            <label htmlFor="">Mật khẩu hiện tại</label>
                            <input 
                                value={CurrentPassword}
                                onChange={(e) => setCurrentPassword(e.target.value)}
                                type={openPassword ? "text" : "password"} 
                                className="w-full rounded-md p-2 outline-none bg-surface border border-outline-variant"/>
                        </div>
                        <div className="grid grid-cols-[180px_1fr] items-center gap-6">
                            <label htmlFor="">Mật khẩu khẩu mới</label>
                            <input 
                                value={NewPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                type={openPassword ? "text" : "password"}  
                                className="w-full rounded-md p-2 outline-none bg-surface border border-outline-variant"/>
                        </div>
                        <div className="grid grid-cols-[180px_1fr] items-center gap-6">
                            <label htmlFor="">Xác nhận mật khẩu mới</label>
                            <input 
                                value={confirmNewPassword}
                                onChange={(e) => setConfirmNewPassword(e.target.value)}
                                type={openPassword ? "text" : "password"} 
                                className="w-full rounded-md p-2 outline-none bg-surface border border-outline-variant"/>
                        </div>
                        {/* Button đổi mật khẩu */}
                        <button type="submit" className=" bg-primary text-primary-on px-4 py-2 rounded-3xl font-medium hover:bg-primary-shade duration-200 transition-colors ease-in-out w-fit mt-10">Thay đổi mật khẩu</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default ChangePassword
