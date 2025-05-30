import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Layout from "../components/common/layout/Layout";
import { serviceAdvantage, serviceServiceMainCol1, serviceServiceMainCol2 } from "../constants/service";
import PageTransition from "./PageTransition";

const Service = () => {
    // Animation variants
    const fadeInUp = {
        hidden: { opacity: 0, y: 60 },
        visible: { 
            opacity: 1, 
            y: 0,
            transition: { duration: 0.6, ease: "easeOut" }
        }
    };

    const fadeInLeft = {
        hidden: { opacity: 0, x: -100 },
        visible: { 
            opacity: 1, 
            x: 0,
            transition: { duration: 0.8, ease: "easeOut" }
        }
    };

    const fadeInRight = {
        hidden: { opacity: 0, x: 100 },
        visible: { 
            opacity: 1, 
            x: 0,
            transition: { duration: 0.8, ease: "easeOut" }
        }
    };

    const staggerContainer = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                delayChildren: 0.3,
                staggerChildren: 0.2
            }
        }
    };

    const scaleIn = {
        hidden: { scale: 0.8, opacity: 0 },
        visible: { 
            scale: 1, 
            opacity: 1,
            transition: { duration: 0.5, ease: "easeOut" }
        }
    };
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

    // Refs for in-view detection
    const introRef = useRef(null);
    const servicesRef = useRef(null);
    const commitmentRef = useRef(null);
    const introInView = useInView(introRef, { once: true, margin: "-100px" });
    const servicesInView = useInView(servicesRef, { once: true, margin: "-100px" });
    const commitmentInView = useInView(commitmentRef, { once: true, margin: "-100px" });

    return (
        <PageTransition>
            <Layout>
                <div className="bg-surface">
                    <div className="relative container py-6 z-[0]">
                        <div className="home-header-light-blue"/>
                        <div className="home-header-light-pink"/>
                        <div className="mt-[142px] md:mt-[162px] lg:mt-[182px]">
                            {/* Giới thiệu chung */}
                            <motion.div 
                                ref={introRef}
                                initial="hidden"
                                animate={introInView ? "visible" : "hidden"}
                                variants={staggerContainer}
                                className="my-12 md:my-20"
                            >
                                <motion.div 
                                    variants={scaleIn}
                                    className="relative z-[0] max-w-4xl mx-auto flex flex-col items-center gap-4 border border-outline-variant p-8 rounded-3xl shadow-xunit"
                                >
                                    <div className="home-header-light-blue"/>
                                    <div className="home-header-light-pink"/>
                                    <motion.h1 
                                        variants={fadeInUp}
                                        className="text-3xl md:text-5xl text-surface-on text-center font-bold"
                                    >
                                        Dịch Vụ C4F-ISports
                                    </motion.h1>
                                    <motion.h2 
                                        variants={fadeInUp}
                                        className="text-xl md:text-3xl text-surface-inverse text-center font-semibold"
                                    >
                                        Giới Thiệu Chung
                                    </motion.h2>
                                    <motion.p 
                                        variants={fadeInUp}
                                        className="max-w-2xl text-sm md:text-base text-surface-onVariant text-center"
                                    >
                                        C4F-ISports là nền tảng quản lý sân thể thao và đặt lịch trực tuyến hiện đại, 
                                        cung cấp các dịch vụ toàn diện giúp người dùng và chủ sân kết nối thuận tiện, 
                                        nhanh chóng và an toàn. Với phiên bản 2.0.0, chúng tôi mang đến trải nghiệm tối ưu, 
                                        đa dạng tính năng, hỗ trợ sân lớn chứa nhiều sân nhỏ, cùng nhiều tiện ích khác biệt.
                                    </motion.p>
                                </motion.div>
                            </motion.div>

                            {/* Các dịch vụ chính */}
                            <motion.div 
                                ref={servicesRef}
                                initial="hidden"
                                animate={servicesInView ? "visible" : "hidden"}
                                variants={staggerContainer}
                                className="my-12 md:my-20"
                            >
                                <motion.h1 
                                    variants={fadeInUp}
                                    className="text-3xl md:text-5xl text-surface-on text-center font-bold mb-10 lg:mb-16"
                                >
                                    Các dịch vụ chính
                                </motion.h1>
                                <motion.div 
                                    variants={staggerContainer}
                                    className="grid grid-cols-1 md:grid-cols-2 gap-6"
                                >
                                    {/* Content cols-1 */}
                                    <motion.div 
                                        variants={fadeInLeft}
                                        className="flex flex-col gap-6"
                                    >
                                        {serviceServiceMainCol1.map((item) => (
                                            <motion.div 
                                                key={item.id}
                                                variants={scaleIn}
                                                className="bg-surface-1 p-4 rounded-3xl flex items-start gap-4 shadow-lg"
                                            >
                                                <motion.div 
                                                    variants={fadeInUp}
                                                    className="px-4 py-2 bg-primary-container rounded-xl"
                                                >
                                                    <span className="text-2xl text-surface-on font-bold">{item.id}</span>
                                                </motion.div>
                                                <motion.ul 
                                                    variants={staggerContainer}
                                                    className="flex flex-col gap-4"
                                                >
                                                    <motion.h1 
                                                        variants={fadeInUp}
                                                        className="text-xl md:text-3xl text-surface-on font-medium"
                                                    >
                                                        {item.title}
                                                    </motion.h1>
                                                    <motion.div 
                                                        variants={staggerContainer}
                                                        className="flex flex-col gap-2"
                                                    >
                                                        {item.content.map((line, index) => (
                                                            <motion.li 
                                                                key={index}
                                                                variants={fadeInUp}
                                                                className="text-sm md:text-base text-surface-onVariant leading-relaxed"
                                                            >
                                                                {line}
                                                            </motion.li>
                                                        ))}
                                                    </motion.div>
                                                </motion.ul>
                                            </motion.div>
                                        ))}
                                    </motion.div>
                                    {/* Content cols-2 */}
                                    <motion.div 
                                        variants={fadeInRight}
                                        className="flex flex-col gap-6"
                                    >
                                        {serviceServiceMainCol2.map((item) => (
                                            <motion.div 
                                                key={item.id}
                                                variants={scaleIn}
                                                className="bg-surface-1 p-4 rounded-3xl flex items-start gap-4 shadow-lg"
                                            >
                                                <motion.div 
                                                    variants={fadeInUp}
                                                    className="px-4 py-2 bg-primary-container rounded-xl"
                                                >
                                                    <span className="text-2xl text-surface-on font-bold">{item.id}</span>
                                                </motion.div>
                                                <motion.ul 
                                                    variants={staggerContainer}
                                                    className="flex flex-col gap-4"
                                                >
                                                    <motion.h1 
                                                        variants={fadeInUp}
                                                        className="text-xl md:text-3xl text-surface-on font-medium"
                                                    >
                                                        {item.title}
                                                    </motion.h1>
                                                    <motion.div 
                                                        variants={staggerContainer}
                                                        className="flex flex-col gap-2"
                                                    >
                                                        {item.content.map((line, index) => (
                                                            <motion.li 
                                                                key={index}
                                                                variants={fadeInUp}
                                                                className="text-sm md:text-base text-surface-onVariant leading-relaxed"
                                                            >
                                                                {line}
                                                            </motion.li>
                                                        ))}
                                                    </motion.div>
                                                </motion.ul>
                                            </motion.div>
                                        ))}
                                    </motion.div>
                                </motion.div>
                            </motion.div>

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
                            <motion.div 
                                ref={commitmentRef}
                                initial="hidden"
                                animate={commitmentInView ? "visible" : "hidden"}
                                variants={staggerContainer}
                                className="my-12 md:my-20"
                            >
                                <motion.div 
                                    variants={staggerContainer}
                                    className="flex flex-col items-center"
                                >
                                    <motion.h1 
                                        variants={fadeInUp}
                                        className="text-3xl md:text-5xl text-surface-on text-center font-bold mb-10 lg:mb-16"
                                    >
                                        Cam kết dịch vụ
                                    </motion.h1>
                                    <motion.p 
                                        variants={fadeInUp}
                                        className="max-w-2xl text-sm md:text-base text-surface-onVariant text-center leading-loose"
                                    >
                                        Chúng tôi cam kết không ngừng cải tiến và mở rộng dịch vụ để mang đến trải nghiệm 
                                        tối ưu nhất cho người dùng và chủ sân. Mọi phản hồi và kiến nghị đều được tiếp nhận 
                                        và xử lý nhanh chóng nhằm phục vụ cộng đồng thể thao một cách tốt nhất.
                                    </motion.p>
                                </motion.div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </Layout>
        </PageTransition>
    );
};

export default Service;