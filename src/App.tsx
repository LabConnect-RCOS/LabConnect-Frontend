import React from "react";
import { Routes, Route } from "react-router-dom";

import Home from "./shared/pages/Home.tsx";
import PageNotFound from "./shared/pages/404.tsx";
import MainNavigation from "./shared/components/Navigation/MainNavigation.tsx";
import StickyFooter from "./shared/components/Navigation/StickyFooter.tsx";
import ProfilePage from "./shared/pages/Profile.tsx";
import Departments from "./staff/pages/Departments.tsx";
import StaffPage from "./staff/pages/Staff.tsx";
import Department from "./staff/pages/Department.tsx";
import CreatePost from "./staff/pages/CreatePost.tsx";
import LoginRedirection from "./auth/Login.tsx";
import LogoutRedirection from "./auth/Logout.tsx";
import Token from "./auth/Token.tsx";
import Opportunities from "./opportunities/pages/Opportunities.tsx";
import IndividualPost from "./opportunities/pages/IndividualPost.tsx";
import { HelmetProvider } from 'react-helmet-async';
import { AuthProvider } from './context/AuthContext.tsx';

function App() {
  return (
    <AuthProvider>
      <HelmetProvider>
        <div className="min-h-screen flex flex-col bg-white dark:bg-gray-900">
          <MainNavigation />
          <main className="p-8 grow bg-transparent">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/health" element={<p>App is Healthy</p>} />
              <Route path="/callback" element={<Token />} />
              <Route path="/signin" element={<LoginRedirection />} />
              <Route path="/login" element={<LoginRedirection />} />
              <Route path="/signout" element={<LogoutRedirection />} />
              <Route path="/logout" element={<LogoutRedirection />} />
              <Route path="/opportunities" element={<Opportunities />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/staff/department/:department" element={<Department />} />
              <Route path="/staff" element={<Departments />} />
              <Route path="/staff/:staffId" element={<StaffPage />} />
              <Route path="/create" element={<CreatePost edit={false} />} />
              <Route path="/edit/:postID" element={<CreatePost edit={true} />} />
              <Route path="/post/:postID" element={<IndividualPost />} />
              <Route path="/*" element={<PageNotFound />} />
            </Routes>
          </main>
          <StickyFooter />
        </div>
      </HelmetProvider>
    </AuthProvider>
  );
}

export default App;
