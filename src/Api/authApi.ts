const API_URL = "http://localhost:5231/api/auth";

export const login = async (email: string, password: string) => {
    const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
    });

    if (!response.ok) throw new Error("Đăng nhập thất bại!");
    return await response.json();
};

export const verifyToken = async (token: string) => {
    const response = await fetch(`${API_URL}/verify-token?token=${token}`);
    return await response.json();
};


export const refreshToken = async (refreshToken: string) => {
    const response = await fetch(`${API_URL}/refresh-token`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(refreshToken),
    });

    if (!response.ok) throw new Error("Không thể làm mới token!");
    return await response.json();
};


export const logout = async (refreshToken: string) => {
    await fetch(`${API_URL}/logout`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(refreshToken),
    });
};


