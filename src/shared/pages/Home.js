import React, { useEffect } from "react";
import useAuthActions from "../../context/global/authActions";
import { Link } from "react-router-dom";
import logo from "../../images/LabConnect_Logo.png";

const Home = ({ signOut, signIn }) => {
  const { login, logout } = useAuthActions();

  useEffect(() => {
    if (signOut) {
      logout();
    }
    if (signIn) {
      login();
    }
  }, []);

  return (
    <section className="min-h-screen bg-gradient-to-b from-white to-gray-100 flex flex-col justify-between">
      {/* Header Section */}
      <div className="container mx-auto text-center py-16">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <img
            src={logo}
            alt="LabConnect Logo"
            className="w-48 md:w-64 transform transition-transform duration-500 hover:scale-105"
          />
        </div>

        {/* Headline */}
        <h1 className="text-5xl font-extrabold text-gray-800 mb-4 animate-fadeIn">
          Welcome to LabConnect
        </h1>
        <p className="text-lg text-gray-600 mb-12 animate-fadeIn">
          Your gateway to lab and research opportunities on campus.
        </p>

        {/* Call to Action Buttons */}
        <div className="flex justify-center space-x-6">
          <Link
            to="/jobs"
            className="btn btn-lg bg-blue-600 text-white font-semibold py-3 px-6 rounded-md shadow-lg hover:shadow-xl hover:bg-blue-700 transition-transform transform hover:scale-105"
          >
            Explore Jobs
          </Link>
          <Link
            to="/signIn"
            className="btn btn-lg bg-gray-100 text-gray-800 border border-gray-300 py-3 px-6 rounded-md shadow-lg hover:shadow-xl hover:bg-gray-200 transition-transform transform hover:scale-105"
          >
            Sign In
          </Link>
        </div>
      </div>

      {/* Info Section */}
      <div className="bg-white py-16 mt-12 shadow-inner">
        <div className="container mx-auto text-center">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 px-6">
            {/* Students Card */}
            <div className="p-8 bg-gray-50 rounded-lg shadow-lg transition hover:shadow-xl transform hover:scale-105">
              <h2 className="text-2xl font-semibold text-blue-600 mb-2">
                For Students
              </h2>
              <p className="text-lg text-gray-700 mb-4">
                Browse available{" "}
                <Link
                  to="/jobs"
                  className="text-blue-600 hover:underline font-semibold"
                >
                  research opportunities
                </Link>{" "}
                and start exploring your options.
              </p>
              <Link
                to="/jobs"
                className="text-blue-600 underline font-medium hover:text-blue-800"
              >
                Explore Jobs →
              </Link>
            </div>

            {/* Professors and Staff Card */}
            <div className="p-8 bg-gray-50 rounded-lg shadow-lg transition hover:shadow-xl transform hover:scale-105">
              <h2 className="text-2xl font-semibold text-blue-600 mb-2">
                For Professors & Staff
              </h2>
              <p className="text-lg text-gray-700 mb-4">
                <Link
                  to="/signIn"
                  className="text-blue-600 hover:underline font-semibold"
                >
                  Sign In
                </Link>{" "}
                to post opportunities or manage your{" "}
                <Link
                  to="/profile"
                  className="text-blue-600 hover:underline font-semibold"
                >
                  Profile
                </Link>
                .
              </p>
              <Link
                to="/signIn"
                className="text-blue-600 underline font-medium hover:text-blue-800"
              >
                Sign In →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
