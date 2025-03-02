import { Header } from "./layout"; 
import useHeader from '../../Hooks/header';
import Hero from "./Hero";
import useHero from "../../Hooks/hero";



const Layout = () => {

    const { isLogin, setIsLogin } = useHeader();
    const { 
        displayedText, 
        choicePlay, 
        handleChoicePlay,  
        isSreachCity, 
        setIsSreachCity,
        choiceCity, 
        handleChoiceCity,
        isSearchDistrict, 
        setIsSearchDistrict,
        choiceDistrict,
        handleChoiceDistrict,
        isOpenPlay, 
        setIsOpenPlay,
    } = useHero();

    return (
        <div>
            <Header isLogin={isLogin} setIsLogin={setIsLogin}/>
            <Hero 
                displayedText={displayedText} 
                choicePlay={choicePlay} handleChoicePlay={handleChoicePlay} 
                isSreachCity={isSreachCity} setIsSreachCity={setIsSreachCity}
                choiceCity={choiceCity} handleChoiceCity={handleChoiceCity}
                isSearchDistrict={isSearchDistrict} setIsSearchDistrict={setIsSearchDistrict}
                choiceDistrict={choiceDistrict} handleChoiceDistrict={handleChoiceDistrict}
                isOpenPlay={isOpenPlay} setIsOpenPlay={setIsOpenPlay}
            />
        </div>
    )
}

export default Layout
