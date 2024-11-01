const LoginRedirection = () => {
    window.location.href = `${process.env.REACT_APP_BACKEND_SERVER}/login`;
    return null; // No need to render anything, as the redirection happens immediately
};

export default LoginRedirection;