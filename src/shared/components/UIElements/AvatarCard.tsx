import React from "react";
import Avatar from "./Avatar.tsx";

const AvatarCard: React.FC<{ img: string, name: string, className?: string }> = ({ img, name, className }) => {
  return (
    <div className={className}>
      <Avatar img={img} name={name} className="p-2 border rounded min-w-fit max-w-fit" />
    </div>
  );
};

export default AvatarCard;
