import { createContext, useContext, useState, useEffect } from 'react';
import type { userUpdate } from '../types/user';
import { userAPI } from '../api/user.api';

interface UserContextType {
  user: userUpdate | null;
  setUser: (user: userUpdate | null) => void;
  loading: boolean;
  error: string | null;
  retryFetchUser: () => void;
}

const UserContext = createContext<UserContextType>({
  user: null,
  setUser: () => {},
  loading: false,
  error: null,
  retryFetchUser: () => {},
});

export const useUser = () => useContext(UserContext);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<userUpdate | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUser = async (retries = 3, delay = 1000) => {
    setLoading(true);
    setError(null);

    for (let attempt = 1; attempt <= retries; attempt++) {
      try {
        const res = await userAPI.getUserProfile();
        if (res?.data) {
          // Kiểm tra avatarUrl và dateOfBirth
          const isValidDate = (dateString: string | null | undefined): boolean => {
            if (!dateString) return false;
            const date = new Date(dateString);
            return !isNaN(date.getTime());
          };

          setUser({
            ...res.data,
            fullName: res.data.fullName || "",
            email: res.data.email || "",
            phone: res.data.phone || "",
            city: res.data.city || "",
            district: res.data.district || "",
            dateOfBirth: isValidDate(res.data.dateOfBirth)
              ? new Date(res.data.dateOfBirth).toISOString().split("T")[0]
              : "",
            avatarUrl: res.data.avatarUrl || "",
          });
          setLoading(false);
          return;
        }
      } catch (error: any) {
        console.error(`Attempt ${attempt} failed:`, error);
        if (attempt === retries) {
          setError("Không thể tải thông tin người dùng. Vui lòng thử lại.");
          setLoading(false);
        } else {
          await new Promise((resolve) => setTimeout(resolve, delay)); // Delay trước khi retry
        }
      }
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, loading, error, retryFetchUser: fetchUser }}>
      {children}
    </UserContext.Provider>
  );
}