import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import Logo from '../assets/images/logo_C4F_tachnen.png';
import { IoLocationOutline } from "react-icons/io5"
import { CiClock2 } from "react-icons/ci";
const ItemBooking = () => {
    const { id } = useParams(); // Lấy ID từ URL
    const [field, setField] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchField = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/field/${id}`);
                setField(response.data);
            } catch (error) {
                console.error(error);
                setError("Không thể tải thông tin sân.");
            } finally {
                setLoading(false);
            }
        };

        fetchField();
    }, [id]);
    

    if (loading) return <p>Đang tải...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="h-fit pt-24">
            <div className="w-full max-w-[1200px] mx-auto mt-16">
                {/* Header */}
                <div className="relative flex items-center justify-center py-16 w-full">
                    <div className="absolute left-0 w-full border-t-2 border-gray-300"></div>
                    <div className="relative px-6 py-2 bg-white border-2 border-gray-300 rounded-md shadow-sm flex items-center space-x-2">
                        <img src={Logo} alt="" className="w-10 h-10 object-cover" />
                        <span className="text-black text-xl font-bold uppercase">Thông tin chi tiết sân</span>
                    </div>
                </div>
                {/* Content */}
                <div className="grid grid-cols-[auto_1fr]">
                    <div>
                        {/* Tên sân */}
                        <h1>{field.fieldName}</h1>
                        {/* Vị trí */}
                        <div className="flex items-center gap-2 text-sm">
                            <IoLocationOutline/>
                            <span>{field.address}</span>
                        </div>
                        {/* Thời gian hoạt động */}
                        <div className="flex items-center gap-2 text-sm">
                            <span>Mở cửa</span>
                            <span>{field.openHours}</span>
                        </div>
                        {/* Trạng thái sân*/}
                        <div className="flex items-center gap-2 text-sm">
                            <CiClock2/>
                            {field.status === 'Active' 
                            ? (<span className="text-green-500">
                                Đang mở cửa
                            </span>) 
                            : (<span className="text-red-500">
                                Đang đóng cửa
                            </span>)}
                        </div>   
                              
                    </div>
                    <div></div>
                </div>
            </div>
        </div>
    )
}

export default ItemBooking
