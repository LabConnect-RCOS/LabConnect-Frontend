import React from "react";
import SEO from "../components/SEO.tsx";
import { Link } from "react-router-dom";
const LoginRedirect = () => {
  return (
    <>
        <p className="text-4xl text-center pt-20">Whoops!</p>
        <p className="text-xl text-center pt-8">It looks like you're not logged in. Click the button below and log in to see this page</p>
        <section className="pt-8 flex justify-center">
          <Link to="/login" className="btn btn-primary w-1/5">Log In</Link>
        </section>
    </>
  );
};
export default LoginRedirect;