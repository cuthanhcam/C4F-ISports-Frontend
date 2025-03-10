import Logo from "../assets/images/LogoC4F.png";
import bgLogin from "../assets/images/banners/bg-login-temp.png";
import Google from "../assets/images/banners/google.png";
import Github from "../assets/images/banners/github.png";
import Facebook from "../assets/images/banners/facebook.png";
import { IoMdEye } from "react-icons/io";
import { IoMdEyeOff } from "react-icons/io";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import '../phone-input.css';
import useSignIn from "../Hooks/SignIn";

const Register = () => {

  const { showPassword, setShowPassword } = useSignIn();

  return (
    <div className="h-screen pt-[96px] flex items-center justify-center">
      <div className="max-w-[1200px] mx-auto grid grid-cols-2 place-items-center">
        <img src={bgLogin} alt="" className="h-fit object-cover rounded-l-xl"/>
        <div className="flex items-center justify-center border-t border-b border-r border-gray-300 w-full h-full rounded-r-xl">
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-2">
              <img src={Logo} alt="" className="w-10 h-10 object-cover"/>
              <h1 className="text-xl font-semibold">ISports</h1>
            </div>
            <h1 className="text-2xl font-semibold">Nice to see you again</h1>
            <form action="" className="flex flex-col gap-5">
              <div className="flex flex-col gap-2">
                <label htmlFor="" className="text-xs pl-2.5">Email</label>
                <input type="email" placeholder="Enter your Email" className="outline-none p-2.5 bg-gray-200 rounded-md"/>
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="" className="text-xs pl-2.5">Phone</label>
                <PhoneInput
                  country={"vn"} // Mặc định Việt Nam
                  enableSearch={true} // Cho phép tìm kiếm quốc gia
                  autoFormat={true}
                  disableCountryCode={false} 
                  containerClass="w-full"
                  inputClass="form-control"
                /> 
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="" className="text-xs pl-2.5">Password</label>
                <div className="relative">
                  <input type={showPassword ? "text" : "password"} placeholder="Enter password" className="outline-none p-2.5 bg-gray-200 rounded-md w-full"/>
                  {!showPassword 
                  ? <IoMdEyeOff className="absolute top-1/2 -translate-y-1/2 right-2 cursor-pointer" onClick={() => setShowPassword(!showPassword)}/> 
                  : <IoMdEye className="absolute top-1/2 -translate-y-1/2 right-2 cursor-pointer"onClick={() => setShowPassword(!showPassword)}/>}
                </div>
              </div>

            </form>
            <button className="w-full bg-btn-primary py-1.5 rounded-md text-white font-semibold">
              Sign In
            </button>
            <div className="flex items-center">
              <div className="flex-1 border-t border-gray-300"></div>
              <span className="mx-2 text-gray-500 text-sm">Sign in with</span>
              <div className="flex-1 border-t border-gray-300"></div>
            </div>
            {/* Socials Link */}
            <ul className="flex items-center justify-center gap-6">
              <li className="px-8 py-2 border border-gray-200 rounded-full cursor-pointer">
                <a href="" className="">
                  <img src={Google} alt="" className="w-4 h-4 object-cover"/>
                </a>
              </li>
              <li className="px-8 py-2 border border-gray-200 rounded-full cursor-pointer">
                  <a href="">
                    <img src={Github} alt=""  className="w-4 h-4 object-cover"/>
                  </a>
              </li>
              <li className="px-8 py-2 border border-gray-200 rounded-full cursor-pointer">
                  <a href="">
                    <img src={Facebook} alt=""  className="w-4 h-4 object-cover"/>
                  </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register
