const IsAuthenticated = (): [string, boolean] => {
    const jwt = localStorage.getItem('jwt');
    const jwtTime = localStorage.getItem('jwt-time');

    if (!jwt || !jwtTime) {
        return ["", false];
    }

    const currentTime = new Date().getTime();
    const jwtTimeNumber = parseInt(jwtTime, 10);

    // Check if the JWT time is within 1 hour (3600000 milliseconds)
    if (currentTime - jwtTimeNumber > 3600000) {
        return [jwt, false];
    }

    return [jwt, true];
};

export default IsAuthenticated;