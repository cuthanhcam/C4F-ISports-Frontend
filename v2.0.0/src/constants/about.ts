import type { IconType } from "react-icons";
import { BiSupport } from "react-icons/bi";
import { LuBrain } from "react-icons/lu";
import { FiSearch } from "react-icons/fi";
import { IoGiftSharp } from "react-icons/io5";
import { MdOutlineSecurity } from "react-icons/md";
import { BsCreditCard2Back } from "react-icons/bs";
import { GoClockFill } from "react-icons/go";


// Image Backend
import CSharpImg from "../assets/images/tech/C4F-Icon-BackEnd/CSharp.png";
import SQLImg from "../assets/images/tech/C4F-Icon-BackEnd/SQL.png";
import JWTImg from "../assets/images/tech/C4F-Icon-BackEnd/JWT.png";
import OAuth2Img from "../assets/images/tech/C4F-Icon-BackEnd/OAuth2.png";
import SerilogImg from "../assets/images/tech/C4F-Icon-BackEnd/Serilog.png";
import RedisImg from "../assets/images/tech/C4F-Icon-BackEnd/Redis.png";
import SwaggerImg from "../assets/images/tech/C4F-Icon-BackEnd/Swagger.png";
import NetCoreImg from "../assets/images/tech/C4F-Icon-BackEnd/NetCorepng.png";
import ASPNetImg from "../assets/images/tech/C4F-Icon-BackEnd/ASP_NET.png";
import XUnitImg from "../assets/images/tech/C4F-Icon-BackEnd/XUnit_tachnen.png";

// Image Frontend
import JavascriptImg from "../assets/images/tech/C4F-Icons-Frontend/js.svg";
import TypeScriptImg from "../assets/images/tech/C4F-Icons-Frontend/TypeScript.png";
import HtmlImg from "../assets/images/tech/C4F-Icons-Frontend/Html.png";
import CssImg from "../assets/images/tech/C4F-Icons-Frontend/Css.png";
import TailwinCSSImg from "../assets/images/tech/C4F-Icons-Frontend/TailwindCSS.svg";
import ReactJsImg from "../assets/images/tech/C4F-Icons-Frontend/react.svg";
import ReactRouterImg from "../assets/images/tech/C4F-Icons-Frontend/ReactRouter.svg";
import ViteImg from "../assets/images/tech/C4F-Icons-Frontend/Vitejs-logo.svg.png";
import SwiperImg from "../assets/images/tech/C4F-Icons-Frontend/swiper-logo.svg";
import MontionImg from "../assets/images/tech/C4F-Icons-Frontend/motion.png";




// Type 
export interface aboutItem {
    id: number;
    title: string;
    description: string;
    icon: IconType;
};

export interface aboutProgressItem {
    id: number;
    title: string;
    description: string;
};

export interface aboutUseTechItem {
    id: number;
    name: string;
    image: string;
    shadow: string;
};

export interface aboutContributionItem {
    id: number;
    name: string;
    jobPosition: string;
};

export const aboutFeature: aboutItem[] = [
    { id: 1, title: "Hỗ trợ sân nhỏ (SubField)", description: "Một sân lớn có thể có nhiều sân nhỏ với giá thuê riêng biệt.", icon: BiSupport },
    { id: 2, title: "Gợi ý sân thông minh", description: "Đề xuất sân dựa trên lịch sử tìm kiếm và sân yêu thích.", icon: LuBrain },
    { id: 3, title: "Tìm kiếm nâng cao", description: "Lọc sân theo vị trí, loại thể thao và thời gian trống.", icon: FiSearch },
    { id: 4, title: "Tích điểm & đổi quà", description: "Người dùng có thể tích lũy điểm khi đặt sân và sử dụng cho các ưu đãi.", icon: IoGiftSharp },
    { id: 5, title: "Xác thực bảo mật cao", description: "Đăng nhập an toàn bằng OAuth2 (Google, Facebook).", icon: MdOutlineSecurity },
    { id: 6, title: "Thanh toán tiện lợi", description: "Hỗ trợ thanh toán trực tuyến thông qua VNPay.", icon: BsCreditCard2Back },
    { id: 7, title: "Thông báo thời gian thực", description: "Nhận thông báo qua email về trạng thái đơn đặt, khuyến mãi, phản hồi đánh giá,...", icon: GoClockFill },
];

