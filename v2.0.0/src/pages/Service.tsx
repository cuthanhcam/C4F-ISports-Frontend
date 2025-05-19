import Layout from "../components/common/layout/Layout";
import { serviceAdvantage, serviceServiceMainCol1, serviceServiceMainCol2 } from "../constants/service";
import { motion, useAnimation } from "framer-motion";

const cardVariants = {
  animate: {
    y: [0, -60, -20, -50, 0],
    transition: {
      duration: 5,
      times: [0, 0.2, 0.5, 0.8, 1],
      ease: "easeInOut",
      repeat: Infinity,
      repeatDelay: 1,
    },
  },
};

const containerVariants = {
  animate: {
    transition: {
      staggerChildren: 0.5, // 0.5 giây giữa các card
    },
  },
};

const Service = () => {
    return (
        <Layout>
            <div className="bg-surface">
                <div className="relative container py-6 z-[0]">
                    <div className="home-header-light-blue"/>
                    <div className="home-header-light-pink"/>
                    {/* Giới thiệu chung */}
                    <div className="my-12 md:my-20">
                        <div className="relative z-[0] max-w-4xl mx-auto flex flex-col items-center gap-4 border border-outline-variant p-8 rounded-3xl shadow-xunit">
                            <div className="home-header-light-blue"/>
                            <div className="home-header-light-pink"/>
                            <h1 className="text-3xl md:text-5xl text-surface-on text-center font-bold">Dịch Vụ C4F-ISports</h1>
                            <h2 className="text-xl md:text-3xl text-surface-inverse text-center font-semibold">Giới Thiệu Chung</h2>
                            <p className="max-w-2xl text-sm md:text-base text-surface-onVariant text-center">
                                C4F-ISports là nền tảng quản lý sân thể thao và đặt lịch trực tuyến hiện đại, 
                                cung cấp các dịch vụ toàn diện giúp người dùng và chủ sân kết nối thuận tiện, 
                                nhanh chóng và an toàn. Với phiên bản 2.0.0, chúng tôi mang đến trải nghiệm tối ưu, 
                                đa dạng tính năng, hỗ trợ sân lớn chứa nhiều sân nhỏ, cùng nhiều tiện ích khác biệt.
                            </p>
                        </div>
                    </div>
                    {/* Các dịch vụ chính */}
                    <div className="my-12 md:my-20">
                        <h1 className="text-3xl md:text-5xl text-surface-on text-center font-bold mb-10 lg:mb-16">Các dịch vụ chính</h1>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Content cols-1 */}
                            <div className="flex flex-col gap-6">
                                {serviceServiceMainCol1.map((item) => (
                                    <div key={item.id} className="bg-surface-1 p-4 rounded-3xl flex items-start gap-4 shadow-lg">
                                        <div className="px-4 py-2 bg-primary-container rounded-xl">
                                            <span className="text-2xl text-surface-on font-bold">{item.id}</span>
                                        </div>
                                        <ul className="flex flex-col gap-4">
                                            <h1 className="text-xl md:text-3xl text-surface-on font-medium">{item.title}</h1>
                                            <div className="flex flex-col gap-2">
                                                {item.content.map((line, index) => (
                                                    <li key={index} className="text-sm md:text-base text-surface-onVariant leading-relaxed">{line}</li>
                                                ))}
                                            </div>
                                        </ul>
                                    </div>
                                ))}
                            </div>
                            {/* Content cols-2 */}
                            <div className="flex flex-col gap-6">
                                {serviceServiceMainCol2.map((item) => (
                                    <div key={item.id} className="bg-surface-1 p-4 rounded-3xl flex items-start gap-4 shadow-lg">
                                        <div className="px-4 py-2 bg-primary-container rounded-xl">
                                            <span className="text-2xl text-surface-on font-bold">{item.id}</span>
                                        </div>
                                        <ul className="flex flex-col gap-4">
                                            <h1 className="text-xl md:text-3xl text-surface-on font-medium">{item.title}</h1>
                                            <div className="flex flex-col gap-2">
                                                {item.content.map((line, index) => (
                                                    <li key={index} className="text-sm md:text-base text-surface-onVariant leading-relaxed">{line}</li>
                                                ))}
                                            </div>
                                        </ul>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    {/* Ưu điểm nổi bật */}
                    <div className="my-12 md:my-20">
                        <h1 className="text-3xl md:text-5xl text-surface-on text-center font-bold mb-16">Ưu điểm nổi bật</h1>
                        <motion.div variants={containerVariants} animate="animate" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-14 md:gap-14 lg:gap-4">
                            {serviceAdvantage.map((item, index) => (
                                <motion.div 
                                    key={index}
                                    variants={cardVariants}
                                    className="bg-surface-1 p-4 rounded-3xl flex items-start gap-4"
                                    >
                                    <div className="p-4 bg-primary-container rounded-xl">
                                        <item.icons className="text-2xl text-surface-on"/>
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <h1 className="text-lg md:text-xl text-surface-on font-medium">{item.title}</h1>
                                        <p className="text-xs md:text-sm text-surface-onVariant">{item.description}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                    {/* Cam kết dịch vụ */}
                    <div className="my-12 md:my-20">
                        <div className="flex flex-col items-center">
                            <h1 className="text-3xl md:text-5xl text-surface-on text-center font-bold mb-10 lg:mb-16">Cam kết dịch vụ</h1>
                            <p className="max-w-2xl text-sm md:text-base text-surface-onVariant text-center leading-loose">
                                Chúng tôi cam kết không ngừng cải tiến và mở rộng dịch vụ để mang đến trải nghiệm 
                                tối ưu nhất cho người dùng và chủ sân. Mọi phản hồi và kiến nghị đều được tiếp nhận 
                                và xử lý nhanh chóng nhằm phục vụ cộng đồng thể thao một cách tốt nhất.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Service
