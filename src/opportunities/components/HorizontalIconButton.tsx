import React from "react";

interface HorizontalIconButtonProps {
  children?: React.ReactNode;
  onClick: (arg?: any) => void;
  icon: React.ReactNode;
  special: boolean;
}

const HorizontalIconButton = ({ children, onClick, icon, special }: HorizontalIconButtonProps) => {
  return (
    <div
      className={`${special && "font-medium"} ${
        !special && "font-sm"
      } horizontal-btn`}
    >
      <button
        className="hover:text-red-600"
        onClick={() => {
          onClick(children);
        }}
      >
        {icon}
      </button>
      {children}
    </div>
  );
};


export default HorizontalIconButton;
