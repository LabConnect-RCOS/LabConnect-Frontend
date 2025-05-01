import React from "react";

interface JobPostProps {
  title: string;
  professor: string;
  id: string;
  location: string;
  season: string;
  year: string;
  onClick: (id: string) => void;
  active: boolean;
}

const JobPost = ({
  title,
  professor,
  id,
  location,
  season,
  year,
  onClick,
  active,
}: JobPostProps) => {
  return (
    <div className="job-post-header">
      <div className={`${active && "border-l-2 border-l-purple-600"}`} />
      <div
        onClick={() => {
          onClick(id);
        }}
        className="job-post-btn hover:bg-gray-100 p-1 rounded hover:cursor-pointer"
      >
        <h4 className="job-post-title">{title}</h4>
        <div className="">
          <h5 className="job-post-description">{professor}</h5>
          <h5 className="job-post-description">
            {location} · {season} {year}
          </h5>
        </div>
      </div>
    </div>
  );
};

export default JobPost;
