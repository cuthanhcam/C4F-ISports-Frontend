import { FaFacebookF, FaInstagramSquare, FaTelegramPlane, FaLinkedin } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { FaPhoneAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { GoClockFill } from "react-icons/go";
const Footer = () => {
    return (
        <footer className="bg-surface-2 rounded-t-5xl">
            <div className="container py-6">
                {/* Text content */}
                <div className="grid grid-rows-[auto_auto] md:grid-rows-1 md:grid-cols-[1fr_3fr] py-10 gap-14 md:gap-4 items-start">
                    {/* Content parent */}
                    <div className="flex flex-col gap-8">
                        {/* Logo website */}
                        <div className="flex items-center gap-2">
                            <img src="" alt="" className="w-12 h-12 object-cover" />
                            <h1 className="text-primary text-3xl font-bold">ISports</h1>
                        </div>
                        {/* Description */}
                        <p className="text-surface-onVariant text-sm">
                            Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                            Facilis repellendus et dolores quod, adipisci consequatur sunt animi,
                            temporibus incidunt commodi architecto? Exercitationem perspiciatis illo
                            minima iusto eos optio provident ex.
                        </p>
                        {/* Link socials */}
                        <ul className="flex items-center gap-4 text-surface-onVariant">
                            {/* Facebook */}
                            <li className="text-primary p-2 border border-outline-variant rounded-md group hover:bg-primary duration-200 transition-all cursor-pointer">
                                <a href="" className="group-hover:text-primary-on">
                                    <FaFacebookF />
                                </a>
                            </li>
                            {/* linked */}
                            <li className="text-primary p-2 border border-outline-variant rounded-md group hover:bg-primary duration-200 transition-all cursor-pointer">
                                <a href="" className="group-hover:text-primary-on">
                                    <FaLinkedin />
                                </a>
                            </li>
                            {/* instargram */}
                            <li className="text-primary p-2 border border-outline-variant rounded-md group hover:bg-primary duration-200 transition-all cursor-pointer">
                                <a href="" className="group-hover:text-primary-on">
                                    <FaInstagramSquare />
                                </a>
                            </li>
                            {/* teltegram */}
                            <li className="text-primary p-2 border border-outline-variant rounded-md group hover:bg-primary duration-200 transition-all cursor-pointer">
                                <a href="" className="group-hover:text-primary-on">
                                    <FaTelegramPlane />
                                </a>
                            </li>
                        </ul>
                    </div>
                    {/* Content childrent*/}
                    <div className="grid grid-cols-2 md:grid-cols-3 md:justify-items-center">
                        {/* Cols link navbar */}
                        <div className="text-surface-onVariant">
                            {/* Title */}
                            <h1 className="text-xl font-bold">QUICK LINKS</h1>
                            {/* Other link */}
                            <ul className="text-base font-medium flex flex-col gap-4 mt-8">
                                <li>
                                    <a href="">Home</a>
                                </li>
                                <li>
                                    <a href="">About</a>
                                </li>
                                <li>
                                    <a href="">Contact</a>
                                </li>
                                <li>
                                    <a href="">Service</a>
                                </li>
                            </ul>
                        </div>
                        {/* Cols */}
                        <div className="text-surface-onVariant">
                            {/* Title */}
                            <h1 className="text-xl font-bold">SUPPORT</h1>
                            {/* Other link */}
                            <ul className="text-base font-medium flex flex-col gap-4 mt-8">
                                <li>Privacy</li>
                                <li>Term of Service</li>
                                <li>Frequently Asked Questions</li>
                                <li>Field Booking Guide</li>
                                <li>Contact Support</li>
                            </ul>
                        </div>
                        {/* Cols */}
                        <div className="text-surface-onVariant">
                            {/* Title */}
                            <h1 className="text-xl font-bold">CONTACT</h1>
                            {/* Other link */}
                            <ul className="text-base font-medium flex flex-col gap-4 mt-8">
                                <li className="flex items-start justify-start gap-3">
                                    <FaLocationDot className="shrink-0 mt-1 text-primary" />
                                    <span>Exeample location distric Q9, City Thuc Duc</span>
                                </li>
                                <li className="flex items-start justify-start gap-3">
                                    <FaPhoneAlt className="shrink-0 mt-1 text-primary" />
                                    <span>(+84) {" "} 123 {" "} 456 {" "} 789</span>
                                </li>
                                <li className="flex items-start justify-start gap-3">
                                    <MdEmail className="shrink-0 mt-1 text-primary" />
                                    <span>c4f@gmail.com</span>
                                </li>
                                <li className="flex items-start justify-start gap-3">
                                    <GoClockFill className="shrink-0 mt-1 text-primary" />
                                    <span>07.00 AM - 19.AM</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                {/* Card */}
                <div className="border border-outline-variant rounded-3xl w-full max-w-lg text-surface-on">
                    <div className="max-w-lg flex flex-col items-start gap-4 p-6    ">
                        <h1 className="text-center text-3xl font-bold">Get the Latest News</h1>
                        <h2 className="text-center text-sm">
                            Enter your email to stay updated with our latest offers and news
                        </h2>
                        <div className="relative w-full group">
                            <label
                                htmlFor="email"
                                className="absolute left-4 top-1/2 -translate-y-1/2 text-surface-variant text-base transition-all duration-300 
                                group-focus-within:top-0 group-focus-within:text-sm group-focus-within:font-medium group-focus-within:text-surface-on"
                            >
                                Enter your email
                            </label>
                            <input
                                type="email"
                                name="email"
                                id="email"
                                className="w-full px-4 py-2 rounded-full outline-none text-surface-variant"
                            />
                            <button className="absolute top-1/2 -translate-y-1/2 right-0 text-primary-on text-base font-bold px-4 py-2 
                            rounded-full bg-primary hover:bg-primary-shade hover:no-underline duration-200 transition-all ease-in-out">
                                Get started
                            </button>
                        </div>
                    </div>
                </div>
                {/* Boder copy right */}
                <div className="border-t border-outline-variant mt-16"></div>
                <div className="flex flex-wrap justify-center gap-1 md:justify-between py-2 text-surface-onVariant">
                    <span>C4F - Booking Sports Website Template by C4F Team</span>
                    <span>&copy; C4F. All rights reserved</span>
                </div>
            </div>
        </footer>
    )
}

export default Footer

