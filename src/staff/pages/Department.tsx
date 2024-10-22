import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import Breadcrumb from "../../shared/components/UIElements/Breadcrumb.tsx";
import DepartmentHeading from "../components/DepartmentHeading.tsx";
import DepartmentStaff from "../components/DepartmentStaff.tsx";

const Department = () => {
  const { department } = useParams();
  const [departmentstate, setDepartmentstate] = useState<false | "not found" | { name: string; description: string; image: string; staff: { id: string; name: string; role: string; image: string; }[] }>(false);

  const fetchDepartment = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_SERVER}/departments/${department}`
    );

    if (!response.ok) {
      setDepartmentstate("not found");
    } else {
      const data = await response.json();
      // Ensure each staff member has an image property
      const updatedData = {
        ...data,
        staff: data.staff.map((member: { id: string; name: string; role: string; image?: string }) => ({
          ...member,
          image: member.image || "default-image-url" // Provide a default image URL if none exists
        }))
      };
      setDepartmentstate(updatedData);
    }
  };

  console.log(departmentstate);

  useEffect(() => {
    fetchDepartment();
  }, []);

  const departmentComponents = (
    <>
      {typeof departmentstate === "object" && (
        <>
          <DepartmentHeading
            name={departmentstate.name}
            description={departmentstate.description}
            image={departmentstate.image}
          />
          <DepartmentStaff staff={departmentstate.staff} />
        </>
      )}
    </>
  );

  return (
    <section className="center container-xl">
      <Breadcrumb
        tree={[
          {
            link: "/staff",
            title: "Staff",
          },
          {
            link: `/staff/department/${department}`,
            title: department || "Unknown Department",
          },
        ]}
      />
      {!departmentstate && "Loading..."}
      {typeof departmentstate === "object" && departmentComponents}
      {departmentstate === "not found" && "Department not found"}
    </section>
  );
};

export default Department;
