import { useEffect } from "react";

const logout = async (token: string) => {
    try {
        const response = await fetch(
            `${process.env.REACT_APP_BACKEND_SERVER}/logout`,
            {
                method: "GET",
                credentials: "include", // to send cookies or session data
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        if (response.ok) {
            // Clear local storage or tokens
            localStorage.removeItem("jwt");

            // Redirect to the homepage or login page
            const intervalId = setInterval(() => {
                if (!localStorage.getItem("jwt")) {
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

const LogoutRedirection = (authenticated) => {
    if (!authenticated.authenticated[1]) {
        window.location.href = "/";
    }
    console.log("Logging out...");
    useEffect(() => {
        logout(authenticated.authenticated[0]);
    }, []); // Run only on component mount

    return null; // Since this component doesn't need to render anything
};

export default LogoutRedirection;