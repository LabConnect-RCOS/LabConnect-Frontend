import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import Breadcrumb from "../../shared/components/UIElements/Breadcrumb";
import DepartmentHeading from "../components/DepartmentHeading";
import DepartmentStaff from "../components/DepartmentStaff";

const Department = () => {
  const { department } = useParams();
  var [departmentstate, setDepartmentstate] = useState(false);

  const fetchDepartment = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_SERVER}/departments/${department}`
    );

    if (!response.ok) {
      setDepartmentstate("not found");
    } else {
      const data = await response.json();
      setDepartmentstate(data);
    }
  };

  console.log(departmentstate);

  useEffect(() => {
    fetchDepartment();
  }, []);

  var departmentComponents = (
    <>
      <DepartmentHeading
        name={departmentstate.name}
        description={departmentstate.description}
        image={departmentstate.image}
      />
      <DepartmentStaff staff={departmentstate.staff} />
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
            title: department,
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
