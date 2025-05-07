import { CiClock2 } from "react-icons/ci";
import { IoLocationOutline } from "react-icons/io5";
import Logo2 from '../assets/images/logo_C4F_tachnen.png';
import { ChevronDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { PiCityLight } from "react-icons/pi";
import { SlSocialDribbble } from "react-icons/sl";
import { heroData, heroSearchDistrict } from "../Data/heroData";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight } from "react-icons/md";
import { Swiper as SwiperType } from "swiper/types";
import { Link, useNavigate } from "react-router-dom"; // Sửa Link import
import { jwtDecode } from "jwt-decode";

const getRoleFromToken = () => {
  const token = localStorage.getItem('accessToken');
  if (token) {
    try {
      const decodedToken: any = jwtDecode(token);
      console.log("Decoded Token: ", decodedToken);
      return decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'] || null;
    } catch (error) {
      console.error('Error decoding token:', error);
    }
  }
  return null;
};

const BookingPage = () => {
  const [role, setRole] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const pageSize = 12;
  const [currentPage, setCurrentPage] = useState(1);
  const swiperRef = useRef<SwiperType | null>(null);

  const [idSort, setIdSort] = useState(0); // Trạng thái cho nút lọc (Tất cả, Bóng đá, Cầu lông)
  const [searchSportId, setSearchSportId] = useState(0); // Trạng thái cho select tìm kiếm
  const [selectedDistrict, setSelectedDistrict] = useState(""); // Quận/huyện

  useEffect(() => {
    const tokenRole = getRoleFromToken();
    console.log("role:", tokenRole);
    setRole(tokenRole);
  }, []);

  const fetchData = async (page: number, sportId: number, district: string) => {
    try {
      const params: any = { page, pageSize };

      if (sportId === 1 || sportId === 2) {
        params.sportId = sportId;
      }
      if (district) {
        params.location = district;
      }

      const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/field`, { params });
      setData(response.data.items);
      setTotalPages(Math.ceil(response.data.totalItems / pageSize));
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const navigate = useNavigate();

  // Fetch dữ liệu khi nhấn nút lọc (Tất cả, Bóng đá, Cầu lông)
  useEffect(() => {
    fetchData(currentPage, idSort, ""); // Không dùng district khi lọc bằng nút
  }, [idSort, currentPage]);

  // Xử lý khi nhấn nút "Tìm kiếm"
  const handleSearch = () => {
    fetchData(currentPage, searchSportId, selectedDistrict); // Dùng searchSportId và district từ select
  };

  // Xử lý chọn môn thể thao từ select
  const handleSportChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = Number(e.target.value);
    setSearchSportId(value); // Chỉ cập nhật searchSportId, không ảnh hưởng idSort
  };

  // Xử lý chọn quận/huyện từ select
  const handleDistrictChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedDistrict(e.target.value);
  };

  return (
    <div className="h-fit pt-24">
      <div className="w-full max-w-[1200px] mx-auto mt-16">
        {/* Search */}
        <div className="border border-gray-300 rounded-lg backdrop-blur-xl">
          <div className="px-6 py-8">
            <h1 className="text-2xl font-semibold text-btn-primary">Đặt sân thể thao ngay</h1>
            <p className="text-base py-4">Tìm kiếm sân chơi thể thao, thi đấu tại TP.Hồ Chí Minh</p>
            <div className="flex items-center gap-4">
              {/* Select môn thể thao */}
              <div className="border border-gray-300 rounded-sm w-full">
                <div className="px-4 py-2 flex items-center gap-4 w-full">
                  <SlSocialDribbble />
                  <div className="w-[1px] h-6 bg-gray-300"></div>
                  <div className="relative w-full">
                    <select
                      className="w-full appearance-none focus:outline-none px-2"
                      value={searchSportId.toString()}
                      onChange={handleSportChange}
                      onClick={() => setIsOpen(true)}
                      onBlur={() => setIsOpen(false)}
                    >
                      <option value="0">Chọn môn thể thao</option>
                      {heroData.map((data) => (
                        <option key={data.id} value={data.id.toString()}>
                          {data.name}
                        </option>
                      ))}
                    </select>
                    <ChevronDown
                      className={`absolute top-0 right-0 text-gray-500 transition-transform duration-300 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </div>
                </div>
              </div>

              {/* Select tỉnh/thành phố */}
              <div className="border border-gray-300 rounded-sm w-full">
                <div className="px-4 py-2 flex items-center gap-4">
                  <PiCityLight />
                  <div className="w-[1px] h-6 bg-gray-300"></div>
                  <div className="relative w-full">
                    <select
                      className="w-full appearance-none focus:outline-none px-2"
                      onClick={() => setIsOpen(true)}
                      onBlur={() => setIsOpen(false)}
                      disabled
                    >
                      <option value="">Thành phố Hồ Chí Minh</option>
                    </select>
                    <ChevronDown
                      className={`absolute top-0 right-0 text-gray-500 transition-transform duration-300 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </div>
                </div>
              </div>

              {/* Select quận/huyện */}
              <div className="border border-gray-300 rounded-sm w-full">
                <div className="px-4 py-2 flex items-center gap-4">
                  <IoLocationOutline />
                  <div className="w-[1px] h-6 bg-gray-300"></div>
                  <div className="relative w-full">
                    <select
                      className="w-full appearance-none focus:outline-none px-2"
                      value={selectedDistrict}
                      onChange={handleDistrictChange}
                      onClick={() => setIsOpen(true)}
                      onBlur={() => setIsOpen(false)}
                    >
                      <option value="">Chọn quận/huyện</option>
                      {heroSearchDistrict.map((data) => (
                        <option key={data.id} value={data.nameDistrict}>
                          {data.nameDistrict}
                        </option>
                      ))}
                    </select>
                    <ChevronDown
                      className={`absolute top-0 right-0 text-gray-500 transition-transform duration-300 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="pt-8 flex justify-end">
              <button
                onClick={handleSearch}
                className="bg-btn-primary px-10 py-2.5 rounded-sm text-sm font-medium cursor-pointer"
              >
                Tìm kiếm
              </button>
            </div>
          </div>
        </div>

        {/* Header */}
        <div className="relative flex items-center justify-center py-16 w-full">
          <div className="absolute left-0 w-full border-t-2 border-gray-300"></div>
          <div className="relative px-6 py-2 bg-white border-2 border-gray-300 rounded-md shadow-sm flex items-center space-x-2">
            <img src={Logo2} alt="" className="w-10 h-10 object-cover" />
            <span className="text-black text-xl font-bold uppercase">danh sách sân thể thao</span>
          </div>
        </div>

        {/* Thể loại sân */}
        <div className="flex justify-end py-8 gap-4">
          <div>
            <button
              className={`px-5 py-1 rounded-2xl border border-gray-300 text-sm font-medium cursor-pointer shadow-2xl ${idSort === 0 ? 'bg-blue-500 text-white' : ''}`}
              onClick={() => setIdSort(0)}
            >
              Tất cả
            </button>
          </div>
          <div>
            <button
              className={`px-5 py-1 rounded-2xl border border-gray-300 text-sm font-medium cursor-pointer shadow-2xl ${idSort === 1 ? 'bg-blue-500 text-white' : ''}`}
              onClick={() => setIdSort(1)}
            >
              Bóng đá
            </button>
          </div>
          <div>
            <button
              className={`px-5 py-1 rounded-2xl border border-gray-300 text-sm font-medium cursor-pointer shadow-2xl ${idSort === 2 ? 'bg-blue-500 text-white' : ''}`}
              onClick={() => setIdSort(2)}
            >
              Cầu lông
            </button>
          </div>
        </div>

        {/* Quyền khởi tạo */}
        {role === 'Owner' || role === 'Admin' ? (
          <Link to="/field/create" className="flex justify-end py-6">
            <button className="px-6 py-2 bg-green-500 rounded-md text-white font-medium cursor-pointer">Tạo sân mới</button>
          </Link>
        ) : null}

        {/* Danh sách sân */}
        <Swiper
          modules={[Pagination, Navigation]}
          slidesPerView={1}
          onSlideChange={(swiper) => setCurrentPage(swiper.activeIndex + 1)}
          onSwiper={(swiper) => (swiperRef.current = swiper)}
          className="mySwiper"
        >
          {Array.from({ length: totalPages }).map((_, pageIndex) => (
            <SwiperSlide key={pageIndex}>
              <div className="grid grid-cols-4 grid-rows-3 gap-8">
                {data.map((field, index) => (
                  <div
                    onClick={() => navigate(`/field/${field.fieldId}`)}
                    key={index}
                    className="shadow-md hover:shadow-lg rounded-sm cursor-pointer hover:-translate-y-2 duration-300 transition-transform ease-linear relative"
                  >
                    <div className="p-6">
                      <img
                        src={Logo2}
                        alt=""
                        className="w-full h-[160px] object-cover rounded-xl mb-6 border border-gray-300 cursor-default"
                      />
                      <div className="flex flex-col gap-2">
                        <div>
                          <div className="flex items-center gap-2 text-sm">
                            <CiClock2 />
                            {field.status === 'Active' ? (
                              <span className="text-green-500">Đang mở cửa</span>
                            ) : (
                              <span className="text-red-500">Đang đóng cửa</span>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <p>Mở cửa:</p>
                          <p>{field.openHours}</p>
                        </div>
                        <h2 className="text-base text-btn-primary">{field.sportName}</h2>
                        <h1 className="text-xl font-medium">{field.fieldName}</h1>
                        <div className="flex items-center gap-2 text-sm">
                          <IoLocationOutline />
                          <span>{field.address}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Hiển thị số trang */}
        <div className="flex justify-center items-center gap-8 my-8">
          <button
            onClick={() => swiperRef.current?.slidePrev()}
            disabled={swiperRef.current?.activeIndex === 0}
            className={`bg-blue-500 text-white h-8 w-20 rounded text-sm font-medium flex justify-center items-center gap-1 group cursor-pointer 
              ${swiperRef.current?.activeIndex === 0 ? "opacity-50 cursor-not-allowed" : ""}`}
          >
            <MdOutlineKeyboardArrowLeft className="group-hover:-translate-x-0.5 duration-200 transition-all ease-in-out" />
            Trước
          </button>
          <p>
            Trang <span className="text-btn-primary">{currentPage}</span> / {totalPages}
          </p>
          <button
            onClick={() => swiperRef.current?.slideNext()}
            disabled={swiperRef.current?.activeIndex === swiperRef.current?.slides.length - 1}
            className={`bg-blue-500 text-white h-8 w-20 rounded text-sm font-medium flex justify-center items-center gap-1 group cursor-pointer 
              ${swiperRef.current?.activeIndex === swiperRef.current?.slides.length - 1 ? "opacity-50 cursor-not-allowed" : ""}`}
          >
            Sau
            <MdOutlineKeyboardArrowRight className="group-hover:translate-x-0.5 duration-200 transition-all ease-in-out" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingPage;