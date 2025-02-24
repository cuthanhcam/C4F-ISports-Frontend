import { menuItemsData } from "../../Data/menuData";
import LogoC4F from "/src/assets/images/LogoC4F.png"; 

const Header = () => {
    return (
        <div className='fixed top-0 left-0 w-screen'>
            <div className="flex items-center justify-between px-18">
                {/* Logo */}
                <div className='flex gap-2 items-center'>
                    <img src={LogoC4F} alt="Logo" className="min-w-[48px] min-h-[48px] object-cover"/>
                    <h1>ISports</h1>
                </div>
                {/* Navbar */}
                <div>
                    <ul className="flex gap-4">
                        {menuItemsData.map((nav) => (
                            <li key={nav.id}>
                                <div>
                                    <a href={nav.path}>{nav.name}</a>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>            
        </div>
    )
}

export default Header
