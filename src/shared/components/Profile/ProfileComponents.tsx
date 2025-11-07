import React from "react";
import ProfileAvatar from "./ProfileAvatar.tsx";
import ProfileDescription from "./ProfileDescription.tsx";
import ProfileOpportunities from "./ProfileOpportunities.tsx";
import SEO from "../SEO.tsx";
import Breadcrumb from "../UIElements/Breadcrumb.tsx";
import { Profile } from "../../../types/profile.ts";

interface ProfileComponentsProps {
  profile: Profile;
  id: string;
  staff: boolean;
}

const ProfileComponents: React.FC<ProfileComponentsProps> = ({ profile, id, staff }) => {
  return (
    <>
      <SEO
        title={`${profile.name} - Labconnect`}
        description={`${profile.department} page on Labconnect`}
      />

      {/* Breadcrumb for staff pages */}
      {staff && (
        <Breadcrumb
          tree={[
            { link: "/staff", title: "Staff" },
            { link: `/staff/department/${profile.department}`, title: profile.department || "Unknown Department" },
            { link: `/staff/${id}`, title: profile.name || "Unknown Staff" },
          ]}
        />
      )}

      {/* Profile Header Section */}
      <section className="mt-8 p-5 bg-white rounded-lg shadow-sm">
        <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
          <ProfileAvatar name={profile.name} image={profile.image} />
          <ProfileDescription {...profile} />
        </div>
      </section>

      {/* Opportunities Section */}
      {id && (
        <section className="mt-6 p-5 bg-gray-50 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Opportunities</h2>
          <ProfileOpportunities id={id} staff={staff} />
        </section>
      )}
    </>
  );
};

export default ProfileComponents;
