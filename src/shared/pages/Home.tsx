import React, { useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "../../images/LabConnect_Logo2.webp";

// Accessibility Utility: Focus Trap
function trapFocus(element) {
  const focusableEls = element.querySelectorAll(
    'a, button, input, textarea, select, [tabindex]:not([tabindex="-1"])'
  );
  const firstFocusableEl = focusableEls[0];
  const lastFocusableEl = focusableEls[focusableEls.length - 1];

  element.addEventListener("keydown", (e) => {
    if (e.key === "Tab") {
      if (e.shiftKey) {
        // Shift + Tab
        if (document.activeElement === firstFocusableEl) {
          e.preventDefault();
          lastFocusableEl.focus();
        }
      } else {
        // Tab
        if (document.activeElement === lastFocusableEl) {
          e.preventDefault();
          firstFocusableEl.focus();
        }
      }
    }
  });
}

const Home = () => {
  const mainContentRef = useRef(null);

  useEffect(() => {
    if (mainContentRef.current) {
      trapFocus(mainContentRef.current);
    }
  }, []);

  const features = [
    {
      title: "Find Opportunities",
      description:
        "Discover research opportunities tailored to your field of interest.",
      link: "/jobs",
    },
    {
      title: "Create Posts",
      description:
        "Professors and staff can post new opportunities for students.",
      link: "/createPost",
    },
    {
      title: "Manage Profile",
      description: "Edit your profile and manage your active posts.",
      link: "/profile",
    },
  ];

  return (
    <section>
      {/* Skip to Content Link */}
      <a href="#main-content" className="skip-to-content">
        Skip to main content
      </a>

      <section className="home-general">
        <br />
        <div className="img-center">
          <img src={logo} alt="LabConnect Logo" height="289" />
        </div>
        <br />

        <p className="text-xl font-bold">Welcome to LabConnect!</p>
        <p className="text-base">
          If you are a student, go to the{" "}
          <Link to="/jobs" className="hover-link hover:text-neutral-950">
            <b>Jobs</b>
          </Link>{" "}
          tab to view currently available research opportunities.
          <br />
          If you are a professor or staff member,{" "}
          <Link to="/signin" className="hover-link hover:text-neutral-950">
            <b>Sign In</b>
          </Link>{" "}
          and then go to{" "}
          <Link to="/createPost" className="hover-link hover:text-neutral-950">
            <b>Create</b>
          </Link>{" "}
          to start posting <br />
          opportunities or{" "}
          <Link to="/profile" className="hover-link hover:text-neutral-950">
            <b>Profile</b>
          </Link>{" "}
          to view and edit your current posts.
        </p>

        {/* Feature Section */}
        <section id="main-content" ref={mainContentRef} className="mt-10">
          <h2 className="text-2xl font-semibold mb-5">Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {features.map((feature, index) => (
              <div
                key={index}
                className="feature-card p-4 border rounded shadow-md hover:shadow-lg"
              >
                <h3 className="text-xl font-bold">{feature.title}</h3>
                <p className="text-sm text-gray-600">{feature.description}</p>
                <Link
                  to={feature.link}
                  className="text-purple-600 hover:underline mt-2 inline-block"
                >
                  Learn More
                </Link>
              </div>
            ))}
          </div>
        </section>

        {/* Additional Call to Action Section */}
        <section className="call-to-action mt-10 p-5 bg-purple-50 border rounded">
          <h2 className="text-xl font-bold text-purple-600 mb-3">
            Why Use LabConnect?
          </h2>
          <ul className="list-disc list-inside">
            <li>Seamless platform for finding and managing research projects.</li>
            <li>Intuitive interface for professors and students.</li>
            <li>Dedicated support for all users.</li>
          </ul>
          <Link
            to="/about"
            className="text-purple-700 underline mt-3 inline-block"
          >
            Learn more about us.
          </Link>
        </section>

        {/* Footer Section */}
        <footer className="mt-10 p-5 text-center border-t">
          <p className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} LabConnect. All Rights Reserved.
          </p>
        </footer>
      </section>
    </section>
  );
};

export default Home;
