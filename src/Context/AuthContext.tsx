import { createContext, useContext, useEffect, useState } from "react";
import { getUserProfile, logout, updateUserProfile } from '../Services/authService';
interface AuthContextType {
  isAuthenticated: boolean;
  setIsAuthenticated: (value: boolean) => void;
  user: any;
  setUser: (value: any) => void;
  login: (token: string, userData: any) => void;
  logoutUser: () => Promise<void>;
  fetchUserProfile: () => Promise<void>;
  updateUser: (userData: any) => Promise<void>;
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
            fetchUserProfile();
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


    const updateUser = async (userData: any) => {
      try {
        const token = localStorage.getItem('token');
        if (!token) throw new Error('No authentication token found');
  
        const updatedUser = await updateUserProfile(token, userData);
        setUser(updatedUser);
      } catch (error) {
        console.error('Update profile failed:', error);
      }
    };

    const fetchUserProfile = async () => {
      const token = localStorage.getItem("accessToken");
      
      if (!token) {
        setUser(null);
        setIsAuthenticated(false);
        return;
      }
  
      try {
        const userData = await getUserProfile(token);
        console.log("user Data: ", userData);
        setUser(userData);
        setIsAuthenticated(true);
      } catch (error) {
        console.error("Failed to fetch user profile:", error);
        setUser(null);
        setIsAuthenticated(false);
      }
    };
  


    const login = async (token: string, userData: any) => {
      localStorage.setItem("accessToken", token);
      localStorage.setItem("user", JSON.stringify(userData));

      setIsAuthenticated(true);
      setUser(userData);
      await fetchUserProfile();
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
        <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, user, setUser, login, logoutUser, fetchUserProfile, updateUser }}>
            {children}
        </AuthContext.Provider>
    );
  };

  export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth must be used within AuthProvider");
    return context;
};

