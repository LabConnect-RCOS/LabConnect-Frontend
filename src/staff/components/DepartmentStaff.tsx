import React from "react";
import PropTypes from "prop-types";
import AvatarCard from "../../shared/components/UIElements/AvatarCard.tsx";
import { Link } from "react-router-dom";

const DepartmentStaff = ({ staff }) => {
  return (
    <div className="staff-body" style={{ rowGap: "1.5rem" }}>
      {staff.map((staff_member) => {
        return (
          <Link
            className="w-fit no-underline"
            key={staff_member.id}
            to={`/staff/${staff_member.id}`}
          >
            <AvatarCard name={staff_member.name} img={staff_member.image} />
          </Link>
        );
      })}
    </div>
  );
};

DepartmentStaff.propTypes = {
  staff: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default DepartmentStaff;
