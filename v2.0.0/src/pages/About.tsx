import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Layout from "../components/common/layout/Layout";
import InroduceImage from "../assets/images/Introduce_C4F.jpg";
import MissionAndVisionImage from "../assets/images/Mission_And_Vision_C4F.jpg";
import AvatarUserContribution from "../assets/images/avtarUserContriburion.png";
import { aboutContribution, aboutFeature, aboutProgress, aboutUseTechBE, aboutUseTechFE } from "../constants/about";
import PageTransition from "./PageTransition";

const About = () => {
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

    // Refs for in-view detection
    const introRef = useRef(null);
    const missionRef = useRef(null);
    const usersRef = useRef(null);
    const featuresRef = useRef(null);
    const processRef = useRef(null);
    const techRef = useRef(null);
    const teamRef = useRef(null);

    const introInView = useInView(introRef, { once: true, margin: "-100px" });
    const missionInView = useInView(missionRef, { once: true, margin: "-100px" });
    const usersInView = useInView(usersRef, { once: true, margin: "-100px" });
    const featuresInView = useInView(featuresRef, { once: true, margin: "-100px" });
    const processInView = useInView(processRef, { once: true, margin: "-100px" });
    const techInView = useInView(techRef, { once: true, margin: "-100px" });
    const teamInView = useInView(teamRef, { once: true, margin: "-100px" });

    return (
        <PageTransition>
            <Layout>
                <div className="bg-surface relative">
                    <div className="container py-6 relative z-[0]">
                        <div className="home-header-light-blue"/>
                        <div className="home-header-light-pink"/>
                        <div className="mt-[142px] md:mt-[162px] lg:mt-[182px]">
                            {/* Thông tin giới thiệu dự án */}
                            <motion.div 
                                ref={introRef}
                                initial="hidden"
                                animate={introInView ? "visible" : "hidden"}
                                variants={staggerContainer}
                                className="grid grid-cols-1 md:grid-cols-2 items-center justify-items-center lg:justify-items-end my-12 md:my-20 gap-14 lg:gap-0"
                            >
                                <motion.div 
                                    variants={fadeInLeft}
                                    className="flex flex-col gap-6 md:gap-8 order-2 md:order-1"
                                >
                                    <motion.h1 
                                        variants={fadeInUp}
                                        className="text-3xl md:text-5xl text-center md:text-left text-surface-on font-bold"
                                    >
                                        Giới thiệu về C4F-ISports
                                    </motion.h1>
                                    <motion.p 
                                        variants={fadeInUp}
                                        className="text-base text-center md:text-left leading-loose text-surface-onVariant"
                                    >
                                        C4F-ISports là nền tảng quản lý và đặt sân thể thao trực tuyến, 
                                        giúp kết nối hiệu quả giữa người chơi thể thao và chủ sân. 
                                        Ứng dụng hỗ trợ tìm kiếm sân theo vị trí, loại hình thể thao, 
                                        đặt sân nhỏ, thanh toán, nhận thông báo và nhiều tiện ích đi kèm. 
                                        Phiên bản 2.0.0 là một bước tiến lớn, mang lại trải nghiệm mượt mà hơn, 
                                        tính năng phong phú và hiệu suất cao hơn cho người dùng.
                                    </motion.p>
                                </motion.div>
                                <motion.img 
                                    variants={fadeInRight}
                                    src={InroduceImage} 
                                    alt="" 
                                    className="order-1 md:order-2 min-w-[16rem] max-h-[24rem] md:min-w-[20rem] md:max-h-[26rem] lg:min-w-[24rem] lg:max-h-[32rem] object-center rounded-3xl border border-outline-variant shadow-navigation"
                                />
                            </motion.div>

                            {/* Sứ mệnh và tinh thần */}
                            <motion.div 
                                ref={missionRef}
                                initial="hidden"
                                animate={missionInView ? "visible" : "hidden"}
                                variants={staggerContainer}
                                className="grid grid-cols-1 md:grid-cols-2 items-center justify-items-center lg:justify-items-start my-12 md:my-20 gap-14 lg:gap-0"
                            >
                                <motion.img 
                                    variants={fadeInLeft}
                                    src={MissionAndVisionImage} 
                                    alt="" 
                                    className="min-w-[16rem] max-h-[24rem] md:min-w-[20rem] md:max-h-[26rem] lg:min-w-[24rem] lg:max-h-[32rem] object-center rounded-3xl border border-outline-variant shadow-navigation"
                                />
                                <motion.div 
                                    variants={fadeInRight}
                                    className="flex flex-col gap-6 md:gap-8"
                                >
                                    <motion.h1 
                                        variants={fadeInUp}
                                        className="text-3xl md:text-5xl text-center md:text-left text-surface-on font-bold"
                                    >
                                        Sứ mệnh và Tầm nhìn
                                    </motion.h1>
                                    <motion.p 
                                        variants={fadeInUp}
                                        className="text-base text-center md:text-left leading-loose text-surface-onVariant"
                                    >
                                        Chúng tôi hướng đến việc số hóa trải nghiệm thể thao, giúp người dùng dễ dàng 
                                        tìm kiếm và đặt sân phù hợp chỉ trong vài bước. Đồng thời, hỗ trợ chủ sân quản lý sân bãi, 
                                        lịch đặt và doanh thu một cách thuận tiện và chuyên nghiệp.
                                        Tầm nhìn: Trở thành nền tảng đặt sân hàng đầu tại Việt Nam, xây dựng cộng đồng thể thao 
                                        năng động, kết nối người chơi và chủ sân mọi lúc, mọi nơi.
                                    </motion.p>
                                </motion.div>
                            </motion.div>

                            {/* Các đối tượng sử dụng và chức năng chính */}
                            <motion.div 
                                ref={usersRef}
                                initial="hidden"
                                animate={usersInView ? "visible" : "hidden"}
                                variants={staggerContainer}
                                className="my-12 md:my-20"
                            >
                                <motion.h1 
                                    variants={fadeInUp}
                                    className="text-3xl md:text-5xl text-center text-surface-on font-bold mb-10 lg:mb-16"
                                >
                                    Các đối tượng sử dụng và chức năng chính
                                </motion.h1>
                                <motion.div 
                                    variants={staggerContainer}
                                    className="grid grid-cols-1 sm:grid-cols-2 justify-center gap-6"
                                >
                                    {/* Người dùng(User) */}
                                    <motion.div 
                                        variants={scaleIn}
                                        className="bg-surface-1 px-10 py-6 rounded-3xl"
                                    >
                                        <motion.h1 
                                            variants={fadeInUp}
                                            className="text-xl md:text-3xl font-semibold text-surface-on mb-4"
                                        >
                                            Người dùng
                                        </motion.h1>
                                        <motion.ul 
                                            variants={staggerContainer}
                                            className="text-surface-onVariant leading-loose text-base"
                                        >
                                            {[
                                                "Đăng ký/đăng nhập bằng Email hoặc qua Google/Facebook.",
                                                "Tìm kiếm sân theo vị trí, bộ môn, khung giờ.",
                                                "Đặt sân nhỏ, lựa chọn dịch vụ đi kèm, thanh toán trực tuyến.",
                                                "Nhận thông báo, xem lịch sử đặt sân, đánh giá sân và tích lũy điểm thưởng."
                                            ].map((text, index) => (
                                                <motion.li 
                                                    key={index}
                                                    variants={fadeInUp}
                                                    className="relative"
                                                >
                                                    {text}
                                                    <div className="absolute top-1/2 -translate-y-1/2 -left-3.5 w-1.5 h-1.5 rounded-full bg-primary"/>
                                                </motion.li>
                                            ))}
                                        </motion.ul>
                                    </motion.div>
                                    {/* Chủ sân(Owner) */}
                                    <motion.div 
                                        variants={scaleIn}
                                        className="bg-surface-1 px-10 py-6 rounded-3xl"
                                    >
                                        <motion.h1 
                                            variants={fadeInUp}
                                            className="text-xl md:text-3xl font-semibold text-surface-on mb-4"
                                        >
                                            Chủ sân
                                        </motion.h1>
                                        <motion.ul 
                                            variants={staggerContainer}
                                            className="text-surface-onVariant leading-loose text-base"
                                        >
                                            {[
                                                "Tạo và quản lý sân lớn, sân nhỏ, giá thuê linh hoạt theo khung giờ.",
                                                "Quản lý đơn đặt sân, trả lời đánh giá của người dùng.",
                                                "Xem thống kê doanh thu và lượt đặt sân."
                                            ].map((text, index) => (
                                                <motion.li 
                                                    key={index}
                                                    variants={fadeInUp}
                                                    className="relative"
                                                >
                                                    {text}
                                                    <div className="absolute top-1/2 -translate-y-1/2 -left-3.5 w-1.5 h-1.5 rounded-full bg-primary"/>
                                                </motion.li>
                                            ))}
                                        </motion.ul>
                                    </motion.div>
                                </motion.div>
                                {/* Quản trị viên(Admin) */}
                                <motion.div 
                                    variants={staggerContainer}
                                    className="flex justify-center"
                                >
                                    <motion.div 
                                        variants={scaleIn}
                                        className="bg-surface-1 px-10 py-6 rounded-3xl mt-6"
                                    >
                                        <motion.h1 
                                            variants={fadeInUp}
                                            className="text-xl md:text-3xl font-semibold text-surface-on mb-4"
                                        >
                                            Quản trị viên
                                        </motion.h1>
                                        <motion.ul 
                                            variants={staggerContainer}
                                            className="text-surface-onVariant leading-loose text-base"
                                        >
                                            {[
                                                "Quản lý người dùng và chủ sân.",
                                                "Kiểm duyệt đánh giá, giám sát hoạt động hệ thống và loại hình thể thao."
                                            ].map((text, index) => (
                                                <motion.li 
                                                    key={index}
                                                    variants={fadeInUp}
                                                    className="relative"
                                                >
                                                    {text}
                                                    <div className="absolute top-1/2 -translate-y-1/2 -left-3.5 w-1.5 h-1.5 rounded-full bg-primary"/>
                                                </motion.li>
                                            ))}
                                        </motion.ul>
                                    </motion.div>
                                </motion.div>
                            </motion.div>

                            {/* Tính năng nổi bật của C4F-ISports 2.0.0 */}
                            <motion.div 
                                ref={featuresRef}
                                initial="hidden"
                                animate={featuresInView ? "visible" : "hidden"}
                                variants={staggerContainer}
                                className="my-12 md:my-20"
                            >
                                <motion.h1 
                                    variants={fadeInUp}
                                    className="text-3xl md:text-5xl text-center text-surface-on font-bold mb-10 lg:mb-16"
                                >
                                    Tính năng nổi bật của C4F-ISports 2.0.0
                                </motion.h1>
                                <motion.div 
                                    variants={staggerContainer}
                                    className="overflow-hidden whitespace-nowrap"
                                >
                                    <motion.ul 
                                        variants={staggerContainer}
                                        className="flex items-center gap-6 animate-marquee py-1"
                                    >
                                        {aboutFeature.map((item) => (
                                            <motion.li 
                                                key={item.id}
                                                variants={scaleIn}
                                                className="p-4 border border-outline-variant rounded-3xl flex flex-col items-center gap-4 shadow-navigation"
                                            >
                                                <motion.div variants={fadeInUp}>
                                                    <item.icon className="text-4xl md:text-6xl lg:text-8xl text-primary"/>
                                                </motion.div>
                                                <motion.h1 
                                                    variants={fadeInUp}
                                                    className="text-surface-on text-xl md:text-2xl lg:text-3xl font-medium"
                                                >
                                                    {item.title}
                                                </motion.h1>
                                                <motion.p 
                                                    variants={fadeInUp}
                                                    className="text-surface-onVariant text-sm lg:text-base"
                                                >
                                                    {item.description}
                                                </motion.p>
                                            </motion.li>
                                        ))}
                                    </motion.ul>
                                </motion.div>
                            </motion.div>

                            {/* Quy trình hoạt động */}
                            <motion.div 
                                ref={processRef}
                                initial="hidden"
                                animate={processInView ? "visible" : "hidden"}
                                variants={staggerContainer}
                                className="my-12 md:my-20"
                            >
                                <motion.h1 
                                    variants={fadeInUp}
                                    className="text-3xl md:text-5xl text-center text-surface-on font-bold mb-10 lg:mb-16"
                                >
                                    Quy trình hoạt động
                                </motion.h1>
                                <motion.ul 
                                    variants={staggerContainer}
                                    className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
                                >
                                    {aboutProgress.map((item) => (
                                        <motion.li 
                                            key={item.id}
                                            variants={scaleIn}
                                            className="bg-surface-1 rounded-b-3xl shadow-md"
                                        >
                                            <motion.div 
                                                variants={fadeInUp}
                                                className="relative bg-primary h-14 rounded-t-3xl"
                                            >
                                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 bg-primary rounded-full p-2">
                                                    <div className="bg-surface-1 h-10 w-10 rounded-full flex items-center justify-center text-surface-on">
                                                        {item.id}
                                                    </div>
                                                </div>
                                            </motion.div>
                                            <motion.div 
                                                variants={staggerContainer}
                                                className="mt-12 flex flex-col gap-4 items-center text-center justify-center px-4 py-2"
                                            >
                                                <motion.h1 
                                                    variants={fadeInUp}
                                                    className="text-3xl font-medium text-surface-on"
                                                >
                                                    {item.title}
                                                </motion.h1>
                                                <motion.p 
                                                    variants={fadeInUp}
                                                    className="text-base text-surface-onVariant"
                                                >
                                                    {item.description}
                                                </motion.p>
                                            </motion.div>
                                        </motion.li>
                                    ))}
                                </motion.ul>
                            </motion.div>

                            {/* Công nghệ sử dụng */}
                            <motion.div 
                                ref={techRef}
                                initial="hidden"
                                animate={techInView ? "visible" : "hidden"}
                                variants={staggerContainer}
                                className="my-12 md:my-20"
                            >
                                <motion.h1 
                                    variants={fadeInUp}
                                    className="text-3xl md:text-5xl text-center text-surface-on font-bold mb-10 lg:mb-16"
                                >
                                    Công nghệ sử dụng
                                </motion.h1>
                                {/* Tech backend */}
                                <motion.div 
                                    variants={staggerContainer}
                                    className="mb-16"
                                >
                                    <motion.h2 
                                        variants={fadeInUp}
                                        className="text-xl md:text-3xl text-center text-surface-on font-bold mb-8 lg:mb-16"
                                    >
                                        Backend
                                    </motion.h2>
                                    <motion.ul 
                                        variants={staggerContainer}
                                        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6 lg:gap-8"
                                    >
                                        {aboutUseTechBE.map((item) => (
                                            <motion.li 
                                                key={item.id}
                                                variants={scaleIn}
                                                className={`p-6 rounded-3xl border border-outline-variant flex flex-col items-center gap-6 cursor-pointer ${item.shadow} duration-200 transition-transform ease-in-out`}
                                            >
                                                <motion.img 
                                                    variants={fadeInUp}
                                                    src={item.image}
                                                    alt=""
                                                    className="w-32 h-32 object-contain"
                                                />
                                                <motion.h1 
                                                    variants={fadeInUp}
                                                    className="text-xl text-surface-on font-medium"
                                                >
                                                    {item.name}
                                                </motion.h1>
                                            </motion.li>
                                        ))}
                                    </motion.ul>
                                </motion.div>
                                {/* Tech frontend */}
                                <motion.div variants={staggerContainer}>
                                    <motion.h2 
                                        variants={fadeInUp}
                                        className="text-xl md:text-3xl text-center text-surface-on font-bold mb-8 lg:mb-16"
                                    >
                                        Frontend
                                    </motion.h2>
                                    <motion.ul 
                                        variants={staggerContainer}
                                        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6 lg:gap-8"
                                    >
                                        {aboutUseTechFE.map((item) => (
                                            <motion.li 
                                                key={item.id}
                                                variants={scaleIn}
                                                className={`p-6 rounded-3xl border border-outline-variant flex flex-col items-center gap-6 cursor-pointer ${item.shadow} duration-200 transition-transform ease-in-out`}
                                            >
                                                <motion.img 
                                                    variants={fadeInUp}
                                                    src={item.image}
                                                    alt=""
                                                    className="w-32 h-32 object-contain"
                                                />
                                                <motion.h1 
                                                    variants={fadeInUp}
                                                    className="text-xl text-surface-on font-medium"
                                                >
                                                    {item.name}
                                                </motion.h1>
                                            </motion.li>
                                        ))}
                                    </motion.ul>
                                </motion.div>
                            </motion.div>

                            {/* Đội ngũ phát triển */}
                            <motion.div 
                                ref={teamRef}
                                initial="hidden"
                                animate={teamInView ? "visible" : "hidden"}
                                variants={staggerContainer}
                                className="my-12 md:my-20"
                            >
                                <motion.h1 
                                    variants={fadeInUp}
                                    className="text-3xl md:text-5xl text-center text-surface-on font-bold mb-10 lg:mb-16"
                                >
                                    Đội ngũ phát triển
                                </motion.h1>
                                <motion.h4 
                                    variants={fadeInUp}
                                    className="text-xl md:text-3xl text-center font-medium text-surface-inverse mb-4 lg:mb-6"
                                >
                                    Dự án được phát triển bởi nhóm sinh viên chuyên ngành Công nghệ Thông tin
                                </motion.h4>
                                <motion.p 
                                    variants={fadeInUp}
                                    className="text-base text-center text-surface-onVariant mb-10 lg:mb-16"
                                >
                                    Chúng tôi không ngừng học hỏi và cải tiến để hoàn thiện sản phẩm tốt nhất, phục vụ người dùng và chủ sân một cách toàn diện
                                </motion.p>
                                <motion.ul 
                                    variants={staggerContainer}
                                    className="flex items-center flex-wrap gap-8 justify-center"
                                >
                                    {aboutContribution.map((item) => (
                                        <motion.li 
                                            key={item.id}
                                            variants={scaleIn}
                                            className="p-4 md:p-6 border border-outline-variant rounded-3xl"
                                        >
                                            <motion.img 
                                                variants={fadeInUp}
                                                src={AvatarUserContribution}
                                                alt=""
                                                className="w-[280px] md:w-[320px] lg:w-auto lg:h-auto object-contain"
                                            />
                                            <motion.h1 
                                                variants={fadeInUp}
                                                className="text-xl md:text-3xl text-center font-medium text-surface-on my-2 md:my-4"
                                            >
                                                {item.name}
                                            </motion.h1>
                                            <motion.h3 
                                                variants={fadeInUp}
                                                className="text-base text-center text-surface-onVariant"
                                            >
                                                {item.jobPosition}
                                            </motion.h3>
                                        </motion.li>
                                    ))}
                                </motion.ul>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </Layout>
        </PageTransition>
    );
};

export default About;