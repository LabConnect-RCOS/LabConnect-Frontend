import React, { useState } from "react";
import JobDetails from "../components/JobDetails";
import { useParams } from "react-router";
import { useEffect } from "react";
import fetchOpportunity from "../../fetches/fetchOpportunity.tsx";

const IndividualPost = () => {
  const { id } = useParams();

  var [details, setDetails] = useState<string | getOpportunityData>("Searching");

  useEffect(() => {
    fetchOpportunity({setDetails, id});
  });

  return (
    <div>
      {details === "Searching" ? (
        <span className="loading loading-spinner loading-lg" />
      ) : details === "Nothing found" ? (
        <p>No post found</p>
      ) : (
        <JobDetails {...details as getOpportunityData } />
      )}
    </div>
  );
};

export default IndividualPost;
