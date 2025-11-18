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

      {/* staff pages */}
      {staff && (
        <div className="mb-4">
          <Breadcrumb
            tree={[
              { link: "/staff", title: "Staff" },
              {
                link: `/staff/department/${profile.department}`,
                title: profile.department || "Unknown Department",
              },
              { link: `/staff/${id}`, title: profile.name || "Unknown Staff" },
            ]}
          />
        </div>
      )}

      {/* Profile Header Section */}
      <section className="mt-6 p-6 bg-white rounded-2xl shadow-md border border-gray-100">
        <div className="flex flex-col md:flex-row gap-8 items-start md:items-center">
          <ProfileAvatar name={profile.name} image={profile.image} />
          <div className="w-full">
            <ProfileDescription {...profile} />
          </div>
        </div>
      </section>

      {/* Opportunities Section */}
      {id && (
        <section className="mt-8 p-6 bg-gray-50 rounded-2xl shadow-sm border border-gray-100">
          <h2 className="text-2xl font-bold tracking-tight text-gray-800 mb-5">
            Opportunities
          </h2>
          <ProfileOpportunities id={id} staff={staff} />
        </section>
      )}
    </>
  );
};

export default ProfileComponents;
