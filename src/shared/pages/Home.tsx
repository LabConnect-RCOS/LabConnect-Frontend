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

  const [emailError, setEmailError] = useState("");

  const handleContactSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    // Validate RPI email domain
    if (!contactForm.email.toLowerCase().endsWith("@rpi.edu")) {
      setEmailError("Email must end with @rpi.edu");
      return;
    }
  
    setEmailError(""); // Clear error
    setContactSubmitted(true);
  };

  return (
    <section className="w-full">
      <SEO title="LabConnect" description="LabConnect home page" />


      {/* Welcome Section */}

      <section className="text-center w-full pt-24 pb-32 bg-white">
        <div className="max-w-3xl mx-auto flex flex-col items-center px-6">
          <img src={logo} alt="LabConnect" className="w-40 h-auto mb-8 drop-shadow-md" />

          <div className="bg-gray-50 rounded-2xl shadow-xl px-8 py-10 transform transition-all duration-300 hover:shadow-2xl">
            <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">Welcome to LabConnect!</h1>
            <p className="text-base md:text-lg text-gray-700 leading-relaxed mb-6">
              If you are a student, go to the{" "}
              <Link to="/jobs" className="text-blue-600 font-semibold hover:underline">
                Jobs
              </Link>{" "}
              tab to view currently available research opportunities.
              <br />
              If you are a professor or staff member,{" "}
              <Link to="/signin" className="text-blue-600 font-semibold hover:underline">
                Sign In
              </Link>{" "}
              and then go to{" "}
              <Link to="/create" className="text-blue-600 font-semibold hover:underline">
                Create
              </Link>{" "}
              to start posting opportunities, or{" "}
              <Link to="/profile" className="text-blue-600 font-semibold hover:underline">
                Profile
              </Link>{" "}
              to view and edit your current posts.
            </p>

            <button
              onClick={handleScrollToAbout}
              className="mt-4 inline-block px-6 py-3 bg-blue-600 text-white text-lg font-semibold rounded-full shadow-md hover:bg-blue-700 transition duration-300"
            >
              Learn More
            </button>
          </div>
        </div>
      </section>
      
      <div className="h-40"></div>


      {/* About Us Section */}

        {/* Tried to make a card-like structure for the About Us Section, Similar to the "Meet Our Team" Section*/}
        <section
          id="about"
          ref={aboutSectionRef}
          className="w-full flex justify-center py-16 px-6 bg-gradient-to-b from-gray-50 to-white"
        >
          <div className="bg-white dark:bg-gray-800 shadow-2xl rounded-3xl p-10 w-full max-w-5xl transform transition-all duration-500 hover:scale-[1.01]">
            <div className="flex items-start gap-4">
              <div className="bg-blue-100 text-blue-700 rounded-full p-3">

                {/* Used an image from w3.  We can replace it if we want */}
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9 9 4.03 9 9z" />
                </svg>
              </div>
              <div>
                <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-2">About Us</h2>
                <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                  <strong>LabConnect</strong> LabConnect is a platform dedicated to bridging the gap between students
                    and research opportunities. We aim to make it easier for students to find
                    meaningful lab/research work while helping professors connect with passionate
                    individuals through a convenient, all-in-one application. Our team is hard
                    at work, and we will provide updates on our progress so keep an eye out for
                    announcements!
                </p>
              </div>
            </div>
          </div>
        </section>


      {/* Meet Our Team Section */}

      <section id="team" className="py-24 px-6 bg-gray-50 text-center w-full">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-extrabold text-gray-900 mb-4">Meet Our Team</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-12">
            We're a passionate team of open-source developers dedicated to connecting students and researchers.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
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
                className="bg-white shadow-lg rounded-2xl p-6 transform transition duration-300 hover:shadow-2xl hover:-translate-y-1"
              >
                <div className="mb-4">
                  <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 text-xl font-bold">
                    {member.name.split(" ")[0][0]}{member.name.split(" ")[1][0]}
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-gray-900">{member.name}</h3>
                <p className="text-sm text-gray-500 mt-1">
                  {member.major}, Class of {member.gradYear}
                </p>
                <p className="mt-2 text-blue-600 font-medium">{member.role}</p>
                <p className="text-sm text-gray-500 mt-1">Skill: {member.skill}</p>
              </div>
            ))}
          </div>
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
                  {emailError && (
                    <p className="text-red-600 text-sm mt-1">{emailError}</p>
                  )}
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