import { Link, useNavigate } from 'react-router';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/autoplay';
import { LoginItem } from '../../constants/login';
import { IoClose } from "react-icons/io5";
import { useState } from 'react';
import { LuEye, LuEyeClosed } from 'react-icons/lu';
import { authAPI } from '../../api/auth.api';
import { toast } from 'react-toastify';
const Register = () => {
  // Routing
  const navigate = useNavigate(); 

  // Open show password
  const [isOpenPassword, setIsOpenPassword] = useState<boolean>(false);


  // Dữ liệu từ người dùng nhập form đăng ký
  const [fullName, setFullName] = useState<string>(''); 
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [role, setRole] = useState<string>('');



  // Xử lý sự kiện đăng ký
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Mật khẩu không khớp với nhau
    if (password !== confirmPassword) {
      return;
    }

    // Gọi api
    try {
      const res = await authAPI.register({
        fullName,
        email,
        phone,
        password,
        confirmPassword,
        role
      });
      // Thông báo sau khi đăng ký thành công
      toast.success('Đăng ký thành công!');
      // Chuyển hướng về trang đăng nhập
      navigate('/auth/login');
    } catch (err) {
      console.log("Lỗi server:", err.response?.data);
      toast.error('Đăng ký thất bại');
      console.error(err);
    }
  }

  return (
    <div className='flex w-full h-screen justify-center items-center mt-[44px]'>
      <div className='max-w-4xl mx-auto'>
        {/* Banner image*/}
        <div className='grid grid-cols-1 lg:grid-cols-2 max-w-4xl w-full h-[517px]  md:h-[580px] overflow-hidden rounded-xl relative '> 
            <button 
              onClick={() => navigate('/')}
              className='absolute top-0 right-0 p-2'>
              <IoClose className='text-2xl text-surface-on hover:scale-125 hover:text-primary duration-300 transition-all ease-in-out'/>
            </button>
            <div className='overflow-hidden hidden lg:block'>
              <Swiper
                className='w-full h-full'
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
                  <SwiperSlide key={item.id} className='w-full h-full'>
                    {/* Image */}
                    <div className='relative w-full h-full'>
                        <img src={item.image} alt="" className='w-full h-full object-cover'/>
                        <div className='absolute inset-0 backdrop-blur-xs bg-surface/40 z-10'></div>
                        <div className='absolute bottom-12 left-8 flex items-start gap-2 z-20'>
                          {/* Logo */}
                          <img src="" alt="" className='w-14 h-14'/>
                          <div className=''>
                            <h1 className='text-3xl text-surface-on font-bold'>C4F-ISports</h1>
                            <h3 className='text-base text-surface-onVariant'>Đặt sân ngay</h3>
                          </div>
                        </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
            
          
          {/* Form login */}
          <div className='bg-surface-1 h-full min-w-[380px] md:min-w-[480px] lg:w-auto'>
            <div className='p-6 flex flex-col justify-center mx-auto gap-4 md:gap-6 max-w-xs md:max-w-sm w-full h-full'>
              <h1 className='text-xl md:text-2xl text-surface-on font-medium'>Tạo tài khoản mới</h1>
              <span className='text-sm md:text-base text-surface-onVariant'>Nếu bạn đã có tài khoản, {' '}
                <Link to='/auth/login' className='text-primary hover:text-primary-inverse font-medium duration-100 transition-all ease-in-out'>đăng nhập</Link>
              </span>
              <form onSubmit={handleSubmit} className='flex flex-col gap-2 md:gap-4'>
                  {/* Name */}
                  <input 
                    type="text" 
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                    placeholder='Name' 
                    className='p-2 text-surface-on rounded-md outline-none border border-outline-variant bg-surface'
                  />
                  {/* Email */}
                  <input 
                    type="email"
                    name='email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder='Email'
                    className='p-2 text-surface-on rounded-md outline-none border border-outline-variant bg-surface'
                  />
                  {/* Phone */}
                  <input 
                    type="text" 
                    name='phone'
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                    placeholder='Phone' 
                    className='p-2 text-surface-on rounded-md outline-none border border-outline-variant bg-surface'
                  />
                  {/* Password */}
                  <div className='relative'>
                    <input 
                      type={isOpenPassword ? "text" : "password"} 
                      name='password'
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      placeholder='Password' 
                      className='text-surface-on p-2 rounded-md outline-none border border-outline-variant bg-surface w-full'
                    />
                    {isOpenPassword ? <LuEye onClick={() => setIsOpenPassword(!isOpenPassword)} className='text-primary absolute top-1/2 -translate-y-1/2 right-2 cursor-pointer'/> 
                    : <LuEyeClosed onClick={() => setIsOpenPassword(!isOpenPassword)} className='text-primary absolute top-1/2 -translate-y-1/2 right-2 cursor-pointer'/>}
                  </div>
                  {/* Confirm password */}
                  <div className='relative'>
                    <input 
                      type={isOpenPassword ? "text" : "password"} 
                      name='confirmPassword'
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                      placeholder='Confirm password' 
                      className='text-surface-on p-2 rounded-md outline-none border border-outline-variant bg-surface w-full'
                    />
                    {isOpenPassword ? <LuEye onClick={() => setIsOpenPassword(!isOpenPassword)} className='text-primary absolute top-1/2 -translate-y-1/2 right-2 cursor-pointer'/> 
                    : <LuEyeClosed onClick={() => setIsOpenPassword(!isOpenPassword)} className='text-primary absolute top-1/2 -translate-y-1/2 right-2 cursor-pointer'/>}
                  </div>
                  {/* Select role */}
                  <select 
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className='p-2 text-surface-on rounded-md outline-none border border-outline-variant bg-surface'>
                    <option value="">Chọn vai trò</option>
                    <option value="User">User</option>
                    <option value="Owner">Owner</option>
                    <option value="Admin">Admin</option>
                  </select>
                  {/* Submit */}
                  <button type='submit' className='bg-primary font-medium px-2 py-2 mt-6 rounded-md text-primary-on hover:bg-primary-shade duration-100 transition-all ease-in-out'>Submit</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
