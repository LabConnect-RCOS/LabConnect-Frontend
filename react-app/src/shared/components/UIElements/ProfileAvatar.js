import React from "react";

const ProfileAvatar = ({image, name}) => {
  return (
    <div className="avatar">
      <div className="profileavatar" width="200" height="144">
        <img src={image} alt={name} />
      </div>
    </div>
  );
};

export default ProfileAvatar;
