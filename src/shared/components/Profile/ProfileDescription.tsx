import React from "react";
import { Link } from "react-router-dom";
import { Profile } from "../../../types/profile.ts";

export default function ProfileDescription({
  name,
  department,
  description,
  website,
  pronouns
}: Profile) {
  return (
    <div className="font-light flex flex-col gap-4 p-6 rounded-2xl shadow-sm bg-white border border-gray-100 max-w-xl">
      {/* Name */}
      <h2 className="font-extrabold text-4xl md:text-5xl text-gray-900 tracking-tight">
        {name}
      </h2>

      {/* Department */}
      <h5 className="text-gray-700 text-lg font-medium">
        {department}
      </h5>

      {/* Pronouns */}
      {pronouns && (
        <span className="text-gray-600 italic text-sm bg-gray-100 px-2 py-1 rounded-md w-fit">
          {pronouns}
        </span>
      )}

      {/* Description */}
      <p className="text-gray-800 leading-relaxed text-base">
        {description}
      </p>

      {/* Website */}
      {Boolean(website) && (
        <Link
          to={website!}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 underline underline-offset-2 hover:text-blue-800 transition-colors w-fit font-medium"
        >
          Visit Website →
        </Link>
      )}
    </div>
  );
}
