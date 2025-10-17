import React, { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaEnvelope } from "react-icons/fa";
import logo from "../../images/LabConnect_Logo2-removebg-preview.png";
import SEO from "../components/SEO.tsx";

const Home = () => {
  const aboutSectionRef = useRef<HTMLDivElement>(null);

  // Contact form state
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [contactSubmitted, setContactSubmitted] = useState(false);

  // Return to Top Button state
  const [showReturnToTop, setShowReturnToTop] = useState(false);
  const [buttonBottom, setButtonBottom] = useState(5);

  // Inbox popup state & ref
  const [showInbox, setShowInbox] = useState(false);
  const inboxRef = useRef<HTMLDivElement>(null);

  // Mock notifications
  const notifications = [
    { id: 1, text: "Biology Department posted new research positions.", time: "2h ago" },
    { id: 2, text: "Your application to Quantum Lab was accepted!", time: "1d ago" },
    { id: 3, text: "Reminder: Update your profile by April 30th.", time: "3d ago" },
  ];

  // Preload the dark logo to ensure it's cached.
  useEffect(() => {
    const preloadImg = new Image();
    preloadImg.src = logo;
  }, []);

  // Scroll event for Return to Top button
  useEffect(() => {
    const handleScroll = () => {
      setShowReturnToTop(window.scrollY > 100);
      const footer = document.querySelector("footer");
      if (footer) {
        const footerRect = footer.getBoundingClientRect();
        const buttonHeight = 50;
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

  // Click‑outside handler for Inbox popup
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        showInbox &&
        inboxRef.current &&
        !inboxRef.current.contains(e.target as Node)
      ) {
        setShowInbox(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showInbox]);

  const handleContactChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setContactForm({ ...contactForm, [e.target.name]: e.target.value });
  };

  const handleContactSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setContactSubmitted(true);
  };

  const handleScrollToAbout = () => {
    aboutSectionRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <section className="w-full relative bg-white dark:bg-gray-900">
      <SEO title="LabConnect" description="LabConnect home page" />

      {/* Welcome Section */}
      <section className="text-center font-sans w-full relative">
        {/* Inbox label + button locked top‑right */}
        <div
          ref={inboxRef}
          className="absolute top-4 right-4 flex items-center space-x-2 z-50"
        >
          <span className={`text-gray-800 dark:text-gray-200 font-medium ${showInbox ? "underline" : ""}`}>
            View Inbox
          </span>
          <button
            onClick={() => setShowInbox((v) => !v)}
            className="p-2 bg-white dark:bg-gray-800 rounded-full shadow hover:shadow-lg focus:outline-none border-2 border-black dark:border-white"
          >
            <FaEnvelope className="text-xl text-gray-700 dark:text-gray-200" />
          </button>

          {showInbox && (
            <div className="absolute top-full right-0 mt-2 w-64 bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden">
              <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-700">
                <strong className="text-gray-800 dark:text-gray-100">Inbox</strong>
              </div>
              {notifications.map((n) => (
                <div
                  key={n.id}
                  className="px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer flex justify-between items-center"
                >
                  <span className="text-sm text-gray-800 dark:text-gray-200">
                    {n.text}
                  </span>
                  <span className="text-xs text-gray-500 dark:text-gray-400 ml-2">
                    {n.time}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="flex justify-center items-center pt-4">
          <img
            src={logo}
            alt="LabConnect"
            height="289"
            style={{ transition: "none" }}
          />
        </div>

        <h1 className="text-xl pt-32 text-gray-800 dark:text-gray-100">
          Welcome to LabConnect!
        </h1>

        <p className="text-lg pt-8 text-gray-600 dark:text-gray-300">
          Discover endless opportunities in research and innovation, all in one
          simple and intuitive platform.
        </p>
        <br />
        <p className="text-base px-6 text-gray-700 dark:text-gray-200">
          If you are a student, go to the{" "}
          <Link
            to="/opportunities"
            className="no-underline text-blue-500 hover:text-blue-900 focus:text-blue-900"
          >
            <b>Opportunities</b>
          </Link>{" "}
          tab to view currently available research opportunities.
          <br />
          If you are a professor or staff member,{" "}
          <Link
            to="/signin"
            className="no-underline text-blue-500 hover:text-blue-900 focus:text-blue-900"
          >
            <b>Sign In</b>
          </Link>{" "}
          and then go to{" "}
          <Link
            to="/create"
            className="no-underline text-blue-500 hover:text-blue-900 focus:text-blue-900"
          >
            <b>Create</b>
          </Link>{" "}
          to start posting opportunities or{" "}
          <Link
            to="/profile"
            className="no-underline text-blue-500 hover:text-blue-900 focus:text-blue-900"
          >
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
      <section
        id="about"
        ref={aboutSectionRef}
        className="w-full flex justify-center py-10"
      >
        <div className="group rounded-lg p-8 w-11/12 md:w-3/4 lg:w-/6 bg-[#4682e3] dark:bg-blue-900 hover:bg-[rgba(70,130,227,0.9)] dark:hover:bg-blue-800 filter saturate-[1.2] shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
          <h2 className="text-2xl font-semibold text-center text-dark-800 text-white">
            About Us
          </h2>
          <p className="mt-4 text-lg text-center text-dark-800 text-white">
            LabConnect is a platform dedicated to bridging the gap between
            students and research opportunities. We aim to make it easier for
            students to find meaningful lab/research work while helping
            professors connect with passionate individuals through a convenient,
            all-in-one application. Our team is hard at work, and we will
            provide updates on our progress so keep an eye out for
            announcements!
          </p>
          <p className="mt-4 text-lg text-center text-dark-800 text-white">
            If you&apos;re interested in learning more about the team at RCOS or
            are thinking about joining LabConnect or any branch of RCOS, please
            check out the new website here to learn more about existing projects
            and areas of interest:{" "}
            <Link
              to="https://new.rcos.io"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline text-red-700 dark:text-red-600 text-1xl font-bold"
            >
              RCOS
            </Link>
          </p>
        </div>
      </section>

      {/* Meet Our Team Section */}
      <section id="team" className="py-20 text-center w-full">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">
          Meet Our Team
        </h2>
        <p className="mt-4 max-w-3xl mx-auto text-lg px-6 text-gray-700 dark:text-white">
          Thanks for checking us out! We are a team of dedicated open-source
          developers working hard to make this product into a reality.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mt-10">
          {[
            {
              name: "Will Broadwell",
              major: "Computer Science",
              gradYear: "2026",
              role: "Project Lead",
            },
            {
              name: "Rafael Cenzano",
              major: "Computer Science",
              gradYear: "2025",
              role: "Outside Collaborator",
            },
            {
              name: "Jaswanth Duddu",
              major: "Computer Science",
              gradYear: "2026",
              role: "Backend Developer",
            },
            {
              name: "Sarah Wohlford",
              major: "Computer Science",
              gradYear: "2027",
              role: "Backend Developer",
            },
            {
              name: "Pragathi Ashok",
              major: "Computer Science",
              gradYear: "2026",
              role: "Full Stack Developer",
            },
            {
              name: "Aniket Singh",
              major: "Computer Science",
              gradYear: "2027",
              role: "Backend Developer",
            },
            {
              name: "Doan Nguyen",
              major: "Computer Science",
              gradYear: "2027",
              role: "Frontend Developer",
            }
          ].map((member, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 shadow-md rounded-2xl p-6 w-full flex flex-col items-center text-center transition-transform duration-300 hover:shadow-xl hover:-translate-y-2 border-2 border-blue-600"
            >
              <h3 className="text-lg font-semibold text-gray-800 dark:text-blue-600">
                {member.name}
              </h3>
              <p className="text-sm text-gray-600 dark:text-white mt-2">
                {member.major}, Class of {member.gradYear}
              </p>
              <p className="text-sm text-blue-600 dark:text-white mt-2 font-medium">
                {member.role}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Us Section */}
      <section id="contact" className="py-20 text-center">
        <div className="bg-gray-100 dark:bg-gray-500 dark:bg-opacity-5 max-w-xl mx-auto p-4 rounded-lg">
          <h1 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-100">
            Contact Us
          </h1>
          <p className="text-base text-gray-600 dark:text-gray-200 mb-4 max-w-md mx-auto">
            Please feel free to reach out with any questions, concerns, or
            reviews. We value your feedback as we continue to develop LabConnect
            into the best product it can be!
          </p>
          {contactSubmitted ? (
            <div>
              <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-100">
                Thank You!
              </h2>
              <p className="text-gray-700 dark:text-gray-200">
                Your message has been successfully sent. We appreciate your
                feedback!
              </p>
            </div>
          ) : (
            <form onSubmit={handleContactSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="contact-name"
                  className="block font-medium text-gray-700 dark:text-gray-200"
                >
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
                <label
                  htmlFor="contact-email"
                  className="block font-medium text-gray-700 dark:text-gray-200"
                >
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
                <label
                  htmlFor="contact-subject"
                  className="block font-medium text-gray-700 dark:text-gray-200"
                >
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
                <label
                  htmlFor="contact-message"
                  className="block font-medium text-gray-700 dark:text-gray-200"
                >
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