import useHeader from '../../Hooks/header';
import useHero from "../../Hooks/hero";
import { Header, Hero, MainContent, Footer } from "./index";



const Layout = () => {
    const { isLogin, setIsLogin } = useHeader();
    const heroProps = useHero();
    
    return (
        <div>
            <Header isLogin={isLogin} setIsLogin={setIsLogin}/>
            <Hero {...heroProps}/>
            <MainContent/>
            <Footer/>
        </div>
    )
}

export default Layout
