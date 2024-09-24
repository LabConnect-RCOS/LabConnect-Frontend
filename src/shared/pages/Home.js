import React, { useEffect } from "react";
import useAuthActions from "../../context/global/authActions";
import { Link } from "react-router-dom";
import logo from "../../images/LabConnect_Logo.png";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserGraduate, faChalkboardTeacher } from '@fortawesome/free-solid-svg-icons';
import AOS from 'aos';
import 'aos/dist/aos.css';

const Home = ({ signOut, signIn }) => {
  const { login, logout } = useAuthActions();

  useEffect(() => {
    if (signOut) {
      logout();
    }
    if (signIn) {
      login();
    }
    // Initialize AOS
    AOS.init();
  }, [login, logout, signIn, signOut]);

  return (
    <section className="relative min-h-screen bg-white flex flex-col justify-between overflow-hidden">
      {/* Header Section */}
      <div className="relative container mx-auto text-center py-16 z-10">
        {/* Logo without Background */}
        <div className="flex justify-center mb-8">
          <img
            src={logo}
            alt="LabConnect Logo"
            className="w-48 md:w-64"
          />
        </div>

        {/* Headline */}
        <h1 className="text-6xl font-extrabold text-gray-800 mb-4 drop-shadow-lg">
          Welcome to LabConnect
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
                Browse available{" "}
                <Link
                  to="/jobs"
                  className="text-blue-600 hover:underline font-semibold"
                >
                  research opportunities
                </Link>
                . Get started on your academic journey today!
              </p>
            </div>

            {/* Professors and Staff Card */}
            <div
              className="p-8 bg-gray-50 rounded-lg shadow-lg transition-all hover:rotate-3 hover:bg-gradient-to-r from-blue-50 to-indigo-50"
              data-aos="fade-up"
              data-aos-duration="800"
              data-aos-delay="200"
            >
              <FontAwesomeIcon icon={faChalkboardTeacher} className="text-6xl text-blue-600 mb-4" />
              <h2 className="text-3xl font-semibold text-blue-600 mb-2">
                For Professors & Staff
              </h2>
              <p className="text-lg text-gray-700 mb-4">
                <Link
                  to="/signIn"
                  className="text-blue-600 hover:underline font-semibold"
                >
                  Sign In
                </Link>{" "}
                to manage your posts and connect with students.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
