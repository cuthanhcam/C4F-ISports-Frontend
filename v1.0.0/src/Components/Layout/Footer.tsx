import Logo from "../../assets/images/logo_C4F_tachnen.png";
import { FaLocationDot } from "react-icons/fa6";
import { FaPhone } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import Footer_Layout01 from "../../assets/images/banners/Footer_Layout01.png";
import Footer_Layout02 from "../../assets/images/banners/Footer_Layout02.png";
import Footer_Layout03 from "../../assets/images/banners/Footer_Layout03.png";
import { FaPinterestP,  FaInstagram, FaTiktok, FaLinkedinIn, FaFacebookF } from "react-icons/fa";
import ButtonImage from "../../assets/images/banners/VectorRow.png";
const Footer = () => {
    return (
        <div className="bg-btn-primary mt-18">
            <div className="py-18">
                <div className="max-w-[1200px] mx-auto grid grid-cols-4 justify-items-center">
                    <div className="flex flex-col gap-8">
                        <div className="flex items-center gap-2">
                            <img src={Logo} alt="" className="w-8 h-8 object-cover"/>
                            <h1 className="text-2xl font-semibold">ISports</h1>
                        </div>
                        <div className="flex flex-col gap-4">
                            <div className="flex items-center gap-2 text-sm font-medium">
                                <FaLocationDot/>
                                48/8 Đường số 3, Trường Thọ, Thủ Đức
                            </div>
                            <div className="flex items-centergap-2 text-sm font-medium">
                                <FaPhone/>
                                +84 00 000 000
                            </div>
                            <div className="flex items-center gap-2 text-sm font-medium">
                                <MdEmail/>
                                bootchatgmail.com
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col gap-8">
                        <h1 className="text-2xl font-semibold">Liên kết</h1>
                        <ul className="flex flex-col gap-4">
                            <li>
                                <a href="" className="text-base font-medium">Trang Chủ</a>
                            </li>
                            <li>
                                <a href="" className="text-base font-medium">Tính năng</a>
                            </li>
                            <li>
                                <a href="" className="text-base font-medium">Tin tức</a>
                            </li>
                            <li>
                                <a href="" className="text-base font-medium">Liên hệ</a>
                            </li>
                        </ul>
                    </div>
                    <div className="flex flex-col gap-8">
                        <h1 className="text-2xl font-semibold">Chính sách</h1>
                        <ul className="flex flex-col gap-4">
                            <li>
                                <a href="" className="text-base font-medium">Chính sách bảo mật</a>
                            </li>
                            <li>
                                <a href="" className="text-base font-medium">Chính sách cookie</a>
                            </li>
                            <li>
                                <a href="" className="text-base font-medium">Chính sách thanh toán</a>
                            </li>
                            <li>
                                <a href="" className="text-base font-medium">Điều khoản sử dụng</a>
                            </li>
                        </ul>
                    </div>
                    <div className="flex flex-col gap-8">
                        <div className="flex flex-col gap-4">
                            <h1 className="text-2xl font-semibold">Follow Us</h1>
                            <ul className="flex items-center gap-4">
                                <li className="p-2 bg-white rounded-md hover:bg-amber-50 duration-200 transition-colors cursor-pointer  group">
                                    <a href="">
                                        <FaFacebookF className="group-hover:-translate-y-1 duration-300 transition-transform ease-linear"/>
                                    </a>
                                </li>
                                <li className="p-2 bg-white rounded-md hover:bg-amber-50 duration-200 transition-colors cursor-pointer  group">
                                    <a href="">
                                        <FaPinterestP className="group-hover:-translate-y-1 duration-300 transition-transform ease-linear"/>
                                    </a>
                                </li>
                                <li className="p-2 bg-white rounded-md hover:bg-amber-50 duration-200 transition-colors cursor-pointer  group">
                                    <a href="">
                                        <FaInstagram className="group-hover:-translate-y-1 duration-300 transition-transform ease-linear"/>
                                    </a>
                                </li>
                                <li className="p-2 bg-white rounded-md hover:bg-amber-50 duration-200 transition-colors cursor-pointer  group ">
                                    <a href="">
                                        <FaTiktok className="group-hover:-translate-y-1 duration-300 transition-transform ease-linear"/>
                                    </a>
                                </li>
                                <li className="p-2 bg-white rounded-md hover:bg-amber-50 duration-200 transition-colors cursor-pointer group">
                                    <a href="">
                                        <FaLinkedinIn className="group-hover:-translate-y-1 duration-300 transition-transform ease-linear"/>
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div className="flex flex-col gap-4">
                            <h1 className="text-2xl font-semibold">Subscribe</h1>
                            <p>Subscribe to stay tuned for new web design and latest updates. Let's do it!</p>
                            <div className="flex items-center px-4 py-2 border border-gray-300 rounded-md">
                                <input type="email" placeholder="Enter your email" className="outline-none w-full"/>
                                <button className="cursor-pointer hover:translate-x-1 duration-200 transition-transform ease-linear">
                                    <img src={ButtonImage} alt="" className="w-5 h-5 object-cover"/>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="relative">
                <img src={Footer_Layout01} alt="" className="w-full"/>
                <img src={Footer_Layout02} alt="" className="absolute top-0 left-0 z-[2] w-full"/>
                <img src={Footer_Layout03} alt="" className="absolute top-0 left-0 z-[3] w-full"/>
                <h1 className="absolute top-1/2 translate-y-1/2 left-1/2 -translate-x-1/2 text-sm text-gray-300 font-semibold z-[4]">Copyright 2025 © ISports</h1>
            </div>
        </div>
    )
}

export default Footer
