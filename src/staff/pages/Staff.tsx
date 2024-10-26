import React, { useState, useEffect } from "react";
import ProfileComponents from "../../shared/components/Profile/ProfileComponents.tsx";
import { useParams } from "react-router";

const StaffPage = () => {
  const { staffId } = useParams();
  const [profile, setProfile] = useState<null | boolean>(null);

  const checkProfile = (data) => {
    return data.name && data.image && data.department && data.description;
  };

  const fetchProfile = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_SERVER}/staff/${staffId}`
    );

    if (!response.ok) {
      setProfile(false);
    } else {
      const data = await response.json();
      if (checkProfile(data)) {
        setProfile(data);
      } else {
        setProfile(false);
        console.log(data);
      }
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <>
      {profile === null && "Loading..."}
      {profile && typeof profile === "object" && <ProfileComponents profile={profile} staffId={staffId} />}
      {profile === false && "Profile not found"}
    </>
  );
};

export default StaffPage;
