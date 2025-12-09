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
  description,
  authorProfile,
  recommended_experience,
}: JobDetailsProps) => {
  return (
    <section>
      <article
        className="
          w-full max-w-4xl
          bg-white dark:bg-gray-900
          text-gray-900 dark:text-white
          rounded-2xl
          shadow-lg
          px-6 py-8 md:px-10 md:py-10
        "
      >
        <div className="flex gap-6 md:gap-10">
          {/* Accent vertical line */}
          <div className="" />

          <div className="flex-1 flex flex-col gap-6">
            <JobHeader
              title={name}
              author={author}
              img={authorProfile}
            />

            <JobDescription
              title="Role Description"
              description={
                description || "No description available."
              }
            />

            <JobDescription
              title="Recommended Experience"
              description={
                recommended_experience ||
                "No recommended experience available."
              }
            />
          </div>
        </div>
      </article>
    </section>
  );
};

export default JobDetails;
