import { Link, useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/autoplay';
import { LoginItem } from '../../constants/login';
import { IoClose } from 'react-icons/io5';
import { useState } from 'react';
import { LuEye, LuEyeClosed } from 'react-icons/lu';
import { authAPI } from '../../api/auth.api';
import { toast } from 'react-toastify';
import { useUser } from '../../context/UserContext';
import Logo from "../../assets/images/Logo_C4F.svg"

const Login = () => {
  // Routing
  const navigate = useNavigate();
  const { retryFetchUser } = useUser();

  // Open show password
  const [isOpenPassword, setIsOpenPassword] = useState<boolean>(false);

  // Lấy dữ liệu từ người dùng khi nhập vào form
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  // Xử lý sự kiện đăng nhập
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const res = await authAPI.login({ email, password });

      localStorage.setItem('token', res.data.token);
      localStorage.setItem('role', res.data.role);
      localStorage.setItem('refreshToken', res.data.refreshToken);

      toast.success('Đăng nhập thành công!');

      try {
        if (retryFetchUser) {
          await retryFetchUser();
        } else {
          console.warn('retryFetchUser không tồn tại');
        }
      } catch (fetchErr) {
        console.error('Fetch user failed:', fetchErr);
        toast.warn('Đăng nhập thành công, nhưng không lấy được thông tin người dùng.');
      }

      navigate('/dashboard');
    } catch (err) {
      console.error('Lỗi đăng nhập:', err);
      toast.error('Đăng nhập thất bại');
    }
  };

  return (
    <div className="flex w-full h-screen justify-center items-center mt-[44px]">
      <div className="max-w-4xl mx-auto">
        {/* Banner image */}
        <div className="grid grid-cols-1 lg:grid-cols-2 max-w-4xl w-full h-[417px] md:h-[517px] overflow-hidden rounded-xl relative">
          <button
            onClick={() => navigate('/')}
            className="absolute top-0 right-0 p-2"
          >
            <IoClose className="text-2xl text-surface-on dark:text-dark-surface-on hover:scale-125 hover:text-primary dark:hover:text-dark-primary duration-300 transition-all ease-in-out" />
          </button>
          <div className="overflow-hidden hidden lg:block">
            <Swiper
              className="w-full h-full"
              modules={[Autoplay]}
              slidesPerView={1}
              spaceBetween={0}
              loop={true}
              autoplay={{
                delay: 0,
                disableOnInteraction: false,
              }}
              speed={2000}
              allowTouchMove={false}
            >
              {LoginItem.map((item) => (
                <SwiperSlide key={item.id} className="w-full h-full">
                  {/* Image */}
                  <div className="relative w-full h-full">
                    <img
                      src={item.image}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 backdrop-blur-xs bg-surface/40 dark:bg-dark-surface/40 z-10"></div>
                    <div className="absolute bottom-12 left-8 flex items-start gap-2 z-20">
                      {/* Logo */}
                      <img src={Logo} alt="" className="w-14 h-14" />
                      <div>
                        <h1 className="text-3xl text-surface-on dark:text-dark-surface-on font-bold">
                          C4F-ISports
                        </h1>
                        <h3 className="text-base text-surface-onVariant dark:text-dark-surface-onVariant">
                          Đặt sân ngay
                        </h3>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          {/* Form login */}
          <div className="bg-surface-1 dark:bg-dark-surface-1 h-full min-w-[380px] md:min-w-[480px] lg:w-auto">
            <div className="p-6 flex flex-col justify-center mx-auto gap-4 md:gap-6 max-w-xs md:max-w-sm w-full h-full">
              <h1 className="text-xl md:text-2xl text-surface-on dark:text-dark-surface-on font-medium">
                Đăng nhập
              </h1>
              <span className="text-sm md:text-base text-surface-onVariant dark:text-dark-surface-onVariant">
                Nếu bạn chưa có tài khoản,{' '}
                <Link
                  to="/auth/register"
                  className="text-primary dark:text-dark-primary hover:text-primary-inverse dark:hover:text-dark-primary-shade font-medium duration-100 transition-all ease-in-out"
                >
                  đăng ký ngay
                </Link>
              </span>
              <form onSubmit={handleSubmit} className="flex flex-col gap-2 md:gap-4">
                {/* Email */}
                <input
                  type="email"
                  value={email}
                  placeholder="Email"
                  onChange={(e) => setEmail(e.target.value)}
                  className="text-surface-on dark:text-dark-surface-on p-2 rounded-md outline-none border border-outline-variant dark:border-dark-outline-variant bg-surface dark:bg-dark-surface focus:ring-2 focus:ring-primary dark:focus:ring-dark-primary focus:border-primary dark:focus:border-dark-primary"
                />
                {/* Password */}
                <div className="relative">
                  <input
                    type={isOpenPassword ? 'text' : 'password'}
                    value={password}
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                    className="text-surface-on dark:text-dark-surface-on p-2 rounded-md outline-none border border-outline-variant dark:border-dark-outline-variant bg-surface dark:bg-dark-surface w-full focus:ring-2 focus:ring-primary dark:focus:ring-dark-primary focus:border-primary dark:focus:border-dark-primary"
                  />
                  {isOpenPassword ? (
                    <LuEye
                      onClick={() => setIsOpenPassword(!isOpenPassword)}
                      className="text-primary dark:text-dark-primary absolute top-1/2 -translate-y-1/2 right-2 cursor-pointer"
                    />
                  ) : (
                    <LuEyeClosed
                      onClick={() => setIsOpenPassword(!isOpenPassword)}
                      className="text-primary dark:text-dark-primary absolute top-1/2 -translate-y-1/2 right-2 cursor-pointer"
                    />
                  )}
                </div>
                {/* Forgot password and save password */}
                <div className="flex justify-between">
                  <div className="flex items-center gap-1 text-surface-onVariant dark:text-dark-surface-onVariant">
                    <input type="checkbox" />
                    <span className="text-xs md:text-sm">Remember</span>
                  </div>
                  <Link
                    to="/auth/forgot-password"
                    className="text-primary dark:text-dark-primary text-xs md:text-sm font-medium hover:text-primary-inverse dark:hover:text-dark-primary-shade"
                  >
                    Forgot password?
                  </Link>
                </div>
                {/* Submit */}
                <button
                  type="submit"
                  className="bg-primary dark:bg-dark-primary font-medium px-2 py-2 mt-6 rounded-md text-surface-1 dark:text-dark-primary-on hover:bg-primary-shade dark:hover:bg-dark-primary-shade duration-100 transition-all ease-in-out"
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;