import React from "react";
import SEO from "../components/SEO.tsx";

const LoginRedirect = () => {
  return (
    <>
        <p className="text-4xl text-center pt-20">Whoops!</p>
        <p className="text-xl text-center pt-8">It looks like you're not logged in. Log in to see this page</p>
        <section className="pt-3 pb-5">
            <input type="submit" className="btn btn-primary bg-blue-700 w-1/3" />
        </section>
    </>
  );
};

export default LoginRedirect;