export const aboutProgress: aboutProgressItem[] = [
    { id: 1, title: "Đăng kí & xác thực", description: "Người dùng có thể đăng ký bằng email hoặc sử dụng Google/Facebook. Tài khoản được xác thực nhanh chóng, an toàn." },
    { id: 2, title: "Tìm kiếm & đặt sân", description: "Dễ dàng tìm sân theo nhu cầu, xem giá và khung giờ trống, đặt sân chỉ với vài bước đơn giản." },
    { id: 3, title: "Thanh toán", description: "Thanh toán an toàn qua VNPay, hỗ trợ hoàn tiền trong các trường hợp hủy sân hợp lệ." },
    { id: 4, title: "Đánh giá & quản lý", description: "Người dùng có thể đánh giá sân, quản lý lịch sử đặt sân, nhận thông báo. Chủ sân được cung cấp công cụ thống kê và quản trị hiệu quả." },
];



export const aboutUseTechBE: aboutUseTechItem[] = [
    { id: 1, name: "C sharp", image: CSharpImg, shadow: "hover:shadow-cSharp" },
    { id: 2, name: "SQL Server", image: SQLImg, shadow: "hover:shadow-sql-server" },
    { id: 3, name: "ASP.NET Core", image: ASPNetImg, shadow: "hover:shadow-aspNet-core" },
    { id: 4, name: ".NET Core", image: NetCoreImg, shadow: "hover:shadow-net-core" },
    { id: 5, name: "JSON Web Tokens", image: JWTImg, shadow: "hover:shadow-jwt" },
    { id: 6, name: "Swagger", image: SwaggerImg, shadow: "hover:shadow-swagger" },
    { id: 7, name: "OAuth2", image: OAuth2Img, shadow: "hover:shadow-oAuth2" },
    { id: 8, name: "Serilog", image: SerilogImg, shadow: "hover:shadow-serilog" },
    { id: 9, name: "Redis", image: RedisImg, shadow: "hover:shadow-redis" },
    { id: 10, name: "XUnit", image: XUnitImg, shadow: "hover:shadow-xunit" },
];


export const aboutUseTechFE: aboutUseTechItem[] = [
    { id: 1, name: "JavaScript", image: JavascriptImg, shadow: "hover:shadow-javascript" },
    { id: 2, name: "TypeScript", image: TypeScriptImg, shadow: "hover:shadow-typescript" },
    { id: 3, name: "HTML", image: HtmlImg, shadow: "hover:shadow-html" },
    { id: 4, name: "CSS", image: CssImg, shadow: "hover:shadow-css" },
    { id: 5, name: "React", image: ReactJsImg, shadow: "hover:shadow-react" },
    { id: 6, name: "React Router", image: ReactRouterImg, shadow: "hover:shadow-react-router" },
    { id: 7, name: "TailwindCSS", image: TailwinCSSImg, shadow: "hover:shadow-tailwindCSS" },
    { id: 8, name: "Vite", image: ViteImg, shadow: "hover:shadow-vite" },
    { id: 9, name: "Swiper", image: SwiperImg, shadow: "hover:shadow-swiper" },
    { id: 10, name: "Motion", image: MontionImg, shadow: "hover:shadow-motion" },
];


export const aboutContribution: aboutContributionItem[] = [
    { id: 1, name: "Cù Thanh Cầm", jobPosition: "Backend Development" },
    { id: 2, name: "Trương Phước Hưng", jobPosition: "Frontend Development" },
    { id: 3, name: "Trần Trung Hậu", jobPosition: "Frontend Development" },
];