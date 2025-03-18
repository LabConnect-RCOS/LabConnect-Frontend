import React, { createContext, useState, useContext } from 'react';
import { ReactNode, useEffect } from 'react';


const AuthContext = createContext<{
    auth: { isAuthenticated: boolean };
    login: () => void;
    logout: () => void;
}>({
    auth: { isAuthenticated: false },
    login: () => { },
    logout: () => { },
});
interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [auth, setAuth] = useState<{ isAuthenticated: boolean; token: string | null }>({
        isAuthenticated: false,
        token: null,
    });

    const checkAuth = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_SERVER}/authcheck`, {
                credentials: "include",
            });
            if (response.ok) {
                setAuth({ isAuthenticated: true });
            } else {
                const refreshResponse = await fetch(`${process.env.REACT_APP_BACKEND_SERVER}/token/refresh`, {
                    credentials: "include",
                });
                if (refreshResponse.ok) {
                    setAuth({ isAuthenticated: true });
                } else {
                    setAuth({ isAuthenticated: false });
                }
            }
        } catch (error) {
            console.error("Auth check failed:", error);
            setAuth({ isAuthenticated: false });
        }
    };

    useEffect(() => {
        checkAuth(); // Run this on mount to persist session state
    }, []);

    const login = () => {
        setAuth({ isAuthenticated: true });
    };

    const logout = () => {
        setAuth({ isAuthenticated: false });
    };

    return (
        <AuthContext.Provider value={{ auth, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);

