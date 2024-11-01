import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const ProfileDescription = ({ name, department, description, website }) => {
  return (
    <div className="font-light flex2 gap-2">
      <h2 className="font-extrabold text-5xl">{name}</h2>
      <h5 className="text-gray-700">{department}</h5>
      <p>{description}</p>
      <Link to={website} target="_blank">
        {website}
      </Link>
    </div>
  );
};

ProfileDescription.propTypes = {
  name: PropTypes.string.isRequired,
  department: PropTypes.string,
  description: PropTypes.string.isRequired,
  website: PropTypes.string,
};

export default ProfileDescription;
