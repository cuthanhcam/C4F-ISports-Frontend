import axios from 'axios';

//  Tạo một instance cấu hình mặc định
const axiosClient = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL, // cấu hình địa chỉ gốc cho tất cả reques
    headers: {
        'Content-Type': 'application/json', // Gửi nội dung type json
    }
});

export default axiosClient;