import React from "react";
import { Link } from "react-router-dom";

interface BreadcrumbProps {
  tree: Shape[];
}

interface Shape {
  link: string;
  title: string;
}

const Breadcrumb = ({ tree }: BreadcrumbProps) => {
  return (
    <div className="text-sm breadcrumbs">
      <ul>
        {tree.map((item: Shape) => {
          return (
            <li key={item.link}>
              <Link to={item.link}>{item.title}</Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Breadcrumb;
