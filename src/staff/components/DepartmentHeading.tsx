import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const DepartmentHeading = ({ name, description, image, website }) => {
  return (
    <div className="flex justify-center">
      <div className="flex2 lg:flex-row gap-5">
        <figure className="featimage lg:min-w-96">
          <img src={image} alt={`${name} department`} />
        </figure>
        <h1>{name}</h1>
        <p>{description}</p>
        <Link to={website} target="_blank">
          {website}
        </Link>
      </div>
    </div>
  );
};

DepartmentHeading.propTypes = {
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  website: PropTypes.string,
};
export default DepartmentHeading;
