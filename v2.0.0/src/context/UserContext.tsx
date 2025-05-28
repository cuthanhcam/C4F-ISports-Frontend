import { createContext, useContext, useState, useEffect } from 'react';
import type { userUpdate } from '../types/user';
import { userAPI } from '../api/user.api'; // đảm bảo import đúng

interface UserContextType {
    user: userUpdate | null;
    setUser: (user: userUpdate | null) => void;
}

const UserContext = createContext<UserContextType>({
    user: null,
    setUser: () => {},
})

export const useUser = () => useContext(UserContext);

export function UserProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<userUpdate | null>(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await userAPI.getUserProfile();
                if (res?.data) {
                    setUser(res.data);
                }
            } catch (error) {
                console.error("Lỗi khi fetch user:", error);
            }
        };

        fetchUser();
    }, []);

    return (
      <UserContext.Provider value={{ user, setUser }}>
        {children}
      </UserContext.Provider>
    );
}
