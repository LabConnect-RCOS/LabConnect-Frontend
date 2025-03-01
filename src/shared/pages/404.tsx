import React from "react";
import SEO from "../components/SEO.tsx";
import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <>
      <SEO title="404 Not Found" description="Not found page" />
      <p className="text-4xl text-center pt-20">Whoops!</p>
      <p className="text-xl text-center pt-8">It looks like that page couldn&apos;t be reached. Please click the link below to return to LabConnect or try refreshing the page</p>
      <section className="pt-8 flex justify-center">
        <Link to="/" className="btn btn-primary w-1/5 text-gray-200 bg-blue-600 hover:bg-blue-900 focus:bg-blue-900">Home</Link>
      </section>
    </>
  );
};

export default PageNotFound;
