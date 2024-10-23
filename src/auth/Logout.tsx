import { useEffect } from "react";

const logout = async () => {
    try {
        console.log("Fetch to backend");
        const response = await fetch(
            `${process.env.REACT_APP_BACKEND_SERVER}/logout`,
            {
                method: "GET",
                credentials: "include", // to send cookies or session data
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("jwt")}`,
                },
            }
        );
        console.log("Fetch to backend complete");
        console.log(response);
        if (response.ok) {
            console.log("Logged out successfully");
            // Clear local storage or tokens
            localStorage.removeItem("jwt");
            localStorage.removeItem("jwt-time");
            // Redirect to the homepage or login page
            window.location.href = "/";
        } else {
            console.error("Failed to logout");
        }
    } catch (error) {
        console.error("Error logging out:", error);
    }
};

const LogoutRedirection = () => {
    console.log("Logging out...");
    useEffect(() => {
        logout();
        window.location.href = "/";
    }, []); // Run only on component mount

    // While logging out, you could return a loading message or just null
    return null; // Since this component doesn't need to render anything
};

export default LogoutRedirection;