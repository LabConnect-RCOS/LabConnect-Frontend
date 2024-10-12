import React from "react";
import LargeTextCard from "./LargeTextCard";
import PropTypes from "prop-types";
import { useState, useEffect } from "react";

const ProfileOpportunities = ({ id }) => {
  var [opportunities, setOpportunities] = useState(false);

  const fetchOpportunities = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_SERVER}/staff/opportunities/${id}`
    );

    if (!response.ok) {
      throw new Error(
        `Network response was not ok - Status: ${response.status}`
      );
    }

    const data = await response.json();
    return data["data"];
  };

  async function setData() {
    const response = await fetchOpportunities();
    if (response) {
      setOpportunities(response);
    } else {
      setOpportunities("no response");
    }
  }

  useEffect(() => {
    setData();
  }, []);

  var opportunityList = (
    <div className="flex gap-2 flex-wrap">
      {id &&
        opportunities &&
        typeof opportunities === "object" &&
        opportunities.map((opportunity) => (
          <LargeTextCard
            to={`/post/${opportunity.id}`}
            title={opportunity.title}
            due={opportunity.due}
            pay={opportunity.pay}
            credits={opportunity.credits}
            key={opportunity.id}
          />
        ))}
    </div>
  );

  return (
    <div>
      <h1>Posted Opportunties</h1>
      {opportunities ? opportunityList : "Loading..."}
      {opportunities === "no response" && "No Opportunities Found"}
    </div>
  );
};
ProfileOpportunities.propTypes = {
  id: PropTypes.string.isRequired,
};

export default ProfileOpportunities;
