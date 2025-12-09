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
    <div className="font-light flex flex-col gap-5 p-8 rounded-2xl shadow-lg bg-gradient-to-br from-white to-gray-50 border border-gray-200 max-w-xl transition-transform hover:scale-[1.01] duration-200">
      {/* Name */}
      <h2 className="font-extrabold text-4xl md:text-5xl text-gray-900 tracking-tight drop-shadow-sm bg-gradient-to-r from-blue-600 to-violet-600 text-transparent bg-clip-text">{name}</h2>

      {/* Department */}
      <h5 className="text-gray-700 text-lg font-semibold">{department}</h5>

      {/* Pronouns */}
      {pronouns && (<span className="text-gray-700 text-sm font-medium bg-blue-100 px-3 py-1 rounded-full w-fit shadow-sm">{pronouns}</span>)}

      {/* Description */}
      <p className="text-gray-800 leading-relaxed text-base bg-white/60 p-3 rounded-xl shadow-sm">{description}</p>

      {/* Website */}
      {Boolean(website) && (
        <Link
          to={website!}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 underline underline-offset-2 hover:text-blue-800 transition-colors w-fit font-medium"
        >
          🌐 Visit Website →
        </Link>
      )}
    </div>
  );
}
