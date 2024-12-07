import React, { useState, useEffect } from "react";

const Staff = () => {
  const [staff, setStaff] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    search: "",
    role: "All",
    department: "All",
  });
  const [selectedMember, setSelectedMember] = useState(null);

  const fetchStaff = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_SERVER}/staff`);
      if (!response.ok) throw new Error("Failed to fetch staff.");
      const data = await response.json();
      setStaff(data.staff);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const resetFilters = () => {
    setFilters({
      search: "",
      role: "All",
      department: "All",
    });
  };

  const filteredStaff = staff.filter((member) => {
    if (filters.role !== "All" && member.role !== filters.role) return false;
    if (filters.department !== "All" && member.department !== filters.department) {
      return false;
    }
    if (filters.search && !member.name.toLowerCase().includes(filters.search.toLowerCase())) {
      return false;
    }
    return true;
  });

  const selectStaffMember = (id) => {
    const member = staff.find((member) => member.id === id);
    if (member) {
      setSelectedMember(member);
    }
  };

  useEffect(() => {
    fetchStaff();
  }, []);

  return (
    <div>
      <h2>Staff Directory</h2>

      <section className="filter-section">
        <input
          type="text"
          name="search"
          placeholder="Search staff"
          value={filters.search}
          onChange={handleFilterChange}
        />
        <select name="role" value={filters.role} onChange={handleFilterChange}>
          <option value="All">All Roles</option>
          <option value="Professor">Professor</option>
          <option value="Assistant">Assistant</option>
          <option value="Researcher">Researcher</option>
        </select>
        <select name="department" value={filters.department} onChange={handleFilterChange}>
          <option value="All">All Departments</option>
          <option value="Computer Science">Computer Science</option>
          <option value="Biology">Biology</option>
          <option value="Physics">Physics</option>
        </select>
        <button onClick={resetFilters}>Reset Filters</button>
      </section>

      {loading && <p>Loading staff data...</p>}
      {error && <p>Error: {error}</p>}

      <ul>
        {filteredStaff.map((member) => (
          <li key={member.id}>
            <button onClick={() => selectStaffMember(member.id)}>
              {member.name} - {member.role}
            </button>
          </li>
        ))}
      </ul>

      {selectedMember && (
        <section className="staff-details">
          <h3>{selectedMember.name}</h3>
          <p>
            <strong>Role:</strong> {selectedMember.role}
          </p>
          <p>
            <strong>Department:</strong> {selectedMember.department}
          </p>
          <p>
            <strong>Description:</strong> {selectedMember.description || "No details available."}
          </p>
        </section>
      )}
    </div>
  );
};

export default Staff;
