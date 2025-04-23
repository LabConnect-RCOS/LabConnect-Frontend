import React, { useState } from "react";


//Created a new interface to make displaying an opportunity easier, contains 9 fields

export interface Opportunity {
  name: string;
  description: string;
  recommended_experience: string;
  pay: number;
  semester: string;
  year: number;
  application_due: Date;
  location: string;
  professor: string
  // Add any other relevant information about an opportunity
}


// List of sample opportunities of type Opportunity

const sampleOpportunities: Opportunity[] = [
  {
    name: "Research Assistant - Machine Learning Lab",
    description: "Work on cutting-edge ML projects",
    recommended_experience: "Python, Machine Learning basics",
    pay: 15.00,
    semester: "Fall",
    year: 2024,
    application_due: new Date("2024-08-01"),
    location: "DCC",
    professor: "Dr. Emily Chen"
  },
  {
    name: "Data Visualization Intern - Data Science Center",
    description: "Create compelling visualizations for real-world datasets.",
    recommended_experience: "D3.js, Tableau, or Matplotlib",
    pay: 12.50,
    semester: "Spring",
    year: 2025,
    application_due: new Date("2025-01-15"),
    location: "EMPAC",
    professor: "Dr. Alan Green"
  },
  {
    name: "Undergraduate Researcher - Renewable Energy Lab",
    description: "Analyze energy efficiency of solar panel setups.",
    recommended_experience: "R, Excel, or energy systems knowledge",
    pay: 14.00,
    semester: "Summer",
    year: 2025,
    application_due: new Date("2025-04-30"),
    location: "Jonsson Engineering Center",
    professor: "Dr. Maria Santos"
  },
  {
    name: "AI in Healthcare Research Assistant",
    description: "Develop and test AI models for diagnostic tools.",
    recommended_experience: "Python, TensorFlow, basic healthcare knowledge",
    pay: 16.00,
    semester: "Fall",
    year: 2024,
    application_due: new Date("2024-07-20"),
    location: "Biotech Center",
    professor: "Dr. Raj Patel"
  },
  {
    name: "Human-Computer Interaction (HCI) Researcher",
    description: "Study user interfaces to improve accessibility.",
    recommended_experience: "HTML, CSS, JavaScript, Usability Testing",
    pay: 13.00,
    semester: "Spring",
    year: 2025,
    application_due: new Date("2025-01-10"),
    location: "Carnegie Building",
    professor: "Dr. Susan Miller"
  },
  {
    name: "Climate Modeling Research Intern",
    description: "Simulate climate patterns using advanced modeling techniques.",
    recommended_experience: "Python, MATLAB, or climate science coursework",
    pay: 14.50,
    semester: "Summer",
    year: 2025,
    application_due: new Date("2025-03-15"),
    location: "Troy Building",
    professor: "Dr. John Reynolds"
  },
  {
    name: "Cognitive Neuroscience Lab Assistant",
    description: "Support experiments on perception and memory.",
    recommended_experience: "Psychology, Statistics, or MATLAB",
    pay: 12.00,
    semester: "Fall",
    year: 2024,
    application_due: new Date("2024-09-01"),
    location: "Walker Lab",
    professor: "Dr. Lisa Ho"
  },
  {
    name: "Blockchain Applications Researcher",
    description: "Develop decentralized applications and smart contracts.",
    recommended_experience: "Solidity, JavaScript, or cryptography",
    pay: 15.00,
    semester: "Spring",
    year: 2025,
    application_due: new Date("2025-01-05"),
    location: "Lally School of Management",
    professor: "Dr. Mark Liu"
  },
  {
    name: "Sustainable Materials Engineering Intern",
    description: "Research new biodegradable polymers.",
    recommended_experience: "Chemistry, Material Science lab experience",
    pay: 14.25,
    semester: "Summer",
    year: 2025,
    application_due: new Date("2025-04-20"),
    location: "Materials Research Center",
    professor: "Dr. Angela Wright"
  },
  {
    name: "Quantum Computing Research Assistant",
    description: "Work on qubit error correction and simulation tools.",
    recommended_experience: "Quantum mechanics, Python, Qiskit",
    pay: 16.50,
    semester: "Fall",
    year: 2024,
    application_due: new Date("2024-08-15"),
    location: "JROWL",
    professor: "Dr. Nathan Kim"
  },
  {
    name: "Sociotechnical Systems Lab Intern",
    description: "Examine technology’s impact on social behavior. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quis sapien vitae purus accumsan facilisis at quis risus. Nulla sit amet orci imperdiet, mollis nisl in, posuere dolor. Phasellus sagittis vulputate quam sit amet ultricies. Fusce ultricies nisl id lectus ultricies fermentum. Donec ut justo feugiat, pellentesque nunc ut, finibus nulla. In a dolor tempor, egestas urna vitae, faucibus nunc.",
    recommended_experience: "Sociology, Data Analysis, or STS coursework",
    pay: 12.75,
    semester: "Spring",
    year: 2025,
    application_due: new Date("2025-01-25"),
    location: "Sage Labs",
    professor: "Dr. Chloe Rivera"
  },
  {
    name: "Game Design Research Assistant",
    description: "Prototype game mechanics for cognitive training.",
    recommended_experience: "Unity, C#, UX Design",
    pay: 13.50,
    semester: "Summer",
    year: 2025,
    application_due: new Date("2025-05-01"),
    location: "EMPAC Studio B",
    professor: "Dr. Raymond Scott"
  },
  {
    name: "Cybersecurity and Privacy Researcher",
    description: "Study attack vectors and encryption protocols. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quis sapien vitae purus accumsan facilisis at quis risus. Nulla sit amet orci imperdiet, mollis nisl in, posuere dolor. Phasellus sagittis vulputate quam sit amet ultricies. Fusce ultricies nisl id lectus ultricies fermentum. Donec ut justo feugiat, pellentesque nunc ut, finibus nulla. In a dolor tempor, egestas urna vitae, faucibus nunc.",
    recommended_experience: "Networking, C, or cybersecurity basics",
    pay: 15.25,
    semester: "Fall",
    year: 2024,
    application_due: new Date("2024-08-05"),
    location: "Ricketts Building",
    professor: "Dr. Heather Park"
  },
  {
    name: "Bioinformatics Lab Assistant",
    description: "Analyze genomic data using modern pipelines.",
    recommended_experience: "Python, R, or biology background",
    pay: 14.75,
    semester: "Spring",
    year: 2025,
    application_due: new Date("2025-02-01"),
    location: "CBIS",
    professor: "Dr. Felix Nguyen"
  },
  {
    name: "Smart Cities Initiative Intern",
    description: "Build interactive dashboards for city sensor data.",
    recommended_experience: "JavaScript, React, APIs",
    pay: 13.75,
    semester: "Summer",
    year: 2025,
    application_due: new Date("2025-04-10"),
    location: "Greene Building",
    professor: "Dr. Emily Zhao"
  }
];

