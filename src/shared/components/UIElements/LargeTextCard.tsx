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
      <div className="lg-txt-card card card-compact hover:shadow-md">
        <div className="card-body">
          <h2
            className={`${title.length > 100 ? "text-sm" : "text-lg font-bold"
              }  p-0 m-0`}
          >
            {title}
          </h2>
          <p className="card2-body">Due {due}</p>
          {pay && <p className="card2-body">Pay ${pay}</p>}
          {credits && <p className="card2-body">{credits}</p>}
        </div>
      </div>
    </Link>
  );
};

export default LargeTextCard;
