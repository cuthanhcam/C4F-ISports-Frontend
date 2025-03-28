import { LoginRequestType, RegisterRequestType, ForgotPasswordType } from '../Types/auth';
import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_URL}/api/auth`;

export const login = async (data: LoginRequestType) => {
    return await axios.post(`${API_URL}/login`, data);
};


export const register = async (data: RegisterRequestType) => {
    return await axios.post(`${API_URL}/register`, data);
};

export const logout = async (refreshToken: string) => {
  try {
    const response = await axios.post(`${API_URL}/logout`, { refreshToken });
    return response.data;
  } catch (error) {
    console.error("Logout error:", error);
    throw error;
  }
};

export const forgotPassword = async (data: { email: string }) => {
    try {
      const response = await axios.post(`${API_URL}/forgot-password`, data);
      return response.data;
    } catch (error: any) {
      console.error("❌ Lỗi quên mật khẩu:", error.response?.data || error.message);
      throw error.response?.data || "Lỗi không xác định!";
    }
};


export const resetPassword = async (data: { email: string; token: string; newPassword: string }) => {
    return await axios.post(`${API_URL}/reset-password`, data);
};


export const getUserProfile = async (token: string) => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/users/profile`, {
      headers: { Authorization: `Bearer ${token}` }, // Sửa 'Beaver' thành 'Bearer'
    });
    return response.data; // Đúng phải là 'response.data'
  } catch (error) {
    console.error("Error fetching user profile:", error);
    throw error;
  }
};



export const updateUserProfile = async (token: string, userData: any) => {
  try {
    const response = await axios.put(`${import.meta.env.VITE_API_URL}/api/users/profile`, userData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error: ", error);
    throw error.response?.data || error.message;
  }
};