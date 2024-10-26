import React, { useEffect } from "react";
import { useState } from "react";
import ProfileComponents from "../components/Profile/ProfileComponents.tsx";
// import EditProfile from "./EditProfile";

const ProfilePage = (authenticated) => {

  if (authenticated[0] === false) {
    window.location.href = "/login";
  }

  // const [editMode, setEditMode] = useState(false);
  const [profile, setProfile] = useState<null | boolean>(null);

  // const changeEditMode = () => {
  //   setEditMode(!editMode);
  // };

  const fetchProfile = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_SERVER}/profile`
    );

    if (response.ok) {
      const data = await response.json();
      setProfile(data);
    } else {
      setProfile(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  // const editButton = (
  //   <button className="btn btn-primary my-3" onClick={changeEditMode}>
  //     {editMode ? "Cancel Changes" : "Edit Profile"}
  //   </button>
  // );

  return (
    <>
      {profile === null && "Loading..."}
      {profile && typeof profile === "object" && <ProfileComponents profile={profile} />}
      {profile === false && "Profile not found"}
    </>
  );
};

export default ProfilePage;
