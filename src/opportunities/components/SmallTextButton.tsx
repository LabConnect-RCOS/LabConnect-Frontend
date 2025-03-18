import React from "react";
import PropTypes from "prop-types";

const SmallTextButton = ({ children, onClick, special, className }) => {
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

SmallTextButton.propTypes = {
  children: PropTypes.node,
  onClick: PropTypes.func.isRequired,
  special: PropTypes.bool,
  className: PropTypes.string,
}

export default SmallTextButton;
