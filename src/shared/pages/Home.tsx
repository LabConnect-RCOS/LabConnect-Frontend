import React from "react";
import { Link } from "react-router-dom";
import logo from "../../images/LabConnect_Logo2.webp";
import SEO from "../components/SEO.tsx";

const Home = () => {
  return (
    <section>
      <SEO title="LabConnect" description="LabConnect home page" />

      {/* Welcome Section */}
      <section className="home-general text-center">
        <div className="img-center pt-28">
          <img src={logo} alt="LabConnect" height="289" />
        </div>

        <h1 className="text-xl pt-32">Welcome to LabConnect!</h1>
        <br />
        <p className="text-base px-6">
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
          <Link to="/create" className="blue-link text-blue-600 hover:text-blue-900 focus:text-blue-900">
            <b>Create</b>
          </Link>{" "}
          to start posting <br />
          opportunities or{" "}
          <Link to="/profile" className="blue-link text-blue-600 hover:text-blue-900 focus:text-blue-900">
            <b>Profile</b>
          </Link>{" "}
          to view and edit your current posts.
        </p>
      </section>

      {/* About Us Section */}
      <section id="about" className="py-20 bg-gray-50 text-center">
        <h2 className="text-2xl font-semibold">About Us</h2>
        <p className="mt-4 max-w-3xl mx-auto text-lg px-6">
          LabConnect is a platform dedicated to bridging the gap between students and research opportunities.
          We aim to make it easier for students to find meaningful lab/research work while helping professors connect with passionate individuals
          through a convenient, all-in-one application.
          Our team is hard at work, and we will provide updates on our progress so keep an eye out for announcements!
        </p>
      </section>

      {/* Meet Our Team Section */}
      <section id="team" className="py-20 bg-white text-center">
        <h2 className="text-2xl font-semibold">Meet Our Team</h2>
        <p className="mt-4 max-w-3xl mx-auto text-lg px-6">
          Thanks for checking us out! We are a team of dedicated open-source developers working hard to make this product into a reality.
        </p>

        <div className="flex flex-wrap justify-center gap-8 mt-10">
          {/* Team Member Cards */}
          {["Rafael", "Will", "Sagar", "Sarah"].map((name, index) => (
            <div 
              key={index} 
              className="bg-gray-100 shadow-md rounded-2xl p-6 w-64 flex flex-col items-center text-center hover:shadow-lg transition-shadow duration-300"
            >
              <h3 className="text-lg font-semibold">{name}</h3>
              <p className="text-sm text-blue-600 mt-2 font-medium">RCOS Developer</p>
            </div>
          ))}
        </div>
      </section>
    </section>
  );
};

export default Home;