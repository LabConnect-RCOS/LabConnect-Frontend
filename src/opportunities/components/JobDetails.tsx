import React from "react";
import AboutSection from "./AboutSection";
import JobHeader from "./JobHeader";
import JobDescription from "./JobDescription";

interface JobDetailsProps {
  name: string;
  authors: string;
  description: string;
  authorProfile: string;
  aboutSection: AboutItem[];
  recommended_experience: string;
}

const JobDetails = ({
  name,
  authors,
  description,
  authorProfile,
  aboutSection,
  recommended_experience,
}: JobDetailsProps) => {
  {authorProfile = (authorProfile === "") ? "https://cdn-icons-png.flaticon.com/512/1077/1077114.png" : authorProfile;}

  return (
    <article className="job-details-header">
      <JobHeader
        title={name}
        author={authors}
        img={authorProfile}
      />
      <AboutSection aboutSection={aboutSection} />
      <JobDescription
        description={`${
          description ? description : "No description available."
        }`}
      />

      <JobDescription
        title="Recommended Experience"
        description={`${
          recommended_experience
            ? recommended_experience
            : "No recommended experience available."
        }`}
      />
    </article>
  );
};

export default JobDetails;
