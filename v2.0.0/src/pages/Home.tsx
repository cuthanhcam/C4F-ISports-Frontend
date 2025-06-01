// Home.tsx
import { useState } from "react";
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

const Home = () => {
  const [location, setLocation] = useState<string>("");
  const [sportType, setSportType] = useState<string>("");
  const [date, setDate] = useState<string>("");

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
    <Layout>
      <div className="bg-surface dark:bg-dark-surface relative">
        {/* Hero Section */}
        <div className="container py-6 relative z-[0]">
          <div className="home-header-light-blue dark:bg-[radial-gradient(closest-side_at_50%_50%,_#4b6cb7,_transparent)]" />
          <div className="home-header-light-pink dark:bg-[radial-gradient(closest-side_at_50%_50%,_#9b59b6,_transparent)]" />
          <div className="mt-[142px] md:mt-[162px] lg:mt-[182px]">
            {/* Hero Content */}
            <div className="flex flex-col items-center justify-center my-12 md:my-20">
              <div className="bg-primary/10 dark:bg-dark-primary/20 text-primary dark:text-dark-primary font-medium rounded-full px-6 py-2 mb-6">
                Nền tảng đặt sân thể thao #1 Việt Nam
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl text-center text-surface-on dark:text-dark-surface-on font-bold mb-6 max-w-4xl">
                {heroSectionData.title}
              </h1>
              <p className="text-base md:text-lg text-center text-surface-onVariant dark:text-dark-surface-onVariant max-w-2xl mb-12 leading-loose">
                {heroSectionData.subtitle}
              </p>

              {/* Tìm kiếm sân */}
              <div className="w-full max-w-4xl bg-surface-1 dark:bg-dark-surface-1 p-6 rounded-3xl shadow-navigation dark:shadow-navigation-dark border border-outline-variant dark:border-dark-outline-variant">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <FaMapMarkerAlt className="text-primary dark:text-dark-primary" />
                    </div>
                    <input
                      type="text"
                      className="bg-surface dark:bg-dark-surface border border-outline-variant dark:border-dark-outline-variant text-surface-on dark:text-dark-surface-on rounded-lg block w-full pl-10 p-3 focus:ring-2 focus:ring-primary dark:focus:ring-dark-primary focus:border-primary dark:focus:border-dark-primary"
                      placeholder={heroSectionData.searchPlaceholders.location}
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                    />
                  </div>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <FaSearch className="text-primary dark:text-dark-primary" />
                    </div>
                    <select
                      className="bg-surface dark:bg-dark-surface border border-outline-variant dark:border-dark-outline-variant text-surface-on dark:text-dark-surface-on rounded-lg block w-full pl-10 p-3 focus:ring-2 focus:ring-primary focus:border-primary dark:focus:ring-dark-primary dark:focus:border-dark-primary"
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
                  </div>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <FaCalendarCheck className="text-primary dark:text-dark-primary" />
                    </div>
                    <input
                      type="date"
                      className="bg-surface dark:bg-dark-surface border border-outline-variant dark:border-dark-outline-variant text-surface-on dark:text-dark-surface-on rounded-lg block w-full pl-10 p-3 focus:ring-2 focus:ring-primary dark:focus:ring-dark-primary focus:border-primary dark:focus:border-dark-primary"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                    />
                  </div>
                  <button className="flex items-center justify-center gap-2 bg-primary dark:bg-dark-primary font-medium hover:bg-primary-shade dark:hover:bg-dark-primary-shade duration-200 transition-all ease-in-out py-3 px-6 rounded-lg text-surface-1 dark:text-dark-primary-on">
                    <FaSearch />
                    <span>Tìm kiếm sân</span>
                  </button>
                </div>
              </div>

              {/* Stats */}
              <div className="flex flex-wrap justify-center gap-8 mt-12">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary dark:text-dark-primary">500+</div>
                  <div className="text-sm text-surface-onVariant dark:text-dark-surface-onVariant mt-1">
                    Sân thể thao
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary dark:text-dark-primary">10K+</div>
                  <div className="text-sm text-surface-onVariant dark:text-dark-surface-onVariant mt-1">
                    Người dùng
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary dark:text-dark-primary">20K+</div>
                  <div className="text-sm text-surface-onVariant dark:text-dark-surface-onVariant mt-1">
                    Lượt đặt sân
                  </div>
                </div>
              </div>
            </div>
            {/* Sân phổ biến */}
            <div className="my-12 md:my-20">
              <h2 className="text-3xl md:text-5xl text-center text-surface-on dark:text-dark-surface-on font-bold mb-10 lg:mb-16">
                Các Môn Thể Thao Phổ Biến
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {homePopularSports.map((sport) => (
                  <div
                    key={sport.id}
                    className="flex flex-col items-center bg-surface-1 dark:bg-dark-surface-1 rounded-3xl p-6 border border-outline-variant dark:border-dark-outline-variant hover:shadow-navigation dark:hover:shadow-navigation-dark transition-all hover:-translate-y-1 cursor-pointer"
                  >
                    <div
                      className={`${sport.color} bg-primary-container dark:bg-dark-primary-container p-4 rounded-full mb-4`}
                    >
                      <sport.icon className="text-surface-on dark:text-dark-surface-on text-4xl" />
                    </div>
                    <h3 className="text-xl font-medium text-surface-on dark:text-dark-surface-on">
                      {sport.name}
                    </h3>
                  </div>
                ))}
              </div>
            </div>

            {/* Tính năng nổi bật */}
            <div className="my-12 md:my-20 bg-surface-1 dark:bg-dark-surface-1 py-12 px-6 md:p-16 rounded-3xl">
              <h2 className="text-3xl md:text-5xl text-center text-surface-on dark:text-dark-surface-on font-bold mb-10 lg:mb-16">
                Tại Sao Chọn C4F-ISports?
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {homeFeatures.map((feature) => (
                  <div
                    key={feature.id}
                    className="flex flex-col items-center text-center p-6"
                  >
                    <div className="bg-primary-container dark:bg-dark-primary-container p-4 rounded-full mb-4">
                      <feature.icon className="text-surface-on dark:text-dark-surface-on text-3xl" />
                    </div>
                    <h3 className="text-xl font-medium text-surface-on dark:text-dark-surface-on mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-surface-onVariant dark:text-dark-surface-onVariant leading-loose">
                      {feature.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Sân thể thao nổi bật */}
            <div className="my-12 md:my-20">
              <h2 className="text-3xl md:text-5xl text-center text-surface-on dark:text-dark-surface-on font-bold mb-2">
                Sân Thể Thao Nổi Bật
              </h2>
              <p className="text-center text-surface-onVariant dark:text-dark-surface-onVariant mb-10 leading-loose">
                Khám phá những sân thể thao chất lượng được đánh giá cao
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {homeFeaturedFields.map((field) => (
                  <div
                    key={field.id}
                    className="bg-surface-1 dark:bg-dark-surface-1 rounded-3xl overflow-hidden border border-outline-variant dark:border-dark-outline-variant hover:shadow-xl dark:hover:shadow-navigation-dark transition-all hover:-translate-y-1 group relative h-80"
                  >
                    <img
                      src={field.image}
                      alt={field.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/80 transition-all"></div>
                    <div className="absolute top-4 right-4 bg-primary dark:bg-dark-primary font-medium hover:bg-primary-shade dark:hover:bg-dark-primary-shade duration-200 transition-all ease-in-out text-sm py-1 px-3 rounded text-surface-1 dark:text-dark-primary-on">
                      {field.sportType}
                    </div>

                    {/* Thông tin sân */}
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <h3 className="text-lg text-surface-1 dark:text-dark-surface-on font-medium mb-2">{field.name}</h3>
                      <div className="flex items-center text-sm text-gray-200 dark:text-dark-surface-onVariant mb-1">
                        <FaMapMarkerAlt className="mr-1 text-primary dark:text-dark-primary" />
                        {field.address}
                      </div>
                      <div className="flex items-center mb-2">
                        {renderStars(field.rating)}
                        <span className="text-sm text-gray-300 dark:text-dark-surface-onVariant ml-1">
                          ({field.rating})
                        </span>
                      </div>
                      <p className="text-sm text-gray-300 dark:text-dark-surface-onVariant mb-3">
                        {field.priceRange}
                      </p>
                      <button className="w-full py-2 rounded-3xl bg-primary dark:bg-dark-primary font-medium hover:bg-primary-shade dark:hover:bg-dark-primary-shade duration-200 transition-all ease-in-out text-surface-1 dark:text-dark-primary-on">
                        Đặt sân ngay
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex justify-center mt-8">
                <button className="bg-transparent border border-primary dark:border-dark-primary text-primary dark:text-dark-primary py-2 px-6 rounded-lg font-medium hover:bg-primary/10 dark:hover:bg-dark-primary/10 transition-colors">
                  Xem tất cả sân
                </button>
              </div>
            </div>

            {/* Testimonials Section */}
            <div className="my-12 md:my-20">
              <h2 className="text-3xl md:text-5xl text-center text-surface-on dark:text-dark-surface-on font-bold mb-10 lg:mb-16">
                Khách Hàng Nói Gì Về Chúng Tôi
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {homeTestimonials.map((testimonial) => (
                  <div
                    key={testimonial.id}
                    className="bg-surface-1 dark:bg-dark-surface-1 rounded-3xl p-6 border border-outline-variant dark:border-dark-outline-variant shadow-navigation dark:shadow-navigation-dark hover:shadow-xl dark:hover:shadow-navigation-dark transition-all"
                  >
                    <div className="flex items-center mb-4">
                      <img
                        src={testimonial.avatar}
                        alt={testimonial.name}
                        className="w-12 h-12 rounded-full mr-4 border border-outline-variant dark:border-dark-outline-variant"
                      />
                      <div>
                        <h4 className="font-medium text-surface-on dark:text-dark-surface-on">
                          {testimonial.name}
                        </h4>
                        <div className="flex">
                          {renderStars(testimonial.rating)}
                        </div>
                      </div>
                    </div>
                    <p className="text-surface-onVariant dark:text-dark-surface-onVariant italic leading-loose">
                      "{testimonial.content}"
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA Section */}
            <div className="my-12 md:my-20 bg-gradient-to-r from-primary-shade dark:from-dark-primary-shade to-primary-container dark:to-dark-primary-container rounded-3xl py-12 px-8 text-center relative overflow-hidden">
              <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 dark:bg-dark-surface/10 rounded-full transform translate-x-1/2 -translate-y-1/2"></div>
              <div className="absolute bottom-0 left-0 w-60 h-60 bg-white/5 dark:bg-dark-surface/5 rounded-full transform -translate-x-1/3 translate-y-1/3"></div>
              <div className="relative z-10">
                <h2 className="text-3xl text-surface-on dark:text-dark-surface-on md:text-5xl font-bold mb-4">
                  {ctaSectionData.title}
                </h2>
                <p className="text-surface-onVariant dark:text-dark-surface-onVariant md:text-lg mb-8 max-w-3xl mx-auto leading-loose">
                  {ctaSectionData.description}
                </p>
                <div className="flex flex-col md:flex-row justify-center gap-4">
                  <a
                    href="/register"
                    className="py-3 px-8 rounded-lg bg-primary dark:bg-dark-primary font-medium hover:bg-primary-shade dark:hover:bg-dark-primary-shade duration-200 transition-all ease-in-out shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 text-surface-1 dark:text-dark-primary-on"
                  >
                    Đăng ký ngay
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Home;