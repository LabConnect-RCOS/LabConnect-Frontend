import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../images/LabConnect_Logo2.webp";
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

  const handleScrollToAbout = () => {
    aboutSectionRef.current?.scrollIntoView({ behavior: "smooth" });
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
    <section className="w-full">
      <SEO title="LabConnect" description="LabConnect home page" />

      {/* Welcome Section */}
      <section className="home-general text-center w-full">
        <div className="img-center pt-28">
          <img src={logo} alt="LabConnect" height="289" />
        </div>

        <h1 className="text-xl pt-32">Welcome to LabConnect!</h1>
        <br />
        <p className="text-base px-6">
          If you are a student, go to the{" "}
          <Link
            to="/jobs"
            className="blue-link hover:text-blue-900 focus:text-blue-900"
          >
            <b>Jobs</b>
          </Link>{" "}
          tab to view currently available research opportunities.
          <br />
          If you are a professor or staff member,{" "}
          <Link
            to="/signin"
            className="blue-link text-blue-600 hover:text-blue-900 focus:text-blue-900"
          >
            <b>Sign In</b>
          </Link>{" "}
          and then go to{" "}
          <Link
            to="/create"
            className="blue-link text-blue-600 hover:text-blue-900 focus:text-blue-900"
          >
            <b>Create</b>
          </Link>{" "}
          to start posting <br />
          opportunities or{" "}
          <Link
            to="/profile"
            className="blue-link text-blue-600 hover:text-blue-900 focus:text-blue-900"
          >
            <b>Profile</b>
          </Link>{" "}
          to view and edit your current posts.
        </p>

        {/* Learn More Button */}
        <div className="mt-10">
          <button
            onClick={handleScrollToAbout}
            className="px-6 py-3 bg-blue-600 text-white text-lg font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
        <div
          style={{
            backgroundColor: "#4682e3",
            filter: "saturate(1.2)"
          }}
          className="rounded-lg p-8 w-11/12 md:w-3/4 lg:w-/6"
        >
          <h2 className="text-2xl font-semibold">About Us</h2>
          <p className="mt-4 text-lg">
            LabConnect is a platform dedicated to bridging the gap between students
            and research opportunities. We aim to make it easier for students to find
            meaningful lab/research work while helping professors connect with passionate
            individuals through a convenient, all-in-one application. Our team is hard
            at work, and we will provide updates on our progress so keep an eye out for
            announcements!
          </p>
        </div>
      </section>

      {/* Meet Our Team Section */}
      <section id="team" className="py-20 text-center w-full">
        <h2 className="text-2xl font-semibold">Meet Our Team</h2>
        <p className="mt-4 max-w-3xl mx-auto text-lg px-6">
          Thanks for checking us out! We are a team of dedicated open-source developers
          working hard to make this product into a reality.
        </p>

        <div className="flex flex-wrap justify-center gap-8 mt-10">
          {/* Team Member Cards */}
          {[
            {
              name: "Rafael Cenzano",
              major: "Computer Science",
              gradYear: "2025",
              role: "Backend Developer",
              skill: "Flask"
            },
            {
              name: "Will Broadwell",
              major: "Computer Science",
              gradYear: "2026",
              role: "Frontend Developer",
              skill: "TailwindCSS"
            },
            {
              name: "Sagar Sahu",
              major: "Computer Science",
              gradYear: "2026",
              role: "Frontend Developer",
              skill: "React"
            },
            {
              name: "Sarah Wohlford",
              major: "Computer Science",
              gradYear: "2027",
              role: "Backend Developer",
              skill: "PostgreSQL"
            }
          ].map((member, index) => (
            <div
              key={index}
              className="bg-white shadow-md rounded-2xl p-6 w-64 flex flex-col items-center text-center transform transition duration-300 hover:shadow-xl hover:-translate-y-2"
            >
              <h3 className="text-lg font-semibold">{member.name}</h3>
              <p className="text-sm text-gray-600 mt-2">
                {member.major}, Class of {member.gradYear}
              </p>
              <p className="text-sm text-blue-600 mt-2 font-medium">
                {member.role}
              </p>
              <p className="text-sm text-gray-500 mt-1">Skill: {member.skill}</p>
            </div>
          ))}
        </div>
      </section>
      {/* Contact Us Section */}
      <section id="contact" className="py-20 bg-gray-100 text-center w-full">
        <div className="max-w-md mx-auto p-4">
          <h1 className="text-2xl font-bold mb-4">Contact Us</h1>
          {contactSubmitted ? (
            <div>
              <h2 className="text-2xl font-bold mb-4">Thank You!</h2>
              <p>
                Your message has been successfully sent. We appreciate your feedback!
              </p>
            </div>
          ) : (
            <form onSubmit={handleContactSubmit} className="space-y-4">
              <div>
                <label htmlFor="contact-name" className="block font-medium">
                  Name (First, Last)
                </label>
                <input
                  id="contact-name"
                  type="text"
                  name="name"
                  value={contactForm.name}
                  onChange={handleContactChange}
                  className="w-full p-2 border border-gray-300 rounded mt-1"
                  required
                />
              </div>
              <div>
                <label htmlFor="contact-email" className="block font-medium">
                  RPI Email
                </label>
                <input
                  id="contact-email"
                  type="email"
                  name="email"
                  value={contactForm.email}
                  onChange={handleContactChange}
                  className="w-full p-2 border border-gray-300 rounded mt-1"
                  required
                />
              </div>
              <div>
                <label htmlFor="contact-subject" className="block font-medium">
                  Subject
                </label>
                <input
                  id="contact-subject"
                  type="text"
                  name="subject"
                  value={contactForm.subject}
                  onChange={handleContactChange}
                  className="w-full p-2 border border-gray-300 rounded mt-1"
                  required
                />
              </div>
              <div>
                <label htmlFor="contact-message" className="block font-medium">
                  Message
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  value={contactForm.message}
                  onChange={handleContactChange}
                  className="w-full p-2 border border-gray-300 rounded mt-1"
                  rows={5}
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition duration-300"
              >
                Send Message
              </button>
            </form>
          )}
        </div>
      </section>
    </section>
  );
};

export default Home;