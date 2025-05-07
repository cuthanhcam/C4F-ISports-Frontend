import { useState, useEffect } from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import Logo from "../../assets/images/LogoC4F.png";

import FootballIcon from "../../assets/icons/football.png";
import VolleyballIcon from "../../assets/icons/block.png";
import BasketballIcon from "../../assets/icons/basketball.png";
import BadmintonIcon from "../../assets/icons/badminton.png";

const containerStyle = {
    width: "100%",
    height: "400px",
};

const centerDefault = { lat: 10.7769, lng: 106.7009 };

const allLocations = {
    football: [
        { id: 1, name: "Sân bóng đá A", lat: 10.776, lng: 106.7005 },
        { id: 2, name: "Sân bóng đá B", lat: 10.7765, lng: 106.7008 },
    ],
    volleyball: [
        { id: 3, name: "Sân bóng chuyền X", lat: 10.777, lng: 106.701 },
        { id: 4, name: "Sân bóng chuyền Y", lat: 10.7775, lng: 106.7015 },
    ],
    basketball: [
        { id: 5, name: "Sân bóng rổ M", lat: 10.778, lng: 106.702 },
        { id: 6, name: "Sân bóng rổ N", lat: 10.7785, lng: 106.7025 },
    ],
    badminton: [
        { id: 7, name: "Sân cầu lông P", lat: 10.779, lng: 106.703 },
        { id: 8, name: "Sân cầu lông Q", lat: 10.7795, lng: 106.7035 },
    ],
};

const getIconByType = (type: string) => {
    switch (type) {
        case "football":
            return FootballIcon;
        case "volleyball":
            return VolleyballIcon;
        case "basketball":
            return BasketballIcon;
        case "badminton":
            return BadmintonIcon;
        default:
            return "";
    }
};

const Map = () => {
    const [currentLocation, setCurrentLocation] = useState(centerDefault);
    const [selectedType, setSelectedType] = useState("football");

    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: import.meta.env.VITE_API_KEY,
    });

    

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setCurrentLocation({
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                    });
                },
                (error) => console.error("Lỗi lấy vị trí:", error)
            );
        }
    }, []);

    if (!isLoaded) return <p>Loading...</p>;
    
    return (
        <div className="py-14 flex flex-col gap-4">
            <div className="relative flex items-center justify-center py-4">
                <div className="absolute left-0 w-full border-t-2 border-gray-300"></div>
                <div className="relative px-6 py-2 bg-white border-2 border-gray-300 rounded-md shadow-sm flex items-center space-x-2">
                    <img src={Logo} alt="" className="w-6 h-6 object-cover" />
                    <span className="text-black text-xl font-bold uppercase">Sân tập gần bạn</span>
                </div>
            </div>
            <p className="text-center text-text-primary">Khu vực được đề xuất gần vị trí của bạn</p>
            <div className="flex justify-center gap-4">
                {Object.keys(allLocations).map((type) => (
                    <button
                        key={type}
                        onClick={() => setSelectedType(type)}
                        className={`px-4 py-2 rounded text-white font-semibold ${
                            selectedType === type ? "bg-blue-600" : "bg-gray-400"
                        }`}
                    >
                        {type === "football"
                            ? "⚽ Bóng đá"
                            : type === "volleyball"
                            ? "🏐 Bóng chuyền"
                            : type === "basketball"
                            ? "🏀 Bóng rổ"
                            : "🏸 Cầu lông"}
                    </button>
                ))}
            </div>
            <div className="rounded-md overflow-hidden">
                <GoogleMap mapContainerStyle={containerStyle} center={currentLocation} zoom={15}>
                    <Marker position={currentLocation} label="Vị trí của bạn" />

                    {allLocations[selectedType].map((loc) => (
                        <Marker
                            key={loc.id}
                            position={{ lat: loc.lat, lng: loc.lng }}
                            label={loc.name}
                            icon={{
                                url: getIconByType(selectedType),
                                
                                scaledSize: new window.google.maps.Size(40, 40),
                            }}
                        />
                    ))}
                </GoogleMap>
            </div>
        </div>
    );
};

export default Map;
