import React, { useEffect, useState } from "react";
import JobPost from "./JobPost";
import JobDetails from "./JobDetails";

const DUMMY_DATA = [
  {
    title: "Software Engineer",
    description: "Develop software solutions",
    author: "John Smith",
    id: "u1",
    location: "CII",
    season: "Spring",
    year: 2024,
    department: "Computer Science",
    deadline: "July 1, 2024, 12pm",
    experience: "2+ years in React.js and Node.js",
    salary: 50,
    isRemote: true,
    isOpen: true,
  },
  {
    title: "Biology Researcher",
    description: "Conduct biology research",
    author: "Jane Doe",
    id: "u2",
    location: "Bio Lab",
    season: "Spring",
    year: 2024,
    department: "Biology",
    deadline: "July 15, 2024, 12pm",
    experience: "1+ year in microbiology research",
    salary: 30,
    isRemote: false,
    isOpen: false,
  },
];

const PostsField = ({ activeId, setActive, opportunities = DUMMY_DATA }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [sortOrder, setSortOrder] = useState("title");
  const [activeOpportunity, setActiveOpportunity] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 2;

  const fetchOpportunity = async (id) => {
    setLoading(true);
    const url = `${process.env.REACT_APP_BACKEND_SERVER}/getOpportunity/${id}`;
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error("Error fetching opportunity");
      const data = await response.json();
      setActiveOpportunity(data.data);
    } catch (err) {
      setError(err.message);
      setActiveOpportunity(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (activeId) fetchOpportunity(activeId);
  }, [activeId]);

  useEffect(() => {
    let filtered = opportunities.filter((job) =>
      job.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    filtered.sort((a, b) => {
      if (sortOrder === "title") return a.title.localeCompare(b.title);
      if (sortOrder === "deadline") return new Date(a.deadline) - new Date(b.deadline);
    });
    setFilteredJobs(filtered);
  }, [searchTerm, sortOrder, opportunities]);

  const handleSearch = (e) => setSearchTerm(e.target.value);

  const handleSort = (e) => setSortOrder(e.target.value);

  const totalPages = Math.ceil(filteredJobs.length / itemsPerPage);
  const paginatedJobs = filteredJobs.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page) => setCurrentPage(page);

  return (
    <div className="postsfield-container">
      <div className="filter-controls">
        <input
          type="text"
          placeholder="Search jobs..."
          value={searchTerm}
          onChange={handleSearch}
          className="search-input"
        />
        <select value={sortOrder} onChange={handleSort} className="sort-dropdown">
          <option value="title">Sort by Title</option>
          <option value="deadline">Sort by Deadline</option>
        </select>
      </div>

      <div className="job-list">
        {paginatedJobs.map((job) => (
          <JobPost
            key={job.id}
            active={job.id === activeId}
            onClick={setActive}
            {...job}
          />
        ))}
      </div>

      <div className="pagination-controls">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            className={`pagination-btn ${currentPage === page ? "active" : ""}`}
            onClick={() => handlePageChange(page)}
          >
            {page}
          </button>
        ))}
      </div>

      <div className="job-details">
        {loading && <p>Loading...</p>}
        {error && <p className="error-message">{error}</p>}
        {activeOpportunity ? (
          <JobDetails {...activeOpportunity} />
        ) : (
          activeId && <p>No Opportunity Found.</p>
        )}
      </div>
    </div>
  );
};

export default PostsField;
