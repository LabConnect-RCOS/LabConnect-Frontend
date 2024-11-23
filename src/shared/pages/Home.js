import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "../../images/LabConnect_Logo2.webp";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserGraduate, faChalkboardTeacher } from "@fortawesome/free-solid-svg-icons";
import SEO from "../components/SEO.tsx";
import AOS from "aos";
import "aos/dist/aos.css";

const Home = ({ signOut, signIn }) => {
  useEffect(() => {
    // Initialize AOS
    AOS.init();
  }, []);

  return (
    <section className="relative min-h-screen bg-white flex flex-col justify-between overflow-hidden">
      {/* SEO */}
      <SEO title="Labconnect" description="Labconnect home page" />

      {/* Header Section */}
      <div className="relative container mx-auto text-center py-16 z-10">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <img src={logo} alt="LabConnect Logo" className="w-48 md:w-64" />
        </div>

        {/* Headline */}
        <h1 className="text-6xl font-extrabold text-gray-800 mb-4 drop-shadow-lg">
          Welcome to LabConnect!
        </h1>
        <p className="text-xl text-gray-600 mb-12 drop-shadow-md">
          Your gateway to lab and research opportunities on campus.
        </p>

        {/* Call to Action Button */}
        <Link
          to="/jobs"
          className="btn btn-lg bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-semibold py-3 px-6 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all"
        >
          Explore Opportunities
        </Link>
      </div>

      {/* Info Section */}
      <div className="relative bg-white py-16 shadow-inner z-10">
        <div className="container mx-auto text-center">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 px-6">
            {/* Students Card */}
            <div
              className="p-8 bg-gray-50 rounded-lg shadow-lg transition-all hover:rotate-3 hover:bg-gradient-to-r from-blue-50 to-indigo-50"
              data-aos="fade-up"
              data-aos-duration="800"
            >
              <FontAwesomeIcon icon={faUserGraduate} className="text-6xl text-blue-600 mb-4" />
              <h2 className="text-3xl font-semibold text-blue-600 mb-2">
                For Students
              </h2>
              <p className="text-lg text-gray-700 mb-4">
                Browse available research opportunities and connect with professors to kickstart your lab experience.
                </p>
                <Link
                  to="/students"
                  className="btn btn-md bg-blue-500 text-white py-2 px-4 rounded-full shadow-md hover:bg-blue-600 transition-all"
                >
                  Learn More
                </Link>
              </div>
  
              {/* Professors & Staff Card */}
              <div
                className="p-8 bg-gray-50 rounded-lg shadow-lg transition-all hover:rotate-3 hover:bg-gradient-to-r from-indigo-50 to-purple-50"
                data-aos="fade-up"
                data-aos-duration="800"
                data-aos-delay="200"
              >
                <FontAwesomeIcon icon={faChalkboardTeacher} className="text-6xl text-indigo-600 mb-4" />
                <h2 className="text-3xl font-semibold text-indigo-600 mb-2">
                  For Professors & Staff
                </h2>
                <p className="text-lg text-gray-700 mb-4">
                  Post research openings and find talented students eager to contribute to your projects.
                </p>
                <Link
                  to="/professors"
                  className="btn btn-md bg-indigo-500 text-white py-2 px-4 rounded-full shadow-md hover:bg-indigo-600 transition-all"
                >
                  Learn More
                </Link>
              </div>
            </div>
          </div>
        </div>
  
        {/* Footer Section */}
        <footer className="bg-gray-900 text-gray-100 py-8">
          <div className="container mx-auto text-center">
            <p className="text-sm">
              © 2024 LabConnect. All Rights Reserved. | <Link to="/privacy" className="text-blue-400 hover:underline">Privacy Policy</Link>
            </p>
            <div className="flex justify-center mt-4 space-x-4">
              <Link to="https://facebook.com" className="text-gray-400 hover:text-gray-200 transition-all">
                <FontAwesomeIcon icon={["fab", "facebook"]} size="2x" />
              </Link>
              <Link to="https://twitter.com" className="text-gray-400 hover:text-gray-200 transition-all">
                <FontAwesomeIcon icon={["fab", "twitter"]} size="2x" />
              </Link>
              <Link to="https://linkedin.com" className="text-gray-400 hover:text-gray-200 transition-all">
                <FontAwesomeIcon icon={["fab", "linkedin"]} size="2x" />
              </Link>
            </div>
          </div>
        </footer>
  
        {/* Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-b from-indigo-200 to-blue-300 opacity-30 z-0"></div>
        <div className="absolute top-0 left-0 w-72 h-72 bg-indigo-400 rounded-full opacity-20 blur-3xl -z-10"></div>
        <div className="absolute bottom-0 right-0 w-72 h-72 bg-blue-400 rounded-full opacity-20 blur-3xl -z-10"></div>
      </section>
    );
  };
  
  export default Home;
  