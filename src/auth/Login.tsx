/// <reference types="vite/client" />
import { useAuth } from "../context/AuthContext.tsx";

export default function LoginRedirection() {
    const { auth } = useAuth();
    if (auth.isAuthenticated) {
        window.location.href = "/";
    }
    window.location.href = `${import.meta.env.VITE_BACKEND_SERVER}/login`;
    return null;
};