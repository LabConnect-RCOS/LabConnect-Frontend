import React from "react";

const JobDescription = ({ title, description }: { title?: string, description: string }) => {
  return (
    <article className="flex flex-col gap-2">
      <div className="font-extrabold text-xl">{title || "Role Description"}</div>

      <div className="text-gray-700">{description}</div>
    </article>
  );
};

export default JobDescription;
