import React from "react";
import { Link } from "react-router-dom";
import logo from "../../images/LabConnect_Logo2.webp";

const Home = () => {
  return (
    <section>
      <section className="home-general">
        <br />
        <br />
        <br />
        <div className="img-center">
          <img src={logo} alt="LabConnect" height="289" />
        </div>

        <br />
        <br />
        <br />
        <br />

        <h1 className="text-xl">Welcome to LabConnect!</h1>
        <br />
        <p className="text-base">
          If you are a student, go to the{" "}
          <Link to="/jobs" className="blue-link hover:text-blue-900 focus:text-blue-900">
            <b>Jobs</b>
          </Link>{" "}
          tab to view currently available research opportunities.
          <br />
          If you are a professor or staff member,{" "}
          <Link to="/signin" className="blue-link text-blue-600 hover:text-blue-900 focus:text-blue-900">
            <b>Sign In</b>
          </Link>{" "}
          and then go to{" "}
          <Link to="/createPost" className="blue-link text-blue-600 hover:text-blue-900 focus:text-blue-900">
            <b>Create</b>
          </Link>{" "}
          to start posting <br />
          opportunities or{" "}
          <Link to="/profile" className="blue-link text-blue-600 hover:text-blue-900 focus:text-blue-900">
            <b>Profile</b>
          </Link>{" "}
          to view and edit your current posts.
        </p>
        <br />
        <br />
        <br />
      </section>
    </section>
  );
};

export default Home;
