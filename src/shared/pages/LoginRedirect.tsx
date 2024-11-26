import React from "react";
import { Link } from "react-router-dom";
import SEO from "../components/SEO.tsx";

const LoginRedirect = () => {
  return (
    <>
      <SEO title="Login Redirect" description="Renders instead of page if user is not logged in." />
      <p className="text-4xl text-center pt-20">Whoops!</p>
      <p className="text-xl text-center pt-8">It looks like you're not logged in. Click the button below and log in to see this page</p>
      <section className="pt-8 flex justify-center">
        <Link to="/login" className="btn btn-primary w-1/5 text-gray-200 bg-blue-600 hover:bg-blue-900 focus:bg-blue-900">Log In</Link>
      </section>
    </>
  );
};

export default LoginRedirect;