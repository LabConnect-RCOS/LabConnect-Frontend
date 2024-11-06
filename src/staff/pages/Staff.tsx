import React, { useState, useEffect } from "react";
import ProfileComponents from "../../shared/components/Profile/ProfileComponents.tsx";
import { useParams } from "react-router";
import SEO from "../../shared/components/SEO.tsx";

const StaffPage = (authenticated) => {
  if (!authenticated.authenticated[1]) {
    window.location.href = "/login";
  }

  const { staffId } = useParams();
  const [profile, setProfile] = useState<null | boolean>(null);

  const checkProfile = (data) => {
    return data.name && data.image && data.department && data.description;
  };

  const fetchProfile = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_SERVER}/staff/${staffId}`, {
      headers: {
        Authorization: `Bearer ${authenticated.authenticated[0]}`,
      },
    }
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
      <SEO title="Staff - Labconnect" description="Labconnect staff page" />
      {profile === null && "Loading..."}
      {profile && typeof profile === "object" && <ProfileComponents profile={profile} staffId={staffId} />}
      {profile === false && "Profile not found"}
    </>
  );
};

export default StaffPage;
