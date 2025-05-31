import axios from 'axios';

//  Tạo một instance cấu hình mặc định
const axiosClient = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL, // cấu hình địa chỉ gốc cho tất cả reques
    headers: {
        'Content-Type': 'application/json', // Gửi nội dung type json
    }
});

axiosClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token'); // hoặc lấy từ Redux, Zustand,...
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosClient;