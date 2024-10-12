import React from "react";
import ProfileAvatar from "../../shared/components/UIElements/ProfileAvatar";
import ProfileDescription from "../components/ProfileDescription";
// import ProfileOpportunities from "../components/ProfileOpportunities";
import { useParams } from "react-router";
import { useState } from "react";
import { useEffect } from "react";

const Profile = () => {
  const { staffId } = useParams();
  var [profile, setProfile] = useState(false);

  const checkProfile = (data) => {
    return data.name && data.image && data.department && data.description;
  };

  const fetchProfile = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_SERVER}/staff/${staffId}`
    );

    if (!response.ok) {
      setProfile("not found");
    } else {
      const data = await response.json();
      if (checkProfile(data)) {
        setProfile(data);
      } else {
        setProfile("not found");
        console.log(data);
      }
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  var profileComponents = (
    <section className="mt-5">
      <div className="flex gap-5">
        <ProfileAvatar name={profile.name} image={profile.image} />
        <ProfileDescription
          name={profile.name}
          department={profile.department}
          description={profile.description}
          website={profile.website}
          {...profile}
        />
      </div>
      {/* <ProfileOpportunities id={staffId} /> */}
    </section>
  );

  return (
    <>
      {!profile && "Loading..."}
      {typeof profile === "object" && profileComponents}
      {profile === "not found" && "Profile not found"}
    </>
  );
};

export default Profile;
