import Layout from "../Components/Layout/Layout";
import { Hero, MainContent } from "../Components/Layout";
import useHero from "../Hooks/hero";

const Home = () => {
    const heroProps = useHero();
    return (
        <Layout>
            <Hero {...heroProps}/>
            <MainContent />
        </Layout>
    );
};

export default Home;
