import { useAuth } from "../context/AuthContext.tsx";
import { useEffect } from "react";

export default function Token() {

    const { login } = useAuth();

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
            })
                .then((response) => response.json())
                .then((data) => {
                    const token = data.token;
                    if (token) {
                        login(token);
                        window.location.href = "/";
                        return null;
                    }
                })
                .catch((error) => console.error("Error fetching token:", error));
        }
        if (code) {
            fetchToken(code);
        }
    }, [code, login]);

    return null;
}