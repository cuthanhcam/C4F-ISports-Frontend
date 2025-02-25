import { useState } from "react";

export default function useHeader() {
    const [isLogin, setIsLogin] = useState(false);

    return {
        isLogin, 
        setIsLogin,
    }
}