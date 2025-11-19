import React from "react";
import { Link } from "react-router-dom";
import { Profile } from "../../../types/profile.ts";

export default function ProfileDescription({
  name,
  department,
  description,
  website,
  pronouns,
}: Profile) {
  return (
    <div
      className="font-light flex flex-col gap-2
                 text-gray-900 dark:text-gray-100
                 dark:[&_h2]:text-gray-100
                 dark:[&_h5]:text-gray-300
                 dark:[&_p]:text-gray-200
                 dark:[&_a]:text-sky-300
                 dark:[&_a:hover]:text-sky-200
                 dark:[&_a]:underline
                 transition-colors duration-300"
    >
      <h2 className="font-extrabold text-5xl">{name}</h2>
      <h5 className="text-gray-700 dark:text-gray-300">{department}</h5>
      {pronouns && <h5 className="text-gray-700 dark:text-gray-300">{pronouns}</h5>}
      <p className="text-gray-800 dark:text-gray-200">{description}</p>
      {website && website.length > 0 && (
        <Link
          to={website}
          target="_blank"
          className="text-blue-600 hover:text-blue-700 dark:text-sky-300 dark:hover:text-sky-200 underline"
        >
          {website}
        </Link>
      )}
    </div>
  );
}
