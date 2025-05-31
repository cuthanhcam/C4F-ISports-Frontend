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
    getUserFavorites(params?: { page?: number; pageSize?: number; sort?: string }) {
        return axiosClient.get('users/favorites', { params });
    },
    // Xóa thông tin sân yêu thích
    deleteUserFavorites(fieldId: number) {
        return axiosClient.delete(`users/favorites/${fieldId}`);
    },
    // Thêm sân vào danh sách yêu thích
    getUserLoyaltyPoints() {
        return axiosClient.get('users/loyalty-points');
    }
};