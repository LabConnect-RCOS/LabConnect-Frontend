import React, { useState, useEffect } from "react";
import JobsNavigation from "../components/JobsNavigation";
import Posts from "../components/Posts";
import SavedJobs from "../components/SavedJobs";
import PageNavigation from "../../shared/components/Navigation/PageNavigation";
import usePageNavigation from "../../shared/hooks/page-navigation-hook";

const DUMMY_JOBS = [
  {
    id: "j1",
    title: "Frontend Developer",
    description: "Develop engaging user interfaces.",
    saved: true,
  },
  {
    id: "j2",
    title: "Backend Engineer",
    description: "Work on server-side logic.",
    saved: false,
  },
  {
    id: "j3",
    title: "Full Stack Developer",
    description: "Combine front and back-end skills.",
    saved: false,
  },
];

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [filters, setFilters] = useState({
    search: "",
    savedOnly: false,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchJobs = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_SERVER}/jobs`);
      if (!response.ok) throw new Error("Failed to fetch jobs.");
      const data = await response.json();
      setJobs(data.jobs);
    } catch (err) {
      setError(err.message);
      setJobs(DUMMY_JOBS); // Fallback to dummy jobs
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: name === "savedOnly" ? e.target.checked : value,
    }));
  };

  const resetFilters = () => {
    setFilters({
      search: "",
      savedOnly: false,
    });
  };

  const filteredJobs = jobs.filter((job) => {
    if (filters.savedOnly && !job.saved) return false;
    if (filters.search && !job.title.toLowerCase().includes(filters.search.toLowerCase())) {
      return false;
    }
    return true;
  });

  var [pages, switchPage] = usePageNavigation(["Search", "Saved"], "Search");

  useEffect(() => {
    fetchJobs();
  }, []);

  return (
    <section className="flex flex-col gap-3">
      <PageNavigation title="Jobs" pages={pages} switchPage={switchPage} />

      <section className="filter-section">
        <input
          type="text"
          name="search"
          placeholder="Search Jobs"
          value={filters.search}
          onChange={handleFilterChange}
        />
        <label>
          <input
            type="checkbox"
            name="savedOnly"
            checked={filters.savedOnly}
            onChange={handleFilterChange}
          />
          Show Saved Only
        </label>
        <button onClick={resetFilters}>Reset Filters</button>
      </section>

      {loading ? (
        <p>Loading jobs...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        <section className="jobs-list">
          {filteredJobs.map((job) => (
            <Posts key={job.id} {...job} />
          ))}
        </section>
      )}
    </section>
  );
};

export default Jobs;
