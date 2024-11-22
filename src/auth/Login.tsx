import { useAuth } from "../context/AuthContext.tsx";

export default function LoginRedirection() {
    const { auth } = useAuth();
    if (auth.isAuthenticated) {
        window.location.href = "/";
    }
    window.location.href = `${process.env.REACT_APP_BACKEND_SERVER}/login`;
    return null;
};