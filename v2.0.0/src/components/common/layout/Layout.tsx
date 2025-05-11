import Footer from "./Footer";
import Header from "./Header";

interface LayoutProps {
    children?: React.ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <div>
            <Header/>
                {children}
            <Footer/>
        </div>
    )
}

export default Layout
