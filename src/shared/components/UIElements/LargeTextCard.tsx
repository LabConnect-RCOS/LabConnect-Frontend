import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const LargeTextCard = ({ to, title, due, pay, credits }) => {
  return (
    <Link to={to} className="no-underline">
      <div className="lg-txt-card hover:shadow-md card">
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

LargeTextCard.propTypes = {
  to: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  due: PropTypes.string.isRequired,
  pay: PropTypes.string,
  credits: PropTypes.string,
};

export default LargeTextCard;
