import { useFields } from "../Hooks/useFields";
import { CiClock2 } from "react-icons/ci";
import { IoLocationOutline } from "react-icons/io5";
import Logo  from '../assets/images/LogoC4FMain.png';
import Logo2  from '../assets/images/logo_C4F_tachnen.png';
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { PiCityLight } from "react-icons/pi";
import { SlSocialDribbble } from "react-icons/sl";
import { heroData, heroSearchDistrict } from "../Data/heroData";
import { CiSearch } from "react-icons/ci";
const BookingPage = () => {
    // Xoay icon 180
    const [isOpen, setIsOpen] = useState(false);
    

    const { fields, loading, error } = useFields(1, 10);
    
    if (loading) return <p>Loading fields...</p>;
    if (error) return <p>{error}</p>;

    
    return (
        <div className="h-screen pt-24">
            <div className="w-full max-w-[1200px] mx-auto mt-16">
                {/* Search */}
                <div className="border border-gray-300 rounded-lg backdrop-blur-xl">
                    <div className="px-6 py-8">
                        <h1 className="text-2xl font-semibold text-btn-primary">Đặt sân thể thao ngay</h1>
                        <p className="text-base py-4">Tìm kiếm sân chơi thể thao, thi đấu tại TP.Hồ Chí Minh</p>
                        <div className="flex items-center gap-4">
                            <div className="border border-gray-300 rounded-sm w-full">
                                <div className="px-4 py-2 flex items-center gap-4 w-full">
                                    <SlSocialDribbble/>
                                <div className="w-[1px] h-6 bg-gray-300"></div>
                                    <div className="relative w-full">
                                        <select
                                            className="w-full appearance-none focus:outline-none px-2"
                                            onClick={() => setIsOpen(true)}
                                            onBlur={() => setIsOpen(false)}
                                        >
                                            <option value="">Chọn môn thể thao</option>
                                            {heroData.map((data) => (
                                                <option key={data.id} value="">{data.name}</option>
                                            ))}
                                        </select>
                                        <ChevronDown className={`absolute top-0 right-0 text-gray-500 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}/>
                                    </div>
                                </div>
                            </div>
                            <div className="border border-gray-300 rounded-sm w-full">
                                <div className="px-4 py-2 flex items-center gap-4">
                                    <PiCityLight/>
                                    <div className="w-[1px] h-6 bg-gray-300"></div>
                                    <div className="relative w-full">
                                        <select
                                            className="w-full appearance-none focus:outline-none px-2"
                                            onClick={() => setIsOpen(true)}
                                            onBlur={() => setIsOpen(false)}
                                        >
                                            <option value="">Chọn tỉnh/thành phố</option>
                                            <option value="">Thành phố Hồ Chí Minh</option>                                       
                                        </select>
                                        <ChevronDown className={`absolute top-0 right-0 text-gray-500 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}/>
                                    </div>
                                </div>
                            </div>
                            <div className="border border-gray-300 rounded-sm w-full">
                                <div className="px-4 py-2 flex items-center gap-4">
                                    <IoLocationOutline/>
                                    <div className="w-[1px] h-6 bg-gray-300"></div>
                                    <div className="relative w-full">
                                        <select
                                            className="w-full appearance-none focus:outline-none px-2"
                                            onClick={() => setIsOpen(true)}
                                            onBlur={() => setIsOpen(false)}
                                        >
                                            <option value="">Chọn quận/huyện</option>
                                            {heroSearchDistrict.map((data) => (
                                                <option 
                                                    key={data.id} 
                                                    value="">
                                                    {data.nameDistrict}
                                                </option>
                                            ))}
                                        </select>
                                        <ChevronDown className={`absolute top-0 right-0 text-gray-500 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}/>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="pt-8 flex justify-end">
                            <button className="bg-btn-primary px-10 py-2.5 rounded-sm text-sm font-medium cursor-pointer">
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
                
                {/* Danh sách sân */}
                <div className="grid grid-cols-4 gap-8">
                    {fields.map((field) => (
                        <div key={field.id} className="border border-gray-200 rounded-sm">
                            <div className="p-6">
                                <img src="" alt="" className="w-full h-[160px] object-cover rounded-xl mb-6"/>
                                <div className="flex flex-col gap-2">
                                    {/* Mở cửa */}
                                    <div>
                                        <div className="flex items-center gap-2 text-sm">
                                            <CiClock2/>
                                            {field.Active === 'Active' 
                                            ? (<span className="text-green-500">
                                                Đang mở cửa
                                            </span>) 
                                            : (<span className="text-red-500">
                                                Đang đóng cửa
                                            </span>)}
                                        </div>                                
                                    </div>
                                    {/* Thời gian mở cửa */}
                                    <div className="flex items-center gap-2 text-sm">
                                        <p>Mở cửa:</p>
                                        <p>{field.openHours}</p>
                                    </div>    
                                    {/* Thể loại sân */}
                                    <h2>{field.sportName}</h2>
                                    {/* Tên sân */}
                                    <h1 className="text-xl font-medium">{field.fieldName}</h1>
                                    {/* Địa chỉ */}
                                    <div className="flex items-center gap-2 text-sm">
                                        <IoLocationOutline/>
                                        <span>{field.address}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default BookingPage
