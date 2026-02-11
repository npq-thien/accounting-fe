import { createContext } from "react";

import type { UserRole } from "@/shared/constants";

export interface User {
    username: string;
    role: UserRole;
}

export interface AuthContextValue {
    user: User | null;
    login: (_username: string, _password: string) => Promise<boolean>;
    logout: () => void;
    isInitializing: boolean;
}

export const AuthContext = createContext<AuthContextValue | undefined>(undefined);
