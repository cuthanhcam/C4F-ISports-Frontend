import { useState } from "react";
import { useLocation, useNavigate } from "react-router"
import { toast } from 'react-toastify';
import { authAPI } from "../../api/auth.api";
import { LuEye, LuEyeClosed } from "react-icons/lu";
import { IoClose } from "react-icons/io5";
const ResetPassword = () => {
    const navigate = useNavigate();
    // Lấy email và token người dùng từ URL
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const email = searchParams.get('email');
    const token = searchParams.get('token');

    // Reset password
    const [newPassword, setNewPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    
    // Xử lý đặt lại mật khẩu
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Kiểm tra mật khẩu
        if (newPassword !== confirmPassword) {
            toast.error('Mật khẩu không khớp với nhau!')
            return;
        }

        try {
            const res = await authAPI.resetPassword({
                email,
                token,
                newPassword,
            });
            
            // Thông báo thành công
            toast.success('Đặt lại mật khẩu thành công!');
            // Chuyển hướng về trang đăng nhập
            navigate('/auth/login');
        } catch (err) {
            toast.error('Đặt mật khẩu thất bại');
            console.error(err);
        }

    }

    // Open show password
    const [showPassword, setShowPassword] = useState<boolean>(false);

    return (
        <div className="flex w-full h-screen justify-center items-center">
            <div className="bg-surface w-[380px] sm:w-[480px] md:w-[612px] h-[380px] flex items-center justify-center rounded-md gap-4 shadow-xunit relative">
                <button 
                    onClick={() => navigate('/')}
                    className="absolute top-1 right-1 p-2 hover:scale-125 duration-200 transition-all ease-in-out">
                    <IoClose className="text-2xl text-primary"/>
                </button>
                <div className="w-full max-w-sm p-6">
                    <h1 className="text-2xl text-surface-on font-medium text-center">Đặt lại mật khẩu</h1>
                    <form onSubmit={handleSubmit} className="flex flex-col gap-6 mt-10">
                        <div className="relative">
                            <input 
                                type={showPassword ? "text" : "password"} 
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                required 
                                placeholder="Email" 
                                className="p-2 outline-none rounded-sm border border-outline-variant bg-surface text-surface-on w-full"
                            />
                            {showPassword ? <LuEye onClick={() => setShowPassword(!showPassword)} className="absolute top-1/2 -translate-y-1/2 right-2 text-primary cursor-pointer"/> 
                            : <LuEyeClosed onClick={() => setShowPassword(!showPassword)} className="absolute top-1/2 -translate-y-1/2 right-2 text-primary cursor-pointer"/>}
                        </div>
                        <div className="relative">
                            <input 
                                type={showPassword ? "text" : "password"} 
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                                placeholder="Confirm password" 
                                className="p-2 outline-none rounded-sm border border-outline-variant bg-surface text-surface-on w-full"
                            />
                            {showPassword ? <LuEye onClick={() => setShowPassword(!showPassword)} className="absolute top-1/2 -translate-y-1/2 right-2 text-primary cursor-pointer"/> 
                            : <LuEyeClosed onClick={() => setShowPassword(!showPassword)} className="absolute top-1/2 -translate-y-1/2 right-2 text-primar text-primary cursor-pointer"/>}
                        </div>
                        <button type="submit" className="bg-primary py-2 rounded-sm text-primary-on font-medium hover:bg-primary-shade duration-100 transition-all ease-in-out">Xác nhận</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default ResetPassword
