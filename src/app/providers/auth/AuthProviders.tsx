import { useLocalStorage } from "@mantine/hooks";

import { AuthContext, type User } from "./AuthContext";

import type { ReactNode } from "react";
import { useNavigate } from "react-router-dom";

export function AuthProvider({ children }: { children: ReactNode }) {
    const navigate = useNavigate();
    const [user, setUser] = useLocalStorage<User | null>({
        key: 'auth-user',
        defaultValue: null,
        getInitialValueInEffect: false, // Read from localStorage immediately, not in useEffect
    });

    const login = async (username: string, password: string) => {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 500));

        // TODO: Implement actual authentication logic
        if (username === "admin" && password === "admin") {
            const loggedInUser: User = {
                username: "admin",
                role: "admin",
            };
            setUser(loggedInUser);
            navigate("/");
            return true;
        } else if (username === "user" && password === "user") {
            const loggedInUser: User = {
                username: "user",
                role: "user",
            };
            navigate("/");
            setUser(loggedInUser);
            return true;
        }

        return false;
    };

    const logout = () => {
        setUser(null);
        // Navigation to login will be handled by ProtectedRoute
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                login,
                logout,
                isInitializing: false, // With getInitialValueInEffect: false, user is read immediately
            }}>
            {children}
        </AuthContext.Provider>
    );
}
