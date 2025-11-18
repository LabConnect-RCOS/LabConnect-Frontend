import React from "react";

const ProfileAvatar: React.FC<{ image: string; name: string }> = ({ image, name }) => {
  return (
    <div className="avatar">
      <div className="w-28 h-28 lg:w-36 lg:h-36 rounded-full overflow-hidden ring-2 ring-primary/80 ring-offset-2 ring-offset-white shadow-sm transition-transform duration-300 hover:scale-[1.02]">
        <img
          src={image}
          alt={name}
          className="object-cover w-full h-full"
        />
      </div>
    </div>
  );
};

export default ProfileAvatar;