const professorList = Array.from(new Set(sampleOpportunities.map(op => op.professor)));


// This component returns a 'list' of all the opportunities 

const OpportunitiesList = () => {
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [selectedOpportunity, setSelectedOpportunity] = useState<null | string>(null);
  const [savedOpportunities, setSavedOpportunities] = useState<Set<string>>(() => {
    const stored = localStorage.getItem("savedOpportunities");
    if (stored) {
      return new Set(JSON.parse(stored));
    }
    return new Set();
  });
  console.log("Loaded saved opportunities:", Array.from(savedOpportunities));

  
  const [viewSavedOnly, setViewSavedOnly] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const [showClearMessage, setShowClearMessage] = useState(false);


  const [professorFilter, setProfessorFilter] = useState<string>("All");

  const [expandedDescriptions, setExpandedDescriptions] = useState<Set<string>>(new Set());
  const [semesterFilter, setSemesterFilter] = useState<string>("All");
  const [viewMode, setViewMode] = useState<"table" | "card">("table");
  const [pinnedOpportunities, setPinnedOpportunities] = useState<Set<string>>(new Set());


  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  
  const getRowColor = (semester: string) => {
    switch (semester.toLowerCase()) {
      case "fall":
        return "bg-orange-50";
      case "spring":
        return "bg-green-50";
      case "summer":
        return "bg-blue-50";
      default:
        return "bg-white";
    }
  };

  const getSemesterBadge = (semester: string) => {
    const base = "text-xs px-2 py-0.5 rounded-full font-medium";
    switch (semester.toLowerCase()) {
      case "fall":
        return <span className={`${base} bg-orange-100 text-orange-800`}>Fall</span>;
      case "spring":
        return <span className={`${base} bg-green-100 text-green-800`}>Spring</span>;
      case "summer":
        return <span className={`${base} bg-blue-100 text-blue-800`}>Summer</span>;
      default:
        return <span className={`${base} bg-gray-100 text-gray-800`}>{semester}</span>;
    }
  };
  
  

  const toggleDescription = (name: string) => {
    setExpandedDescriptions(prev => {
      const updated = new Set(prev);
      if (updated.has(name)) {
        updated.delete(name);
      } else {
        updated.add(name);
      }
      return updated;
    });
  };
  

  const handleCopy = (op: Opportunity) => {
    const content = `Position: ${op.name}
  Location: ${op.location}
  Pay: $${op.pay}/hr
  Professor: ${op.professor}
  Recommended: ${op.recommended_experience}
  Due: ${op.application_due.toLocaleDateString()}`;
    navigator.clipboard.writeText(content).then(() => {
      alert("Opportunity details copied to clipboard!");
    });
  };
  

  const tooltipStyle = "relative group";
  const tooltipContent = "absolute hidden group-hover:block bg-black text-white text-xs rounded px-2 py-1 bottom-full mb-1 left-1/2 -translate-x-1/2 whitespace-nowrap z-10";


  const sortedOpportunities = [...sampleOpportunities].sort((a, b) =>
    sortOrder === "asc" ? a.pay - b.pay : b.pay - a.pay
  );

  const filteredOpportunities = sortedOpportunities
  .filter(op =>
    (!viewSavedOnly || savedOpportunities.has(op.name)) &&
    (professorFilter === "All" || op.professor === professorFilter) &&
    (semesterFilter === "All" || op.semester === semesterFilter) &&
    (
      op.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      op.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      op.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      op.professor.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

const pinned = filteredOpportunities.filter(op => pinnedOpportunities.has(op.name));
const unpinned = filteredOpportunities.filter(op => !pinnedOpportunities.has(op.name));
const displayList = [...pinned, ...unpinned];



  /**
 * Toggles save/unsave for an opportunity and syncs to localStorage
 * Persisted in JSON format as an array of strings
 */
  const toggleSave = (name: string) => {
    setSavedOpportunities(prev => {
      const updated = new Set(prev);
      if (updated.has(name)) {
        updated.delete(name);
      } else {
        updated.add(name);
      }

      localStorage.setItem("savedOpportunities", JSON.stringify(Array.from(updated)));
      return updated;

    });
  };

  const togglePin = (name: string) => {
    setPinnedOpportunities(prev => {
      const updated = new Set(prev);
      if (updated.has(name)) {
        updated.delete(name);
      } else {
        updated.add(name);
      }
      return updated;
    });
  };
  

  const resetFilters = () => {
    setSortOrder("asc");
    setSearchQuery("");
    setProfessorFilter("All");
    setSemesterFilter("All");
    setViewSavedOnly(false);
  };
  
  

  return (
    <div className="p-4 transition-all">
      <div className="mb-4 flex flex-wrap gap-4 items-center">
        <div>
          <label className="mr-2 font-medium">View:</label>
          <select
            value={viewSavedOnly ? "Saved" : "All"}
            onChange={(e) => setViewSavedOnly(e.target.value === "Saved")}
            className="border px-2 py-1 rounded"
          >
            <option value="All">All</option>
            <option value="Saved">Saved</option>
          </select>
        </div>
  
        <div>
          <label className="mr-2 font-medium">Sort by Pay:</label>
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value as "asc" | "desc")}
            className="border px-2 py-1 rounded"
          >
            <option value="asc">Lowest to Highest</option>
            <option value="desc">Highest to Lowest</option>
          </select>
        </div>

        <div>
          <label className="mr-2 font-medium">View Mode:</label>
          <select
            value={viewMode}
            onChange={(e) => setViewMode(e.target.value as "table" | "card")}
            className="border px-2 py-1 rounded"
          >
            <option value="table">Table</option>
            <option value="card">Card</option>
          </select>
        </div>

  
        {savedOpportunities.size > 0 && (
          <button
            className="ml-auto bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600"
            onClick={() => {
              localStorage.removeItem("savedOpportunities");
              setSavedOpportunities(new Set());
              setShowClearMessage(true);
              setTimeout(() => setShowClearMessage(false), 2500);
            }}
          >
            Clear All Saved
          </button>

        )}
      </div>


      {showClearMessage && (
        <div className="mb-4 px-4 py-2 bg-green-100 text-green-800 text-sm rounded shadow transition-opacity duration-500">
          ✅ Cleared all saved opportunities.
        </div>
      )}

  
      <div className="mb-4">
        <label className="mr-2 font-medium">Search:</label>
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Search name, description, professor..."
          className="border px-3 py-2 rounded w-full max-w-md"
        />
      </div>


      <div className="mb-4">
        <label className="mr-2 font-medium">Filter by Professor:</label>
        <select
          value={professorFilter}
          onChange={(e) => setProfessorFilter(e.target.value)}
          className="border px-2 py-1 rounded"
        >
          <option value="All">All</option>
          {professorList.map((prof, index) => (
            <option key={index} value={prof}>{prof}</option>
          ))}
        </select>
      </div>


      <div className="mb-4">
        <label className="mr-2 font-medium">Filter by Semester:</label>
        <select
          value={semesterFilter}
          onChange={(e) => setSemesterFilter(e.target.value)}
          className="border px-2 py-1 rounded"
        >
          <option value="All">All</option>
          <option value="Fall">Fall</option>
          <option value="Spring">Spring</option>
          <option value="Summer">Summer</option>
        </select>
      </div>


      <button
        className="ml-auto bg-gray-300 text-black px-4 py-1 rounded hover:bg-gray-400"
        onClick={resetFilters}
      >
        Reset Filters
      </button>

      

  
      <div className="overflow-x-auto border border-gray-300 bg-white shadow-sm rounded p-4">
  {savedOpportunities.size > 0 && (
    <div className="mb-4 text-sm text-gray-700 italic">
      Saved {savedOpportunities.size} opportunit{savedOpportunities.size > 1 ? "ies" : "y"}
    </div>
  )}

  <div className="mb-2 text-sm text-gray-600">
    Showing {displayList.filter(op =>
      (!viewSavedOnly || savedOpportunities.has(op.name)) &&
      (professorFilter === "All" || op.professor === professorFilter) &&
      (semesterFilter === "All" || op.semester === semesterFilter) &&
      (
        op.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        op.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        op.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        op.professor.toLowerCase().includes(searchQuery.toLowerCase())
      )
    ).length} result{displayList.length !== 1 && "s"}
  </div>

  {viewMode === "table" ? (
    <table className="w-full border-collapse">
      <thead>
        <tr className="bg-gray-100">
          <th className="p-3 text-left border font-semibold uppercase text-sm text-gray-700">Position</th>
          <th className="p-3 text-left border font-semibold uppercase text-sm text-gray-700">Description</th>
          <th className="p-3 text-left border font-semibold uppercase text-sm text-gray-700">Recommended Experience</th>
          <th className="p-3 text-left border font-semibold uppercase text-sm text-gray-700">Location</th>
          <th className="p-3 text-left border font-semibold uppercase text-sm text-gray-700">Pay</th>
          <th className="p-3 text-left border font-semibold uppercase text-sm text-gray-700">Professor</th>
          <th className="p-3 text-left border font-semibold uppercase text-sm text-gray-700">Term</th>
          <th className="p-3 text-left border font-semibold uppercase text-sm text-gray-700">Action</th>
        </tr>
      </thead>
      <tbody>
        {displayList
          .filter(op =>
            (!viewSavedOnly || savedOpportunities.has(op.name)) &&
            (professorFilter === "All" || op.professor === professorFilter) &&
            (semesterFilter === "All" || op.semester === semesterFilter) &&
            (
              op.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
              op.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
              op.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
              op.professor.toLowerCase().includes(searchQuery.toLowerCase())
            )
          )
          .map((opportunity, index) => (
            <tr
              key={index}
              className={`hover:bg-gray-100 ${getRowColor(opportunity.semester)} border-b border-gray-200 transition-all`}
            >
              <td className="p-3 border font-medium">{opportunity.name}</td>
              <td className="p-3 border">
                {opportunity.description.length > 100 && !expandedDescriptions.has(opportunity.name) ? (
                  <>
                    {opportunity.description.slice(0, 100)}...
                    <button
                      className="text-blue-600 text-xs ml-1 underline"
                      onClick={() => toggleDescription(opportunity.name)}
                    >
                      Show More
                    </button>
                  </>
                ) : (
                  <>
                    {opportunity.description}
                    {opportunity.description.length > 100 && (
                      <button
                        className="text-blue-600 text-xs ml-1 underline"
                        onClick={() => toggleDescription(opportunity.name)}
                      >
                        Show Less
                      </button>
                    )}
                  </>
                )}
              </td>
              <td className="p-3 border">{opportunity.recommended_experience}</td>
              <td className="p-3 border">{opportunity.location}</td>
              <td className="p-3 border">
                <span className={tooltipStyle}>
                  ${opportunity.pay}/hr
                  {opportunity.pay >= 15 && (
                    <span className="ml-2 inline-block bg-green-100 text-green-700 text-xs px-2 py-0.5 rounded-full group-hover:bg-green-200">
                      High Paying
                      <span className={tooltipContent}>This position pays above average</span>
                    </span>
                  )}
                </span>
              </td>
              <td className="p-3 border">{opportunity.professor}</td>
              <td className="p-3 border">
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                    {getSemesterBadge(opportunity.semester)}
                    <span className="text-sm text-gray-600">{opportunity.year}</span>
                  </div>
                  <span className="text-sm text-gray-500">
                    Due: {opportunity.application_due.toLocaleDateString()}
                  </span>
                </div>
              </td>
              <td className="p-3 border">
                <div className="flex flex-col gap-2">
                  <button
                    className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600"
                    onClick={() => setSelectedOpportunity(opportunity.name)}
                  >
                    Apply
                  </button>
                  <button
                    className={`px-4 py-1 rounded ${
                      savedOpportunities.has(opportunity.name)
                        ? "bg-yellow-400 text-black hover:bg-yellow-500"
                        : "bg-gray-300 text-gray-800 hover:bg-gray-400"
                    }`}
                    onClick={() => toggleSave(opportunity.name)}
                  >
                    {savedOpportunities.has(opportunity.name) ? "Unsave" : "Save"}
                  </button>
                  <button
                    className="bg-gray-200 text-black px-4 py-1 rounded hover:bg-gray-300"
                    onClick={() => handleCopy(opportunity)}
                  >
                    Copy
                  </button>
                  <button
                    className="bg-purple-200 text-purple-900 px-4 py-1 rounded hover:bg-purple-300"
                    onClick={() => togglePin(opportunity.name)}
                  >
                    {pinnedOpportunities.has(opportunity.name) ? "Unpin" : "Pin"}
                  </button>

                </div>
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  ) : (
    <div className="grid md:grid-cols-2 gap-4">
      {displayList
        .filter(op =>
          (!viewSavedOnly || savedOpportunities.has(op.name)) &&
          (professorFilter === "All" || op.professor === professorFilter) &&
          (semesterFilter === "All" || op.semester === semesterFilter) &&
          (
            op.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            op.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
            op.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
            op.professor.toLowerCase().includes(searchQuery.toLowerCase())
          )
        )
        .map((opportunity, index) => (
          <div
            key={index}
            className={`p-4 rounded border shadow-sm ${getRowColor(opportunity.semester)} transition-all`}
          >
            <div className="text-lg font-semibold mb-1">{opportunity.name}</div>
            <div className="text-sm text-gray-600 mb-2">
              {opportunity.description.length > 100 && !expandedDescriptions.has(opportunity.name)
                ? `${opportunity.description.slice(0, 100)}... `
                : opportunity.description}
              {opportunity.description.length > 100 && (
                <button
                  className="text-blue-600 text-xs ml-1 underline"
                  onClick={() => toggleDescription(opportunity.name)}
                >
                  {expandedDescriptions.has(opportunity.name) ? "Show Less" : "Show More"}
                </button>
              )}
            </div>
            <div className="text-sm">
              <strong>Professor:</strong> {opportunity.professor}<br />
              <strong>Pay:</strong> ${opportunity.pay}/hr<br />
              <strong>Location:</strong> {opportunity.location}<br />
              <strong>Experience:</strong> {opportunity.recommended_experience}<br />
              <strong>Term:</strong> {getSemesterBadge(opportunity.semester)} {opportunity.year}<br />
              <strong>Due:</strong> {opportunity.application_due.toLocaleDateString()}
            </div>
            <div className="mt-3 flex flex-col gap-2">
              <button
                className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600"
                onClick={() => setSelectedOpportunity(opportunity.name)}
              >
                Apply
              </button>
              <button
                className={`px-4 py-1 rounded ${
                  savedOpportunities.has(opportunity.name)
                    ? "bg-yellow-400 text-black hover:bg-yellow-500"
                    : "bg-gray-300 text-gray-800 hover:bg-gray-400"
                }`}
                onClick={() => toggleSave(opportunity.name)}
              >
                {savedOpportunities.has(opportunity.name) ? "Unsave" : "Save"}
              </button>
              <button
                className="bg-gray-200 text-black px-4 py-1 rounded hover:bg-gray-300"
                onClick={() => handleCopy(opportunity)}
              >
                Copy
              </button>
              <button
                className="bg-purple-200 text-purple-900 px-4 py-1 rounded hover:bg-purple-300"
                onClick={() => togglePin(opportunity.name)}
              >
                {pinnedOpportunities.has(opportunity.name) ? "Unpin" : "Pin"}
              </button>

            </div>
          </div>
        ))}
    </div>
  )}
</div>



    {selectedOpportunity && (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div className="bg-white p-6 rounded shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Apply to {selectedOpportunity}</h2>
          <p className="mb-4">Application functionality coming soon.</p>
          <button
            className="bg-gray-600 text-white px-4 py-2 rounded"
            onClick={() => setSelectedOpportunity(null)}
          >
            Close
          </button>
        </div>
      </div>
    )}

    </div>

  );

  

  
};


export default OpportunitiesList;