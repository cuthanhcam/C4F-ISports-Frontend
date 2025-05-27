import type { IconType } from "react-icons";
import { FiStar, FiUser } from "react-icons/fi";
import { IoIosNotificationsOutline } from "react-icons/io";
import { MdOutlineHistory } from "react-icons/md";

export interface IFeatures {
    id: number;
    name: string;
    link: string;
}

export interface IProfile {
    id: number;
    title: string;
    link: string;
    icon: IconType | string;
    features: IFeatures[];
};


export const ProfileItems: IProfile[] = [
    {
        id: 1,
        title: 'Thông báo',
        link: '',
        icon: IoIosNotificationsOutline,
        features: [
            { id: 1, name: 'Khuyến mãi', link: '/' },
            { id: 2, name: 'Cập nhật C4F-ISports', link: '/' },
        ]
    },
    {
        id: 2,
        title: 'Tài khoản của tôi',
        link: '/users/profile',
        icon: FiUser,
        features: [
            { id: 1, name: 'Hồ sơ', link: '/users/profile' },
            { id: 2, name: 'Đổi mật khẩu', link: '/users/change-password' },
        ]
    },
    {
        id: 3,
        title: 'Sân bóng',
        link: '',
        icon: MdOutlineHistory,
        features: [
            { id: 1, name: 'Lịch sử đặt sân', link: '/' },
            { id: 2, name: 'Sân bóng yêu thích', link: '/' },
        ]
    },
    {
        id: 4,
        title: 'Đánh giá và điểm thưởng',
        link: '',
        icon: FiStar,
        features: [
            { id: 1, name: 'Đánh giá của tôi', link: '/' },
            { id: 2, name: 'Điểm tích lũy', link: '/' },
        ]
    },
]