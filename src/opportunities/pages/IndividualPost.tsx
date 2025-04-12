import React, { useState } from "react";
import JobDetails from "../components/JobDetails";
import { useParams } from "react-router";
import { useEffect } from "react";
import fetchOpportunity from "../../fetches/fetchOpportunity.tsx";

const IndividualPost = () => {
  const { id } = useParams();

  var [opportunity, setOpportunity] = useState<string | opportunityData>("Searching");

  useEffect(() => {
    fetchOpportunity({setOpportunity, id});
  }, [id]);

  return (
    <div>
      {opportunity === "Searching" ? (
        <span className="loading loading-spinner loading-lg" />
      ) : opportunity === "Nothing found" ? (
        <p>No post found</p>
      ) : (
        <JobDetails {...opportunity as opportunityData } />
      )}
    </div>
  );
};

export default IndividualPost;
