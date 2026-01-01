import { useState, type ReactNode } from "react";
import { AuthContext, type AuthUser } from "./AuthContext";

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<AuthUser | null>(null);

    // TODO: implement login logic
    const login = async (username: string, password: string) => {
        const loggedInUser: AuthUser = {
            username: "admin",
            role: "admin",
        };

        setUser(loggedInUser);
        return true;
        // if (username === "admin" && password === "admin") {
        //     const loggedInUser: AuthUser = {
        //         username: "admin",
        //         role: "admin",
        //     };

        //     setUser(loggedInUser);
        //     return true;
        // }

        // return false;
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
