import React from "react";
import ProfileAvatar from "./ProfileAvatar.tsx";
import ProfileDescription from "./ProfileDescription.tsx";
import ProfileOpportunities from "./ProfileOpportunities.tsx";

interface Profile {
    name: string;
    image: string;
    department: string;
    description: string;
    website?: string;
}

const ProfileComponents = ({ profile, staffId }: { profile: Profile, staffId?: string }) => {
    return (
        <section className="mt-5">
            <div className="flex gap-5">
                <ProfileAvatar name={profile.name} image={profile.image} />
                <ProfileDescription
                    website={profile.website}
                    {...profile}
                />
            </div>
            {staffId && <ProfileOpportunities id={staffId} />}
        </section>
    );
}

export default ProfileComponents;
