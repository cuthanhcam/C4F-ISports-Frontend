import { Link } from "react-router-dom"

const VerifyEmail = () => {
    return (
        <div className="bg-surface dark:bg-dark-surface min-h-screen flex items-center justify-center">
            <div className="container max-w-2xl mx-8 md:mx-0 flex flex-col items-center gap-4 md:gap-6 border border-outline-variant dark:border-dark-outline-variant bg-surface-1 dark:bg-dark-surface-1 shadow-navigation dark:shadow-navigation-dark p-12 rounded-3xl relative z-[0]">
                <div className="home-header-light-blue dark:bg-[radial-gradient(closest-side_at_50%_50%,_#4b6cb7,_transparent)]" />
                <div className="home-header-light-pink dark:bg-[radial-gradient(closest-side_at_50%_50%,_#9b59b6,_transparent)]" />
                <h1 className="text-3xl text-center text-surface-on dark:text-dark-surface-on font-bold">
                    Tài khoản của bạn đã được xác thực!
                </h1>
                <p className="text-base text-surface-onVariant dark:text-dark-surface-onVariant text-center">
                    Bạn đã xác minh thành công email. Giờ đây bạn có thể đăng nhập để sử dụng hệ thống.
                </p>
                <Link
                    to="/auth/login"
                    className="bg-primary dark:bg-dark-primary px-4 py-2 rounded-md text-base font-medium text-surface-on dark:text-dark-primary-on hover:bg-primary-inverse dark:hover:bg-dark-primary-shade hover:no-underline duration-200 transition-all ease-in-out"
                >
                    Đăng nhập ngay
                </Link>
            </div>
        </div>
    );
};

export default VerifyEmail;