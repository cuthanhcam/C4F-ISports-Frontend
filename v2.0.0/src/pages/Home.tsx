import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import Layout from "../components/common/layout/Layout";
import { FaCalendarCheck, FaMapMarkerAlt, FaSearch } from "react-icons/fa";
import { IoMdStar, IoMdStarHalf } from "react-icons/io";
import {
  homePopularSports,
  homeFeaturedFields,
  homeTestimonials,
  homeFeatures,
  heroSectionData,
  ctaSectionData,
} from "../constants/home";
import PageTransition from "./PageTransition";

const Home = () => {
  const [location, setLocation] = useState<string>("");
  const [sportType, setSportType] = useState<string>("");
  const [date, setDate] = useState<string>("");

  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
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

  const slideInLeft = {
    hidden: { x: -100, opacity: 0 },
    visible: { 
      x: 0, 
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const slideInRight = {
    hidden: { x: 100, opacity: 0 },
    visible: { 
      x: 0, 
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  // Refs for in-view detection
  const heroRef = useRef(null);
  const sportsRef = useRef(null);
  const featuresRef = useRef(null);
  const fieldsRef = useRef(null);
  const testimonialsRef = useRef(null);
  const ctaRef = useRef(null);

  const heroInView = useInView(heroRef, { once: true });
  const sportsInView = useInView(sportsRef, { once: true });
  const featuresInView = useInView(featuresRef, { once: true });
  const fieldsInView = useInView(fieldsRef, { once: true });
  const testimonialsInView = useInView(testimonialsRef, { once: true });
  const ctaInView = useInView(ctaRef, { once: true });

  // Hàm render đánh giá bằng sao
  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<IoMdStar key={`star-${i}`} className="text-yellow-500" />);
    }

    if (hasHalfStar) {
      stars.push(<IoMdStarHalf key="half-star" className="text-yellow-500" />);
    }

    return stars;
  };

  return (
    <PageTransition>
      <Layout>
        <div className="bg-surface relative">
          {/* Hero Section */}
          <div className="container py-6 relative z-[0]">
            <div className="home-header-light-blue" />
            <div className="home-header-light-pink" />
            <div className="mt-[142px] md:mt-[162px] lg:mt-[182px]">
              {/* Hero Content */}
              <motion.div 
                ref={heroRef}
                initial="hidden"
                animate={heroInView ? "visible" : "hidden"}
                variants={staggerContainer}
                className="flex flex-col items-center justify-center my-12 md:my-20"
              >
                <motion.div 
                  variants={fadeInUp}
                  className="bg-primary/10 text-primary font-medium rounded-full px-6 py-2 mb-6"
                >
                  Nền tảng đặt sân thể thao #1 Việt Nam
                </motion.div>
                
                <motion.h1 
                  variants={fadeInUp}
                  className="text-4xl md:text-5xl lg:text-6xl text-center text-surface-on font-bold mb-6 max-w-4xl"
                >
                  {heroSectionData.title}
                </motion.h1>
                
                <motion.p 
                  variants={fadeInUp}
                  className="text-base md:text-lg text-center text-surface-onVariant max-w-2xl mb-12 leading-loose"
                >
                  {heroSectionData.subtitle}
                </motion.p>

                {/* Tìm kiếm sân */}
                <motion.div 
                  variants={scaleIn}
                  className="w-full max-w-4xl bg-surface-1 p-6 rounded-3xl shadow-navigation border border-outline-variant"
                >
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <motion.div 
                      variants={slideInLeft}
                      className="relative"
                    >
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <FaMapMarkerAlt className="text-primary" />
                      </div>
                      <input
                        type="text"
                        className="bg-surface border border-outline-variant text-surface-on rounded-lg block w-full pl-10 p-3 focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-300"
                        placeholder={heroSectionData.searchPlaceholders.location}
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                      />
                    </motion.div>
                    
                    <motion.div 
                      variants={fadeInUp}
                      className="relative"
                    >
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <FaSearch className="text-primary" />
                      </div>
                      <select
                        className="bg-surface border border-outline-variant text-surface-on rounded-lg block w-full pl-10 p-3 focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-300"
                        value={sportType}
                        onChange={(e) => setSportType(e.target.value)}
                      >
                        <option value="">
                          {heroSectionData.searchPlaceholders.sportType}
                        </option>
                        <option value="football">Bóng đá</option>
                        <option value="pickleball">Pickleball</option>
                        <option value="badminton">Cầu lông</option>
                      </select>
                    </motion.div>
                    
                    <motion.div 
                      variants={slideInRight}
                      className="relative"
                    >
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <FaCalendarCheck className="text-primary" />
                      </div>
                      <input
                        type="date"
                        className="bg-surface border border-outline-variant text-surface-on rounded-lg block w-full pl-10 p-3 focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-300"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                      />
                    </motion.div>
                    
                    <motion.button 
                      variants={scaleIn}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center justify-center gap-2 bg-primary font-medium hover:bg-primary-shade duration-200 transition-all ease-in-out py-3 px-6 rounded-lg"
                    >
                      <FaSearch />
                      <span>Tìm kiếm sân</span>
                    </motion.button>
                  </div>
                </motion.div>

                {/* Stats */}
                <motion.div 
                  variants={staggerContainer}
                  className="flex flex-wrap justify-center gap-8 mt-12"
                >
                  {[
                    { value: "500+", label: "Sân thể thao" },
                    { value: "10K+", label: "Người dùng" },
                    { value: "20K+", label: "Lượt đặt sân" }
                  ].map((stat, index) => (
                    <motion.div 
                      key={index}
                      variants={fadeInUp}
                      whileHover={{ scale: 1.1 }}
                      className="text-center cursor-pointer"
                    >
                      <div className="text-3xl font-bold text-primary">{stat.value}</div>
                      <div className="text-sm text-surface-onVariant mt-1">
                        {stat.label}
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>

              {/* Sân phổ biến */}
              <motion.div 
                ref={sportsRef}
                initial="hidden"
                animate={sportsInView ? "visible" : "hidden"}
                variants={staggerContainer}
                className="my-12 md:my-20"
              >
                <motion.h2 
                  variants={fadeInUp}
                  className="text-3xl md:text-5xl text-center text-surface-on font-bold mb-10 lg:mb-16"
                >
                  Các Môn Thể Thao Phổ Biến
                </motion.h2>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {homePopularSports.map((sport, index) => (
                    <motion.div
                      key={sport.id}
                      variants={scaleIn}
                      whileHover={{ 
                        scale: 1.05, 
                        y: -10,
                        transition: { duration: 0.3 }
                      }}
                      className="flex flex-col items-center bg-surface-1 rounded-3xl p-6 border border-outline-variant hover:shadow-navigation transition-all cursor-pointer"
                    >
                      <motion.div
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.5 }}
                        className={`${sport.color} bg-primary-container p-4 rounded-full mb-4`}
                      >
                        <sport.icon className="text-surface-on text-4xl" />
                      </motion.div>
                      <h3 className="text-xl font-medium text-surface-on">
                        {sport.name}
                      </h3>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Tính năng nổi bật */}
              <motion.div 
                ref={featuresRef}
                initial="hidden"
                animate={featuresInView ? "visible" : "hidden"}
                variants={staggerContainer}
                className="my-12 md:my-20 bg-surface-1 py-12 px-6 md:p-16 rounded-3xl"
              >
                <motion.h2 
                  variants={fadeInUp}
                  className="text-3xl md:text-5xl text-center text-surface-on font-bold mb-10 lg:mb-16"
                >
                  Tại Sao Chọn C4F-ISports?
                </motion.h2>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {homeFeatures.map((feature, index) => (
                    <motion.div
                      key={feature.id}
                      variants={fadeInUp}
                      whileHover={{ y: -5 }}
                      className="flex flex-col items-center text-center p-6"
                    >
                      <motion.div 
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        className="bg-primary-container p-4 rounded-full mb-4"
                      >
                        <feature.icon className="text-surface-on text-3xl" />
                      </motion.div>
                      <h3 className="text-xl font-medium text-surface-on mb-2">
                        {feature.title}
                      </h3>
                      <p className="text-surface-onVariant leading-loose">
                        {feature.description}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Sân thể thao nổi bật */}
              <motion.div 
                ref={fieldsRef}
                initial="hidden"
                animate={fieldsInView ? "visible" : "hidden"}
                variants={staggerContainer}
                className="my-12 md:my-20"
              >
                <motion.h2 
                  variants={fadeInUp}
                  className="text-3xl md:text-5xl text-center text-surface-on font-bold mb-2"
                >
                  Sân Thể Thao Nổi Bật
                </motion.h2>
                
                <motion.p 
                  variants={fadeInUp}
                  className="text-center text-surface-onVariant mb-10 leading-loose"
                >
                  Khám phá những sân thể thao chất lượng được đánh giá cao
                </motion.p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {homeFeaturedFields.map((field, index) => (
                    <motion.div
                      key={field.id}
                      variants={scaleIn}
                      whileHover={{ 
                        scale: 1.02, 
                        y: -10,
                        transition: { duration: 0.3 }
                      }}
                      className="bg-surface-1 rounded-3xl overflow-hidden border border-outline-variant hover:shadow-xl transition-all group relative h-80 cursor-pointer"
                    >
                      <img
                        src={field.image}
                        alt={field.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />

                      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/80 transition-all"></div>
                      
                      <motion.div 
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        className="absolute top-4 right-4 bg-primary font-medium hover:bg-primary-shade duration-200 transition-all ease-in-out text-sm py-1 px-3 rounded"
                      >
                        {field.sportType}
                      </motion.div>

                      <div className="absolute bottom-0 left-0 right-0 p-4">
                        <h3 className="text-lg text-surface-on font-medium mb-2">{field.name}</h3>

                        <div className="flex items-center text-sm text-gray-200 mb-1">
                          <FaMapMarkerAlt className="mr-1 text-primary" />
                          {field.address}
                        </div>

                        <div className="flex items-center mb-2">
                          {renderStars(field.rating)}
                          <span className="text-sm text-gray-300 ml-1">
                            ({field.rating})
                          </span>
                        </div>

                        <p className="text-sm text-gray-300 mb-3">
                          {field.priceRange}
                        </p>

                        <motion.button 
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="w-full py-2 rounded-3xl bg-primary font-medium hover:bg-primary-shade duration-200 transition-all ease-in-out"
                        >
                          Đặt sân ngay
                        </motion.button>
                      </div>
                    </motion.div>
                  ))}
                </div>
                
                <motion.div 
                  variants={fadeInUp}
                  className="flex justify-center mt-8"
                >
                  <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-transparent border border-primary text-primary py-2 px-6 rounded-lg font-medium hover:bg-primary/10 transition-colors"
                  >
                    Xem tất cả sân
                  </motion.button>
                </motion.div>
              </motion.div>

              {/* Testimonials Section */}
              <motion.div 
                ref={testimonialsRef}
                initial="hidden"
                animate={testimonialsInView ? "visible" : "hidden"}
                variants={staggerContainer}
                className="my-12 md:my-20"
              >
                <motion.h2 
                  variants={fadeInUp}
                  className="text-3xl md:text-5xl text-center text-surface-on font-bold mb-10 lg:mb-16"
                >
                  Khách Hàng Nói Gì Về Chúng Tôi
                </motion.h2>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {homeTestimonials.map((testimonial, index) => (
                    <motion.div
                      key={testimonial.id}
                      variants={fadeInUp}
                      whileHover={{ y: -5 }}
                      className="bg-surface-1 rounded-3xl p-6 border border-outline-variant shadow-navigation hover:shadow-xl transition-all"
                    >
                      <div className="flex items-center mb-4">
                        <motion.img
                          whileHover={{ scale: 1.1 }}
                          src={testimonial.avatar}
                          alt={testimonial.name}
                          className="w-12 h-12 rounded-full mr-4"
                        />
                        <div>
                          <h4 className="font-medium text-surface-on">
                            {testimonial.name}
                          </h4>
                          <div className="flex">
                            {renderStars(testimonial.rating)}
                          </div>
                        </div>
                      </div>
                      <p className="text-surface-onVariant italic leading-loose">
                        "{testimonial.content}"
                      </p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* CTA Section */}
              <motion.div 
                ref={ctaRef}
                initial="hidden"
                animate={ctaInView ? "visible" : "hidden"}
                variants={fadeInUp}
                className="my-12 md:my-20 bg-gradient-to-r from-primary-shade to-primary-container rounded-3xl py-12 px-8 text-center relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full transform translate-x-1/2 -translate-y-1/2"></div>
                <div className="absolute bottom-0 left-0 w-60 h-60 bg-white/5 rounded-full transform -translate-x-1/3 translate-y-1/3"></div>

                <div className="relative z-10">
                  <motion.h2 
                    variants={fadeInUp}
                    className="text-3xl text-surface-on md:text-5xl font-bold mb-4"
                  >
                    {ctaSectionData.title}
                  </motion.h2>
                  
                  <motion.p 
                    variants={fadeInUp}
                    className="text-surface-onVariant md:text-lg mb-8 max-w-3xl mx-auto leading-loose"
                  >
                    {ctaSectionData.description}
                  </motion.p>
                  
                  <motion.div 
                    variants={scaleIn}
                    className="flex flex-col md:flex-row justify-center gap-4"
                  >
                    <motion.a
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      href="/register"
                      className="py-3 px-8 rounded-lg bg-primary font-medium hover:bg-primary-shade duration-200 transition-all ease-in-out shadow-lg hover:shadow-xl"
                    >
                      Đăng ký ngay
                    </motion.a>
                  </motion.div>
                </div>
              </motion.div>
            </div>    
          </div>
        </div>
      </Layout>
    </PageTransition>
  );
};

export default Home;