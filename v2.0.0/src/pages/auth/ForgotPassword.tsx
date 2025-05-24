import { useState } from "react";
import { IoArrowBackOutline } from "react-icons/io5";
import { useNavigate } from "react-router";
import { authAPI } from "../../api/auth.api";
import { toast } from 'react-toastify';
const ForgotPassword = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState<string>('');
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const res = await authAPI.forgotPassword({ email });
            
            // Thông báo 
            toast.success('Link đặt lại mật khẩu đã được gửi, vui lòng kiểm tra email!');
            
            // Chuyển hướng sang trang chính
            navigate('/');
        } catch (err) { 
            console.error(err);
            toast.error('Đặt lại mật khẩu thất bại!');
        }
    };

    return (
        <div className="flex w-full h-screen justify-center items-center">
            <div className="bg-surface w-[380px] md:w-[512px] h-[280px] flex items-center justify-center rounded-md gap-4 shadow-xunit relative">
                <button 
                    onClick={() => navigate(-1)}
                    className="absolute top-6 left-6">
                    <IoArrowBackOutline className="text-primary text-2xl hover:-translate-x-1 duration-200 transition-all ease-in-out"/>
                </button>
                <div className="w-full max-w-sm p-6">
                    <h1 className="text-2xl text-surface-on font-medium text-center">Đặt lại mật khẩu</h1>
                    <form onSubmit={handleSubmit} className="flex flex-col gap-6 mt-10">
                        <input 
                            type="email" 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            placeholder="Email" 
                            className="p-2 outline-none rounded-sm border border-outline-variant bg-surface text-surface-on"/>
                        <button type="submit" className="bg-primary py-2 rounded-sm text-primary-on font-medium hover:bg-primary-shade duration-100 transition-all ease-in-out">Tiếp theo</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default ForgotPassword
