export interface item {
    label: string;
    link: string;
}

export interface MenuMobileItem {
    id: number;
    title: string;
    items: item[];
}


export const  MenuMobileData: MenuMobileItem[] = [
    { 
        id: 1, 
        title: 'Trang chính',
        items: [
            { label: "Trang chủ", link: '/' },
            { label: "Giới thiệu", link: '/about' },
            { label: "Dịch vụ", link: '/service' },
            { label: "Liên hệ", link: '/contact' },
        ]
    },
    {
        id: 2,
        title: 'Tài khoản',
        items: [
            { label: "Đăng ký", link: '/auth/login' },
            { label: "Đăng nhập", link: '/auth/register' },
            { label: "Quên mật khẩu", link: '/auth/forgot-password' },
        ]
    },
    {
        id: 3,
        title: 'Hệ thống',
        items: [
            { label: "Bảng điều khiển", link: '/dashboard' },
            { label: "Đặt sân", link: '/booking' },
            { label: "Thống kê", link: '/statistics' },
        ]
    }
]


export interface IMenuItems {
    labal: string;
    link: string;
}

export interface IMenuGroups {
    id:  number;
    title: string;
    items: IMenuItems[];

}

export interface IMenuSections {
    sectionId: number;
    title: string;
    groups: IMenuGroups[];
}


export const MenuSections: IMenuSections[] = [
    {
        sectionId: 1,
        title: 'Trang chính',
        groups: [
            {
                id: 1,
                title: 'Trang',
                items: [
                    { labal: 'Trang chủ', link: '/' },
                    { labal: 'Giới thiệu', link: '/about' },
                    { labal: 'Dịch vụ', link: '/service' },
                    { labal: 'Liên hệ', link: '/contact' },
                ]
            }
        ]
    },
    {
        sectionId: 2,
        title: 'Tài khoản',
        groups: [
            {
                id: 1,
                title: 'Trang',
                items: [
                    { labal: 'Đăng nhập', link: '/auth/login' },
                    { labal: 'Đăng ký', link: '/auth/register' },
                    { labal: 'Quên mật khẩu', link: '/auth/forgot-password' },
                ]
            }
        ]
    },
    {
        sectionId: 3,
        title: 'Hệ thống',
        groups: [
            {
                id: 1,
                title: 'Trang',
                items: [
                    { labal: 'Bảng điều kiển', link: '/' },
                    { labal: 'Đặt sân', link: '/' },
                    { labal: 'Thống kê', link: '/' },
                    { labal: 'Lịch sử', link: '/' },
                ]
            }
        ]
    },
]



