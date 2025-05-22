
import { MdSportsSoccer, MdSportsTennis, MdSportsVolleyball } from "react-icons/md";
import { BsFillLightningFill, BsShieldCheck } from "react-icons/bs";
import { AiOutlineTeam } from "react-icons/ai";
import type { IconType } from "react-icons";
import FootballField from "../assets/images/football-filedjpg.jpg"
import UserReviews from "../assets/images/avtarUserContriburion.png"


// Interfaces
export interface PopularSport {
  id: number;
  name: string;
  icon: IconType;
  color: string;
}

export interface FeaturedField {
  id: number;
  name: string;
  address: string;
  image: string;
  rating: number;
  priceRange: string;
  sportType: string;
}

export interface Testimonial {
  id: number;
  name: string;
  avatar: string;
  content: string;
  rating: number;
}

export interface HomeFeature {
  id: number;
  title: string;
  description: string;
  icon: IconType;
}

// Dữ liệu cho các môn thể thao phổ biến
export const homePopularSports: PopularSport[] = [
  { id: 1, name: "Bóng đá", icon: MdSportsSoccer, color: "bg-primary" },
  { id: 2, name: "Pickleball", icon: MdSportsTennis, color: "bg-primary" },
  { id: 3, name: "Cầu lông", icon: MdSportsVolleyball, color: "bg-primary" }
];

// Dữ liệu cho các sân thể thao nổi bật
export const homeFeaturedFields: FeaturedField[] = [
  {
    id: 1,
    name: "Sân bóng đá Thống Nhất",
    address: "123 Đường Lê Lợi, Quận 1, TP.HCM",
    image: FootballField,
    rating: 4.5,
    priceRange: "200.000 - 500.000 VNĐ/giờ",
    sportType: "Bóng đá"
  },
  {
    id: 2,
    name: "Sân Pickleball City Sport",
    address: "456 Đường Nguyễn Huệ, Quận 3, TP.HCM",
    image: FootballField,
    rating: 4.8,
    priceRange: "150.000 - 300.000 VNĐ/giờ",
    sportType: "Pickleball"
  },
  {
    id: 3,
    name: "Sân Cầu lông Phú Thọ",
    address: "789 Đường Lý Thường Kiệt, Quận 10, TP.HCM",
    image: FootballField,
    rating: 4.2,
    priceRange: "100.000 - 250.000 VNĐ/giờ",
    sportType: "Cầu lông"
  },
  {
    id: 4,
    name: "Sân bóng đá Hoàng Gia",
    address: "321 Đường Nguyễn Trãi, Quận 5, TP.HCM",
    image: FootballField,
    rating: 4.7,
    priceRange: "250.000 - 600.000 VNĐ/giờ",
    sportType: "Bóng đá"
  },
   {
    id: 5,
    name: "Sân bóng đá Hoàng Gia",
    address: "321 Đường Nguyễn Trãi, Quận 5, TP.HCM",
    image: FootballField,
    rating: 4.7,
    priceRange: "250.000 - 600.000 VNĐ/giờ",
    sportType: "Bóng đá"
  },
   {
    id: 6,
    name: "Sân bóng đá Hoàng Gia",
    address: "321 Đường Nguyễn Trãi, Quận 5, TP.HCM",
    image: FootballField,
    rating: 4.7,
    priceRange: "250.000 - 600.000 VNĐ/giờ",
    sportType: "Bóng đá"
  },
   {
    id: 7,
    name: "Sân bóng đá Hoàng Gia",
    address: "321 Đường Nguyễn Trãi, Quận 5, TP.HCM",
    image: FootballField,
    rating: 4.7,
    priceRange: "250.000 - 600.000 VNĐ/giờ",
    sportType: "Bóng đá"
  },
   {
    id: 8,
    name: "Sân bóng đá Hoàng Gia",
    address: "321 Đường Nguyễn Trãi, Quận 5, TP.HCM",
    image: FootballField,
    rating: 4.7,
    priceRange: "250.000 - 600.000 VNĐ/giờ",
    sportType: "Bóng đá"
  }
  ,
   {
    id: 9,
    name: "Sân bóng đá Hoàng Gia",
    address: "321 Đường Nguyễn Trãi, Quận 5, TP.HCM",
    image: FootballField,
    rating: 4.7,
    priceRange: "250.000 - 600.000 VNĐ/giờ",
    sportType: "Bóng đá"
  }
];

// Dữ liệu cho phần đánh giá người dùng
export const homeTestimonials: Testimonial[] = [
  {
    id: 1,
    name: "Nguyễn Văn A",
    avatar: UserReviews,
    content: "C4F-ISports giúp tôi dễ dàng tìm và đặt sân bóng đá mỗi tuần. Giao diện đơn giản, thanh toán nhanh chóng!",
    rating: 5
  },
  {
    id: 2,
    name: "Trần Thị B",
    avatar: UserReviews,
    content: "Tôi là chủ sân pickleball và ứng dụng giúp tôi quản lý lịch đặt sân hiệu quả, tăng doanh thu đáng kể.",
    rating: 4.5
  },
  {
    id: 3,
    name: "Lê Minh C",
    avatar: UserReviews,
    content: "Ứng dụng rất tiện lợi, giúp tôi tìm được sân cầu lông chất lượng gần nhà. Highly recommended!",
    rating: 5
  }
];

// Dữ liệu cho các tính năng nổi bật
export const homeFeatures: HomeFeature[] = [
  {
    id: 1,
    title: "Đặt Sân Nhanh Chóng",
    description: "Tìm và đặt sân thể thao chỉ trong vài phút với giao diện trực quan, dễ sử dụng.",
    icon: BsFillLightningFill
  },
  {
    id: 2,
    title: "Thanh Toán An Toàn",
    description: "Giao dịch được bảo mật tuyệt đối với nhiều phương thức thanh toán linh hoạt.",
    icon: BsShieldCheck
  },
  {
    id: 3,
    title: "Cộng Đồng Thể Thao",
    description: "Tham gia vào cộng đồng thể thao năng động, kết nối với những người có cùng đam mê.",
    icon: AiOutlineTeam
  }
];

// Dữ liệu cho tiêu đề Hero Section
export const heroSectionData = {
  title: "Khám Phá & Đặt Sân Thể Thao Cùng C4F-ISports",
  subtitle: "Tham gia nền tảng đặt sân thể thao trực tuyến hàng đầu Việt Nam. Tìm sân bóng đá, pickleball, cầu lông gần bạn chỉ trong vài cú nhấp chuột!",
  searchPlaceholders: {
    location: "Nhập địa điểm",
    sportType: "Môn thể thao",
    date: "Chọn ngày"
  }
};

// Dữ liệu cho CTA Section
export const ctaSectionData = {
  title: "Sẵn sàng trải nghiệm C4F-ISports?",
  description: "Đăng ký ngay hôm nay để tìm và đặt sân thể thao một cách dễ dàng. Hoặc nếu bạn là chủ sân, hãy tham gia để quản lý sân của bạn hiệu quả hơn!",
};