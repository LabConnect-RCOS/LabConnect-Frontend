import React from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
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
import { GlobalContextProvider } from "./context/global/GlobalContextProvider.js";
import StickyFooter from "./shared/components/Navigation/StickyFooter.tsx";
import IsAuthenticated from "./auth/Auth.tsx";
import Token from "./auth/Token.tsx";

function App() {

  const authenticated = IsAuthenticated();

  return (
    <GlobalContextProvider>
      <section>
        <MainNavigation authenticated={authenticated} />
        <main className=" container-xl ">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/token" element={<Token />} />
            <Route path="/jobs" element={<Jobs />} />

            <Route path="/profile" element={<ProfilePage />} />
            <Route
              path="/staff/department/:department"
              element={<Department />}
            />
            <Route path="/staff" element={<Departments />} />
            <Route path="/staff/:staffId" element={<StaffPage />} />
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
        <StickyFooter authenticated={authenticated} />
      </section>
    </GlobalContextProvider>
  );
}

export default App;
