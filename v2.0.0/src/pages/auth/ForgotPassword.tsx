import { useState } from "react";
import { IoArrowBackOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
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
            <div className="bg-surface-1 dark:bg-dark-surface-1 w-[380px] md:w-[512px] h-[280px] flex items-center justify-center rounded-md gap-4 shadow-navigation dark:shadow-navigation-dark border border-outline-variant dark:border-dark-outline-variant relative">
                <button 
                    onClick={() => navigate(-1)}
                    className="absolute top-6 left-6"
                >
                    <IoArrowBackOutline className="text-primary dark:text-dark-primary text-2xl hover:-translate-x-1 duration-200 transition-all ease-in-out" />
                </button>
                <div className="w-full max-w-sm p-6">
                    <h1 className="text-2xl text-surface-on dark:text-dark-surface-on font-medium text-center">
                        Đặt lại mật khẩu
                    </h1>
                    <form onSubmit={handleSubmit} className="flex flex-col gap-6 mt-10">
                        <input 
                            type="email" 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            placeholder="Email" 
                            className="p-2 outline-none rounded-md border border-outline-variant dark:border-dark-outline-variant bg-surface dark:bg-dark-surface text-surface-on dark:text-dark-surface-on focus:ring-2 focus:ring-primary dark:focus:ring-dark-primary focus:border-primary dark:focus:border-dark-primary"
                        />
                        <button 
                            type="submit" 
                            className="bg-primary dark:bg-dark-primary py-2 rounded-md text-surface-1 dark:text-dark-primary-on font-medium hover:bg-primary-shade dark:hover:bg-dark-primary-shade duration-100 transition-all ease-in-out"
                        >
                            Tiếp theo
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;