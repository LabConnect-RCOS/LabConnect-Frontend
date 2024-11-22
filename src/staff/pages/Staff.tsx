import React, { useState, useEffect } from "react";
import ProfileComponents from "../../shared/components/Profile/ProfileComponents.tsx";
import { useParams } from "react-router";
import { useAuth } from "../../context/AuthContext.tsx";

export default function StaffPage() {
  const { auth } = useAuth();

  const { staffId } = useParams();
  const [profile, setProfile] = useState<null | boolean>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_SERVER}/staff/${staffId}`, {
        headers: {
          Authorization: `Bearer ${auth.token}`,
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

    if (!auth.isAuthenticated) {
      window.location.href = "/login";
    } else if (!staffId) {
      setProfile(false);
    } else {
      fetchProfile();
    }
    const checkProfile = (data: { name: string; image: string; department: string; description: string }) => {
      return data.name && data.image && data.department && data.description;
    };
  }, [auth.token, staffId, auth.isAuthenticated]);

  return (
    <>
      {profile === null && "Loading..."}
      {profile && typeof profile === "object" && staffId && <ProfileComponents profile={profile} id={staffId} staff={true} />}
      {profile === false && <h1>Profile not found</h1>}
    </>
  );
};
