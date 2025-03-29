import { useFields } from "../Hooks/useFields";
import { CiClock2 } from "react-icons/ci";
import { IoLocationOutline } from "react-icons/io5";
import Logo  from '../assets/images/LogoC4FMain.png';;
import { ChevronDown } from "lucide-react";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
const BookingPage = () => {

    const { fields, loading, error } = useFields(1, 10);
    
    if (loading) return <p>Loading fields...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="h-screen pt-24">
            <div className="w-full max-w-[1200px] mx-auto">
                {/* Search */}
                <div>
                    <div>
                        <h1>Đặt sân thể thao ngay</h1>
                        <p>Tìm kiếm sân chơi thể thao, thi đấu tại TP.Hồ Chí Minh</p>
                        <div>
                            <div>
                            <Select>
                                <SelectTrigger className="w-[200px] border border-gray-300 bg-white p-2 rounded-lg shadow-md">
                                    <SelectValue placeholder="Chọn một tùy chọn" />
                                </SelectTrigger>
                                <SelectContent className="bg-gray-800 text-white">
                                    <SelectItem value="option1" className="hover:bg-blue-500">Option 1</SelectItem>
                                    <SelectItem value="option2" className="hover:bg-green-500">Option 2</SelectItem>
                                    <SelectItem value="option3" className="hover:bg-red-500">Option 3</SelectItem>
                                </SelectContent>
                            </Select>
                                <ChevronDown className="absolute right-3 top-3 text-gray-500 pointer-events-none" />
                            </div>
                        </div>
                    </div>
                </div>
                {/* Header */}
                <div className="relative flex items-center justify-center py-16 w-full">
                    <div className="absolute left-0 w-full border-t-2 border-gray-300"></div>
                    <div className="relative px-6 py-2 bg-white border-2 border-gray-300 rounded-md shadow-sm flex items-center space-x-2">
                        <img src={Logo} alt="" className="w-10 h-10 object-cover" />
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
