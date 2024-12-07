import React, { useState, useEffect } from "react";

const Departments = () => {
  const [departments, setDepartments] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({ search: "", activeOnly: false });
  const departmentCache = new Map();

  const fetchDepartments = async () => {
    setLoading(true);
    setError("");
    try {
      if (departmentCache.has("departments")) {
        setDepartments(departmentCache.get("departments"));
        setLoading(false);
        return;
      }

      const response = await fetch(`${process.env.REACT_APP_BACKEND_SERVER}/departments`);
      if (!response.ok) throw new Error("Failed to fetch departments.");
      const data = await response.json();
      setDepartments(data.departments);
      departmentCache.set("departments", data.departments);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: name === "activeOnly" ? e.target.checked : value }));
  };

  const resetFilters = () => {
    setFilters({ search: "", activeOnly: false });
  };

  const filteredDepartments = departments.filter((dept) => {
    if (filters.activeOnly && !dept.active) return false;
    if (filters.search && !dept.name.toLowerCase().includes(filters.search.toLowerCase())) {
      return false;
    }
    return true;
  });

  useEffect(() => {
    fetchDepartments();
  }, []);

  return (
    <div>
      <h2>Departments</h2>
      <input
        type="text"
        name="search"
        placeholder="Search departments"
        value={filters.search}
        onChange={handleFilterChange}
      />
      <label>
        <input
          type="checkbox"
          name="activeOnly"
          checked={filters.activeOnly}
          onChange={handleFilterChange}
        />
        Active Only
      </label>
      <button onClick={resetFilters}>Reset Filters</button>
      {loading && <p>Loading departments...</p>}
      {error && <p>Error: {error}</p>}
      <ul>
        {filteredDepartments.map((dept) => (
          <li key={dept.id}>{dept.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default Departments;
