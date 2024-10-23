import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./shared/pages/Home.tsx";
import PageNotFound from "./shared/pages/404.tsx";
import MainNavigation from "./shared/components/Navigation/MainNavigation.tsx";
import Jobs from "./opportunities/pages/Jobs.js";
import Departments from "./staff/pages/Departments.tsx";
import Profile from "./staff/pages/Profile.tsx";
import Department from "./staff/pages/Department.tsx";
import CreatePost from "./staff/pages/CreatePost.js";
import IndividualPost from "./opportunities/pages/IndividualPost.js";
import ProfilePage from "./shared/pages/Profile.js";
import LoginRedirection from "./auth/Login.tsx";
import LogoutRedirection from "./auth/Logout.tsx";
import { GlobalContextProvider } from "./context/global/GlobalContextProvider.js";
import StickyFooter from "./shared/components/Navigation/StickyFooter.js";

function App() {

  const handleCallback = async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");
    if (token) {
      localStorage.setItem("jwt", token);
      localStorage.setItem("jwt-time", new Date().getTime().toString());
      window.location.href = "/";
    }
  };

  useEffect(() => {
    handleCallback();
  }, []);

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
            <Route path="/createPost" element={<CreatePost edit={false} />} />
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
