import { useEffect, useState } from "react";
import { userAPI } from "../../../../api/user.api";
import { GiAchievement } from "react-icons/gi";
import { motion } from "framer-motion";

type ILoyaltyPoints = number;


const LoyaltyPoints = () => {
    
    const [loyaltyPoints, setLoyaltyPoints] = useState<ILoyaltyPoints>(0);

    const fetchLoyaltyPoints = async () => {
        try {
            const res = await userAPI.getUserLoyaltyPoints();
            setLoyaltyPoints(res.data.loyaltyPoints);
        } catch (err) { 
            console.error(err);
        }
    }

    useEffect(() => {
        fetchLoyaltyPoints();
    }, [])

    return (
        <div className="bg-surface-1 rounded-3xl">
            <div className="px-12 py-6">
                {/* Tiêu đề nội dung */}
                <div className="py-6 border-b border-outline-variant flex flex-col gap-2">
                    <h1 className="text-3xl text-surface-on font-medium">Điểm Tích Lũy</h1>
                    <p className="text-base text-surface-onVariant">
                        Tăng mức độ gắn bó của người dùng với hệ thống đặt sân thể thao bằng cách thưởng điểm tích lũy khi người dùng đặt sân, 
                        sau đó cho phép họ quy đổi điểm thành phần thưởng hấp dẫn
                    </p>
                </div>
                {/* Nội dung */}
                <div className="my-8 flex flex-col items-center gap-4">
                    {/* Icon với hiệu ứng nổi bật mượt mà */}
                    <div className="border border-outline-variant p-6 rounded-full shadow-oAuth2 mt-8">
                        <motion.div
                            initial={{ y: 0, opacity: 0 }}
                            animate={{ y: [0, -12, 0], opacity: 1 }}
                            whileHover={{ scale: 1.15, rotate: [0, 3, -3, 0] }}
                            transition={{
                            repeat: Infinity,
                            duration: 3,
                            ease: "easeInOut",
                            type: "tween",
                            }}
                            className="text-8xl text-primary drop-shadow-lg"
                        >
                            <GiAchievement className="translate-y-2"/>
                        </motion.div>
                    </div>

                    <h1 className="text-4xl font-bold text-surface-on">{loyaltyPoints}</h1>
                    <h3 className="text-lg text-surface-onVariant">Điểm tích lũy hiện có</h3>
                    <div className="bg-surface-4 p-6 rounded-md">
                        <p className="text-sm text-surface-onVariant text-center max-w-md">
                            Tích lũy điểm qua mỗi lần đặt sân và sử dụng để nhận ưu đãi đặc biệt!
                        </p>
                    </div>
                </div>

            </div>
        </div>
    )
}


export default LoyaltyPoints
