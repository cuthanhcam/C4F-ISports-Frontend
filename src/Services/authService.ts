import { LoginRequestType, RegisterRequestType, ForgotPasswordType } from '../Types/auth';
import axios, { AxiosProgressEvent } from "axios";

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
    console.log('User profile response:', response.data);
    return response.data; // Đúng phải là 'response.data'
  } catch (error) {
    console.error("Error fetching user profile:", error);
    throw error;
  }
};



export const updateUserProfile = async (token: string, userData: any) => {
  const response = await axios.put(`${import.meta.env.VITE_API_URL}/api/users/profile`, userData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });  
};


export const deleteUserProfile = async (token: string) => {
  try {
    const response = await axios.delete(
      `${import.meta.env.VITE_API_URL}/api/users/profile`, 
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error deleting user profile:", error);
    throw error;
  }
};

export const changePassword = async (data: any): Promise<string> => {
  try {
    const response = await axios.post(`${API_URL}/change-password`, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        "Content-Type": "application/json",
      },
    });

    return response.data.message;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Có lỗi xảy ra");
  }
};




export interface UpdateAvatarResponse {
  success: boolean;
  message?: string;
  error?: string;
  avatarUrl?: string;
}


export interface UpdateAvatarDto {
  avatarFile: File;
}

export const updateUserAvatar = async (file: File): Promise<any> => {
  const formData = new FormData();
  formData.append('file', file);

  try {
    const response = await axios.put(`${import.meta.env.VITE_API_URL}/api/users/profile/avatar`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        // Nếu cần thêm authentication token
        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error updating avatar:', error);
    throw error;
  }
};