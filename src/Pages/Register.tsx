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
import { useState } from "react";
import { useNavigate } from "react-router";
import { register } from '../Services/authService';

const Register = () => {

  const { showPassword, setShowPassword } = useSignIn();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullname, setFullname] = useState('');
  const [phone, setPhone] = useState('');
  const [role, setRole] = useState('User');


  const navigate = useNavigate(); // Điều hướng trang


  const handleRegister = async () => {

    try {

      await register({ email, password, fullname, phone, role });
      alert('Đăng kí thành công, kiểm tra email để xác thực ^^!');
      navigate("/login");
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div>
      <div className="pt-24"></div>
      <div className="h-screen py-12 flex justify-center">
        <div className="w-[580px]  bg-slate-50 border border-gray-300 rounded-xl">
          <div className="flex items-center justify-center py-8 ">
            <div className="flex flex-col gap-6">
              <div className="flex items-center gap-2">
                <img src={Logo} alt="" className="w-10 h-10 object-cover"/>
                <h1 className="text-xl font-semibold">ISports</h1>
              </div>
              <h1 className="text-2xl font-semibold">Nice to see you again</h1>
              <form action="" className="flex flex-col gap-5">
                <div className="flex flex-col gap-2">
                  <label htmlFor="" className="text-xs pl-2.5">Email</label>
                  <input 
                    type="email" 
                    placeholder="Enter your Email" 
                    className="outline-none p-2.5 bg-gray-200 rounded-md"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="" className="text-xs pl-2.5">Phone</label>
                  <input 
                    type="text" 
                    name=""
                    placeholder="Phone number" 
                    className="outline-none p-2.5 bg-gray-200 rounded-md" 
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="" className="text-xs pl-2.5">Password</label>
                  <div className="relative">
                    <input 
                      type={showPassword ? "text" : "password"} 
                      placeholder="Enter password" 
                      className="outline-none p-2.5 bg-gray-200 rounded-md w-full"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    {!showPassword 
                    ? <IoMdEyeOff className="absolute top-1/2 -translate-y-1/2 right-2 cursor-pointer" onClick={() => setShowPassword(!showPassword)}/> 
                    : <IoMdEye className="absolute top-1/2 -translate-y-1/2 right-2 cursor-pointer"onClick={() => setShowPassword(!showPassword)}/>}
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="" className="text-xs pl-2.5">Name</label>
                  <input 
                    type="text" 
                    name="" 
                    placeholder="Your name"
                    className="outline-none p-2.5 bg-gray-200 rounded-md" 
                    value={fullname}
                    onChange={(e) => setFullname(e.target.value)}
                  />
                </div>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full p-2.5  border rounded-md"
                >
                  <option value="User">User</option>
                  <option value="Owner">Owner</option>
                </select>
                    
              </form>
              <button 
                onClick={handleRegister}
                className="w-full bg-btn-primary py-1.5 rounded-md text-white font-semibold cursor-pointer">
                Register
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
      <div className="pb-24"></div>
    </div>
  )
}

export default Register
