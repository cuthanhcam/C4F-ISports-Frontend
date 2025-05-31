import HomeIcon from '../assets/icons/home.png';
import ManagementIcon from '../assets/icons/profile.png';
import BookingIcons from '../assets/icons/booking.png';
import StatisticIcon from '../assets/icons/statistics.png';
import SettingIcon from '../assets/icons/setting.png';

export interface ISidebar {
    id: number;
    title: string;
    icon: string;
    link: string;
};

export const SidebarItem: ISidebar[] = [
    { id: 1, title: 'Dashboard', icon: HomeIcon, link: '/dashboard' },
    { id: 2, title: 'Quản lý sân', icon: ManagementIcon, link: '/management-yard' },
    { id: 3, title: 'Đặt sân', icon: BookingIcons, link: '/set-yard' },
    { id: 4, title: 'Thống kê', icon: StatisticIcon, link: '/statistical' },
    { id: 5, title: 'Cài đặt', icon: SettingIcon, link: '/setting' },
];