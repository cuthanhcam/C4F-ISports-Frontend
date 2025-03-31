import React, { useState, ChangeEvent } from 'react';
import axios from 'axios';
import avatarDefault from '../assets/images/LogoC4FMain.png';
import { useAuth } from '../Context/AuthContext';
import { IoCloseOutline } from "react-icons/io5";

interface UploadAvatarProps {
  onClose: () => void;
  onSuccess: () => void;
}

const UploadAvatar: React.FC<UploadAvatarProps> = ({ onClose, onSuccess }) => {
  const { token } = useAuth();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>(avatarDefault);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
      setError(null);
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    
    if (!selectedFile) {
      setError('Vui lòng chọn một file ảnh');
      return;
    }
  
    const accessToken = token || localStorage.getItem('accessToken'); // Lấy accessToken từ useAuth hoặc localStorage
    if (!accessToken) {
      setError('Bạn cần đăng nhập để thực hiện hành động này');
      return;
    }
  
    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append('AvatarFile', selectedFile); // Sửa key thành 'AvatarFile'
  
      console.log('Token being sent:', accessToken); // Log để kiểm tra
  
      const response = await axios.put('http://localhost:5231/api/users/profile/avatar', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${accessToken}`, // Sử dụng accessToken thay vì token
        },
      });
  
      console.log('Upload success:', response.data);
      onSuccess();
      onClose();
    } catch (err: any) {
      const errorMessage = err.response?.data?.title || 'Có lỗi xảy ra khi cập nhật avatar';
      const errorDetails = err.response?.data?.errors 
        ? Object.values(err.response.data.errors).flat().join(', ') 
        : err.message;
      setError(`${errorMessage}: ${errorDetails}`);
      console.error('Error details:', err.response?.data || err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/10 backdrop-blur-sm flex items-center justify-center z-[999]">
      <div className="bg-slate-100 p-14 rounded-lg shadow-lg w-md relative">
        <button 
          onClick={onClose}
          className="p-3 bg-btn-primary rounded-l-xl rounded-b-xl cursor-pointer absolute top-0 right-0"
        >
          <IoCloseOutline className="text-lg" />
        </button>

        <div className="flex justify-center pb-8">
          <img 
            src={previewUrl} 
            alt="Avatar preview" 
            className="w-14 h-14 object-cover rounded-full"
          />
        </div>

        <h1 className="text-xl font-semibold pb-8">Cập nhật Avatar</h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <label htmlFor="avatar-input" className="text-sm font-light pl-1.5">
              Chọn ảnh avatar
            </label>
            <input
              id="avatar-input"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="p-2 bg-gray-200 rounded-md outline-none"
            />
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <div className="flex items-center justify-end pt-8">
            <button
              type="submit"
              disabled={isLoading || !selectedFile}
              className={`px-12 py-2 rounded-md text-white font-semibold
                ${isLoading || !selectedFile 
                  ? 'bg-gray-400 cursor-not-allowed' 
                  : 'bg-btn-primary hover:bg-blue-700'}
                transition-colors duration-200`}
            >
              {isLoading ? 'Đang tải lên...' : 'Cập nhật'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UploadAvatar;