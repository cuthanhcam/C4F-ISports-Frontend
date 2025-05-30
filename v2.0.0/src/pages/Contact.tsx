import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import Layout from "../components/common/layout/Layout";
import { contactData, contactWarning } from "../constants/contact";
import { IoIosWarning } from "react-icons/io";
import PageTransition from "./PageTransition";

type formDataItem = {
    name: string;
    email: string;
    topic: string;
    messages: string;
}

const Contact = () => {
    // API Form
    const FORMSPREE_ENDPOIN = import.meta.env.VITE_FORMSPREE_ENDPOINT;
    const [formData, setFormData] = useState<formDataItem>({
        name: '',
        email: '',
        topic: '',
        messages: '',
    });

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

    const formVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: { 
            opacity: 1, 
            y: 0,
            transition: { duration: 0.6, ease: "easeOut" }
        }
    };

    // Refs for in-view detection
    const introRef = useRef(null);
    const contactInfoRef = useRef(null);
    const formSectionRef = useRef(null);
    const warningRef = useRef(null);
    const mapRef = useRef(null);

    const introInView = useInView(introRef, { once: true, margin: "-100px" });
    const contactInfoInView = useInView(contactInfoRef, { once: true, margin: "-100px" });
    const formSectionInView = useInView(formSectionRef, { once: true, margin: "-100px" });
    const warningInView = useInView(warningRef, { once: true, margin: "-100px" });
    const mapInView = useInView(mapRef, { once: true, margin: "-100px" });

    const handChangeForm = async (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const response = await fetch(FORMSPREE_ENDPOIN, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify(formData),
        });

        // Check require
        if (response.ok) {
            setFormData({ name: '', email: '', topic: '', messages: ''});
        }
    };

    return (
        <PageTransition>
            <Layout>
                <div className="bg-surface">
                    <div className="relative container py-6 z-[0]">
                        <div className="home-header-light-blue"/>
                        <div className="home-header-light-pink"/>
                        <div className="mt-[142px] md:mt-[162px] lg:mt-[182px]">
                            {/* Tiêu đề contact */}
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
                                        className="text-5xl text-surface-on text-center font-bold"
                                    >
                                        Liên hệ với C4F-ISports
                                    </motion.h1>
                                    <motion.p 
                                        variants={fadeInUp}
                                        className="max-w-2xl text-base text-surface-onVariant text-center"
                                    >
                                        Cảm ơn bạn đã quan tâm đến C4F-ISports – nền tảng quản lý và đặt sân thể thao trực tuyến hiện đại. 
                                        Chúng tôi luôn sẵn sàng lắng nghe mọi ý kiến đóng góp, phản hồi hoặc yêu cầu hỗ trợ từ phía người dùng, 
                                        chủ sân và các đối tác tiềm năng.
                                    </motion.p>
                                </motion.div>
                            </motion.div>

                            {/* Thông tin liên hệ chính thức */}
                            <motion.div 
                                ref={contactInfoRef}
                                initial="hidden"
                                animate={contactInfoInView ? "visible" : "hidden"}
                                variants={staggerContainer}
                                className="my-12 md:my-20"
                            >
                                <motion.div 
                                    variants={staggerContainer}
                                    className="flex flex-col items-center"
                                >
                                    <motion.h1 
                                        variants={fadeInUp}
                                        className="text-3xl md:text-5xl text-center text-surface-on font-bold mb-12 md:mb-16"
                                    >
                                        Thông tin liên hệ chính thức
                                    </motion.h1>
                                    <motion.div 
                                        variants={staggerContainer}
                                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6"
                                    >
                                        {contactData.map((item) => (
                                            <motion.div 
                                                key={item.id} 
                                                variants={scaleIn}
                                                className="bg-surface-1 p-4 rounded-3xl flex items-start gap-4"
                                            >
                                                <motion.div 
                                                    variants={fadeInUp}
                                                    className="p-2 md:p-4 bg-primary-container text-surface-on rounded-xl"
                                                >
                                                    <item.icon className="text-xl md:text-2xl"/>
                                                </motion.div>
                                                <motion.div 
                                                    variants={staggerContainer}
                                                    className="flex flex-col gap-1"
                                                >
                                                    <motion.h1 
                                                        variants={fadeInUp}
                                                        className="text-lg md:text-xl text-surface-on font-medium"
                                                    >
                                                        {item.title}
                                                    </motion.h1>
                                                    <motion.h2 
                                                        variants={fadeInUp}
                                                        className="text-sm md:text-base text-surface-onVariant"
                                                    >
                                                        {item.name}
                                                    </motion.h2>
                                                </motion.div>
                                            </motion.div>
                                        ))}
                                    </motion.div>
                                </motion.div>
                            </motion.div>

                            {/* Gửi yêu cầu hoặc phản hồi */}
                            <motion.div 
                                ref={formSectionRef}
                                initial="hidden"
                                animate={formSectionInView ? "visible" : "hidden"}
                                variants={staggerContainer}
                                className="my-12 md:my-20"
                            >
                                <motion.h1 
                                    variants={fadeInUp}
                                    className="text-3xl md:text-5xl text-center text-surface-on font-bold mb-6"
                                >
                                    Gửi yêu cầu phản hồi
                                </motion.h1>
                                <motion.p 
                                    variants={fadeInUp}
                                    className="max-w-4xl mx-auto text-base text-center leading-loose text-surface-onVariant mb-12 md:mb-16"
                                >
                                    Nếu bạn có câu hỏi, cần hỗ trợ kỹ thuật, góp ý cải tiến, hoặc muốn hợp tác phát triển nền tảng – vui lòng 
                                    điền thông tin vào mẫu bên dưới
                                </motion.p>
                                <motion.div 
                                    variants={scaleIn}
                                    className="max-w-4xl mx-auto border border-outline-variant p-10 rounded-3xl shadow-md"
                                >
                                    <motion.form 
                                        onSubmit={handleSubmit}
                                        variants={staggerContainer}
                                        className="flex flex-col gap-4"
                                    >
                                        {/* Họ tên */}
                                        <motion.div 
                                            variants={formVariants}
                                            className="flex flex-col gap-1"
                                        >
                                            <label htmlFor="name" className="text-surface-onVariant text-sm">Họ tên đầy đủ</label>
                                            <input 
                                                type="text" 
                                                name="name" 
                                                value={formData.name}
                                                onChange={handChangeForm}
                                                required
                                                placeholder="Nguyen Van A" 
                                                className="outline-none text-surface-on px-1 py-2 rounded-sm bg-surface-1 border border-outline-variant"/>
                                        </motion.div>
                                        {/* Địa chỉ email */}
                                        <motion.div 
                                            variants={formVariants}
                                            className="flex flex-col gap-1"
                                        >
                                            <label htmlFor="email" className="text-surface-onVariant text-sm">Địa chỉ email</label>
                                            <input 
                                                type="email" 
                                                name="email" 
                                                value={formData.email}
                                                onChange={handChangeForm}
                                                required
                                                placeholder="example123@gmail.com" 
                                                className="outline-none text-surface-on px-1 py-2 rounded-sm bg-surface-1 border border-outline-variant"/>
                                        </motion.div>
                                        {/* Chủ đề liên hệ */}
                                        <motion.div 
                                            variants={formVariants}
                                            className="flex flex-col gap-1"
                                        >
                                            <label htmlFor="topic" className="text-surface-onVariant text-sm">Chủ đề liên hệ</label>
                                            <input 
                                                type="text" 
                                                name="topic" 
                                                value={formData.topic}
                                                onChange={handChangeForm}
                                                required
                                                placeholder="Hỗ trợ kỹ thuật / Góp ý sản phẩm / Hợp tác phát triển / Khác..." 
                                                className="outline-none text-surface-on px-1 py-2 rounded-sm bg-surface-1 border border-outline-variant"/>
                                        </motion.div>
                                        {/* Nội dung tin nhắn */}
                                        <motion.div 
                                            variants={formVariants}
                                            className="flex flex-col gap-1"
                                        >
                                            <label htmlFor="messages" className="text-surface-onVariant text-sm">Nội dung tin nhắn</label>
                                            <textarea 
                                                name="messages" 
                                                value={formData.messages}
                                                onChange={handChangeForm}
                                                placeholder="Nội dung cần liên hệ" 
                                                required
                                                className="outline-none text-surface-on px-1 py-2 rounded-sm bg-surface-1 border border-outline-variant resize-none"/>
                                        </motion.div>
                                        <motion.div 
                                            variants={formVariants}
                                            className="flex justify-end"
                                        >
                                            <button className="bg-primary px-8 py-2 rounded-3xl font-medium hover:bg-primary-shade duration-200 transition-all ease-in-out">
                                                Submit
                                            </button>
                                        </motion.div>
                                    </motion.form>
                                </motion.div>
                            </motion.div>

                            {/* Lưu ý khi liên hệ */}
                            <motion.div 
                                ref={warningRef}
                                initial="hidden"
                                animate={warningInView ? "visible" : "hidden"}
                                variants={staggerContainer}
                                className="my-12 md:my-20"
                            >
                                <motion.h1 
                                    variants={fadeInUp}
                                    className="text-3xl md:text-5xl text-center text-surface-on font-bold mb-12 md:mb-16"
                                >
                                    Lưu ý khi liên hệ
                                </motion.h1>
                                <motion.div 
                                    variants={staggerContainer}
                                    className="max-w-5xl mx-auto"
                                >
                                    <motion.div 
                                        variants={staggerContainer}
                                        className="flex flex-col gap-4"
                                    >
                                        {contactWarning.map((item) => (
                                            <motion.div 
                                                key={item.id} 
                                                variants={fadeInLeft}
                                                className="bg-surface-1 p-6 rounded-xl flex items-start md:items-center gap-4"
                                            >
                                                <motion.div 
                                                    variants={scaleIn}
                                                    className="bg-primary-container rounded-md p-2"
                                                >
                                                    <IoIosWarning className="text-2xl text-surface-on"/>
                                                </motion.div>
                                                <motion.h1 
                                                    variants={fadeInUp}
                                                    className="text-base text-surface-on"
                                                >
                                                    {item.title}
                                                </motion.h1>
                                            </motion.div>
                                        ))}
                                    </motion.div>
                                </motion.div>
                            </motion.div>

                            {/* Tìm chúng tôi trên bản đồ */}
                            <motion.div 
                                ref={mapRef}
                                initial="hidden"
                                animate={mapInView ? "visible" : "hidden"}
                                variants={staggerContainer}
                                className="my-12 md:my-20"
                            >
                                <motion.h1 
                                    variants={fadeInUp}
                                    className="text-3xl md:text-5xl text-center text-surface-on font-bold mb-6"
                                >
                                    Tìm chúng tôi trên bản đồ
                                </motion.h1>
                                <motion.p 
                                    variants={fadeInUp}
                                    className="max-w-4xl mx-auto text-base text-center leading-loose text-surface-onVariant mb-12 md:mb-16"
                                >
                                    Bạn có thể tìm chúng tôi tại 48/3/3A Đ. Số 3, Trường Thọ, Thủ Đức, Hồ Chí Minh, Việt Nam
                                </motion.p>
                                <motion.div 
                                    variants={scaleIn}
                                    className="px-8"
                                >
                                    <div className="w-full h-[200px] md:h-[300px] lg:h-[350px] rounded-2xl overflow-hidden shadow-lg">
                                        <iframe
                                        title="Google Map"
                                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.685772993273!2d106.75874497451784!3d10.835341558105318!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317527ae7b121297%3A0x9fda1a8492c5074d!2zNDgvMy8zQSDEkC4gU-G7kSAzLCBUcsaw4budbmcgVGjhu40sIFRo4bunIMSQ4bupYywgSOG7kyBDaMOtIE1pbmgsIFZp4buHdCBOYW0!5e0!3m2!1svi!2s!4v1745858378946!5m2!1svi!2s"
                                        width="100%"
                                        height="100%"
                                        style={{ border: 0 }}
                                        allowFullScreen
                                        loading="lazy"
                                        referrerPolicy="no-referrer-when-downgrade"
                                        />
                                    </div>
                                </motion.div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </Layout>
        </PageTransition>
    )
}

export default Contact