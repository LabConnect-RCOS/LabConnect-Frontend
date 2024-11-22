import { useAuth } from "../context/AuthContext.tsx";

export default function Token() {

    const { login } = useAuth();

    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");

    if (code) {
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
                    return null;
                }
            })
            .catch((error) => console.error("Error fetching token:", error));
    } else {
        window.location.href = "/";
    }

    return null;
}