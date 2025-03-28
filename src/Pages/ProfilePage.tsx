import { useEffect, useState } from "react";
import { useAuth } from "../Context/AuthContext";
import avatarFemale from '../assets/images/lolo_nu.jpg';
import avatarMale from '../assets/images/logo_nam.jpg';
import avatarDefault from '../assets/images/LogoC4FMain.png';
import { CiUser, CiLock } from "react-icons/ci";
import { Link, useNavigate } from "react-router";
import { MdOutlineMailOutline } from "react-icons/md";
import { LuPhone } from "react-icons/lu";
import { LiaBirthdayCakeSolid } from "react-icons/lia";
import { FaTransgender } from "react-icons/fa6";
import { FiEdit } from "react-icons/fi";
import { RiProfileLine } from "react-icons/ri";
import { IoCloseOutline } from "react-icons/io5";

const ProfilePage = () => {
  const { user, fetchUserProfile, updateUser } = useAuth();

  useEffect(() => {
    if (!user) {  // Nếu user đã có dữ liệu thì không cần fetch lại
      fetchUserProfile();
    }
  }, [user]);  // Thêm user vào dependency để tránh gọi API không cần thiết
  
  // Xác định ảnh đại diện
  const avatarSrc = user?.avatarUrl 
    ? user.avatarUrl
    : user?.gender === 'male'
    ? avatarMale
    : user?.gender === 'female'
    ? avatarFemale
    : avatarDefault;
  
  const navigate = useNavigate();

  const [openUpdateUser, setOpenUpdateUser] = useState(false);

  const [formData, setFormData] = useState({
    fullName: user?.fullName || '',
    phone: user?.phone || '',
    gender: user?.gender || '',
    dateOfBirth: user?.dateOfBirth || '',
    avatarUrl: user?.avatarUrl || '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    await updateUser(formData);
    alert('Cập nhật thành công!');
  };

  return (
    <div>
      <div className="pt-24">
        <div className="h-screen py-10">
          <div className="max-w-[1200px] mx-auto">
            <div className="flex items-center gap-2 pb-10">
              <div className="bg-btn-primary w-1 h-10 rounded-md"></div>
              <div className="flex items-center gap-1.5">
                  <Link to='/boking' className="text-sm font-medium hover:text-btn-primary duration-200 transition-transform ease-linear">Booking</Link>
                  <span>{'>'}</span>
                  <span className="text-sm font-medium">Thông tin cá nhân</span>
              </div>
            </div>
            <div className="pt-8">
              <div className="grid grid-cols-[auto_1fr] gap-16">
                {/* Chức năng */}
                <div>
                    <div className="flex flex-col gap-8">
                        {/* Chức năng thông tin cá nhân */}
                        <div className="flex items-center gap-2 py-4 px-8 bg-slate-100 rounded-full">
                          <div className="bg-btn-primary p-2 rounded-full">
                            <CiUser className="text-white"/>
                          </div>
                          <h1 className="">Thông tin cá nhân</h1>
                        </div>
                        {/* Chức năng bảo mật */}
                        <div className="flex items-center gap-2 py-4 px-8 bg-slate-100 rounded-full">
                          <div className="bg-btn-primary p-2 rounded-full">
                            <CiLock className="text-white"/>
                          </div>
                          <h1>Cài đặt bảo mật</h1>
                        </div>
                    </div>
                </div>
                {/* Thông tin chức năng */}
                <div>
                  {/* Header thông tin */}
                  <div className="flex justify-between pb-10">
                        <div className="flex flex-col gap-4">
                          <h1 className="text-3xl font-bold">Thông tin cá nhân</h1>
                          <span className="text-base font-light">Cập nhật thông tin của bạn và tìm hiểu các thông tin này được sử dụng ra sao</span>
                        </div>
                        {/* Not yet done */}
                        <img src={avatarDefault} alt="" className="w-20 h-20 object-cover rounded-full border border-btn-primary"/>
                  </div> 
                  <div className="bg-slate-100 rounded-md">
                    <div className="p-8 flex flex-col gap-6 relative">
                      <FiEdit 
                        onClick={() => setOpenUpdateUser(!openUpdateUser)}
                        className="absolute top-2 right-2 text-xl cursor-pointer hover:scale-110 duration-300 transition-all ease-linear"/>
                      {/* Email */}
                      <div className="flex items-center gap-4">
                        <div className="bg-btn-primary p-2 rounded-full">
                          <MdOutlineMailOutline className="text-white"/>
                        </div>
                        <span>{user?.email || "Chưa cập nhật"}</span>
                      </div>
                      {/* Họ và tên */}
                      <div className="flex items-center gap-4">
                        <div className="bg-btn-primary p-2 rounded-full">
                          <RiProfileLine className="text-white"/>
                        </div>
                        <span>{user?.fullName || "Chưa cập nhật"}</span>
                      </div>
                      {/* Số điện thoại */}
                      <div className="flex items-center gap-4">
                        <div className="bg-btn-primary p-2 rounded-full">
                          <LuPhone className="text-white"/>
                        </div>
                        <span>{user?.phone || "Chưa cập nhật"}</span>
                      </div>
                      {/* Ngày sinh */}
                      <div className="flex items-center gap-4">
                        <div className="bg-btn-primary p-2 rounded-full">
                          <LiaBirthdayCakeSolid className="text-white"/>
                        </div>
                        <span>{user?.dateOfBirth || "Chưa cập nhật"}</span>
                      </div>
                      {/* Giới tính */}
                      <div className="flex items-center gap-4">
                        <div className="bg-btn-primary p-2 rounded-full">
                          <FaTransgender className="text-white"/>
                        </div>
                        <span>{user?.gender === 'male' ? 'Nam' : user?.gender === 'female' ? 'Nữ' : "Chưa xác định"}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* <div className="flex flex-col items-center gap-4">
                <img 
                  src={avatarSrc} 
                  alt="User avatar" 
                  className="w-20 h-20 rounded-full object-cover"
                />
                <ul className="text-lg text-gray-700">
                  <li><strong>Email:</strong> {user?.email || "Chưa cập nhật"}</li>
                  <li><strong>Vai trò:</strong> {user?.role || "Chưa cập nhật"}</li>
                  <li><strong>Họ và tên:</strong> {user?.fullName || "Chưa cập nhật"}</li>
                  <li><strong>Số điện thoại:</strong> {user?.phone || "Chưa cập nhật"}</li>
                  <li><strong>Giới tính:</strong> {user?.gender === 'male' ? 'Nam' : user?.gender === 'female' ? 'Nữ' : "Chưa xác định"}</li>
                  <li><strong>Ngày sinh:</strong> {user?.dateOfBirth || "Chưa cập nhật"}</li>
                </ul>
              </div> */}
            </div>
          </div>
        </div>
      </div>
      {openUpdateUser && (
          <div className="fixed inset-0 bg-black/10 backdrop-blur-sm flex items-center justify-center z-[999]">
            <div className="bg-slate-100 bg-opacity-100 p-14 rounded-lg shadow-lg w-md">
              <img src={avatarDefault} alt="" className="w-14 h-14"/>
              <div className="flex items-center justify-between pb-8">
                <h1 className="text-xl font-semibold">Thông tin cá nhân</h1>
                <button 
                  onClick={() => setOpenUpdateUser(!setOpenUpdateUser)}
                  className="p-1 border border-black rounded-sm cursor-pointer">
                  <IoCloseOutline />
                </button>
              </div>
              <form action="" className="flex flex-col gap-6">
                <div className="flex flex-col gap-2">
                  <label htmlFor="" className="text-sm font-light pl-1.5">Name</label>
                  <input 
                    
                    type="text" 
                    className="p-2 bg-gray-200 rounded-md outline-none"
                    value={formData.fullName}
                    onChange={handleChange}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="" className="text-sm font-light pl-1.5">Phone</label>
                  <input 
                    type="text" 
                    className="p-2 bg-gray-200 rounded-md outline-none"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="" className="text-sm font-light pl-1.5">Gender</label>
                  <select 
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    className="p-2 bg-gray-200 rounded-md outline-none">
                    <option value="Male">Male</option>
                    <option value="Famle">Famle</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="" className="text-sm font-light pl-1.5">Birth</label>
                  <input 
                    value={formData.dateOfBirth}
                    onChange={handleChange}
                    type="text" 
                    className="p-2 bg-gray-200 rounded-md outline-none"/>
                </div>
              </form>
              <div className="flex items-center justify-end pt-8">
                <button 
                  onClick={handleSubmit}
                  className="px-8 py-1.5 bg-btn-primary rounded-md text-sm font-medium cursor-pointer">Lưu</button>
              </div>
            </div>
        </div>
      )}
    </div>
  );
}

export default ProfilePage;
