import { useEffect } from "react";
import { useAuth } from "../context/AuthContext.tsx";

export default function LogoutRedirection() {
    const { auth, logout } = useAuth();

    if (!auth.isAuthenticated) {
        window.location.href = "/";
    }
    console.log("Logging out...");
    useEffect(() => {
        async function logoutUser() {
            try {
                const response = await fetch(
                    `${process.env.REACT_APP_BACKEND_SERVER}/logout`,
                    {
                        credentials: "include",
                    }
                );
                if (response.ok) {
                    logout();
                } else {
                    console.error("Failed to logout");
                }
            } catch (error) {
                console.error("Error logging out:", error);
                window.location.href = "/";
            }
        }
        logoutUser();
    }, [logout]);

    return null; // Since this component doesn't need to render anything
};