import type { ComponentType } from "react";
import Home from "../pages/Home";
import About from "../pages/About";
import Contact from "../pages/Contact";
import Service from "../pages/Service";
import NotFound from "../pages/NotFound";
import Login from "../pages/Login";
import Register from "../pages/Register";

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
  { id: 5, path: "/login", component: Login },
  { id: 6, path: "/register", component: Register },
  { id: 7, path: "*", component: NotFound },
];
