import React, { useState, useEffect } from "react";
import JobDetails from "../components/JobDetails";
import { useParams } from "react-router-dom";

const IndividualPost = () => {
  const { postID } = useParams();

  const [details, setDetails] = useState<string | OpportunityData>("Searching");

  const fetchOpportunities = async () => {
    const baseURL = `${import.meta.env.VITE_BACKEND_SERVER}`;
    const url = `${baseURL}/getOpportunity/${postID}`;

    const response = await fetch(url);

    if (!response.ok) {
      return false;
    }

    const data = await response.json();
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
    <div
      className="min-h-screen flex items-center justify-center px-4 py-6
                 bg-gray-100 text-gray-900
                 dark:bg-[#1e293b] dark:text-gray-100 transition-colors duration-300"
    >
      {details === "Searching" ? (
        <div
          className="flex flex-col items-center gap-3 rounded-xl border p-8 shadow-sm
                     bg-white border-gray-200
                     dark:bg-[#283548] dark:border-gray-700"
        >
          <span className="loading loading-spinner loading-lg text-blue-600 dark:text-blue-400" />
          <p className="text-sm text-gray-600 dark:text-gray-300">
            Loading opportunity details…
          </p>
        </div>
      ) : details === "Nothing found" ? (
        <div
          className="mx-auto max-w-md rounded-xl border p-6 text-center shadow-sm
                     bg-white border-gray-200
                     dark:bg-[#283548] dark:border-gray-700"
        >
          <p className="text-gray-700 dark:text-gray-200">No post found</p>
        </div>
      ) : (
        <div
          className="w-full max-w-4xl rounded-xl border p-6 shadow-md
                     bg-white border-gray-200
                     dark:bg-[#283548] dark:border-gray-700"
        >
          <JobDetails {...(details as OpportunityData)} />
        </div>
      )}
    </div>
  );
};

export default IndividualPost;

