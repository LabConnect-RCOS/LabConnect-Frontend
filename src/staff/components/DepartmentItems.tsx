import React from "react";
import LargeImageCard from "./LargeImageCard"; 

interface DepartmentItem {
  department_id: string;
  title: string;
  image: string;
}

interface DepartmentItemsProps {
  items: DepartmentItem[];
}

export default function DepartmentItems({ items }: DepartmentItemsProps) {
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
      {items.map(({ department_id, title, image }) => (
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
