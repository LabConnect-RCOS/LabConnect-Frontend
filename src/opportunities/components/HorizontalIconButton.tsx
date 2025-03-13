import React from "react";
import PropTypes from "prop-types";

const HorizontalIconButton = ({ children, onClick, icon, special }) => {
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

HorizontalIconButton.propTypes = {
  children: PropTypes.node,
  onClick: PropTypes.func.isRequired,
  icon: PropTypes.node,
  special: PropTypes.bool,
}

export default HorizontalIconButton;
