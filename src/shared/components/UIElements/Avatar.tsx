import React from "react";

const Avatar: React.FC<{ img: string, name: string, role: string, className?: string }> = ({ img, name, role, className = "" }) => {
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
