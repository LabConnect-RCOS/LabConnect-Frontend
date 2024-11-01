const IsAuthenticated = (): [string, boolean] => {
    const jwt = localStorage.getItem('jwt');

    if (!jwt) {
        return ["", false];
    }

    return [jwt, true];
};

export default IsAuthenticated;