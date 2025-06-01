import { useEffect, useState, useRef } from "react";
import type { userUpdate } from "../../../../types/user";
import { userAPI } from "../../../../api/user.api";
import { useUser } from "../../../../context/UserContext";
import { CiCamera, CiEdit } from "react-icons/ci";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import axios from "axios";

const ViewProfile = () => {
  const { user, setUser, loading, error, retryFetchUser } = useUser();
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [day, setDay] = useState<number | "">("");
  const [month, setMonth] = useState<number | "">("");
  const [year, setYear] = useState<number | "">("");
  const [file, setFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [userProfile, setUserProfile] = useState<userUpdate>({
    fullName: "",
    email: "",
    phone: "",
    city: "",
    district: "",
    dateOfBirth: "",
    avatarUrl: "",
  });

  const DEFAULT_AVATAR_URL = "https://res.cloudinary.com/dzgxdkass/image/upload/v1748497926/default-avatar.png";

  useEffect(() => {
    if (user) {
      const profile = {
        fullName: user.fullName || "",
        email: user.email || "",
        phone: user.phone || "",
        city: user.city || "",
        district: user.district || "",
        dateOfBirth: user.dateOfBirth || "",
        avatarUrl: user.avatarUrl || "",
      };
      setUserProfile(profile);
      if (user.dateOfBirth) {
        const date = new Date(user.dateOfBirth);
        if (!isNaN(date.getTime())) {
          setDay(date.getDate());
          setMonth(date.getMonth() + 1);
          setYear(date.getFullYear());
        }
      }
    }
  }, [user]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleRemoveAvatar = () => {
    setUserProfile((prev) => ({
      ...prev,
      avatarUrl: "",
    }));
    setFile(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const uploadAvatar = async () => {
    if (!file) return null;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET);

    try {
      const res = await axios.post(
        `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`,
        formData
      );
      return res.data.secure_url;
    } catch (err) {
      console.error("Upload Avatar Error:", err);
      toast.error("Lỗi khi tải ảnh lên Cloudinary.");
      return null;
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const isConfirmed = window.confirm("Bạn có chắc chắn muốn lưu thay đổi?");
    if (!isConfirmed) return;

    try {
      let updatedProfile = { ...userProfile };

      // Validate dữ liệu
      if (!updatedProfile.fullName) {
        throw new Error("Họ và tên không được để trống.");
      }
      if (updatedProfile.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(updatedProfile.email)) {
        throw new Error("Email không hợp lệ.");
      }
      if (updatedProfile.phone && !/^\d{10,11}$/.test(updatedProfile.phone)) {
        throw new Error("Số điện thoại không hợp lệ.");
      }
      if (updatedProfile.dateOfBirth && !/^\d{4}-\d{2}-\d{2}$/.test(updatedProfile.dateOfBirth)) {
        throw new Error("Ngày sinh không đúng định dạng (YYYY-MM-DD).");
      }

      if (file) {
        const avatarUrl = await uploadAvatar();
        if (avatarUrl) {
          updatedProfile = { ...updatedProfile, avatarUrl };
        } else {
          throw new Error("Không thể tải ảnh lên.");
        }
      } else if (updatedProfile.avatarUrl === "") {
        updatedProfile = { ...updatedProfile, avatarUrl: DEFAULT_AVATAR_URL };
      }

      await userAPI.updateUserProfile(updatedProfile);
      setUser(updatedProfile);
      toast.success("Cập nhật thành công!");
      setIsEditing(false);
      setFile(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (err: any) {
      console.error("Update Error:", err.response?.data || err.message);
      toast.error("Có lỗi xảy ra khi cập nhật: " + (err.response?.data?.detail || err.message));
    }
  };

  useEffect(() => {
    if (day && month && year) {
      const dob = `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
      if (/^\d{4}-\d{2}-\d{2}$/.test(dob) && !isNaN(new Date(dob).getTime())) {
        setUserProfile((prev) => ({
          ...prev,
          dateOfBirth: dob,
        }));
      }
    }
  }, [day, month, year]);

  if (loading) {
    return <div className="text-surface-on dark:text-dark-surface-on">Đang tải thông tin người dùng...</div>;
  }

  if (error) {
    return (
      <div className="flex flex-col gap-4">
        <p className="text-surface-on dark:text-dark-surface-on">{error}</p>
        <button
          onClick={retryFetchUser}
          className="px-4 py-2 bg-primary dark:bg-dark-primary text-surface-1 dark:text-dark-surface-on rounded-3xl hover:bg-primary-shade dark:hover:bg-dark-primary-shade transition-colors duration-200"
        >
          Thử lại
        </button>
      </div>
    );
  }

  if (!user) {
    return <div className="text-surface-on dark:text-dark-surface-on">Không tìm thấy thông tin người dùng.</div>;
  }

  return (
    <div className="bg-surface-1/30 dark:bg-dark-surface-1/30 backdrop-blur-md rounded-3xl shadow-navigation dark:shadow-navigation-dark border border-outline-variant dark:border-dark-outline-variant">
      <div className="p-4 sm:p-6 md:p-8 lg:p-12">
        <div className="py-4 sm:py-6 border-b border-outline-variant dark:border-dark-outline-variant flex flex-col gap-2">
          <h1 className="text-xl sm:text-2xl md:text-3xl text-surface-on dark:text-dark-surface-on font-medium">
            Thông tin cá nhân
          </h1>
          <p className="text-sm sm:text-base text-surface-onVariant dark:text-dark-surface-onVariant">
            Quản lý thông tin hồ sơ để bảo mật tài khoản
          </p>
        </div>
        <div className="flex flex-col lg:grid lg:grid-cols-[1fr_auto] gap-6 mt-6 sm:mt-8">
          <div className="border-r border-outline-variant dark:border-dark-outline-variant px-0 sm:px-6 md:px-8">
            <div className="flex items-center justify-end">
              {!isEditing ? (
                <button
                  onClick={() => setIsEditing(true)}
                  className="flex items-center gap-2 bg-primary dark:bg-dark-primary text-surface-1 dark:text-dark-primary-on px-3 sm:px-4 py-1.5 sm:py-2 rounded-3xl font-medium hover:bg-primary-shade dark:hover:bg-dark-primary-shade transition-colors duration-200"
                >
                  <CiEdit className="text-lg sm:text-xl" />
                  <span className="text-sm sm:text-base">Chỉnh sửa</span>
                </button>
              ) : (
                <button
                  onClick={() => {
                    setIsEditing(false);
                    setFile(null);
                    if (fileInputRef.current) fileInputRef.current.value = "";
                  }}
                  className="flex items-center gap-2 bg-primary dark:bg-dark-primary text-surface-1 dark:text-dark-primary-on px-3 sm:px-4 py-1.5 sm:py-2 rounded-3xl font-medium hover:bg-primary-shade dark:hover:bg-dark-primary-shade transition-colors duration-200"
                >
                  <CiEdit className="text-lg sm:text-xl" />
                  <span className="text-sm sm:text-base">Hủy</span>
                </button>
              )}
            </div>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 sm:gap-6 text-surface-on dark:text-dark-surface-on mt-6 sm:mt-8">
              <div className="flex flex-col sm:grid sm:grid-cols-[150px_1fr] sm:items-center gap-4 sm:gap-6">
                <label htmlFor="fullName" className="text-sm sm:text-base text-surface-onVariant dark:text-dark-surface-onVariant">
                  Họ và tên
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={userProfile.fullName}
                  onChange={(e) => setUserProfile({ ...userProfile, fullName: e.target.value })}
                  disabled={!isEditing}
                  className="w-full rounded-md p-2 sm:p-3 outline-none bg-surface dark:bg-dark-surface border border-outline-variant dark:border-dark-outline-variant text-surface-on dark:text-dark-surface-on focus:ring-2 focus:ring-primary dark:focus:ring-dark-primary focus:border-primary dark:focus:border-dark-primary text-sm sm:text-base"
                />
              </div>
              <div className="flex flex-col sm:grid sm:grid-cols-[150px_1fr] sm:items-center gap-4 sm:gap-6">
                <label htmlFor="email" className="text-sm sm:text-base text-surface-onVariant dark:text-dark-surface-onVariant">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={userProfile.email}
                  disabled={true}
                  className="w-full rounded-md p-2 sm:p-3 outline-none bg-surface dark:bg-dark-surface border border-outline-variant dark:border-dark-outline-variantテキスト-surface-on dark:text-dark-surface-on text-sm sm:text-base opacity-60"
                />
              </div>
              <div className="flex flex-col sm:grid sm:grid-cols-[150px_1fr] sm:items-center gap-4 sm:gap-6">
                <label htmlFor="phone" className="text-sm sm:text-base text-surface-onVariant dark:text-dark-surface-onVariant">
                  Số điện thoại
                </label>
                <input
                  type="text"
                  name="phone"
                  value={userProfile.phone}
                  onChange={(e) => setUserProfile({ ...userProfile, phone: e.target.value })}
                  disabled={!isEditing}
                  className="w-full rounded-md p-2 sm:p-3 outline-none bg-surface dark:bg-dark-surface border border-outline-variant dark:border-dark-outline-variant text-surface-on dark:text-dark-surface-on focus:ring-2 focus:ring-primary dark:focus:ring-dark-primary focus:border-primary dark:focus:border-dark-primary text-sm sm:text-base"
                />
              </div>
              <div className="flex flex-col sm:grid sm:grid-cols-[150px_1fr] sm:items-center gap-4 sm:gap-6">
                <label htmlFor="city" className="text-sm sm:text-base text-surface-onVariant dark:text-dark-surface-onVariant">
                  Thành phố
                </label>
                <input
                  type="text"
                  name="city"
                  value={userProfile.city}
                  onChange={(e) => setUserProfile({ ...userProfile, city: e.target.value })}
                  disabled={!isEditing}
                  className="w-full rounded-md p-2 sm:p-3 outline-none bg-surface dark:bg-dark-surface border border-outline-variant dark:border-dark-outline-variant text-surface-on dark:text-dark-surface-on focus:ring-2 focus:ring-primary dark:focus:ring-dark-primary focus:border-primary dark:focus:border-dark-primary text-sm sm:text-base"
                />
              </div>
              <div className="flex flex-col sm:grid sm:grid-cols-[150px_1fr] sm:items-center gap-4 sm:gap-6">
                <label htmlFor="district" className="text-sm sm:text-base text-surface-onVariant dark:text-dark-surface-onVariant">
                  Quận
                </label>
                <input
                  type="text"
                  name="district"
                  value={userProfile.district}
                  onChange={(e) => setUserProfile({ ...userProfile, district: e.target.value })}
                  disabled={!isEditing}
                  className="w-full rounded-md p-2 sm:p-3 outline-none bg-surface dark:bg-dark-surface border border-outline-variant dark:border-dark-outline-variant text-surface-on dark:text-dark-surface-on focus:ring-2 focus:ring-primary dark:focus:ring-dark-primary focus:border-primary dark:focus:border-dark-primary text-sm sm:text-base"
                />
              </div>
              <div className="flex flex-col sm:grid sm:grid-cols-[150px_1fr] sm:items-center gap-4 sm:gap-6">
                <label className="text-sm sm:text-base text-surface-onVariant dark:text-dark-surface-onVariant">
                  Ngày sinh
                </label>
                <div className="flex gap-4">
                  <select
                    value={day}
                    onChange={(e) => setDay(Number(e.target.value) || "")}
                    disabled={!isEditing}
                    className="px-3 sm:px-4 py-2 sm:py-3 border border-outline-variant dark:border-dark-outline-variant rounded-md bg-surface dark:bg-dark-surface text-surface-on dark:text-dark-surface-on text-sm sm:text-base focus:ring-2 focus:ring-primary dark:focus:ring-dark-primary focus:border-primary dark:focus:border-dark-primary"
                  >
                    <option value="">Ngày</option>
                    {Array.from({ length: 31 }, (_, i) => i + 1).map((d) => (
                      <option key={d} value={d}>{d}</option>
                    ))}
                  </select>
                  <select
                    value={month}
                    onChange={(e) => setMonth(Number(e.target.value) || "")}
                    disabled={!isEditing}
                    className="px-3 sm:px-4 py-2 sm:py-3 border border-outline-variant dark:border-dark-outline-variant rounded-md bg-surface dark:bg-dark-surface text-surface-on dark:text-dark-surface-on text-sm sm:text-base focus:ring-2 focus:ring-primary dark:focus:ring-dark-primary focus:border-primary dark:focus:border-dark-primary"
                  >
                    <option value="">Tháng</option>
                    {Array.from({ length: 12 }, (_, i) => i + 1).map((m) => (
                      <option key={m} value={m}>{m}</option>
                    ))}
                  </select>
                  <select
                    value={year}
                    onChange={(e) => setYear(Number(e.target.value) || "")}
                    disabled={!isEditing}
                    className="px-3 sm:px-4 py-2 sm:py-3 border border-outline-variant dark:border-dark-outline-variant rounded-md bg-surface dark:bg-dark-surface text-surface-on dark:text-dark-surface-on text-sm sm:text-base focus:ring-2 focus:ring-primary dark:focus:ring-dark-primary focus:border-primary dark:focus:border-dark-primary"
                  >
                    <option value="">Năm</option>
                    {Array.from({ length: 100 }, (_, i) => new Date().getFullYear() - i).map((y) => (
                      <option key={y} value={y}>{y}</option>
                    ))}
                  </select>
                </div>
              </div>
              <button
                type="submit"
                disabled={!isEditing}
                className={`px-6 sm:px-8 py-2 sm:py-3 rounded-3xl font-medium w-fit mt-6 sm:mt-8 ${
                  isEditing
                    ? "bg-primary dark:bg-dark-primary text-surface-1 dark:text-dark-primary-on hover:bg-primary-shade dark:hover:bg-dark-primary-shade transition-colors duration-200"
                    : "bg-surface-4 dark:bg-dark-surface-4 text-surface-on dark:text-dark-surface-on opacity-60 cursor-not-allowed"
                }`}
              >
                Lưu
              </button>
            </form>
          </div>
          <div className="flex flex-col gap-4 px-0 sm:px-6 md:px-10">
            <motion.div
              initial="initial"
              whileHover="hover"
              className="relative w-24 h-24 sm:w-32 sm:h-32 rounded-full overflow-hidden cursor-pointer"
            >
              <img
                src={file ? URL.createObjectURL(file) : userProfile.avatarUrl || DEFAULT_AVATAR_URL}
                alt="Avatar người dùng"
                loading="lazy"
                className="rounded-full w-full h-full object-cover border border-outline-variant dark:border-dark-outline-variant"
              />
              <motion.div
                variants={{
                  initial: { y: "100%" },
                  hover: { y: "0%" },
                }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="absolute top-0 left-0 w-full h-full rounded-full flex justify-center items-center backdrop-blur-md bg-surface/30 dark:bg-dark-surface/30"
              >
                <CiCamera className="text-4xl sm:text-6xl text-surface-on dark:text-dark-surface-on" />
              </motion.div>
            </motion.div>
            <button
              onClick={() => fileInputRef.current?.click()}
              disabled={!isEditing}
              className={`px-4 sm:px-6 py-2 sm:py-3 rounded-3xl font-medium mt-4 sm:mt-6 ${
                isEditing
                  ? "bg-primary dark:bg-dark-primary text-surface-1 dark:text-dark-primary-on hover:bg-primary-shade dark:hover:bg-dark-primary-shade transition-colors duration-200"
                  : "bg-surface-4 dark:bg-dark-surface-4 text-surface-on dark:text-dark-surface-on opacity-60 cursor-not-allowed"
              }`}
            >
              Cập nhật ảnh
            </button>
            <button
              onClick={handleRemoveAvatar}
              disabled={!isEditing || userProfile.avatarUrl === ""}
              className={`px-4 sm:px-6 py-2 sm:py-3 rounded-3xl font-medium ${
                isEditing && userProfile.avatarUrl !== ""
                  ? "bg-red dark:bg-dark-red text-surface-1 dark:text-dark-surface-on hover:bg-red-shade dark:hover:bg-dark-red-shade transition-colors duration-200"
                  : "bg-surface-4 dark:bg-dark-surface-4 text-surface-on dark:text-dark-surface-on opacity-60 cursor-not-allowed"
              }`}
            >
              Gỡ ảnh
            </button>
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden"
              disabled={!isEditing}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewProfile;