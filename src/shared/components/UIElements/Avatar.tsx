import React from "react";

const Avatar: React.FC<{ img: string, name: string, className?: string }> = ({ img, name, className = "" }) => {
  return (
    <div className={`${className} flex align-items-center gap-3`}>
      <img className="rounded-full w-12 h-12" src={img} alt={name} />
      <div>
        <h5 className="text-blue-800 text-base">{name}</h5>
      </div>
    </div>
  );
};

export default Avatar;
