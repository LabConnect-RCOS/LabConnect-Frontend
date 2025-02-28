import { useAuth } from "../context/AuthContext.tsx";
import { useEffect } from "react";

export default function Token() {

    const { auth, login } = useAuth();

    if (auth.isAuthenticated) {
        window.location.href = "/";
    }

    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");

    useEffect(() => {
        async function fetchToken(code: string) {
            fetch(`${process.env.REACT_APP_BACKEND_SERVER}/token`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ code }),
                credentials: "include",
            })
                .then((response) => response.json())
                .then((data) => {
                    const registered = data.registered;
                    console.log("registered", registered);
                    login();
                    // if (registered) {
                    window.location.href = "/";
                    return null;
                    // }
                    // TODO: Redirect to registration page
                })
                .catch((error) => console.error("Error fetching token:", error));
        }
        if (code) {
            fetchToken(code);
        }
    }, [code, login]);

    return null;
}
