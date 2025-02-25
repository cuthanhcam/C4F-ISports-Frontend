import { Header } from "./layout"; 
import useHeader from '../../Hooks/header';
import Hero from "./Hero";
import useHero from "../../Hooks/hero";



const Layout = () => {

    const { isLogin, setIsLogin } = useHeader();
    const { displayedText } = useHero();
    return (
        <div>
            <Header isLogin={isLogin} setIsLogin={setIsLogin}/>
            <Hero displayedText={displayedText}/>
        </div>
    )
}

export default Layout
