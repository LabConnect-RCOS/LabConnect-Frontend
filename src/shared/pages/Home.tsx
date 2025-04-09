import React, { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "../../images/LabConnect_Logo2.webp";
import darkLogo from "../../images/LabConnect_Logo2-removebg-preview.png"; // New dark mode logo
import SEO from "../components/SEO.tsx";

const Home = () => {
  const aboutSectionRef = useRef<HTMLDivElement>(null);
  
  // State for the Contact Us form
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [contactSubmitted, setContactSubmitted] = useState(false);

  // State to control visibility of the "Return to Top" button
  const [showReturnToTop, setShowReturnToTop] = useState(false);
  
  // State for dynamic bottom offset for the Return to Top button
  const [buttonBottom, setButtonBottom] = useState(5);

  // State for dark mode toggle
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Toggle "Return to Top" visibility
      setShowReturnToTop(window.scrollY > 100);

      // Adjust button position to avoid overlapping the footer
      const footer = document.querySelector("footer");
      if (footer) {
        const footerRect = footer.getBoundingClientRect();
        const buttonHeight = 50; // approximate height in pixels
        if (footerRect.top < window.innerHeight - buttonHeight) {
          setButtonBottom(window.innerHeight - footerRect.top + 10);
        } else {
          setButtonBottom(5);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Toggle dark mode by adding or removing the "dark" class on the root element
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  const handleScrollToAbout = () => {
    aboutSectionRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Function to scroll to the top of the page
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleContactChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setContactForm({ ...contactForm, [e.target.name]: e.target.value });
  };

  const handleContactSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setContactSubmitted(true);
  };

  return (
    <section className="w-full relative bg-white dark:bg-gray-900">
      <SEO title="LabConnect" description="LabConnect home page" />

      {/* Welcome Section */}
      <section className="home-general text-center w-full relative">
        {/* Dark Mode Toggle Switch */}
        <label className="absolute top-4 right-4 flex items-center cursor-pointer">
          <input
            type="checkbox"
            className="sr-only peer"
            checked={isDarkMode}
            onChange={() => setIsDarkMode(prev => !prev)}
          />
          <div className="w-11 h-6 bg-gray-300 dark:bg-gray-600 rounded-full peer-focus:outline-none peer-checked:bg-blue-600 relative transition-all duration-300">
            <div
              className={`absolute left-1 top-1 bg-white dark:bg-gray-300 w-4 h-4 rounded-full transition-transform duration-300 ${
                isDarkMode ? "translate-x-5" : ""
              }`}
            ></div>
          </div>
          <span className="ml-3 text-gray-700 dark:text-gray-200 font-medium">
            Enable Dark Mode
          </span>
        </label>

        <div className="img-center pt-4">
          {/* Use the new darkLogo when dark mode is enabled, otherwise use the default logo */}
          <img 
            src={isDarkMode ? darkLogo : logo} 
            alt="LabConnect" 
            height="289" 
          />
        </div>

        <h1 className="text-xl pt-32 text-gray-800 dark:text-gray-100">
          Welcome to LabConnect!
        </h1>

        <p className="text-lg pt-8 text-gray-600 dark:text-gray-300">
          Discover endless opportunities in research and innovation, all in one simple and intuitive platform.
        </p>
        <br />
        <p className="text-base px-6 text-gray-700 dark:text-gray-200">
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
          to start posting opportunities or{" "}
          <Link to="/profile" className="blue-link text-blue-600 hover:text-blue-900 focus:text-blue-900">
            <b>Profile</b>
          </Link>{" "}
          to view and edit your current posts.
        </p>

        <div className="mt-10">
          <button
            onClick={handleScrollToAbout}
            className="px-6 py-3 bg-blue-600 dark:bg-blue-700 text-white text-lg font-semibold rounded-lg shadow-md hover:bg-blue-700 dark:hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Learn More
          </button>
        </div>
      </section>
      <div className="h-40"></div>

      {/* About Us Section */}
      <section id="about" ref={aboutSectionRef} className="w-full flex justify-center py-10">
        <div className="group rounded-lg p-8 w-11/12 md:w-3/4 lg:w-/6 bg-[#4682e3] dark:bg-blue-900 hover:bg-[rgba(70,130,227,0.9)] dark:hover:bg-blue-800 filter saturate-[1.2] shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
          <h2 className="text-2xl font-semibold text-center group-hover:text-white">
            About Us
          </h2>
          <p className="mt-4 text-lg text-center group-hover:text-white">
            LabConnect is a platform dedicated to bridging the gap between students and research opportunities. We aim to make it easier for students to find meaningful lab/research work while helping professors connect with passionate individuals through a convenient, all-in-one application. Our team is hard at work, and we will provide updates on our progress so keep an eye out for announcements!
          </p>
        </div>
      </section>

      {/* Meet Our Team Section */}
      <section id="team" className="py-20 text-center w-full">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">
          Meet Our Team
        </h2>
        <p className="mt-4 max-w-3xl mx-auto text-lg px-6 text-gray-700 dark:text-gray-200">
          Thanks for checking us out! We are a team of dedicated open-source developers working hard to make this product into a reality.
        </p>
        {/* Use a grid container for a 2x4 layout on medium and larger screens */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mt-10">
          {[
            {
              name: "Rafael C",
              major: "Computer Science",
              gradYear: "2025",
              role: "Backend Developer",
              skill: "Flask"
            },
            {
              name: "Will B",
              major: "Computer Science",
              gradYear: "2026",
              role: "Frontend Developer",
              skill: "TailwindCSS"
            },
            {
              name: "Sagar S",
              major: "Computer Science",
              gradYear: "2026",
              role: "Frontend Developer",
              skill: "React.js"
            },
            {
              name: "Sarah W",
              major: "Computer Science",
              gradYear: "2027",
              role: "Backend Developer",
              skill: "PostgreSQL"
            },
            {
              name: "Sidharth E",
              major: "Computer Science",
              gradYear: "2026",
              role: "Team Member",
              skill: "GitHub"
            },
            {
              name: "Mohammed P",
              major: "Computer Science",
              gradYear: "2027",
              role: "Team Member",
              skill: "Backend"
            },
            {
              name: "Gowrisankar P",
              major: "Computer Science",
              gradYear: "2027",
              role: "Team Member",
              skill: "TypeScript"
            },
            {
              name: "Devan P",
              major: "Computer Science",
              gradYear: "2027",
              role: "Team Member",
              skill: "Frontend"
            }
          ].map((member, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-700 shadow-md rounded-2xl p-6 w-full flex flex-col items-center text-center transition-transform duration-300 hover:shadow-xl hover:-translate-y-2 border-2 border-blue-600"
            >
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                {member.name}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">
                {member.major}, Class of {member.gradYear}
              </p>
              <p className="text-sm text-blue-600 mt-2 font-medium">
                {member.role}
              </p>
              <p className="text-sm text-gray-500 mt-1">
                Skill: {member.skill}
              </p>
            </div>
          ))}
        </div>
      </section>



      {/* Contact Us Section */}
      <section id="contact" className="py-20 text-center">
        <div className="bg-gray-100 dark:bg-gray-600 max-w-xl mx-auto p-4">
          <h1 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-100">
            Contact Us
          </h1>
          <p className="text-base text-gray-600 dark:text-gray-200 mb-4 max-w-md mx-auto">
            Please feel free to reach out with any questions, concerns, or reviews. We value your feedback as we continue to develop LabConnect into the best product it can be!
          </p>
          {contactSubmitted ? (
            <div>
              <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-100">
                Thank You!
              </h2>
              <p className="text-gray-700 dark:text-gray-200">
                Your message has been successfully sent. We appreciate your feedback!
              </p>
            </div>
          ) : (
            <form onSubmit={handleContactSubmit} className="space-y-4">
              <div>
                <label htmlFor="contact-name" className="block font-medium text-gray-700 dark:text-gray-200">
                  First and Last Name
                </label>
                <input
                  id="contact-name"
                  type="text"
                  name="name"
                  value={contactForm.name}
                  onChange={handleContactChange}
                  className="w-full p-2 border border-gray-300 rounded mt-1 dark:bg-gray-700 dark:text-gray-200"
                  required
                />
              </div>
              <div>
                <label htmlFor="contact-email" className="block font-medium text-gray-700 dark:text-gray-200">
                  RPI Email (@rpi.edu)
                </label>
                <input
                  id="contact-email"
                  type="email"
                  name="email"
                  value={contactForm.email}
                  onChange={handleContactChange}
                  className="w-full p-2 border border-gray-300 rounded mt-1 dark:bg-gray-700 dark:text-gray-200"
                  required
                />
              </div>
              <div>
                <label htmlFor="contact-subject" className="block font-medium text-gray-700 dark:text-gray-200">
                  Subject
                </label>
                <input
                  id="contact-subject"
                  type="text"
                  name="subject"
                  value={contactForm.subject}
                  onChange={handleContactChange}
                  className="w-full p-2 border border-gray-300 rounded mt-1 dark:bg-gray-700 dark:text-gray-200"
                  required
                />
              </div>
              <div>
                <label htmlFor="contact-message" className="block font-medium text-gray-700 dark:text-gray-200">
                  Message
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  value={contactForm.message}
                  onChange={handleContactChange}
                  className="w-full p-2 border border-gray-300 rounded mt-1 dark:bg-gray-700 dark:text-gray-200"
                  rows={5}
                  required
                />
              </div>
              <button
                type="submit"
                className="w-3/5 mx-auto bg-blue-600 dark:bg-blue-700 text-white p-2 rounded hover:bg-blue-700 dark:hover:bg-blue-800 transition duration-300"
              >
                Send Message
              </button>
            </form>
          )}
        </div>
      </section>

      {/* Return to Top Button */}
      {showReturnToTop && (
        <button
          onClick={scrollToTop}
          style={{ bottom: `${buttonBottom}px` }}
          className="fixed right-5 bg-blue-600 dark:bg-blue-700 text-white px-4 py-2 rounded shadow-md hover:bg-blue-700 dark:hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 border border-black"
        >
          Return to Top
        </button>
      )}
    </section>
  );
};

export default Home;
