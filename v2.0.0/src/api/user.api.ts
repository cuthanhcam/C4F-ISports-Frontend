import axiosClient from "./axiosClient";

export const userAPI = {
    // Lấy thông tin người dùng
    getUserProfile() {
        return axiosClient.get('users/profile');
    }
};