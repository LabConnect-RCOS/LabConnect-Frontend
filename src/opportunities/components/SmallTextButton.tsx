import React from "react";

interface SmallTextButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  special: boolean;
  className: string;
}

const SmallTextButton = ({ children, onClick, special, className }: SmallTextButtonProps) => {
  return (
    <div className={`${className}`}>
      <button
        onClick={onClick}
        className={`${special && "font-medium"} ${
          !special && "font-sm"
        } border-gray-400 btn-job px-2.5 hover:text-blue-700 hover:border-blue-700`}
      >
        {children}
      </button>
    </div>
  );
};

export default SmallTextButton;
