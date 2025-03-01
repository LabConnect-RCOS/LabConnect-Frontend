import React, { useEffect, useState } from "react";
import DepartmentItems from "../components/DepartmentItems.tsx";
import ErrorComponent from "../../shared/components/UIElements/Error.tsx";
import SEO from "../../shared/components/SEO.tsx";
import { useAuth } from "../../context/AuthContext.tsx";

export default function Departments() {
  const { auth } = useAuth();

  if (!auth.isAuthenticated) {
    window.location.href = "/login";
  }

  const [departments, setDepartments] = useState<
    { department_id: string; title: string; image: string }[] | string | null
  >(null);

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_BACKEND_SERVER}/departments`, {
          credentials: "include",
        }
        );

        if (!response.ok) {
          throw new Error("Departments not found");
        }

        const data = await response.json();
        setDepartments(data);
      } catch {
        setDepartments("Error fetching departments");
      }
    };
    fetchDepartments();
  }, []);

  const departmentComponents = (
    <section className="flex2 gap-3">
      <DepartmentItems items={Array.isArray(departments) ? departments : []} />
    </section>
  );

  return (
    <>
      <SEO title="Departments - Labconnect" description="Labconnect departments page" />
      <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl">
        Departments
      </h1>
      {!departments && "Loading..."}
      {typeof departments === "object" && departmentComponents}
      {departments === "Error fetching departments" && (
        <ErrorComponent message="Error fetching departments" />
      )}
    </>
  );
};
