import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import Logo from '../assets/images/logo_C4F_tachnen.png';
import { IoLocationOutline } from "react-icons/io5"
import { CiClock2 } from "react-icons/ci";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import FootballIcon from "../assets/Icons/football.png";
import Badminton from '../assets/Icons/badminton.png';
import Basketball from '../assets/Icons/basketball.png';
import vollayball from '../assets/Icons/block.png';
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import { jwtDecode } from "jwt-decode";

const containerStyle = {
    width: "100%",
    height: "400px",
};

const images = [
    Logo,
    Badminton,
    Basketball,
    vollayball,
    FootballIcon
];

const centerDefault = { lat: 10.7769, lng: 106.7009 };


const getRoleFromToken = () => {
    const token = localStorage.getItem('accessToken');
    if (token) {
        try {
            const decodedToken: any = jwtDecode(token); // Giải mã token
            console.log("Decoded Token: ", decodedToken);  // In ra payload để kiểm tra
            // Truy xuất đúng role với tiền tố đầy đủ
            return decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'] || null;
        } catch (error) {
            console.error('Error decoding token:', error);
        }
    }
    return null; // Nếu không có token, trả về null
};




const ItemBooking = () => {


    const [role, setRole] = useState<string | null>(null);

    const { id } = useParams(); // Lấy ID từ URL
    const [field, setField] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
    const [currentImage, setCurrentImage] = useState(0);

    const [mainImage, setMainImage] = useState(images[0]);

    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: "AIzaSyCLtpk5GN1QnAfW8G3IbBKHXiOy3kxR6Gw",
    });

    useEffect(() => {
            // Gọi getRoleFromToken chỉ một lần để lấy giá trị role
            const tokenRole = getRoleFromToken();
            console.log("role:", tokenRole);
            setRole(tokenRole);
        }, []); // Chạy một lần khi component mount


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


   

    const handleDeleteField = async (id: number) => {
        if (role === 'Owner' || role === 'Admin') {
          try {
            // Thêm confirm dialog
            const isConfirmed = window.confirm(
              'Bạn có chắc muốn xóa sân này? Tất cả dữ liệu liên quan (đặt sân, sân con) sẽ bị xóa!'
            );
            if (!isConfirmed) return;
      
            // Thêm header 'Content-Type'
            const response = await axios.delete(
              `${import.meta.env.VITE_API_URL}/api/field/${id}`,
              {
                headers: {
                  Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                  'Content-Type': 'application/json'
                }
              }
            );
      
            // Kiểm tra response status
            if (response.status === 200 || response.status === 204) {
              alert('Xóa sân thành công!');
              window.location.href = '/'; // Chuyển về trang chủ
            }
          } catch (error: any) {
            console.error('Chi tiết lỗi:', {
              status: error.response?.status,
              data: error.response?.data,
              config: error.config
            });
      
            if (error.response?.status === 500) {
              alert('Lỗi server: Không thể xóa sân do có dữ liệu liên quan. Vui lòng liên hệ quản trị viên.');
            } else {
              alert(`Lỗi khi xóa sân: ${error.message}`);
            }
          }
        } else {
          alert('Bạn không có quyền xóa sân!');
        }
      };
    
      
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
                            {images.slice(0).map((img, index) => (
                                <img 
                                    key={index} 
                                    src={img} 
                                    alt='' 
                                    className="w-16 h-16 object-cover rounded-md bg-gray-200/50 p-2 hover:bg-gray-200"
                                    onMouseEnter={() => setMainImage(img)}
                                />
                            ))}
                        </div>
                        <div className="relative max-w-2xl">
                            <img src={mainImage} alt="" className="w-full max-h-[500px] object-cover bg-gray-200/50 p-2 rounded-md"/>
                            <div className="flex items-center gap-2 absolute bottom-2 right-2">
                                <button 
                                    onClick={() => {
                                        const newIndex = currentImage - 1 < 0 ? images.length - 1 : currentImage - 1;
                                        setCurrentImage(newIndex);
                                        setMainImage(images[newIndex]);
                                    }}
                                    className="p-2 bg-white rounded-full hover:bg-btn-primary duration-300 transition-all ease-linear group cursor-pointer">
                                    <MdChevronLeft className="group-hover:-translate-x-1 duration-300 transition-all ease-linea text-2xl"/>
                                </button>
                                <button 
                                    onClick={() => {
                                        const newIndex = currentImage + 1 > images.length - 1 ? 0 : currentImage + 1;
                                        setCurrentImage(newIndex);
                                        setMainImage(images[newIndex]);
                                    }}
                                    className="p-2 bg-white rounded-full hover:bg-btn-primary duration-300 transition-all ease-linear group cursor-pointer">
                                    <MdChevronRight className="group-hover:translate-x-1 duration-300 transition-all ease-linea text-2xl"/>
                                </button>
                            </div>
                        </div>
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
                {/* Đặt sân */}
                <div>
                    <div className="flex items-center gap-2">
                        <div className="w-1.5 h-10 bg-btn-primary rounded-md"></div>
                        <h2 className="text-lg font-medium">Đặt sân ngay tại đây</h2>
                    </div>
                    <Link to={`/field/${field.fieldId}/availability`}>
                        <button className="px-10 py-2 bg-btn-primary my-8 rounded-md text-lg font-semibold text-white cursor-pointer">
                            Đặt sân
                        </button>
                    </Link>
                </div>

                {/* Quyền cập nhật và xóa field */}
                {role === 'Owner' || role === 'Admin' ? (<div>
                    <div className="flex items-center gap-2 py-8">
                        <div className="w-1.5 h-10 bg-btn-primary rounded-md"></div>
                        <h2 className="text-lg font-medium">Cập nhật thông tin, xóa filed</h2>
                    </div>
                    <div className="flex items-center gap-6 py-2 text-white">
                        <Link  to={`/field/${field.fieldId}/edit`}>
                            <button 
                                className="bg-amber-400 px-6 py-2 rounded-md cursor-pointer"
                                >Cập nhật sân</button>
                        </Link>
                        <button 
                            className="bg-red-500 px-6 py-2 rounded-md cursor-pointer"
                            onClick={() => handleDeleteField(field.fieldId)}
                            >
                            Xóa sân
                        </button>
                    </div>
                </div>) : null}
            </div>
        </div>
    )
}

export default ItemBooking
