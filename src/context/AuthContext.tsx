import React, { createContext, useState, useContext, useEffect } from 'react';
import { ReactNode } from 'react';


const AuthContext = createContext<{
    auth: { isAuthenticated: boolean; token: string | null };
    login: (token: string) => void;
    logout: () => void;
    loadToken: () => void;
}>({
    auth: { isAuthenticated: false, token: null },
    login: () => { },
    logout: () => { },
    loadToken: () => { }
});
interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [auth, setAuth] = useState<{ isAuthenticated: boolean; token: string | null }>({
        isAuthenticated: false,
        token: null,
    });

    const login = (token: string) => {
        setAuth({ isAuthenticated: true, token });
        // Save token to localStorage for persistence
        localStorage.setItem('jwt', token);
    };

    const logout = () => {
        setAuth({ isAuthenticated: false, token: null });
        // Clear token from localStorage
        localStorage.removeItem('jwt');
    };

    const loadToken = () => {
        const savedToken = localStorage.getItem('jwt');
        if (savedToken) {
            setAuth({ isAuthenticated: true, token: savedToken });
        }
    };

    useEffect(() => {
        loadToken();
    }, []);

    return (
        <AuthContext.Provider value={{ auth, login, logout, loadToken }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);