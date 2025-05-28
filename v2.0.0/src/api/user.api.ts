import type { userUpdate } from "../types/user";
import axiosClient from "./axiosClient";

export const userAPI = {
    // Lấy thông tin người dùng
    getUserProfile() {
        return axiosClient.get('users/profile');
    },
    // Cập nhật thông tin người dùng
    updateUserProfile(data: userUpdate) {
        return axiosClient.put('users/profile', data);
    },
    // Xóa tài khoản người dùng
    deleteUser() {
        return axiosClient.delete('users/profile');
    },
    // Lấy thông tin các sân đã đặt của người dùng
    getUserBookings() {
        return axiosClient.get('users/bookings');
    },
    // Lấy thông tin các sân yêu thích của người dùng
    getUserFavorites() {
        return axiosClient.get('users/favorites');
    },
    // Thêm sân vào danh sách yêu thích
    postUserFavorites() {
        
    },
    getUserLoyaltyPoints() {
        return axiosClient.get('users/loyalty-points');
    }
};