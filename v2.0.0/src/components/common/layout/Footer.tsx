//Footer.tsx
import { FaFacebookF, FaInstagramSquare, FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaLocationDot } from "react-icons/fa6";
import { FaPhoneAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { GoClockFill } from "react-icons/go";
import LogoImage from "../../../assets/images/LogoC4F.png"; // Giả sử bạn có logo tương tự như header

const Footer = () => {
  return (
    <footer className="bg-surface-2 dark:bg-dark-surface-2 rounded-t-5xl z-[0]">
      <div className="container py-6">
        {/* Text content */}
        <div className="grid grid-rows-[auto_auto] md:grid-rows-1 md:grid-cols-[1fr_3fr] py-10 gap-14 md:gap-4 items-start">
          {/* Content parent */}
          <div className="flex flex-col gap-8">
            {/* Logo website */}
            <div className="flex items-center gap-2">
              <img src={LogoImage} alt="ISports Logo" className="w-12 h-12 object-cover" />
              <h1 className="text-primary dark:text-dark-primary text-3xl font-bold">ISports</h1>
            </div>
            {/* Description */}
            <p className="text-surface-onVariant dark:text-dark-surface-onVariant text-sm">
              Modern, convenient sports court booking platform - from soccer, badminton to pickleball. Book a court in just a few clicks
            </p>
            {/* Link socials */}
            <ul className="flex items-center gap-4 text-surface-onVariant dark:text-dark-surface-onVariant">
              {/* Facebook */}
              <li className="text-primary dark:text-dark-primary p-2 border border-surface-4 dark:border-dark-outline-variant rounded-md group hover:bg-primary dark:hover:bg-dark-primary duration-200 transition-all cursor-pointer">
                <a href="https://www.facebook.com/profile.php?id=61573894474129" className="group-hover:text-primary-tint dark:group-hover:text-dark-primary-on">
                  <FaFacebookF />
                </a>
              </li>
              {/* LinkedIn */}
              <li className="text-primary dark:text-dark-primary p-2 border border-surface-4 dark:border-dark-outline-variant rounded-md group hover:bg-primary dark:hover:bg-dark-primary duration-200 transition-all cursor-pointer">
                <a href="https://www.linkedin.com/in/code-for-food-439679368/" className="group-hover:text-primary-tint dark:group-hover:text-dark-primary-on">
                  <FaLinkedin />
                </a>
              </li>
              {/* Instagram */}
              <li className="text-primary dark:text-dark-primary p-2 border border-surface-4 dark:border-dark-outline-variant rounded-md group hover:bg-primary dark:hover:bg-dark-primary duration-200 transition-all cursor-pointer">
                <a href="https://www.instagram.com/c4f204/" className="group-hover:text-primary-tint dark:group-hover:text-dark-primary-on">
                  <FaInstagramSquare />
                </a>
              </li>
              {/* Twitter */}
              <li className="text-primary dark:text-dark-primary p-2 border border-surface-4 dark:border-dark-outline-variant rounded-md group hover:bg-primary dark:hover:bg-dark-primary duration-200 transition-all cursor-pointer">
                <a href="https://x.com/CodeForFood04" className="group-hover:text-primary-tint dark:group-hover:text-dark-primary-on">
                  <FaXTwitter />
                </a>
              </li>
            </ul>
          </div>
          {/* Content children */}
          <div className="grid grid-cols-2 md:grid-cols-3 md:justify-items-center">
            {/* Cols link navbar */}
            <div className="text-surface-onVariant dark:text-dark-surface-onVariant">
              <h1 className="text-xl font-bold">QUICK LINKS</h1>
              <ul className="text-base font-medium flex flex-col gap-4 mt-8">
                <li>
                  <a href="/" className="hover:text-primary dark:hover:text-dark-primary transition-colors duration-200">
                    Home
                  </a>
                </li>
                <li>
                  <a href="/about" className="hover:text-primary dark:hover:text-dark-primary transition-colors duration-200">
                    About
                  </a>
                </li>
                <li>
                  <a href="/service" className="hover:text-primary dark:hover:text-dark-primary transition-colors duration-200">
                    Service
                  </a>
                </li>
                <li>
                  <a href="/contact" className="hover:text-primary dark:hover:text-dark-primary transition-colors duration-200">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            {/* Cols Support */}
            <div className="text-surface-onVariant dark:text-dark-surface-onVariant">
              <h1 className="text-xl font-bold">SUPPORT</h1>
              <ul className="text-base font-medium flex flex-col gap-4 mt-8">
                <li>
                  <a href="/privacy" className="hover:text-primary dark:hover:text-dark-primary transition-colors duration-200">
                    Privacy
                  </a>
                </li>
                <li>
                  <a href="/terms" className="hover:text-primary dark:hover:text-dark-primary transition-colors duration-200">
                    Term of Service
                  </a>
                </li>
                <li>
                  <a href="/faq" className="hover:text-primary dark:hover:text-dark-primary transition-colors duration-200">
                    Frequently Asked Questions
                  </a>
                </li>
                <li>
                  <a href="/guide" className="hover:text-primary dark:hover:text-dark-primary transition-colors duration-200">
                    Field Booking Guide
                  </a>
                </li>
                <li>
                  <a href="/support" className="hover:text-primary dark:hover:text-dark-primary transition-colors duration-200">
                    Contact Support
                  </a>
                </li>
              </ul>
            </div>
            {/* Cols Contact */}
            <div className="text-surface-onVariant dark:text-dark-surface-onVariant">
              <h1 className="text-xl font-bold">CONTACT</h1>
              <ul className="text-base font-medium flex flex-col gap-4 mt-8">
                <li className="flex items-start justify-start gap-3">
                  <FaLocationDot className="shrink-0 mt-1 text-primary dark:text-dark-primary" />
                  <span>48/3/3A Đ. Số 3, Trường Thọ, Thủ Đức, Hồ Chí Minh, Việt Nam</span>
                </li>
                <li className="flex items-start justify-start gap-3">
                  <FaPhoneAlt className="shrink-0 mt-1 text-primary dark:text-dark-primary" />
                  <span>(+84) 902 621 876</span>
                </li>
                <li className="flex items-start justify-start gap-3">
                  <MdEmail className="shrink-0 mt-1 text-primary dark:text-dark-primary" />
                  <span>codeforfoodd@gmail.com</span>
                </li>
                <li className="flex items-start justify-start gap-3">
                  <GoClockFill className="shrink-0 mt-1 text-primary dark:text-dark-primary" />
                  <span>07:00 AM - 19:00 PM</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        {/* Card */}
        <div className="border border-surface-4 dark:border-dark-outline-variant rounded-3xl w-full max-w-lg text-surface-on dark:text-dark-surface-on">
          <div className="max-w-lg flex flex-col items-start gap-4 p-6">
            <h1 className="text-center text-3xl font-bold text-primary dark:text-dark-primary">Get the Latest News</h1>
            <h2 className="text-center text-sm text-surface-onVariant dark:text-dark-surface-onVariant">
              Enter your email to stay updated with our latest offers and news
            </h2>
            <div className="relative w-full group">
              <label
                htmlFor="email"
                className="absolute left-4 top-1/2 -translate-y-1/2 text-surface-5 dark:text-dark-surface-variant text-base transition-all duration-300 
                group-focus-within:top-0 group-focus-within:text-sm group-focus-within:font-medium group-focus-within:text-surface-on dark:group-focus-within:text-dark-surface-on"
              >
                Enter your email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                className="w-full px-4 py-2 rounded-full outline-none text-surface-on dark:text-dark-surface-variant bg-surface-1 dark:bg-dark-surface-1 border border-outline-variant dark:border-dark-outline-variant"
              />
              <button className="absolute top-1/2 -translate-y-1/2 right-0 text-surface-1 dark:text-dark-primary-on text-base font-bold px-4 py-2 
              rounded-full bg-primary dark:bg-dark-primary hover:bg-primary-shade dark:hover:bg-dark-primary-shade hover:no-underline duration-200 transition-all ease-in-out">
                Get started
              </button>
            </div>
          </div>
        </div>
        {/* Border copyright */}
        <div className="border-t border-dark-outline-variant dark:border-dark-outline-variant mt-16"></div>
        <div className="flex flex-wrap justify-center gap-1 md:justify-between py-2 text-surface-onVariant dark:text-dark-surface-onVariant">
          <span>C4F - Booking Sports Website Template by C4F Team</span>
          <span>© C4F. All rights reserved</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;