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
      console.log("Updated userProfile:", profile); // Log để debug
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
      avatarUrl: "", // Gán avatarUrl thành chuỗi rỗng
    }));
    setFile(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
    console.log("Avatar removed, new userProfile:", { ...userProfile, avatarUrl: "" }); // Log để debug
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
        updatedProfile = { ...updatedProfile, avatarUrl: DEFAULT_AVATAR_URL }; // Gửi null nếu gỡ ảnh
      }

      console.log("Sending updatedProfile:", updatedProfile);
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
    return <div>Đang tải thông tin người dùng...</div>;
  }

  if (error) {
    return (
      <div>
        <p>{error}</p>
        <button
          onClick={retryFetchUser}
          className="px-4 py-2 bg-primary text-primary-on rounded-3xl hover:bg-primary-shade"
        >
          Thử lại
        </button>
      </div>
    );
  }

  if (!user) {
    return <div>Không tìm thấy thông tin người dùng.</div>;
  }

  return (
    <div className="bg-surface-1 rounded-3xl">
      <div className="px-12 py-6">
        <div className="py-6 border-b border-outline-variant flex flex-col gap-2">
          <h1 className="text-3xl text-surface-on font-medium">Thông tin cá nhân</h1>
          <p className="text-base text-surface-onVariant">
            Quản lý thông tin hồ sơ để bảo mật tài khoản
          </p>
        </div>
        <div className="grid grid-cols-[1fr_auto] gap-6 mt-8">
          <div className="border-r border-outline-variant px-8">
            <div className="flex items-center justify-end">
              {!isEditing ? (
                <button
                  onClick={() => setIsEditing(true)}
                  className="flex items-center gap-2 bg-primary px-4 py-2 rounded-3xl text-primary-on font-medium hover:bg-primary-shade duration-200 transition-all ease-in-out"
                >
                  <CiEdit />
                  <span>Chỉnh sửa</span>
                </button>
              ) : (
                <button
                  onClick={() => {
                    setIsEditing(false);
                    setFile(null);
                    if (fileInputRef.current) fileInputRef.current.value = "";
                  }}
                  className="flex items-center gap-2 bg-primary px-4 py-2 rounded-3xl text-primary-on font-medium hover:bg-primary-shade duration-200 transition-all ease-in-out"
                >
                  <CiEdit />
                  <span>Hủy</span>
                </button>
              )}
            </div>
            <form onSubmit={handleSubmit} className="flex flex-col gap-6 text-on-surface mt-8">
              <div className="grid grid-cols-[150px_1fr] items-center gap-2 text-surface-on">
                <label htmlFor="fullName">Họ và tên</label>
                <input
                  type="text"
                  name="fullName"
                  value={userProfile.fullName}
                  onChange={(e) => setUserProfile({ ...userProfile, fullName: e.target.value })}
                  disabled={!isEditing}
                  className="w-full rounded-md p-2 outline-none bg-surface border border-outline-variant"
                />
              </div>
              <div className="grid grid-cols-[150px_1fr] items-center gap-2 text-surface-on">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  name="email"
                  value={userProfile.email}
                  disabled={true}
                  className="w-full rounded-md p-2 outline-none bg-surface border border-outline-variant"
                />
              </div>
              <div className="grid grid-cols-[150px_1fr] items-center gap-2 text-surface-on">
                <label htmlFor="phone">Số điện thoại</label>
                <input
                  type="text"
                  name="phone"
                  value={userProfile.phone}
                  onChange={(e) => setUserProfile({ ...userProfile, phone: e.target.value })}
                  disabled={!isEditing}
                  className="w-full rounded-md p-2 outline-none bg-surface border border-outline-variant"
                />
              </div>
              <div className="grid grid-cols-[150px_1fr] items-center gap-2 text-surface-on">
                <label htmlFor="city">Thành phố</label>
                <input
                  type="text"
                  name="city"
                  value={userProfile.city}
                  onChange={(e) => setUserProfile({ ...userProfile, city: e.target.value })}
                  disabled={!isEditing}
                  className="w-full rounded-md p-2 outline-none bg-surface border border-outline-variant"
                />
              </div>
              <div className="grid grid-cols-[150px_1fr] items-center gap-2 text-surface-on">
                <label htmlFor="district">Quận</label>
                <input
                  type="text"
                  name="district"
                  value={userProfile.district}
                  onChange={(e) => setUserProfile({ ...userProfile, district: e.target.value })}
                  disabled={!isEditing}
                  className="w-full rounded-md p-2 outline-none bg-surface border border-outline-variant"
                />
              </div>
              <div className="grid grid-cols-[150px_1fr] items-center gap-2 text-surface-on">
                <label>Ngày sinh</label>
                <div className="flex gap-4">
                  <select
                    value={day}
                    onChange={(e) => setDay(Number(e.target.value) || "")}
                    disabled={!isEditing}
                    className="px-4 py-2 border border-outline-variant rounded-md bg-surface text-on-surface-bg"
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
                    className="px-4 py-2 border border-outline-variant rounded-md bg-surface text-on-surface-bg text-surface-on"
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
                    className="px-4 py-2 border border-outline-variant rounded-md bg-surface text-on-surface-bg"
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
                className={`px-8 py-2 rounded-3xl font-medium w-fit my-8 ${
                  isEditing
                    ? "bg-primary text-primary-on hover:bg-primary-shade duration-200 transition-colors ease-in-out"
                    : "bg-slate-400"
                }`}
              >
                Lưu
              </button>
            </form>
          </div>
          <div className="flex flex-col gap-4 px-10">
            <motion.div
              initial="initial"
              whileHover="hover"
              className="relative w-32 h-32 rounded-full overflow-hidden cursor-pointer"
            >
              <img
                src={file ? URL.createObjectURL(file) : userProfile.avatarUrl || DEFAULT_AVATAR_URL}
                alt="Avatar người dùng"
                className="rounded-full w-full h-full object-cover border border-outline-variant"
              />
              <motion.div
                variants={{
                  initial: { y: "100%" },
                  hover: { y: "0%" },
                }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="absolute top-0 left-0 w-full h-full rounded-full flex justify-center items-center backdrop-blur-md"
              >
                <CiCamera className="text-6xl text-white" />
              </motion.div>
            </motion.div>
            <button
              onClick={() => fileInputRef.current?.click()}
              disabled={!isEditing}
              className={`px-4 py-2 rounded-3xl font-medium mt-6 ${
                isEditing
                  ? "bg-primary text-primary-on hover:bg-primary-shade duration-200 transition-colors ease-in-out"
                  : "bg-slate-400"
              }`}
            >
              Cập nhật ảnh
            </button>
            <button
              onClick={handleRemoveAvatar}
              disabled={!isEditing || userProfile.avatarUrl === ""}
              className={`px-4 py-2 rounded-3xl font-medium ${
                isEditing && userProfile.avatarUrl !== ""
                  ? "bg-red-500 text-white hover:bg-red-600 duration-200 transition-colors ease-in-out"
                  : "bg-slate-400"
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