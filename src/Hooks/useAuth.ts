import { useState, useEffect } from "react";
import { login, verifyToken, refreshToken, logout } from "../Api/authApi";

export const useAuth = () => {
    const [user, setUser] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkAuth = async () => {
            const token = localStorage.getItem("token");
            if (!token) {
                setLoading(false);
                return;
            }

            try {
                const response = await verifyToken(token);
                if (response.IsValid) {
                    setUser(response.email);
                } else {
                    await refresh();
                }
            } catch {
                localStorage.removeItem("token");
                setUser(null);
            }
            setLoading(false);
        };

        checkAuth();
    }, []);

    const handleLogin = async (email: string, password: string) => {
        const { Token, RefreshToken } = await login(email, password);
        localStorage.setItem("token", Token);
        localStorage.setItem("refreshToken", RefreshToken);
        setUser(email);
    };

    const handleLogout = async () => {
        const refreshTokenStored = localStorage.getItem("refreshToken");
        if (refreshTokenStored) await logout(refreshTokenStored);
        localStorage.removeItem("token");
        localStorage.removeItem("refreshToken");
        setUser(null);
    };

    const refresh = async () => {
        const refreshTokenStored = localStorage.getItem("refreshToken");
        if (!refreshTokenStored) return;

        try {
            const { Token, RefreshToken } = await refreshToken(refreshTokenStored);
            localStorage.setItem("token", Token);
            localStorage.setItem("refreshToken", RefreshToken);
        } catch {
            handleLogout();
        }
    };

    return { user, loading, handleLogin, handleLogout };
};
