import React from "react";
import { Link } from "react-router-dom";

interface ErrorComponentProps {
    message: string;
}

const ErrorComponent = ({ message }: ErrorComponentProps) => {
    return (
        <div className="error-component">
            <p>{message}</p>
            <p>If this issue persists contact the site administrators</p>
            <Link to="/">Go back to the main page</Link>
        </div>
    );
}

export default ErrorComponent;
