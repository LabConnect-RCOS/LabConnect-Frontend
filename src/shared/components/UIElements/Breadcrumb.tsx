import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const Breadcrumb = ({ tree }) => {
  return (
    <div className="text-sm breadcrumbs">
      <ul>
        {tree.map((item) => {
          return (
            <li key={item.link}>
              <Link to={item.link}>{item.title}</Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
Breadcrumb.propTypes = {
  tree: PropTypes.arrayOf(
    PropTypes.shape({
      link: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default Breadcrumb;
