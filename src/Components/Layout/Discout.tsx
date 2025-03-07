import { IoIosArrowRoundForward } from "react-icons/io";
import Logo from "../../assets/images/LogoC4F.png";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { mainContentData } from "../../Data/mainContentData";
const Discout = () => {
    return (
        <div className="flex flex-col gap-4 py-8">
            <div className="relative flex items-center justify-center py-4">
                <div className="absolute left-0 w-full border-t-2 border-gray-300"></div>
                <div className="relative px-6 py-2 bg-white border-2 border-gray-300 rounded-md shadow-sm flex items-center space-x-2">
                    <img src={Logo} alt="" className="w-6 h-6 object-cover"/>
                    <span className="text-black text-xl font-bold uppercase">Ưu đãi</span>
                </div>
            </div>
            <p className="text-center text-text-primary">Khuyến mãi, giảm giá và ưu đãi đặc biệt dành riêng cho bạn</p>
            <div className="relative">
                <div className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2  z-[2] flex flex-col gap-4 items-center">
                    <h1 className="text-3xl font-semibold text-white">Tặng 1 đôi vớ thể thao!</h1>
                    <p className="text-base text-white">Khi nào đặt sân trên ứng dụng website</p>
                    <button className="flex items-center gap-1 group px-6 py-2 bg-btn-primary w-fit rounded-md cursor-pointer font-semibold">
                        Đặt sân
                        <IoIosArrowRoundForward className="translate-y-0.5 group-hover:translate-x-1 transition-transform duration-300 ease-in-out"/>
                    </button>
                </div>
                <div>
                    <Swiper
                        slidesPerView={1}
                        modules={[Autoplay, Pagination, Navigation]}
                        spaceBetween={30}
                        autoplay={{
                            delay: 3000, // Chuyển slide sau 3 giây
                            disableOnInteraction: false, // Không dừng khi người dùng tương tác
                        }}
                        pagination={{ clickable: true }}
                        navigation
                        >
                        {mainContentData.map((content) => (
                            <SwiperSlide key={content.id}>
                                <img src={content.image} alt={content.alt} className="w-full h-[400px] object-cover rounded-md"/>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>
        </div>
    )
}

export default Discout
