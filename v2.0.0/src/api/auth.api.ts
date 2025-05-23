import type { authLogin } from "../types/auth";
import axiosClient from "./axiosClient";


export const authAPI = {
    // Đăng nhập
    login(data: authLogin) {
        return axiosClient.post('auth/login', data);
    },
    // Đăng ký
    register(){

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