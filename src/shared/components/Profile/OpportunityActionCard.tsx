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
  const truncatedTitle = title.length > 100 ? title.slice(0, 150) + "..." : title;
  const isActive = activeStatus === "true" || activeStatus === "active" || activeStatus === "1";
  const statusColor = isActive ? "btn-success" : "btn-warning";
  const statusLabel = isActive ? "Deactivate" : "Activate";

  return (
    <div className="card w-72 bg-base-100 shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-200 rounded-2xl overflow-hidden">
      <div className="card-body p-4 space-y-3">
        {/* Title */}
        <h2 className="text-lg font-semibold text-gray-800 line-clamp-2">
          {truncatedTitle}
        </h2>

        {/* Body / Description */}
        <p className="text-sm text-gray-600 line-clamp-3">{body}</p>

        {/* Divider */}
        <div className="border-t border-gray-200 my-2"></div>

        {/* Actions */}
        <div className="flex flex-wrap justify-between items-center gap-2">
          {/* Edit Button */}
          <Link to={editPath}>
            <button className="btn btn-sm btn-primary rounded-full px-4">
              Edit
            </button>
          </Link>

          {/* Activate/Deactivate */}
          <button
            className={`btn btn-sm rounded-full px-4 ${statusColor}`}
            onClick={() => changeActiveStatus(id, activeStatus)}
          >
            {statusLabel}
          </button>

          {/* Delete Button */}
          <button
            className="btn btn-sm btn-error rounded-full px-4"
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
