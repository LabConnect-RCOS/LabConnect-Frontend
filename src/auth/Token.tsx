const Token = () => {

    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");

    if (token) {
        localStorage.setItem("jwt", token);
        localStorage.setItem("jwt-time", new Date().getTime().toString());

        // Periodically check if both jwt and jwt-time are set
        const intervalId = setInterval(() => {
            if (localStorage.getItem("jwt") && localStorage.getItem("jwt-time")) {
                clearInterval(intervalId);  // Clear the interval once condition is met
                window.location.href = "/";
            }
        }, 5); // Check every 5ms (adjust as needed)
    }

    return null;
}

export default Token;