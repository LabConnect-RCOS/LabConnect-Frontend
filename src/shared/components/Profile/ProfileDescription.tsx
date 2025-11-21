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
    <div className="font-light flex flex-col gap-3 leading-relaxed max-w-xl">
      {/* Name */}
      <h2 className="font-extrabold text-4xl md:text-5xl text-gray-900">
        {name}
      </h2>

      {/* Department */}
      <h5 className="text-gray-700 text-lg">{department}</h5>

      {/* Pronouns */}
      {pronouns && (
        <h5 className="text-gray-600 italic text-sm">{pronouns}</h5>
      )}

      {/* Description */}
      <p className="text-gray-800 text-base">
        {description}
      </p>

      {/* Website */}
      {Boolean(website) && (
        <Link
          to={website!}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 underline underline-offset-2 hover:text-blue-800 transition-colors w-fit"
        >
          Visit Website →
        </Link>
      )}
    </div>
  );
}
