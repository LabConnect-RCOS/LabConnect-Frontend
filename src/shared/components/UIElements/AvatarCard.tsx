import React from "react";
import Avatar from "./Avatar.tsx";

interface AvatarCardProps {
  img: string;
  name: string;
  className?: string;
}

const AvatarCard = ({ img, name, className }: AvatarCardProps) => {
  return (
    <div className={className}>
      <Avatar img={img} name={name} className="avatar-card" />
    </div>
  );
};

export default AvatarCard;
