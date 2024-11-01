const Token = () => {

    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");

    console.log("Code:", code);
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
                console.log("Data:", data);
                const token = data.token;
                console.log("Token:", token);
                if (token) {
                    localStorage.setItem("jwt", token);

                    // Periodically check if both jwt and jwt-time are set
                    const intervalId = setInterval(() => {
                        if (localStorage.getItem("jwt")) {
                            clearInterval(intervalId);  // Clear the interval once condition is met
                            window.location.href = "/";
                        }
                    }, 5); // Check every 5ms (adjust as needed)
                    return null;
                }
            })
            .catch((error) => console.error("Error fetching token:", error));
    }

    return null;
}

export default Token;