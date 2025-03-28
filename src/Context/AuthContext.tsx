import { createContext, useContext, useEffect, useState } from "react";
import { logout } from '../Services/authService';
interface AuthContextType {
    isAuthenticated: boolean;
    setIsAuthenticated: (value: boolean) => void;
    user: any;
    setUser: (value: any) => void;
    login: (token: string, userData: any) => void;
    logoutUser: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [user, setUser] = useState<any>(null);

    useEffect(() => {
        const token = localStorage.getItem("accessToken");
        const userData = localStorage.getItem("user");
      
        if (token && userData) {
          try {
            setUser(JSON.parse(userData)); // Parse user từ localStorage
            setIsAuthenticated(true);
          } catch (error) {
            console.error("Lỗi khi parse user từ localStorage:", error);
            setUser(null);
            setIsAuthenticated(false);
          }
        } else {
          setUser(null);
          setIsAuthenticated(false);
        }
    }, []);


    const login = (token: string, userData: any) => {
        localStorage.setItem("accessToken", token);
        localStorage.setItem("user", JSON.stringify(userData));

        setIsAuthenticated(true);
        setUser(userData);
    };

    const logoutUser = async () => {
      try {
        const refreshToken = localStorage.getItem("refreshToken");
        if (refreshToken) {
          await logout(refreshToken);
        }
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("user");
  
        setUser(null);
        setIsAuthenticated(false); // ✅ Cập nhật trạng thái khi đăng xuất
      } catch (error) {
        console.error("Logout failed:", error);
      }
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, user, setUser, login, logoutUser }}>
            {children}
        </AuthContext.Provider>
    );
  };

  export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth must be used within AuthProvider");
    return context;
};

