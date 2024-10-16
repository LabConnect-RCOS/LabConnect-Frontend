import React, { useEffect, useState } from "react";
import DepartmentItems from "../components/DepartmentItems";

const Departments = () => {
  var [departments, setDepartments] = useState(false);

  const fetchDepartments = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_SERVER}/departments`
    );

    if (!response.ok) {
      setDepartments("not found");
    } else {
      const data = await response.json();
      setDepartments(data);
    }
  };

  useEffect(() => {
    fetchDepartments();
  }, []);

  var departmentComponents = (
    <section className="flex2 gap-3">
      <DepartmentItems items={departments} />
    </section>
  );

  return (
    <>
      <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl">
        Departments
      </h1>
      {!departments && "Loading..."}
      {typeof departments === "object" && departmentComponents}
      {departments === "not found" && "Departments not found"}
    </>
  );
};

export default Departments;
