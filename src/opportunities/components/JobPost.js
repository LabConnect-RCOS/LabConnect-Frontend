import React from "react";

const JobPost = ({
  title,
  professor,
  id,
  location,
  season,
  year,
  department,
  deadline,
  experience,
  salary,
  isRemote,
  isOpen,
  onClick,
  active,
  additionalInfo,
}) => {
  const renderStatus = () => {
    if (isOpen) {
      return <span className="status-open">Open</span>;
    }
    return <span className="status-closed">Closed</span>;
  };

  const renderAdditionalInfo = () => {
    if (additionalInfo && additionalInfo.length > 0) {
      return (
        <ul className="additional-info-list">
          {additionalInfo.map((info, index) => (
            <li key={index} className="additional-info-item">
              {info}
            </li>
          ))}
        </ul>
      );
    }
    return null;
  };

  const applyNowHandler = () => {
    alert(`Applied to ${title} successfully!`);
  };

  const shareJobHandler = () => {
    alert(`Shared the job: ${title}`);
  };

  const saveJobHandler = () => {
    alert(`Saved the job: ${title}`);
  };

  return (
    <div
      className={`job-post-container ${active ? "active-job" : ""}`}
      onClick={() => onClick(id)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && onClick(id)}
      aria-pressed={active}
    >
      <div className="job-post-header">
        <h2 className="job-post-title">{title}</h2>
        <div className="job-status">{renderStatus()}</div>
      </div>

      <div className="job-post-body">
        <p className="job-post-professor">
          <strong>Professor:</strong> {professor}
        </p>
        <p className="job-post-meta">
          <strong>Location:</strong> {location} · {season} {year}
        </p>
        <p className="job-post-department">
          <strong>Department:</strong> {department}
        </p>
        <p className="job-post-deadline">
          <strong>Application Deadline:</strong> {deadline}
        </p>
        <p className="job-post-experience">
          <strong>Required Experience:</strong> {experience || "Not specified"}
        </p>
        {salary && (
          <p className="job-post-salary">
            <strong>Salary:</strong> ${salary}/hour
          </p>
        )}
        {isRemote !== undefined && (
          <p className="job-post-remote">
            <strong>Remote:</strong> {isRemote ? "Yes" : "No"}
          </p>
        )}
        {renderAdditionalInfo()}
      </div>

      <div className="job-post-actions">
        <button
          className="apply-button bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          onClick={applyNowHandler}
        >
          Apply Now
        </button>
        <button
          className="details-button bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          onClick={() => alert(`More details for ${title}`)}
        >
          More Details
        </button>
        <button
          className="share-button bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600"
          onClick={shareJobHandler}
        >
          Share Job
        </button>
        <button
          className="save-button bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
          onClick={saveJobHandler}
        >
          Save Job
        </button>
      </div>

      <div className="job-post-footer">
        <p>
          <strong>Note:</strong> For more information, visit our{" "}
          <a
            href="https://careers.example.com"
            target="_blank"
            rel="noopener noreferrer"
            className="job-post-link"
          >
            Careers Page
          </a>
        </p>
      </div>
    </div>
  );
};

export default JobPost;
