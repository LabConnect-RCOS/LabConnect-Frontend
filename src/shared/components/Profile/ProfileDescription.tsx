import React from "react";
import { Link } from "react-router-dom";
import { Profile } from "../../../types/profile.ts";

export default function ProfileDescription({
  name, department, description, website, pronouns
}: Profile) {
  return (
    <div className="font-light flex2 gap-2">
      <h2 className="font-extrabold text-5xl">{name}</h2>
      <h5 className="text-gray-700">{department}</h5>
      {pronouns && <h5 className="text-gray-700">{pronouns}</h5>}
      <p>{description}</p>
      {website && website.length && (
        <Link to={website} target="_blank">
          {website}
        </Link>
      )}
    </div>
  );
};