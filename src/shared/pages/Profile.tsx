import React, { useEffect } from "react";
import { useState } from "react";
import ProfileComponents from "../components/Profile/ProfileComponents.tsx";
import { useAuth } from "../../context/AuthContext.tsx";
import { Profile } from "../../types/profile.ts";
// import EditProfile from "./EditProfile";

export default function ProfilePage() {
  const { auth } = useAuth();

  if (!auth.isAuthenticated) {
    window.location.href = "/login";
  }

  // const [editMode, setEditMode] = useState(false);

  const [profile, setProfile] = useState<null | Profile | boolean>(null);

  // const changeEditMode = () => {
  //   setEditMode(!editMode);
  // };

  useEffect(() => {
    const fetchProfile = async () => {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_SERVER}/profile`, {
        credentials: "include",
      }
      );

      if (response.ok) {
        const data = await response.json();
        // if (data.lab_manager) {
        //   window.location.href = "/staff/" + data.id;
        // }
        setProfile(data);
      } else {
        setProfile(false);
      }
    };
    fetchProfile();
  }, []);

  // const editButton = (
  //   <button className="btn btn-primary my-3" onClick={changeEditMode}>
  //     {editMode ? "Cancel Changes" : "Edit Profile"}
  //   </button>
  // );

  return (
    <section className="center container-xl">
      {profile === null && "Loading..."}
      {profile && typeof profile === "object" && <ProfileComponents profile={profile} id={profile.id} staff={false} />}
      {profile === false && "Profile not found"}
    </section>
  );
};
