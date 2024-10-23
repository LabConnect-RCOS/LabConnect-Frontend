import { useEffect } from "react";

const logout = async () => {
    try {
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
        if (response.ok) {
            // Clear local storage or tokens
            localStorage.removeItem("jwt");
            localStorage.removeItem("jwt-time");

            // Redirect to the homepage or login page
            const intervalId = setInterval(() => {
                if (!localStorage.getItem("jwt") && !localStorage.getItem("jwt-time")) {
                    clearInterval(intervalId);  // Clear the interval once condition is met
                    window.location.href = "/";
                }
            }, 5); // Check every 5ms (adjust as needed)
        } else {
            console.error("Failed to logout");
        }
    } catch (error) {
        console.error("Error logging out:", error);
        window.location.href = "/";
    }
};

const LogoutRedirection = () => {
    console.log("Logging out...");
    useEffect(() => {
        logout();
    }, []); // Run only on component mount

    return null; // Since this component doesn't need to render anything
};

export default LogoutRedirection;