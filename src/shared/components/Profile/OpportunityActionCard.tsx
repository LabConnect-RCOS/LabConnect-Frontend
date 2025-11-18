import React from "react";
import { Link } from "react-router-dom";

interface OpportunityActionCardProps {
  editPath: string;
  title: string;
  body: React.ReactNode;
  id: string;
  activeStatus: string;
  changeActiveStatus: (id: string, activeStatus: string) => void;
  deleteOpp: (id: string) => void;
}

const OpportunityActionCard: React.FC<OpportunityActionCardProps> = ({
  editPath,
  title,
  body,
  id,
  activeStatus,
  changeActiveStatus,
  deleteOpp,
}) => {
  const truncatedTitle =
    title.length > 100 ? title.slice(0, 150) + "..." : title;

  const isActive =
    activeStatus === "true" ||
    activeStatus === "active" ||
    activeStatus === "1";

  const statusColor = isActive ? "btn-success" : "btn-warning";
  const statusLabel = isActive ? "Deactivate" : "Activate";

  return (
    <div className="card w-72 bg-white shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 rounded-2xl">
      <div className="card-body p-5 space-y-4">
        
        {/* Title */}
        <h2 className="text-lg font-semibold text-gray-900 leading-snug line-clamp-2">
          {truncatedTitle}
        </h2>

        {/* Body */}
        <p className="text-sm text-gray-600 line-clamp-3">{body}</p>

        {/* Divider */}
        <div className="border-t border-gray-200"></div>

        {/* Actions */}
        <div className="flex flex-wrap justify-between items-center gap-2 pt-1">

          <Link to={editPath}>
            <button className="btn btn-sm btn-primary rounded-full px-4 shadow-none hover:shadow">
              Edit
            </button>
          </Link>

          <button
            className={`btn btn-sm rounded-full px-4 shadow-none hover:shadow ${statusColor}`}
            onClick={() => changeActiveStatus(id, activeStatus)}
          >
            {statusLabel}
          </button>

          <button
            className="btn btn-sm btn-error rounded-full px-4 shadow-none hover:shadow"
            onClick={() => deleteOpp(id)}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default OpportunityActionCard;
