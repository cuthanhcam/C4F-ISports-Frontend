import { MdManageAccounts, MdOutlineSecurity } from "react-icons/md";
import { IoSearchOutline } from "react-icons/io5";
import { BiSupport } from "react-icons/bi";
import type { IconType } from "react-icons";

export interface serviceServiceMainItem {
    id: number;
    title: string;
    content: string[];
};

export const serviceServiceMainCol1: serviceServiceMainItem[] = [
    { 
        id: 1, 
        title: "Đăng Ký và Xác Thực Đa Kênh", 
        content: [
            "Đăng ký và đăng nhập linh hoạt qua email hoặc OAuth2 với Google, Facebook giúp người dùng và chủ sân dễ dàng truy cập nền tảng một cách an toàn",
            "Tích hợp cơ chế xác thực mạnh mẽ và bảo mật cao, bảo vệ dữ liệu cá nhân và tài khoản."
        ],
    },
    { 
        id: 2, 
        title: "Tìm Kiếm và Đặt Sân Thể Thao Thông Minh", 
        content: [
            "Cung cấp công cụ tìm kiếm sân thể thao theo vị trí địa lý, loại thể thao, khung giờ trống.",
            "Hỗ trợ quản lý sân lớn cùng nhiều sân nhỏ bên trong với mức giá thuê linh hoạt, người dùng dễ dàng lựa chọn sân phù hợp nhu cầu.",
            "Hiển thị đầy đủ thông tin về sân, tiện ích đi kèm, giá thuê và các dịch vụ bổ sung.",
        ],
    },
    { 
        id: 3, 
        title: "Đặt Sân và Quản Lý Lịch Trình Đặt Sân", 
        content: [
            "Người dùng có thể đặt sân nhỏ, lựa chọn dịch vụ bổ sung và áp dụng các chương trình khuyến mãi dễ dàng.",
            "Chủ sân có thể quản lý và xác nhận đơn đặt, xử lý yêu cầu hủy hoặc đổi lịch của khách hàng.",
            "Hệ thống thông báo thời gian thực giúp cả hai bên nắm bắt kịp thời mọi thay đổi về đặt sân.",
        ],
    },
];

export const serviceServiceMainCol2: serviceServiceMainItem[] = [
    { 
        id: 4, 
        title: "Thanh Toán Trực Tuyến An Toàn", 
        content: [
            "Hỗ trợ thanh toán qua cổng VNPay bảo mật, nhanh chóng và tiện lợi.",
            "Cơ chế hoàn tiền linh hoạt khi người dùng hủy đơn đặt hợp lệ, tạo sự yên tâm cho khách hàng.",
        ],
    },
    { 
        id: 5, 
        title: "Đánh Giá và Phản Hồi", 
        content: [
            "Người dùng có thể đánh giá chất lượng sân lớn sau khi sử dụng dịch vụ.",
            "Chủ sân có thể trả lời các đánh giá, giúp cải thiện chất lượng dịch vụ và nâng cao uy tín.",
        ],
    },
    { 
        id: 6, 
        title: "Hệ Thống Gợi Ý và Điểm Thưởng", 
        content: [
            "Nền tảng cung cấp gợi ý sân dựa trên lịch sử tìm kiếm và sân yêu thích của người dùng, giúp tối ưu hóa trải nghiệm.",
            "Tích lũy điểm thưởng khi đặt sân để đổi ưu đãi hấp dẫn, tạo động lực sử dụng dịch vụ thường xuyên..",
        ],
    },
];


export interface serviceAdvantageItem {
    id: number;
    title: string;
    description: string;
    icons: IconType;
};

export const serviceAdvantage: serviceAdvantageItem[] = [
    { id: 0, title: "Quản lý sân nhỏ đa dạng", description: "Cho phép chủ sân linh hoạt tổ chức và quản lý nhiều sân nhỏ bên trong sân lớn.", icons: MdManageAccounts },
    { id: 1, title: "Tìm kiếm thông minh", description: "Bộ lọc đa dạng giúp người dùng dễ dàng tìm được sân theo yêu cầu.", icons: IoSearchOutline },
    { id: 2, title: "An toàn và bảo mật", description: "Xác thực OAuth2, bảo mật thanh toán và thông tin người dùng nghiêm ngặt.", icons: MdOutlineSecurity },
    { id: 3, title: "Hỗ trợ đa nền tảng", description: "Tương thích nhiều thiết bị, sử dụng mọi lúc, mọi nơi.", icons: BiSupport },
];