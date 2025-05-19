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
    { id: 1, title: "Email", name: "c4f@gmail.com", icon: MdEmail },
    { id: 2, title: "Phone", name: "+84 123 456 789", icon: FaPhoneAlt },
    { id: 3, title: "Address", name: "Exeample location distric Q9, City Thuc Duc", icon: FaLocationDot },
    { id: 4, title: "Fanpage", name: "C4F - ISports", icon: FaFacebookF },
];

export const contactWarning: contactWarningItem[] = [
    { id: 1, title: "Vui lòng không gửi nội dung spam, quảng cáo hoặc liên hệ không rõ mục đích." },
    { id: 2, title: "Các yêu cầu liên quan đến hợp tác, tài trợ, hoặc tích hợp API cần ghi rõ thông tin đại diện và tổ chức." },
    { id: 3, title: "Mọi hành vi gửi liên hệ sai mục đích hoặc có yếu tố tiêu cực sẽ bị xử lý theo quy định sử dụng dịch vụ của C4F-ISports." },
    { id: 4, title: "Đối với hỗ trợ khẩn cấp về việc đặt sân, vui lòng gọi trực tiếp đến hotline trong giờ làm việc." },
];