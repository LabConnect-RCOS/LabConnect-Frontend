import React from "react";
import { Routes, Route } from "react-router-dom";
import "./style/App.css";
import Home from "./shared/pages/Home.tsx";
import PageNotFound from "./shared/pages/404.tsx";
import MainNavigation from "./shared/components/Navigation/MainNavigation.tsx";
import Jobs from "./opportunities/pages/Jobs.js";
import Departments from "./staff/pages/Departments.tsx";
import StaffPage from "./staff/pages/Staff.tsx";
import Department from "./staff/pages/Department.tsx";
import CreatePost from "./staff/pages/CreatePost.js";
import IndividualPost from "./opportunities/pages/IndividualPost.js";
import ProfilePage from "./shared/pages/Profile.js";
import LoginRedirection from "./auth/Login.tsx";
import LogoutRedirection from "./auth/Logout.tsx";
import StickyFooter from "./shared/components/Navigation/StickyFooter.tsx";
import IsAuthenticated from "./auth/Auth.tsx";
import Token from "./auth/Token.tsx";
import { HelmetProvider } from 'react-helmet-async';

function App() {

  const authenticated = IsAuthenticated();

  return (
    <HelmetProvider>
      <section>
        <MainNavigation authenticated={authenticated} />
        <main className="flex flex-col min-h-screen p-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/health" element={<p>App is Healthy</p>} />
            <Route path="/callback" element={<Token />} />
            <Route path="/signin" element={<LoginRedirection />} />
            <Route path="/login" element={<LoginRedirection />} />
            <Route path="/signout" element={<LogoutRedirection authenticated={authenticated} />} />
            <Route path="/logout" element={<LogoutRedirection authenticated={authenticated} />} />

            <Route path="/jobs" element={<Jobs />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route
              path="/staff/department/:department"
              element={<Department authenticated={authenticated} />}
            />
            <Route path="/staff" element={<Departments authenticated={authenticated} />} />
            <Route path="/staff/:staffId" element={<StaffPage authenticated={authenticated} />} />
            <Route path="/createPost" element={<CreatePost edit={false} />} />
            <Route
              path="/editPost/:postID"
              element={<CreatePost edit={true} />}
            />
            <Route path="/post/:postID" element={<IndividualPost />} />

            <Route path="/*" element={<PageNotFound />} />
          </Routes>
        </main>
        <StickyFooter authenticated={authenticated} />
      </section>
    </HelmetProvider>
  );
}

export default App;
