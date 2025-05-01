import React from "react";

const ProfileAvatar: React.FC<{ image: string, name: string }> = ({ image, name }) => {
  return (
    <div className="avatar">
      <div className="w-min h-min rounded-full ring ring-primary ring-offset-base-100 ring-offset-2 lg:w-36">
        <img src={image} alt={name} />
      </div>
    </div>
  );
};

export default ProfileAvatar;
