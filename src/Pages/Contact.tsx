import Logo from "../assets/images/LogoC4F.png";
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-coverflow'; // Import hiệu ứng Coverflow
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { FiPhoneCall } from "react-icons/fi";
import { MdOutlineEmail } from "react-icons/md";
import { RiLinkedinFill } from "react-icons/ri";
import { FaFacebookF } from "react-icons/fa";


const Contact = () => {
  return (
    <div className="w-full h-screen pt-[96px]">
      <div className="max-w-[1200px] mx-auto py-10">
        <div className="relative flex items-center justify-center py-4 w-full">
          <div className="absolute left-0 w-full border-t-2 border-gray-300"></div>
          <div className="relative px-6 py-2 bg-white border-2 border-gray-300 rounded-md shadow-sm flex items-center space-x-2">
              <img src={Logo} alt="" className="w-6 h-6 object-cover" />
              <span className="text-black text-xl font-bold uppercase">Liên hệ với chúng tôi</span>
          </div>
        </div>
        <div className="grid grid-cols-[30%_70%] gap-8 pt-7">
          {/* Contact section */}
          <div>
            <Swiper
              effect="coverflow"
              grabCursor={true}
              centeredSlides={true}
              slidesPerView={1}
              coverflowEffect={{
                rotate: 30,
                stretch: 0,
                depth: 100,
                modifier: 1,
                slideShadows: true,
              }}
              speed={1500} // Quá trình chuyển trang
              modules={[EffectCoverflow, Navigation, Pagination, Autoplay]} 
              loop={true} // Lặp vô hạn
              autoplay={{
                delay: 5000, // Tự động chuyển sau 5s
                disableOnInteraction: false, // Không dừng khi user thao tác
              }}
              >
              {/* Slider 1 */}
              <SwiperSlide>
                <div className="border border-gray-300 rounded-md">
                  <div className="flex flex-col gap-8 px-6 py-8">
                    {/* Contact Phone */}
                    <div className="flex flex-col gap-6 pb-8 border-b-2 border-b-gray-300">
                      <div className="flex items-center gap-2">
                        <div className="p-2 bg-btn-primary rounded-full">
                          <FiPhoneCall className="text-white text-2xl"/>
                        </div>
                        <h1 className="text-lg font-semibold">Gọi cho chúng tôi</h1>
                      </div>
                      <span className="text-sm">Chúng tôi phục vụ 24/7, 7 ngày một tuần.</span>
                      <span className="text-sm">Điện thoại: <span className="font-semibold">+84 918 488 431</span></span>
                    </div>
                    {/* Contact Email*/}
                    <div className="flex flex-col gap-6">
                      <div className="flex items-center gap-2">
                        <div className="p-2 bg-btn-primary rounded-full">
                          <MdOutlineEmail className="text-white text-2xl"/>
                        </div>
                        <h1 className="text-lg font-semibold">Gửi email cho chúng tôi</h1>
                      </div>
                      <span className="text-sm">Hãy điền vào mẫu và chúng tôi sẽ liên hệ với bạn trong vòng 24 giờ.</span>
                      <span className="text-sm">Email: <span className="font-semibold">abc@gmail.com</span></span>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
              {/* Slider 2 */}
              <SwiperSlide>
                <div className="border border-gray-300 rounded-md">
                  <div className="flex flex-col gap-8 px-6 py-8">
                    {/* Contact Phone */}
                    <div className="flex flex-col gap-6 pb-8 border-b-2 border-b-gray-300">
                      <div className="flex items-center gap-2">
                        <div className="p-2 bg-btn-primary rounded-full">
                          <FaFacebookF className="text-white text-2xl"/>
                        </div>
                        <h1 className="text-lg font-semibold">Theo dỗi chúng tôi</h1>
                      </div>
                      <span className="text-sm">Chúng tôi phục vụ 24/7, 7 ngày một tuần.</span>
                      <span className="text-sm">Fanpage: <span className="font-semibold">Code For Food</span></span>
                    </div>
                    {/* Contact Email*/}
                    <div className="flex flex-col gap-6">
                      <div className="flex items-center gap-2">
                        <div className="p-2 bg-btn-primary rounded-full">
                          <RiLinkedinFill className="text-white text-2xl"/>
                        </div>
                        <h1 className="text-lg font-semibold">Gửi email cho chúng tôi</h1>
                      </div>
                      <span className="text-sm">Hãy điền vào mẫu và chúng tôi sẽ liên hệ với bạn trong vòng 24 giờ.</span>
                      <span className="text-sm">Linkedin: <span className="font-semibold">Code For Food</span></span>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            </Swiper>
          </div>
          {/* Input info contact */}
          <div className="px-8 py-6 flex flex-col gap-6 border border-gray-300 rounded-md">
            <div className="flex items-center justify-between">
              <input type="name" placeholder="Your Name" className="p-2 outline-none border border-gray-300 rounded-md bg-gray-100"/>
              <input type="email" placeholder="Your Email" className="p-2 outline-none border border-gray-300 rounded-md bg-gray-100"/>
              <input type="email" placeholder="Your Phone" className="p-2 outline-none border border-gray-300 rounded-md bg-gray-100"/>
            </div>
            <textarea 
              placeholder="Your Message"
              className="w-full h-full px-2 py-2 border border-gray-300 rounded-md bg-gray-100 outline-none overflow-y-auto resize-none"
            ></textarea>
            <div className="flex justify-end">
              <button className="text-white font-secondary bg-btn-primary px-6 py-2 
                rounded-md cursor-pointer shadow-[4px_4px_0px_#6b7280] hover:shadow-[6px_6px_0px_#6b7280] transition-all duration-300">Send Massage</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contact
