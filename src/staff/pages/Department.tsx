import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import Breadcrumb from "../../shared/components/UIElements/Breadcrumb.tsx";
import DepartmentHeading from "../components/DepartmentHeading.tsx";
import DepartmentStaff from "../components/DepartmentStaff.tsx";
import SEO from "../../shared/components/SEO.tsx";
import { useAuth } from "../../context/AuthContext.tsx";

export default function Department() {
  const { auth } = useAuth();

  if (!auth.isAuthenticated) {
    window.location.href = "/login";
  }

  const { department } = useParams();
  const [departmentstate, setDepartmentstate] = useState<false | "not found" | { name: string; description: string; image: string; website?: string; staff: { id: string; name: string; role: string; image: string }[] }>(false);

  useEffect(() => {
    const fetchDepartment = async () => {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_SERVER}/departments/${department}`, {
        credentials: "include",
      }
      );

      if (!response.ok) {
        setDepartmentstate("not found");
      } else {
        const data = await response.json();
        // Ensure each staff member has an image property
        const updatedData = {
          ...data,
          staff: data.staff.map((member: { id: string; name: string; role: string; image?: string; website?: string }) => ({
            ...member,
            image: member.image || "default-image-url" // Provide a default image URL if none exists
          }))
        };
        setDepartmentstate(updatedData);
      }
    };
    fetchDepartment();
  }, [department]);

  const departmentComponents = (
    <>
      {typeof departmentstate === "object" && (
        <>
          <DepartmentHeading
            name={departmentstate.name}
            description={departmentstate.description}
            image={departmentstate.image}
            website={departmentstate.website}
          />
          <DepartmentStaff staff={departmentstate.staff} />
        </>
      )}
    </>
  );

  return (
    <section className="center container-xl">
      <SEO title={`${department} - Labconnect`} description={`${department} page on labconnect`} />
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
