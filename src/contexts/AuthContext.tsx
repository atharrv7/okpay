import React, { createContext, useContext, useState } from "react";
import { type User } from "../lib/types";
import { MockBackend } from "../lib/mock-backend";

interface AuthContextType {
    user: User | null;
    isLoading: boolean;
    login: (e: string, p: string) => Promise<User>;
    register: (d: Omit<User, "id" | "createdAt" | "isVerified">) => Promise<User>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(() => {
        const storedUser = localStorage.getItem("damnpay_session_user");
        return storedUser ? JSON.parse(storedUser) : null;
    });
    const [isLoading] = useState(false);

    const login = async (email: string, pass: string) => {
        const user = await MockBackend.login(email, pass);
        setUser(user);
        localStorage.setItem("damnpay_session_user", JSON.stringify(user));
        return user;
    };

    const register = async (data: Omit<User, "id" | "createdAt" | "isVerified">) => {
        const user = await MockBackend.register(data);
        setUser(user);
        localStorage.setItem("damnpay_session_user", JSON.stringify(user));
        return user;
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem("damnpay_session_user");
    };

    return (
        <AuthContext.Provider value={{ user, isLoading, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth must be used within AuthProvider");
    return context;
};
