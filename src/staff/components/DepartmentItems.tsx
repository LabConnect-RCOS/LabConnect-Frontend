import React from "react";
import PropTypes from "prop-types";
import LargeImageCard from "./LargeImageCard";

const DepartmentItems = ({ items }) => {
  return (
    <div className="grid grid-cols-3" style={{ rowGap: "3rem" }}>
      {items.map((item) => {
        return (
          <LargeImageCard
            key={item.id}
            to={`/staff/department/${item.department_id}`}
            title={item.title}
            image={item.image}
          />
        );
      })}
    </div>
  );
};

DepartmentItems.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      department_id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default DepartmentItems;
