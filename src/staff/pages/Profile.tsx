import React, { useState, useEffect } from "react";
import ProfileAvatar from "../../shared/components/UIElements/ProfileAvatar.tsx";
import ProfileDescription from "../components/ProfileDescription.tsx";
import ProfileOpportunities from "../components/ProfileOpportunities.tsx";
import { useParams } from "react-router";

const Profile = () => {
  const { staffId } = useParams();
  const [profile, setProfile] = useState<{ name?: string; image?: string; department?: string; description?: string; website?: string } | "not found" | null>(null);

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

  const profileComponents = (
    <section className="mt-5">
      <div className="flex gap-5">
        {typeof profile === "object" && profile !== null && (
          <ProfileAvatar name={profile.name || "Unknown"} image={profile.image || ""} />
        )}
        {typeof profile === "object" && profile !== null && (
          <ProfileDescription
            name={profile.name || "Unknown"}
            department={profile.department}
            description={profile.description || ""}
            website={profile.website}
            {...profile}
          />
        )}
      </div>
      {staffId && <ProfileOpportunities id={staffId} />}
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
