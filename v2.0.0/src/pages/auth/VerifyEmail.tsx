import { Link } from "react-router-dom"

const VerifyEmail = () => {
    return (
        <div className="bg-surface min-h-screen flex items-center justify-center">
            <div className="container max-w-2xl mx-8 md:mx-0 flex flex-col items-center gap-4 md:gap-6 border border-outline-variant
            bg-surface-2 shadow-navigation p-12 rounded-3xl relative z-[0]">
                <div className="home-header-light-blue"/>
                <div className="home-header-light-pink"/>
                <h1 className="text-3xl text-center text-surface-on font-bold">Tài khoản của bạn đã được xác thực!</h1>
                <p className="text-base text-surface-onVariant text-center">Bạn đã xác minh thành công email. Giờ đây bạn có thể đăng nhập để sử dụng hệ thống.</p>
                <Link to='/auth/login' className="bg-primary px-4 py-2 rounded-md text-base font-bold 
                hover:bg-primary-shade hover:no-underline duration-200 transition-all">Đăng nhập ngay</Link>
            </div>
        </div>
    )
}

export default VerifyEmail
