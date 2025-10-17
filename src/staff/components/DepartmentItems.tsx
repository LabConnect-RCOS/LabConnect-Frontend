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
    <div className="grid grid-cols-3" style={{ rowGap: "3rem" }}>
      {items.map((item) => (
        <LargeImageCard
          key={item.department_id}
          to={`/staff/department/${item.department_id}`}
          title={item.title}
          image={item.image}
        />
      ))}
    </div>
  );
};
