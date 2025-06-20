import { Outlet } from "react-router";
import Layout from "../../../../components/common/layout/Layout"
import Navbar from "./navbar";

const Profile = () => {
    return (
        <Layout>
            <div className="bg-surface dark:bg-dark-surface">
                <div className="container py-6 relative z-[0]">
                    <div className="home-header-light-blue"/>
                    <div className="home-header-light-pink"/>
                    <div className="mt-[142px] md:mt-[162px] lg:mt-[182px] mb-[54px] md:mb-[76px] lg:mb-[98px]">
                        <div className="grid grid-cols-[auto_1fr] gap-6">
                            <Navbar/>
                            <Outlet />
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Profile
