import React, { useState, useEffect } from "react";
import LargeTextCard from "./LargeTextCard";
import PropTypes from "prop-types";

const ProfileOpportunities = ({ id }) => {
  const [opportunities, setOpportunities] = useState([]);
  const [filteredOpportunities, setFilteredOpportunities] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortType, setSortType] = useState("title");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [error, setError] = useState(null);

  const fetchOpportunities = async () => {
    try {
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
    } catch (err) {
      setError(err.message);
      return null;
    }
  };

  const setData = async () => {
    const response = await fetchOpportunities();
    if (response) {
      setOpportunities(response);
      setFilteredOpportunities(response);
    } else {
      setOpportunities("no response");
    }
  };

  useEffect(() => {
    setData();
  }, []);

  useEffect(() => {
    let results = opportunities;
    if (searchTerm) {
      results = opportunities.filter((opportunity) =>
        opportunity.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    if (sortType === "title") {
      results.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortType === "due") {
      results.sort((a, b) => new Date(a.due) - new Date(b.due));
    }
    setFilteredOpportunities(results);
  }, [searchTerm, sortType, opportunities]);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSort = (event) => {
    setSortType(event.target.value);
  };

  const handlePagination = (page) => {
    setCurrentPage(page);
  };

  const totalPages = Math.ceil(filteredOpportunities.length / itemsPerPage);
  const paginatedOpportunities = filteredOpportunities.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const opportunityList = (
    <div className="flex gap-2 flex-wrap">
      {id &&
        paginatedOpportunities &&
        paginatedOpportunities.map((opportunity) => (
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

  const paginationControls = (
    <div className="pagination-controls">
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <button
          key={page}
          className={`pagination-btn ${
            currentPage === page ? "active" : ""
          }`}
          onClick={() => handlePagination(page)}
        >
          {page}
        </button>
      ))}
    </div>
  );

  return (
    <div>
      <h1>Posted Opportunities</h1>
      {error && <p className="error-message">{error}</p>}
      {opportunities === "no response" && <p>No Opportunities Found</p>}
      {opportunities !== "no response" && (
        <>
          <div className="controls">
            <input
              type="text"
              placeholder="Search by title"
              value={searchTerm}
              onChange={handleSearch}
              className="search-input"
            />
            <select
              value={sortType}
              onChange={handleSort}
              className="sort-dropdown"
            >
              <option value="title">Sort by Title</option>
              <option value="due">Sort by Due Date</option>
            </select>
          </div>
          {opportunities ? opportunityList : <p>Loading...</p>}
          {paginationControls}
        </>
      )}
    </div>
  );
};

ProfileOpportunities.propTypes = {
  id: PropTypes.string.isRequired,
};

export default ProfileOpportunities;
