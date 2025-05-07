import { createContext, useContext, useEffect, useState } from "react";
import { getUserProfile, logout, updateUserProfile, deleteUserProfile, changePassword } from '../Services/authService';
import { useNavigate } from "react-router";

interface AuthContextType {
  isAuthenticated: boolean;
  setIsAuthenticated: (value: boolean) => void;
  user: any;
  setUser: (value: any) => void;
  login: (token: string, userData: any) => void;
  logoutUser: () => Promise<void>;
  fetchUserProfile: () => Promise<void>;
  updateProfile: (userData: any) => Promise<void>;
  deleteProfile: () => Promise<void>;
  changeUserPassword: (oldPassword: string, newPassword: string) => Promise<string>;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [user, setUser] = useState<any>(null);
    const navigate = useNavigate();
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


    const deleteProfile = async () => {
      const token = localStorage.getItem("accessToken");
      if (!token) return;
    
      try {
        await deleteUserProfile(token);
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("user");
        setUser(null);
        setIsAuthenticated(false);
        alert("Xóa tài khoản thành công!");
        navigate('/auth/login');
      } catch (error) {
        console.error("Failed to delete profile:", error);
        alert("Xóa tài khoản thất bại!");
      }
    };


     // Cập nhật thông tin user
     const updateProfile = async (userData: any) => {
      const token = localStorage.getItem("accessToken");
      if (!token) return;
     
      try {
        const updatedUser = await updateUserProfile(token, userData);
        setUser(updatedUser);
        localStorage.setItem("user", JSON.stringify(updatedUser));
      } catch (error) {
        console.error("Failed to update profile:", error);
      }
    };


    const changeUserPassword = async (oldPassword: string, newPassword: string): Promise<string> => {
      try {
        const responseMessage = await changePassword({ oldPassword, newPassword });
        alert('Thay đổi mật khẩu thành công!');
        return responseMessage;
      } catch (error: any) {
        console.error(error);
        alert('Thay đổi mật khẩu thật bại!');
        throw error;
      }
    };
    
    // Lấy thông tin user
    const fetchUserProfile = async () => {
      const token = localStorage.getItem("accessToken");
      
      if (!token) {
        setUser(null);
        setIsAuthenticated(false);
        return;
      }
  
      try {
        const userData = await getUserProfile(token);
    
        setUser(userData);
        setIsAuthenticated(true);
      } catch (error) {
        console.error("Failed to fetch user profile:", error);
        setUser(null);
        setIsAuthenticated(false);
      }
    };
  

    // Đăng nhập user
    const login = async (token: string, userData: any) => {
      localStorage.setItem("accessToken", token);
      localStorage.setItem("user", JSON.stringify(userData));

      setIsAuthenticated(true);
      setUser(userData);
      await fetchUserProfile();
    };

    // Đăng xuất user
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
        <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, user, setUser, login, logoutUser, fetchUserProfile, updateProfile,  deleteProfile, changeUserPassword  }}>
            {children}
        </AuthContext.Provider>
    );
  };

  export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth must be used within AuthProvider");
    return context;
};




