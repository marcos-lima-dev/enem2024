// src/contexts/AuthContext.tsx
import React, { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

type AuthContextType = {
    user: any;
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
    errors: any;
    loading: boolean;
};

const AuthContext = createContext<AuthContextType>(null!);

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState(null);
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const login = async (email: string, password: string) => {
        setLoading(true);
        setErrors({});

        try {
            await new Promise((resolve) => setTimeout(resolve, 1000));

            if (email === "teste@teste.com" && password === "123456") {
                setUser({ email });
                navigate("/dashboard");
            } else {
                throw new Error("invalid-credentials");
            }
        } catch (error: any) {
            setErrors({ general: "Email ou senha inválidos" });
        } finally {
            setLoading(false);
        }
    };

    const logout = () => {
        setUser(null);
        navigate("/");
    };

    const value = {
        user,
        login,
        logout,
        errors,
        loading,
    };

    return (
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    );
}
