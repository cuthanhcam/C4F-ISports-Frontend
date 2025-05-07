import { useState } from "react";

export default function useHeader() {
    const [isLogin, setIsLogin] = useState('login');

    return {
        isLogin, 
        setIsLogin,
    }
}