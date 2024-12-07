import React, { useState } from "react";

const JobPost = ({
  title,
  professor,
  id,
  location,
  season,
  year,
  onClick,
  active,
  tags = [],
  description = "",
  isRemote = false,
  applicationDeadline = null,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  const toggleDetails = () => {
    setShowDetails((prev) => !prev);
  };

  return (
    <div
      className={`job-post-container ${
        active ? "border-l-4 border-l-purple-600" : "border-l-2 border-l-gray-300"
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        onClick={() => onClick(id)}
        className={`job-post-btn hover:bg-gray-100 p-3 rounded-md hover:cursor-pointer ${
          isHovered ? "shadow-md" : ""
        }`}
      >
        <h4 className="job-post-title font-bold">{title}</h4>
        <div className="job-post-info">
          <h5 className="job-post-description text-sm text-gray-600">{professor}</h5>
          <h5 className="job-post-description text-sm text-gray-500">
            {location} · {season} {year}
            {isRemote && <span className="text-green-500"> (Remote)</span>}
          </h5>
          {applicationDeadline && (
            <h5 className="job-post-description text-sm text-red-500">
              Apply by: {new Date(applicationDeadline).toLocaleDateString()}
            </h5>
          )}
        </div>
      </div>

      <div className="job-post-tags flex gap-2 mt-2">
        {tags.length > 0 &&
          tags.map((tag, index) => (
            <span
              key={index}
              className="bg-blue-100 text-blue-600 px-2 py-1 rounded-full text-xs"
            >
              {tag}
            </span>
          ))}
      </div>

      <button
        onClick={toggleDetails}
        className="mt-2 text-sm text-purple-600 underline hover:text-purple-800"
      >
        {showDetails ? "Hide Details" : "View Details"}
      </button>

      {showDetails && (
        <div className="job-post-details mt-2 p-3 border rounded-md bg-gray-50">
          <p className="text-gray-700 text-sm">{description || "No additional details available."}</p>
        </div>
      )}
    </div>
  );
};

export default JobPost;
