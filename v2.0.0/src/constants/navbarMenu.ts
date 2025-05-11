export interface NavbarItem  {
    id: number;
    title: string;
    link: string;
};

export const  NavbarMenu: NavbarItem[] = [
    { id: 1, title: "Home", link: "/" },
    { id: 2, title: "About", link: "/" },
    { id: 3, title: "Contact", link: "/" },
    { id: 4, title: "Service", link: "/" },
];