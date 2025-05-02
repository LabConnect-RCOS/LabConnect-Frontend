import React from "react";
import { Link } from "react-router-dom";

interface LargeTextCardProps {
  to: string;
  title: string;
  due: string;
  pay?: string;
  credits?: string;
}

const LargeTextCard = ({ to, title, due, pay, credits }: LargeTextCardProps) => {
  return (
    <Link to={to} className="no-underline">
      <div className="min-h-48 max-h-48 duration-300 w-56 p-1 bg-base-100 card card-compact hover:shadow-md">
        <div className="card-body">
          <h2
            className={`${title.length > 100 ? "text-sm" : "text-lg font-bold"
              }  p-0 m-0`}
          >
            {title}
          </h2>
          <p className="text-sm font-light p-0 m-0">Due {due}</p>
          {pay && <p className="text-sm font-light p-0 m-0">Pay ${pay}</p>}
          {credits && <p className="text-sm font-light p-0 m-0">{credits}</p>}
        </div>
      </div>
    </Link>
  );
};

export default LargeTextCard;
