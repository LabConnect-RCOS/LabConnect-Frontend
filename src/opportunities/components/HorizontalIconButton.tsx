import React from "react";

interface HorizontalIconButtonProps {
  children?: React.ReactNode;
  onClick: (arg?: React.ReactNode) => void;
  icon: React.ReactNode;
  special: boolean;
}

const HorizontalIconButton = ({ children, onClick, icon, special }: HorizontalIconButtonProps) => {
  return (
    <div
      className={`${special && "font-medium"} ${!special && "font-sm"
        } flex gap-1 align-items-center p-2 px-2.5 rounded-3xl border`}
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
