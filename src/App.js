import React from "react";
import { Routes, Route, redirect } from "react-router-dom";
import "./App.css";
import Home from "./shared/pages/Home";
import PageNotFound from "./shared/pages/404";
import MainNavigation from "./shared/components/Navigation/MainNavigation";
import Jobs from "./opportunities/pages/Jobs";
import Browse from "./staff/pages/Browse";
import Profile from "./staff/pages/Profile";
import Center from "./staff/pages/Center";
import CreatePost from "./staff/pages/CreatePost";
import IndividualPost from "./opportunities/pages/IndividualPost";
import ProfilePage from "./shared/pages/Profile.js";
import SignIn from "./shared/pages/SignIn";
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

  const baseURL = `${process.env.REACT_APP_BACKEND_SERVER}`;

  return (
    <GlobalContextProvider>
      <section>
        <MainNavigation />
        <main className=" container-xl ">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/jobs" element={<Jobs />} />
            <Route path="/staff" element={<Browse />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/center/:centerName" element={<Center />} />
            <Route path="/staff/:staffId" element={<Profile />} />
            <Route path="/createPost" element={<CreatePost />} />
            <Route
              path="/editPost/:postID"
              element={<CreatePost edit={true} />}
            />
            <Route path="/post/:postID" element={<IndividualPost />} />
            <Route path="/signInTemporary" element={<SignIn />} />
            <Route path="/signOut" element={<Home signOut={true} />} />
            <Route path="/signIn" element={<Home signIn={true} />} />

            <Route path="/health" element={<p>App is Healthy</p>} />
            <Route
              path="/login"
              element={<redirect to={`${baseURL}/login`} />}
            />

            <Route path="/*" element={<PageNotFound />} />
          </Routes>
        </main>
        <StickyFooter />
      </section>
    </GlobalContextProvider>
  );
}

export default App;
