import React from "react";
import JobHeader from "./JobHeader";
import JobDescription from "./JobDescription";

interface JobDetailsProps {
  name: string;
  author: string;
  department: string;
  description: string;
  authorProfile: string;
  recommended_experience: string;
}

const JobDetails = ({
  name,
  author,
  department,
  description,
  authorProfile,
  recommended_experience,
}: JobDetailsProps) => {
  return (
    <article className="w-full col-span-7 border-l border-r p-24 flex flex-col gap-5 shadow-sm">
      <JobHeader
        title={name}
        author={author}
        img={authorProfile}
        department={department}
      />
      <JobDescription
        description={`${description ? description : "No description available."
          }`}
      />

      <JobDescription
        title="Recommended Experience"
        description={`${recommended_experience
            ? recommended_experience
            : "No recommended experience available."
          }`}
      />
    </article>
  );
};

export default JobDetails;
