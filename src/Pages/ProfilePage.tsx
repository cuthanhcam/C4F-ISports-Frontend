import { useEffect, useState } from "react";
import { useAuth } from "../Context/AuthContext";
import avatarFemale from '../assets/images/lolo_nu.jpg';
import avatarMale from '../assets/images/logo_nam.jpg';
import avatarDefault from '../assets/images/LogoC4FMain.png';
import { CiUser, CiLock } from "react-icons/ci";
import { Link } from "react-router";
import { MdOutlineMailOutline } from "react-icons/md";
import { LuPhone } from "react-icons/lu";
import { LiaBirthdayCakeSolid } from "react-icons/lia";
import { FaTransgender } from "react-icons/fa6";
import { FiEdit } from "react-icons/fi";
import { RiProfileLine } from "react-icons/ri";
import { IoCloseOutline } from "react-icons/io5";

const ProfilePage = () => {
  const [openUpdateUser, setOpenUpdateUser] = useState(false);
  const { user, fetchUserProfile, updateProfile, deleteProfile, changeUserPassword } = useAuth();

  const [selectSetting, setSelectSetting] = useState('Thông tin cá nhân');

  // Lấy thông tin user
  useEffect(() => {
    if (!user) {  // Nếu user đã có dữ liệu thì không cần fetch lại
      fetchUserProfile();
    }
  }, [user]);  // Thêm user vào dependency để tránh gọi API không cần thiết
  

  // Cập nhật thông tin user
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    gender: "",
    dateOfBirth: "",
  });

  // Khi user thay đổi, cập nhật lại formData
  useEffect(() => {
    setFormData({
      fullName: user?.fullName || "",
      email: user?.email || "",
      phone: user?.phone || "",
      gender: user?.gender || "",
      dateOfBirth: user?.dateOfBirth || "",
    });
  }, [user]); // Cập nhật khi user thay đổi


  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const formattedData = {
        ...formData,
        dateOfBirth: formData.dateOfBirth ? new Date(formData.dateOfBirth).toISOString().split("T")[0] : "",
      };
  
      await updateProfile(formattedData);
      await fetchUserProfile();
      alert("Cập nhật thành công!");
    } catch (error) {
      console.error("Lỗi cập nhật:", error);
      alert("Cập nhật thất bại!");
    }
  }

  // Xóa tài khoản
  const handleDeleteAccount = async () => {
    if (window.confirm("Bạn có chắc chắn muốn xóa tài khoản? Hành động này không thể hoàn tác!")) {
      await deleteProfile();
    }
  };

  // Thay đởi mật khẩu
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChangePassword = async () => {
    setError("");
    setMessage("");

    // Kiểm tra confirm password
    if (newPassword !== confirmPassword) {
      setError("Mật khẩu xác nhận không khớp!");
      return;
    }

    // Kiểm tra xem mật khẩu cũ có giống mật khẩu mới không
    if (oldPassword === newPassword) {
      setError("Mật khẩu mới không được trùng với mật khẩu cũ!");
      return;
    }

    try {
      console.log("Dữ liệu gửi lên API:", { oldPassword, newPassword });
      const msg = await changeUserPassword(oldPassword, newPassword);
      setMessage(msg);
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (error: any) {
      setError(error.message);
    }
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
                  <span className="text-sm font-medium">{selectSetting}</span>
              </div>
            </div>
            <div className="pt-8">
              <div className="grid grid-cols-[auto_1fr] gap-16">
                {/* Chức năng */}
                <div>
                    <div className="flex flex-col gap-8">
                        {/* Chức năng thông tin cá nhân */}
                        <div 
                          onClick={() => {
                            if (selectSetting !== 'Thông tin cá nhân') {
                              setSelectSetting('Thông tin cá nhân')
                            }
                          }}
                          className="flex items-center gap-2 py-4 px-8 bg-slate-100 rounded-full hover:-translate-y-1.5 duration-300 transition-transform ease-in-out cursor-pointer">
                          <div className="bg-btn-primary p-2 rounded-full">
                            <CiUser className="text-white"/>
                          </div>
                          <h1 className={selectSetting === 'Thông tin cá nhân' ? 'text-blue-400' : 'text-black'}>Thông tin cá nhân</h1>
                        </div>
                        {/* Chức năng bảo mật */}
                        <div 
                          onClick={() => {
                            if (selectSetting !== 'Cài đặt bảo mật') {
                              setSelectSetting('Cài đặt bảo mật')
                            }
                          }}
                          className="flex items-center gap-2 py-4 px-8 bg-slate-100 rounded-full hover:-translate-y-1.5 duration-300 transition-transform ease-in-out cursor-pointer">
                          <div className="bg-btn-primary p-2 rounded-full">
                            <CiLock className="text-white"/>
                          </div>
                          <h1 className={selectSetting === 'Thông tin cá nhân' ? 'text-black' : 'text-blue-400'}>Cài đặt bảo mật</h1>
                        </div>
                    </div>
                </div>
                {/* Thông tin chức năng */}
                {selectSetting === 'Thông tin cá nhân' ? (<div>
                  {/* Header thông tin */}
                  <div className="flex justify-between pb-10">
                        <div className="flex flex-col gap-4">
                          <h1 className="text-3xl font-bold">Thông tin cá nhân</h1>
                          <span className="text-base font-light">Cập nhật thông tin của bạn và tìm hiểu các thông tin này được sử dụng ra sao</span>
                        </div>
                        {/* Not yet done */}
                        <img src={avatarDefault} alt="" className="w-16 h-16 object-cover rounded-full border border-btn-primary"/>
                  </div> 
                  <div className="bg-slate-100 rounded-md">
                    <div className="p-8 flex flex-col gap-6 relative">
                      <FiEdit 
                        onClick={() => setOpenUpdateUser((prev) => !prev)}
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
                        <span>{
                          user?.gender === 'Male' 
                          ? 'Nam' 
                          : user?.gender === 'Female' 
                          ? 'Nữ' 
                          : user?.gender === 'Other' ? 'Khác' : 'Chưa cập nhật'}</span>
                      </div>
                    </div>
                  </div>
                </div>) : 
                (<div className="z-[1]">
                  <div className="flex flex-col gap-4 pb-10">
                    <h1 className="text-3xl font-bold">Cài đặt bảo mật</h1>
                    <span className="text-base font-light">Thay đổi thiết lập bảo mật hoặc xóa tài khoản của bạn.</span>
                  </div>       
                  <div className="bg-slate-100 rounded-md">
                    <div className="p-8">
                      <h1 className="text-xl font-semibold">Mật khẩu</h1>
                      <p className="text-sm font-light py-4">Nhập mật khẩu HackerRank hiện tại của bạn cùng với mật khẩu mới để thay đổi.</p>

                      <form action="" className="flex flex-col gap-8 py-6">
                        <div className="flex flex-col gap-2">
                          <label htmlFor="" className="text-sm pl-1.5">Mật khẩu hiện tại</label>
                          <input 
                            type="password" 
                            value={oldPassword}
                            onChange={(e) => setOldPassword(e.target.value)}
                            placeholder="Nhập mật khẩu hiện tại" 
                            className="max-w-[50%] p-2 outline-none bg-gray-200 rounded-md"
                            required
                          />
                        </div>
                        <div className="flex items-center gap-6">
                          <div className="flex flex-col gap-2 w-full">
                            <label htmlFor="" className="text-sm pl-1.5">Mật khẩu mới</label>
                            <input 
                              type="password"
                              value={newPassword}
                              onChange={(e) => setNewPassword(e.target.value)} 
                              placeholder="Nhập mật khẩu mới" 
                              className="p-2 outline-none bg-gray-200 rounded-md"
                              required

                            />
                          </div>
                          <div className="flex flex-col gap-2 w-full">
                            <label htmlFor="" className="text-sm pl-1.5">Xác nhận mật khẩu mới</label>
                            <input 
                              type="password"
                              value={confirmPassword}
                              onChange={(e) => setConfirmPassword(e.target.value)}
                              placeholder="Xác nhận mật khẩu mới"
                              className="p-2 outline-none bg-gray-200 rounded-md"/>
                          </div>
                        </div>
                      </form>
                      <div className="flex justify-end pt-4">
                        <button 
                          onClick={handleChangePassword}
                          className="px-8 py-2 rounded-sm bg-btn-primary text-sm font-medium cursor-pointer">Thay đổi mật khẩu</button>
                      </div>
                      {error && <p className="mt-2 text-red-500">{error}</p>}
                      {message && <p className="mt-2 text-green-500">{message}</p>}
                    </div>
                  </div>
                  <div className="bg-slate-100 rounded-md mt-8">
                    <div className="p-8">
                      <h1 className="text-xl font-semibold">Xóa tài khoản</h1>
                      <p className="text-sm font-light py-4"><p className="text-sm font-light py-4">Xóa tài khoản của bạn và tất cả thông tin liên quan đến tài khoản của bạn như trang hồ sơ. 
                      Xin lưu ý rằng tất cả dữ liệu sẽ bị mất vĩnh viễn nếu bạn xóa tài khoản của mình.</p></p>
                      <div className="flex justify-end pt-4">
                        <button 
                          onClick={handleDeleteAccount}
                          className="px-8 py-2 rounded-sm bg-btn-primary text-sm font-medium cursor-pointer">Xóa</button>
                      </div>
                    </div>
                    </div>
                </div>)}
              </div>
            </div>
          </div>
        </div>
      </div>
      {openUpdateUser && (
          <div className="fixed inset-0 bg-black/10 backdrop-blur-sm flex items-center justify-center z-[999]">
            <div className="bg-slate-100 bg-opacity-100 p-14 rounded-lg shadow-lg w-md relative">
                <button 
                  onClick={() => setOpenUpdateUser(prev => !prev)}
                  className="p-3 bg-btn-primary rounded-l-xl rounded-b-xl cursor-pointer absolute top-0 right-0">
                  <IoCloseOutline className="text-lg"/>
                </button>
              <div className="flex justify-center pb-8">
                <img src={avatarDefault} alt="" className="w-14 h-14 object-cover rounded-full"/>
              </div>
              <h1 className="text-xl font-semibold pb-8">Thông tin cá nhân</h1>
              <form action="" className="flex flex-col gap-6">
                <div className="flex flex-col gap-2">
                  <label htmlFor="" className="text-sm font-light pl-1.5">Name</label>
                  <input 
                    name="fullName"
                    type="text" 
                    className="p-2 bg-gray-200 rounded-md outline-none"
                    value={formData.fullName}
                    onChange={handleChange}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="" className="text-sm font-light pl-1.5">Phone</label>
                  <input 
                    name="phone"
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
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="" className="text-sm font-light pl-1.5">Birth</label>
                  <input 
                    name="dateOfBirth"
                    value={formData.dateOfBirth}
                    onChange={handleChange}
                    type="date" 
                    className="p-2 bg-gray-200 rounded-md outline-none"/>
                </div>
              </form>
              <div className="flex items-center justify-end pt-8">
                <button 
                  onClick={handleSubmit}
                  className="px-12 py-2 bg-btn-primary rounded-md text-sm font-medium cursor-pointer">Lưu</button>
              </div>
            </div>
        </div>
      )}
    </div>
  );
}

export default ProfilePage;
