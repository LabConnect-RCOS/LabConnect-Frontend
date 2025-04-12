import React from "react";

interface AvatarProps {
  img: string;
  name: string;
  className?: string;
}

const Avatar = ({ img, name, className = "" }: AvatarProps) => {
  return (
    <div className={`${className} avatar1`}>
      <img className="avatar-img" src={img} alt={name} />
      <div>
        <h5 className="avatar-name">{name}</h5>
      </div>
    </div>
  );
};

export default Avatar;
