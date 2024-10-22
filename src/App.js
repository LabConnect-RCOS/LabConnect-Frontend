import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./shared/pages/Home";
import PageNotFound from "./shared/pages/404";
import MainNavigation from "./shared/components/Navigation/MainNavigation";
import Jobs from "./opportunities/pages/Jobs";
import Departments from "./staff/pages/Departments.tsx";
import Profile from "./staff/pages/Profile.tsx";
import Department from "./staff/pages/Department.tsx";
import CreatePost from "./staff/pages/CreatePost";
import IndividualPost from "./opportunities/pages/IndividualPost";
import ProfilePage from "./shared/pages/Profile.js";
import { GlobalContextProvider } from "./context/global/GlobalContextProvider.js";
import StickyFooter from "./shared/components/Navigation/StickyFooter.js";

function App() {
  const handleCallback = async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");
    if (token) {
      localStorage.setItem("jwt", token);
    }
  };

  React.useEffect(() => {
    handleCallback();
  }, []);

  const LoginRedirection = () => {
    window.location.href = `${process.env.REACT_APP_BACKEND_SERVER}/login`;
    return null; // No need to render anything, as the redirection happens immediately
  };

  const LogoutRedirection = () => {
    useEffect(() => {
      const logout = async () => {
        try {
          const response = await fetch(
            `${process.env.REACT_APP_BACKEND_SERVER}/logout`,
            {
              method: "GET",
              credentials: "include", // to send cookies or session data
            }
          );
          if (response.ok) {
            // Clear local storage or tokens
            localStorage.removeItem("jwt");
            // Redirect to the homepage or login page
            window.location.href = "/";
          } else {
            console.error("Failed to logout");
          }
        } catch (error) {
          console.error("Error logging out:", error);
        }
      };

      logout();
      window.location.href = "/";
    }, []); // Run only on component mount

    // While logging out, you could return a loading message or just null
    return null; // Since this component doesn't need to render anything
  };

  return (
    <GlobalContextProvider>
      <section>
        <MainNavigation />
        <main className=" container-xl ">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/jobs" element={<Jobs />} />

            <Route path="/profile" element={<ProfilePage />} />
            <Route
              path="/staff/department/:department"
              element={<Department />}
            />
            <Route path="/staff" element={<Departments />} />
            <Route path="/staff/:staffId" element={<Profile />} />
            <Route path="/createPost" element={<CreatePost />} />
            <Route
              path="/editPost/:postID"
              element={<CreatePost edit={true} />}
            />
            <Route path="/post/:postID" element={<IndividualPost />} />

            <Route path="/signin" element={<LoginRedirection />} />
            <Route path="/login" element={<LoginRedirection />} />
            <Route path="/signout" element={<LogoutRedirection />} />
            <Route path="/logout" element={<LogoutRedirection />} />

            <Route path="/health" element={<p>App is Healthy</p>} />
            <Route path="/*" element={<PageNotFound />} />
          </Routes>
        </main>
        <StickyFooter />
      </section>
    </GlobalContextProvider>
  );
}

export default App;
