
import axiosClient from "./axiosClient";

export const sportsAPI = {
    // Lấy thông tin người dùng
    getSport(params?: { sort?: string; page?: number; pageSize?: number; }) {
        return axiosClient.get('sports', { params });
    }
};