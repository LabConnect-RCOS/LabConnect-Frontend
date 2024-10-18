import React, { useEffect } from "react";
import useAuthActions from "../../context/global/authActions";
import { Link } from "react-router-dom";
import logo from "../../images/LabConnect_Logo2.webp";

const Home = ({signOut, signIn}) => {
  
  const {login, logout} = useAuthActions();
  
  useEffect(() => {
    if (signOut) {
      logout();
    }
    
    if (signIn) {
      login();
    }
  }, []);
  
  return (
    <section>
      <section className="home-general">
        <br/><br/><br/>
        <div className="img-center">
        <img src={logo} alt="LabConnect" height="289" fetchpriority="high"/>

        </div>

        <br/><br/><br/><br/>

        <p className="text-xl">
          Welcome to LabConnect!
        </p>
        <br/>
        <p className="text-base">
          If you are a student, go to the <Link to="/jobs" className="hover-link hover:text-neutral-950"><b>Jobs</b></Link> tab to view currently available research opportunities.<br/>
          If you are a professor or staff member, <Link className="hover-link hover:text-neutral-950"><b>Sign In</b></Link> and then go to <Link to="/createPost" className="hover-link hover:text-neutral-950"><b>Create</b></Link> to start posting <br/>
          opportunities or <Link to="/profile" className="hover-link hover:text-neutral-950"><b>Profile</b></Link> to view and edit your current posts.
        </p>
        <br/><br/><br/>
      </section>
    </section>
  );
};

export default Home;
