import React from "react";
import { Link } from "react-router-dom";

interface DepartmentHeadingProps {
  name: string;
  description: string;
  image: string;
  website?: string;
}

export default function DepartmentHeading({ name, description, image, website }: DepartmentHeadingProps) {
  return (
    <div className="flex justify-center">
      <div className="flex flex-col lg:flex-row gap-5">
        <figure className="min-w-32 w-96 h-72 bg-base-100 shadow-xl rounded-md overflow-clip lg:min-w-96">
          <img src={image} alt={`${name} department`} />
        </figure>
        <h1>{name}</h1>
        <p>{description}</p>
        {website && <Link to={website} target="_blank">
          {website}
        </Link>}
      </div>
    </div>
  );
};
