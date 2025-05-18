import Layout from "../components/common/layout/Layout";
import InroduceImage from "../assets/images/Introduce_C4F.jpg";
import MissionAndVisionImage from "../assets/images/Mission_And_Vision_C4F.jpg";
import AvatarUserContribution from "../assets/images/avtarUserContriburion.png";
import { aboutContribution, aboutFeature, aboutProgress, aboutUseTechBE, aboutUseTechFE } from "../constants/about";


const About = () => {
    return (
        <Layout>
            <div className="bg-surface relative">
                {/* <div className="home-header-light-blue"/>
                <div className="home-header-light-pink"/> */}
                <div className="container py-6 relative z-[0]">
                    <div className="home-header-light-blue"/>
                    <div className="home-header-light-pink"/>
                    {/* Thông tin giới thiệu dự án */}
                    <div className="grid grid-cols-1 md:grid-cols-2 items-center justify-items-center lg:justify-items-end my-12 md:my-20 gap-14 lg:gap-0">
                        {/*  Giới thiệu */}
                        <div className="flex flex-col gap-6 md:gap-8 order-2 md:order-1">
                            {/* Tiêu đề */}
                            <h1 className="text-3xl md:text-5xl text-center md:text-left text-surface-on font-bold">Giới thiệu về C4F-ISports</h1>
                            {/* Description */}
                            <p className="text-base text-center md:text-left leading-loose text-surface-onVariant">
                                C4F-ISports là nền tảng quản lý và đặt sân thể thao trực tuyến, 
                                giúp kết nối hiệu quả giữa người chơi thể thao và chủ sân. 
                                Ứng dụng hỗ trợ tìm kiếm sân theo vị trí, loại hình thể thao, 
                                đặt sân nhỏ, thanh toán, nhận thông báo và nhiều tiện ích đi kèm. 
                                Phiên bản 2.0.0 là một bước tiến lớn, mang lại trải nghiệm mượt mà hơn, 
                                tính năng phong phú và hiệu suất cao hơn cho người dùng.
                            </p>
                        </div>                       
                        {/* Ảnh mô tả */}
                        <img src={InroduceImage} alt="" className="order-1 md:order-2 min-w-[16rem] max-h-[24rem] md:min-w-[20rem] md:max-h-[26rem] lg:min-w-[24rem] lg:max-h-[32rem] object-center rounded-3xl border 
                        border-outline-variant shadow-navigation"/>
                    </div>
                    {/* Sứ mệnh và tinh thần */}
                    <div className="grid grid-cols-1 md:grid-cols-2 items-center justify-items-center lg:justify-items-start my-12 md:my-20 gap-14 lg:gap-0">
                        <img src={MissionAndVisionImage} alt="" className="min-w-[16rem] max-h-[24rem] md:min-w-[20rem] md:max-h-[26rem] lg:min-w-[24rem] lg:max-h-[32rem] object-center rounded-3xl border 
                        border-outline-variant shadow-navigation"/>
                        <div className="flex flex-col gap-6 md:gap-8">
                            {/* Tiêu đề */}
                            <h1 className="text-3xl md:text-5xl text-center md:text-left text-surface-on font-bold">Sứ mệnh và Tầm nhìn</h1>
                            <p className="text-base text-center md:text-left leading-loose text-surface-onVariant">
                                Chúng tôi hướng đến việc số hóa trải nghiệm thể thao, giúp người dùng dễ dàng 
                                tìm kiếm và đặt sân phù hợp chỉ trong vài bước. Đồng thời, hỗ trợ chủ sân quản lý sân bãi, 
                                lịch đặt và doanh thu một cách thuận tiện và chuyên nghiệp.
                                Tầm nhìn: Trở thành nền tảng đặt sân hàng đầu tại Việt Nam, xây dựng cộng đồng thể thao 
                                năng động, kết nối người chơi và chủ sân mọi lúc, mọi nơi.
                            </p>
                        </div>
                    </div>
                    {/* Các đối tượng sử dụng và chức năng chính */}
                    <div className="my-12 md:my-20">
                        <h1 className="text-3xl md:text-5xl text-center text-surface-on font-bold mb-10 lg:mb-16">Các đối tượng sử dụng và chức năng chính</h1>
                        <div className="grid grid-cols-1 sm:grid-cols-2 justify-center gap-6">
                            {/* Người dùng(User) */}
                            <div className="bg-surface-1 px-10 py-6 rounded-3xl">
                                <h1 className="text-xl md:text-3xl font-semibold text-surface-on mb-4">Người dùng</h1>
                                <ul className="text-surface-onVariant leading-loose text-base">
                                    <li className="relative">
                                        Đăng ký/đăng nhập bằng Email hoặc qua Google/Facebook.
                                        <div className="absolute top-1/2 -translate-y-1/2 -left-3.5 w-1.5 h-1.5 rounded-full bg-primary"/>
                                    </li>
                                    <li className="relative">
                                        Tìm kiếm sân theo vị trí, bộ môn, khung giờ.
                                        <div className="absolute top-1/2 -translate-y-1/2 -left-3.5 w-1.5 h-1.5 rounded-full bg-primary"/>
                                    </li>
                                    <li className="relative">
                                        Đặt sân nhỏ, lựa chọn dịch vụ đi kèm, thanh toán trực tuyến.
                                        <div className="absolute top-1/2 -translate-y-1/2 -left-3.5 w-1.5 h-1.5 rounded-full bg-primary"/>
                                    </li>
                                    <li className="relative">
                                        Nhận thông báo, xem lịch sử đặt sân, đánh giá sân và tích lũy điểm thưởng.
                                        <div className="absolute top-1/2 -translate-y-1/2 -left-3.5 w-1.5 h-1.5 rounded-full bg-primary"/>
                                    </li>
                                </ul>
                            </div>
                            {/* Chủ sân(Owner) */}
                            <div className="bg-surface-1 px-10 py-6 rounded-3xl">
                                <h1 className="text-xl md:text-3xl font-semibold text-surface-on mb-4">Chủ sân</h1>
                                <ul className="text-surface-onVariant leading-loose text-base">
                                    <li className="relative">
                                        Tạo và quản lý sân lớn, sân nhỏ, giá thuê linh hoạt theo khung giờ.
                                        <div className="absolute top-1/2 -translate-y-1/2 -left-3.5 w-1.5 h-1.5 rounded-full bg-primary"/>
                                    </li>
                                    <li className="relative">
                                        Quản lý đơn đặt sân, trả lời đánh giá của người dùng.
                                        <div className="absolute top-1/2 -translate-y-1/2 -left-3.5 w-1.5 h-1.5 rounded-full bg-primary"/>
                                    </li>
                                    <li className="relative">
                                        Xem thống kê doanh thu và lượt đặt sân.
                                        <div className="absolute top-1/2 -translate-y-1/2 -left-3.5 w-1.5 h-1.5 rounded-full bg-primary"/>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        {/* Quản trị viên(Admin) */}
                        <div className="flex justify-center">
                            <div className="bg-surface-1 px-10 py-6 rounded-3xl mt-6">
                                <h1 className="text-xl md:text-3xl font-semibold text-surface-on mb-4">Quản trị viên</h1>
                                <ul className="text-surface-onVariant leading-loose text-base">
                                    <li className="relative">
                                        Quản lý người dùng và chủ sân.
                                        <div className="absolute top-1/2 -translate-y-1/2 -left-3.5 w-1.5 h-1.5 rounded-full bg-primary"/>
                                    </li>
                                    <li className="relative">
                                        Kiểm duyệt đánh giá, giám sát hoạt động hệ thống và loại hình thể thao.
                                        <div className="absolute top-1/2 -translate-y-1/2 -left-3.5 w-1.5 h-1.5 rounded-full bg-primary"/>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    {/* Tính năng nổi bật của C4F-ISports 2.0.0 */}
                    <div className="my-12 md:my-20">
                        {/* Title */}
                        <h1 className="text-3xl md:text-5xl text-center text-surface-on font-bold mb-10 lg:mb-16">Tính năng nổi bật của C4F-ISports 2.0.0</h1>
                        {/* Content section*/}
                        <div className="overflow-hidden whitespace-nowrap">
                            <ul className="flex items-center gap-6 animate-marquee py-1">
                                {aboutFeature.map((item) => (
                                    <li key={item.id} className="p-4 border border-outline-variant rounded-3xl flex flex-col items-center gap-4 shadow-navigation">
                                        <item.icon className="text-4xl md:text-6xl lg:text-8xl text-primary"/>
                                        <h1 className="text-surface-on text-xl md:text-2xl lg:text-3xl font-medium">{item.title}</h1>
                                        <p className="text-surface-onVariant text-sm lg:text-base">{item.description}</p>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                    {/* Quy trình hoạt động */}
                    <div className="my-12 md:my-20">
                        {/* Title */}
                        <h1 className="text-3xl md:text-5xl text-center text-surface-on font-bold mb-10 lg:mb-16">Quy trình hoạt động</h1>
                        {/* Conent section */}
                        <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                            {aboutProgress.map((item) => (
                                <li key={item.id} className="bg-surface-1 rounded-b-3xl shadow-md">
                                    {/* Title */}
                                    <div className="relative bg-primary h-14 rounded-t-3xl">
                                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 bg-primary rounded-full p-2">
                                            <div className="bg-surface-1 h-10 w-10 rounded-full flex items-center justify-center text-surface-on">
                                                {item.id}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mt-12 flex flex-col gap-4 items-center text-center justify-center px-4 py-2">
                                        <h1 className="text-3xl font-medium text-surface-on">{item.title}</h1>
                                        <p className="text-base text-surface-onVariant">{item.description}</p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                    {/* Công nghệ sử dụng */}
                    <div className="my-12 md:my-20">
                        {/* Title */}
                        <h1 className="text-3xl md:text-5xl text-center text-surface-on font-bold mb-10 lg:mb-16">Công nghệ sử dụng</h1>
                        {/* Tech backend */}
                        <div className="mb-16">
                            <h2 className="text-xl md:text-3xl text-center text-surface-on font-bold mb-8 lg:mb-16">Backennd</h2>
                            <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6 lg:gap-8">
                                {aboutUseTechBE.map((item) => (
                                    <li 
                                        key={item.id} 
                                        className={`p-6 rounded-3xl border border-outline-variant flex flex-col items-center gap-6 cursor-pointer 
                                        ${item.shadow} duration-200 transition-transform ease-in-out`}>
                                        <img src={item.image} alt="" className="w-32 h-32 object-contain"/>
                                        <h1 className="text-xl text-surface-on font-medium">{item.name}</h1>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        {/* Tech frontend */}
                        <div>
                            <h2 className="text-xl md:text-3xl text-center text-surface-on font-bold mb-8 lg:mb-16">Frontend</h2>
                            <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6 lg:gap-8">
                                {aboutUseTechFE.map((item) => (
                                    <li 
                                        key={item.id} 
                                        className={`p-6 rounded-3xl border border-outline-variant flex flex-col items-center gap-6 cursor-pointer 
                                        ${item.shadow} duration-200 transition-transform ease-in-out`}>
                                        <img src={item.image} alt="" className="w-32 h-32 object-contain"/>
                                        <h1 className="text-xl text-surface-on font-medium">{item.name}</h1>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                    {/* Đội ngũ phát triển */}
                    <div className="my-12 md:my-20">
                        <h1 className="text-3xl md:text-5xl text-center text-surface-on font-bold mb-10 lg:mb-16">Đội ngũ phát triển</h1>
                        <h4 className="text-xl md:text-3xl text-center font-medium text-surface-inverse mb-4 lg:mb-6">
                            Dự án được phát triển bởi nhóm sinh viên chuyên ngành Công nghệ Thông tin
                        </h4>
                        <p className="text-base text-center text-surface-onVariant mb-10 lg:mb-16"> 
                            Chúng tôi không ngừng học hỏi và cải tiến để hoàn thiện sản phẩm tốt nhất, phục vụ người dùng và chủ sân một cách toàn diện
                        </p>
                        <ul className="flex items-center flex-wrap gap-8 justify-center">
                            {aboutContribution.map((item) => (
                                <li key={item.id} className="p-4 md:p-6 border border-outline-variant rounded-3xl">
                                    {/* Avatar contribution */}
                                    <img src={AvatarUserContribution} alt="" className="w-[280px] md:w-[320px] lg:w-auto lg:h-auto object-contain"/>
                                    <h1 className="text-xl md:text-3xl text-center font-medium text-surface-on my-2 md:my-4">{item.name}</h1>
                                    <h3 className="text-base text-center text-surface-onVariant">{item.jobPosition}</h3>
                                </li>
                            ))}
                        </ul>
                       
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default About
