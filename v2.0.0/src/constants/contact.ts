import type { IconType } from "react-icons";
import { MdEmail } from "react-icons/md";
import { FaPhoneAlt, FaFacebookF } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";

export interface contactItem {
    id: number;
    title: string;
    name: string;
    icon: IconType;
};

export interface contactWarningItem {
    id: number;
    title: string;
};

export const contactData: contactItem[] = [
    { id: 1, title: "Email", name: "codeforfoodd@gmail.com", icon: MdEmail },
    { id: 2, title: "Phone", name: "+84 902 621 876", icon: FaPhoneAlt },
    { id: 3, title: "Address", name: "48/3/3A Đ. Số 3, Trường Thọ, Thủ Đức, Hồ Chí Minh, Việt Nam", icon: FaLocationDot },
    { id: 4, title: "Fanpage", name: "Code For Food", icon: FaFacebookF },
];

export const contactWarning: contactWarningItem[] = [
    { id: 1, title: "Vui lòng ghi rõ họ tên, số điện thoại, email và nội dung cần hỗ trợ để chúng tôi có thể phản hồi nhanh chóng và chính xác." },
    { id: 2, title: "Chúng tôi sẽ phản hồi yêu cầu liên hệ trong vòng 24 giờ (không tính ngày lễ và cuối tuần)." },
    { id: 3, title: "Đối với các vấn đề khẩn cấp như sự cố đặt sân, lỗi thanh toán, vui lòng gọi trực tiếp đến hotline để được hỗ trợ ngay." },
    { id: 4, title: "Vui lòng sử dụng ngôn từ lịch sự, rõ ràng; các nội dung thiếu tôn trọng hoặc mang tính spam sẽ không được phản hồi." },
];