import type { authFogotPassword, authLogin, authRegister, authResetPassword } from "../types/auth";
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
    changePassword(){

    },
    // Xác minh email
    verifyEmail(){

    },
    // Gửi lại email xác minh
    resendVerification(){

    }
}