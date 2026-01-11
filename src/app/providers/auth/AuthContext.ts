import { createContext } from "react";

import type { UserRole } from "@/shared/constants";

export interface AuthUser {
    username: string;
    role: UserRole;
}

export interface AuthContextValue {
    user: AuthUser | null;
    login: (_username: string, _password: string) => Promise<boolean>;
    logout: () => void;
}

export const AuthContext = createContext<AuthContextValue | undefined>(undefined);
