import type { authChangePassword, authFogotPassword, authLogin, authRegister, authResetPassword } from "../types/auth";
import axiosClient from "./axiosClient";


export const authAPI = {
    // Đăng nhập
    login(data: authLogin) {
        return axiosClient.post('auth/login', data);
    },
    // Đăng ký
    register(data: authRegister){
        return axiosClient.post('auth/register', data);
    },
    // Quên mật khẩu
    forgotPassword(data: authFogotPassword){
        return axiosClient.post('auth/forgot-password', data);
    },
    // Đặt lại mật khẩu
    resetPassword(data: authResetPassword){
        return axiosClient.post('auth/reset-password', data);
    },
    // Thay đổi mật khẩu
    changePassword(data: authChangePassword){
        return axiosClient.post('auth/change-password', data);
    },
    // Xác minh email
    verifyEmail(){

    },
    // Gửi lại email xác minh
    resendVerification(){

    },
    // Đăng xuất
    logout() {
        const refreshToken = localStorage.getItem("refreshToken");
        return axiosClient.post('auth/logout', {
            refreshToken: refreshToken
        });
    }
} 