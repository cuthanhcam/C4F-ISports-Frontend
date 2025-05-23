import type { authLogin, authRegister } from "../types/auth";
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
    // Quên mật khuẩn
    forgotPassword(){

    },
    // Đặt lại mật khuẩn
    resetPassword(){

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