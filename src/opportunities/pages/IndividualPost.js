import React, { useState } from "react";
import JobDetails from "../components/JobDetails";
import { useParams } from "react-router";
import { useEffect } from "react";

const IndividualPost = () => {
  const { postID } = useParams();
  const [details, setDetails] = useState("Searching");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [retryCount, setRetryCount] = useState(0);

  const DUMMY_DATA = [
    {
      title: "Software Engineer",
      description: "Lorem Ipsum",
      author: "John Smith",
      id: "u1",
      authorProfile:
        "https://thedailyq.org/wp-content/uploads/2018/02/H-Menge-Torsten-900x600.jpg",
      department: "Computer Science",
      aboutSection: [
        {
          title: "Application Deadline",
          description: "July 1, 2024, 12pm",
        },
        {
          title: "Salary",
          description: "$100,000/year",
        },
      ],
    },
    {
      title: "Biology Researcher",
      description: "Lorem Ipsum",
      author: "Turner",
      id: "u2",
      authorProfile:
        "https://thedailyq.org/wp-content/uploads/2018/02/H-Menge-Torsten-900x600.jpg",
      department: "Biology",
      aboutSection: [
        {
          title: "Application Deadline",
          description: "July 1, 2024, 12pm",
        },
        {
          title: "Salary",
          description: "$80,000/year",
        },
      ],
    },
  ];

  const fetchOpportunities = async () => {
    const baseURL = `${process.env.REACT_APP_BACKEND_SERVER}`;
    const url = `${baseURL}/getOpportunity/${postID}`;

    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error("Failed to fetch opportunity details.");
      const data = await response.json();
      return data["data"];
    } catch (err) {
      if (retryCount < 3) {
        setRetryCount((prev) => prev + 1);
        return fetchOpportunities();
      }
      setError(err.message);
      return null;
    }
  };

  const handleDummyData = (id) => {
    const foundData = DUMMY_DATA.find((item) => item.id === id);
    if (!foundData) return "No data found in dummy list";
    return foundData;
  };

  const loadData = async () => {
    setLoading(true);
    setError(null);
    const data = await fetchOpportunities();
    if (!data) {
      const fallbackData = handleDummyData(postID);
      setDetails(fallbackData);
    } else {
      setDetails(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, [postID]);

  const retryFetch = () => {
    setRetryCount(0);
    loadData();
  };

  const renderAboutSection = (sections) => {
    return (
      <ul>
        {sections.map((section, index) => (
          <li key={index}>
            <strong>{section.title}:</strong> {section.description}
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div>
      {loading ? (
        <span className="loading loading-spinner loading-lg" />
      ) : error ? (
        <div>
          <p>Error: {error}</p>
          <button onClick={retryFetch}>Retry</button>
        </div>
      ) : details === "Nothing found" ? (
        <p>No post found</p>
      ) : (
        <div>
          <JobDetails {...details} />
          {details.aboutSection && renderAboutSection(details.aboutSection)}
        </div>
      )}
    </div>
  );
};

export default IndividualPost;
