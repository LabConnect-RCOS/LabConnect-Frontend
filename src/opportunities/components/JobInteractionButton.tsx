import React from "react";

interface JobInteractionButtonProps {
  className: string;
  special: string;
  onClick: () => void
  children: React.ReactNode
}

const JobInteractionButton = ({ className, special, onClick, children }: JobInteractionButtonProps) => {
  return (
    <div className={`${className}`}>
      <button
        onClick={onClick}
        className={`${special && "font-medium"} ${!special && "font-sm"
          } flex align-items-center p-2 px-4 rounded-3xl border hover:text-blue-700 hover:border-blue-700`}
      >
        {children}
      </button>
    </div>
  );
};

export default JobInteractionButton;
