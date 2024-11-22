import React from "react";

const ProfileAvatar: React.FC<{ image: string, name: string }> = ({ image, name }) => {
  return (
    <div className="avatar">
      <div className="profileavatar lg:w-36">
        <img src={image} alt={name} />
      </div>
    </div>
  );
};

export default ProfileAvatar;
