import { useLocalStorage } from "@mantine/hooks";
import type { ReactNode } from "react";
import { AuthContext, type AuthUser } from "./AuthContext";

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useLocalStorage<AuthUser | null>({
        key: 'auth-user',
        defaultValue: null,
    });

    const login = async (username: string, password: string) => {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 500));

        // Simple authentication logic
        if (username === "admin" && password === "admin") {
            const loggedInUser: AuthUser = {
                username: "admin",
                role: "admin",
            };
            setUser(loggedInUser);
            return true;
        } else if (username === "user" && password === "user") {
            const loggedInUser: AuthUser = {
                username: "user",
                role: "user",
            };
            setUser(loggedInUser);
            return true;
        }

        return false;
    };

    const logout = () => {
        setUser(null);
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                login,
                logout,
            }}>
            {children}
        </AuthContext.Provider>
    );
}
