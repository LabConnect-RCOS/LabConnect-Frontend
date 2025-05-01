import React from "react";
import AvatarCard from "../../shared/components/UIElements/AvatarCard.tsx";
import { Link } from "react-router-dom";

interface DepartmentStaffProps {
  staff: {id: string, name: string, image: string}[];
}

const DepartmentStaff = ({ staff }: DepartmentStaffProps) => {
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

export default DepartmentStaff;
