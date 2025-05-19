import type { ComponentType } from "react";
import Home from "../pages/Home";
import About from "../pages/About";
import Contact from "../pages/Contact";
import Service from "../pages/Service";
import NotFound from "../pages/NotFound";

type Routes = {
    id: number;
    path: string;
    component: ComponentType<any>;
};

export const appRoutes: Routes[] = [
    { id: 1, path: "/", component: Home },
    { id: 2, path: "/about", component: About },
    { id: 3, path: "/contact", component: Contact },
    { id: 4, path: "/service", component: Service },
    { id: 5, path: "*", component: NotFound },
];

