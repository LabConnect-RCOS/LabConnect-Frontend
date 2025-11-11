import React from "react";
import LargeImageCard from "./LargeImageCard";

const departmentItems = [
  {
    department_id: "computer-science",
    title: "Computer Science",
    image: "Computer\ Science.jpeg",
  },
  {
    department_id: "biology",
    title: "Biology",
    image: "Biology.jpg",
  },
  {
    department_id: "materials-engineering",
    title: "Materials Engineering",
    image: "Materials\ Science.jpg",
  },
  {
    department_id: "environmental-engineering",
    title: "Environmental Engineering",
    image: "Environmental\ Engineering.jpg",
  },
  {
    department_id: "math",
    title: "Mathematics",
    image: "Math.jpg",
  },
  {
    department_id: "mechanical-aerospace-nuclear",
    title: "Mechanical, Aerospace, and Nuclear Engineering",
    image: "Mechanical-Nuclear.jpg",
  },
];

export default function DepartmentItems() {
  return (
    <div
      className="
        grid 
        gap-12 
        sm:grid-cols-2 
        lg:grid-cols-3 
        xl:grid-cols-4 
        justify-items-center
        px-6 
        py-8
      "
    >
      {departmentItems.map(({ department_id, title, image }) => (
        <LargeImageCard
          key={department_id}
          to={`/staff/department/${department_id}`}
          title={title}
          image={image}
        />
      ))}
    </div>
  );
}
