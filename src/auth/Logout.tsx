import { useEffect } from "react";
import { useAuth } from "../context/AuthContext";

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
                        method: "GET",
                        credentials: "include", // to send cookies or session data
                        headers: {
                            Authorization: `Bearer ${auth.token}`,
                        },
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
    }, []);

    return null; // Since this component doesn't need to render anything
};