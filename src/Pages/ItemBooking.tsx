import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import Logo from '../assets/images/logo_C4F_tachnen.png';
import { IoLocationOutline } from "react-icons/io5"
import { CiClock2 } from "react-icons/ci";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import FootballIcon from "../assets/Icons/football.png";
const containerStyle = {
    width: "100%",
    height: "400px",
};

const centerDefault = { lat: 10.7769, lng: 106.7009 };


const ItemBooking = () => {
    const { id } = useParams(); // Lấy ID từ URL
    const [field, setField] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);

    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: "AIzaSyCLtpk5GN1QnAfW8G3IbBKHXiOy3kxR6Gw",
    });

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

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setUserLocation({
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                    });
                },
                (error) => console.error("Lỗi lấy vị trí:", error)
            );
        }
    }, []);

    
    if (loading) return <p>Đang tải...</p>;
    if (error) return <p>{error}</p>;
    if (!isLoaded) return <p>Loading...</p>;

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
            
                <div className="w-full">
                    <div className="flex flex-col gap-2 py-8">
                        {/* Tên sân */}
                        <h1 className="text-2xl font-medium">{field.fieldName}</h1>
                        {/* Vị trí */}
                        <div className="flex items-center gap-2 text-sm w-full">
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
                    <div className="grid grid-cols-[auto_1fr] gap-6 py-8">
                        <div className="flex flex-col gap-4">
                            {Array.from({ length: 5 }).map((_, i) => (
                                <img key={i} src={Logo} alt='' className="w-16 h-16 object-cover rounded-md bg-gray-200/50 p-2"/>
                            ))}
                        </div>
                        <img src={Logo} alt="" className="w-full max-w-2xl h-auto object-cover bg-gray-200/50 p-2 rounded-md"/>
                    </div>
                </div>
                {/* Tiện ích */}
                <div className="py-8">
                    <div className="flex items-center gap-2">
                        <div className="w-1.5 h-10 bg-btn-primary rounded-md"></div>
                        <h2 className="text-lg font-medium">Tiện ích</h2>
                    </div>
                    <div className="flex items-center gap-6 py-4">
                        {field.amenities.map((amenitie, index) => (
                            <div key={index} className="flex flex-col items-center bg-slate-100 px-4 py-2 rounded-xs">
                                <span className="text-sm font-medium">{amenitie.amenityName}</span>
                                <p className="text-xs font-light">{amenitie.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
                {/* Dịch vụ */}
                <div className="py-8">
                    <div className="flex items-center gap-2">
                        <div className="w-1.5 h-10 bg-btn-primary rounded-md"></div>
                        <h2 className="text-lg font-medium">Dịch vụ</h2>
                    </div>
                    <div className="flex items-center gap-6 py-4">
                        {field.services.map((service, index) => (
                            <div key={index} className="flex flex-col items-center bg-slate-100 px-4 py-2 rounded-xs">
                                <span className="text-sm font-medium">{service.name}</span>
                                <span className="text-sm flex items-center gap-1">
                                    Giá thuê:
                                    <span className="text-green-500">{service.price}</span>
                                </span>
                                <p className="text-xs font-light">{service.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
                {/* Vị trí sân */}
                <div className="py-8">
                    <div className="flex items-center gap-2">
                        <div className="w-1.5 h-10 bg-btn-primary rounded-md"></div>
                        <h2 className="text-lg font-medium">Vị trí sân</h2>
                    </div>
                    <div className="py-14">
                        <div className="rounded-md overflow-hidden">
                            <GoogleMap
                                mapContainerStyle={containerStyle}
                                center={userLocation || { lat: field.latitude, lng: field.longitude }}
                                zoom={15}
                            >
                                {/* Hiển thị vị trí hiện tại của user */}
                                {userLocation && (
                                    <Marker
                                        position={userLocation}
                                        label="Vị trí của bạn"
                                        icon={{
                                            url: "https://maps.google.com/mapfiles/ms/icons/blue-dot.png",
                                            scaledSize: new window.google.maps.Size(40, 40),
                                        }}
                                    />
                                )}

                                {/* Hiển thị vị trí sân bóng */}
                                <Marker
                                    position={{ lat: field.latitude, lng: field.longitude }}
                                    label="Sân bóng"
                                    icon={{
                                        url: FootballIcon,
                                        scaledSize: new window.google.maps.Size(40, 40),
                                    }}
                                />
                            </GoogleMap>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ItemBooking
