export interface NavbarItem  {
    id: number;
    title: string;
    link: string;
};

export const  NavbarMenu: NavbarItem[] = [
    { id: 1, title: "Home", link: "/" },
    { id: 2, title: "About", link: "/about" },
    { id: 3, title: "Service", link: "/service" },
    { id: 4, title: "Contact", link: "/contact" },
];