import React from "react";
import ProfileAvatar from "./ProfileAvatar.tsx";
import ProfileDescription from "./ProfileDescription.tsx";
import ProfileOpportunities from "./ProfileOpportunities.tsx";
import SEO from "..//SEO.tsx";
import Breadcrumb from "../UIElements/Breadcrumb.tsx";
import { Profile } from "../../../types/profile.ts";

const ProfileComponents = ({ profile, id, staff }: { profile: Profile, id: string, staff: boolean }) => {
    return (
        <>
            <SEO title={`${profile.name} - Labconnect`} description={`${profile.department} page on labconnect`} />
            {staff && <Breadcrumb
                tree={[
                    {
                        link: "/staff",
                        title: "Staff",
                    },
                    {
                        link: `/staff/department/${profile.department}`,
                        title: profile.department || "Unknown Department",
                    }, {
                        link: `/staff/${id}`,
                        title: profile.name || "Unknown Staff",
                    }
                ]}
            />}
            <section className="mt-5">
                <div className="flex gap-5">
                    <ProfileAvatar name={profile.name} image={profile.image} />
                    <ProfileDescription
                        {...profile}
                    />
                </div>
                {id && <ProfileOpportunities id={id} staff={staff} />}
            </section>
        </>
    );
}

export default ProfileComponents;
