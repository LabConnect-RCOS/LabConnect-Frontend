import React, { useState } from "react";
import JobDetails from "../components/JobDetails";
import { useParams } from "react-router";
import { useEffect } from "react";

const IndividualPost = () => {
  const { postID } = useParams();

  const [details, setDetails] = useState<string | OpportunityData>("Searching");

  const fetchOpportunities = async () => {
    // Consider moving the base URL to a configuration
    const baseURL = `${import.meta.env.VITE_BACKEND_SERVER}`;
    const url = `${baseURL}/getOpportunity/${postID}`;

    const response = await fetch(url);

    if (!response.ok) {
      return false;
    }

    const data = await response.json();
    console.log(data);
    return data["data"];
  };

  async function findDetails() {
    const data = await fetchOpportunities();
    setDetails(data || "Nothing found");
  }

  useEffect(() => {
    findDetails();
  });

  return (
    <div>
      {details === "Searching" ? (
        <span className="loading loading-spinner loading-lg" />
      ) : details === "Nothing found" ? (
        <p>No post found</p>
      ) : (
        <JobDetails {...details as OpportunityData} />
      )}
    </div>
  );
};

export default IndividualPost;
