import React from "react";
import Avatar from "./Avatar.tsx";

const AvatarCard: React.FC<{ img: string, name: string, className?: string }> = ({ img, name, className }) => {
  return (
    <div className={className}>
      <Avatar img={img} name={name} className="avatar-card" />
    </div>
  );
};

export default AvatarCard;
