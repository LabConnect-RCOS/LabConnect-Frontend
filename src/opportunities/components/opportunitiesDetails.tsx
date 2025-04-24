import React, { useState } from "react";
import { useEffect } from "react"; // ensure this is already at the top



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
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">(() => {
    return (localStorage.getItem("opportunitySortOrder") as "asc" | "desc") || "asc";
  });
  

  const [sortField, setSortField] = useState<"pay" | "name" | "deadline">(() => {
    const stored = localStorage.getItem("opportunitySortField");
    return (stored as "pay" | "name" | "deadline") || "pay";
  });
  
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
  const [appliedOpportunities, setAppliedOpportunities] = useState<Set<string>>(new Set());
  const [viewFilter, setViewFilter] = useState<"All" | "Applied" | "Pinned" | "Saved">("All");
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    const stored = localStorage.getItem("darkMode");
    return stored ? JSON.parse(stored) : false;
  });
  
  const [notes, setNotes] = useState<Record<string, string>>(() => {
    const stored = localStorage.getItem("opportunityNotes");
    return stored ? JSON.parse(stored) : {};
  });

  const [highPayOnly, setHighPayOnly] = useState<boolean>(false);

  const [viewNotesOnly, setViewNotesOnly] = useState<boolean>(false);


  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
  }, [darkMode]);
  

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

  const exportToJSON = () => {
    const exported = sampleOpportunities.filter(op =>
      pinnedOpportunities.has(op.name) ||
      savedOpportunities.has(op.name) ||
      appliedOpportunities.has(op.name)
    );
  
    const blob = new Blob([JSON.stringify(exported, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
  
    const link = document.createElement("a");
    link.href = url;
    link.download = "opportunities_export.json";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const exportNotesToJSON = () => {
    const blob = new Blob([JSON.stringify(notes, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
  
    const link = document.createElement("a");
    link.href = url;
    link.download = "opportunity_notes.json";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  
  
  

  const tooltipStyle = "relative group";
  const tooltipContent = "absolute hidden group-hover:block bg-black text-white text-xs rounded px-2 py-1 bottom-full mb-1 left-1/2 -translate-x-1/2 whitespace-nowrap z-10";

  const noteTooltip = (note: string) =>
    note
      ? `relative group ml-1 cursor-pointer after:content-['📝'] after:inline-block after:ml-1
          after:text-gray-500 hover:after:text-gray-700`
      : "";
  
      const sortedOpportunities = [...sampleOpportunities].sort((a, b) => {
        let valA: string | number | Date;
        let valB: string | number | Date;
      
        switch (sortField) {
          case "name":
            valA = a.name.toLowerCase();
            valB = b.name.toLowerCase();
            break;
          case "deadline":
            valA = a.application_due;
            valB = b.application_due;
            break;
          case "pay":
          default:
            valA = a.pay;
            valB = b.pay;
            break;
        }
      
        if (valA < valB) return sortOrder === "asc" ? -1 : 1;
        if (valA > valB) return sortOrder === "asc" ? 1 : -1;
        return 0;
      });
      

  const filteredOpportunities = sortedOpportunities.filter(op => {

    const matchesSaved = savedOpportunities.has(op.name);
    const matchesPinned = pinnedOpportunities.has(op.name);
    const matchesApplied = appliedOpportunities.has(op.name);
  
    const matchesTracking =
      viewFilter === "All" ||
      (viewFilter === "Saved" && matchesSaved) ||
      (viewFilter === "Pinned" && matchesPinned) ||
      (viewFilter === "Applied" && matchesApplied);
  
    return (
      matchesTracking &&
      (!viewSavedOnly || matchesSaved) &&
      (professorFilter === "All" || op.professor === professorFilter) &&
      (semesterFilter === "All" || op.semester === semesterFilter) &&
      (highPayOnly ? op.pay >= 15 : true) &&
      (viewNotesOnly ? notes[op.name]?.trim().length > 0 : true) &&
      (
        op.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        op.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        op.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        op.professor.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  });
  
  

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

  const toggleApplied = (name: string) => {
    setAppliedOpportunities(prev => {
      const updated = new Set(prev);
      if (updated.has(name)) {
        updated.delete(name);
      } else {
        updated.add(name);
      }
      return updated;
    });
  };

  const clearAllApplied = () => {
    setAppliedOpportunities(new Set());
  };
  

  const updateNote = (name: string, text: string) => {
    setNotes(prev => {
      const updated = { ...prev, [name]: text };
      localStorage.setItem("opportunityNotes", JSON.stringify(updated));
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
  
  const visibleOpportunities = sortedOpportunities.filter(op =>
    (!viewSavedOnly || savedOpportunities.has(op.name)) &&
    (viewFilter === "All" ||
      (viewFilter === "Saved" && savedOpportunities.has(op.name)) ||
      (viewFilter === "Pinned" && pinnedOpportunities.has(op.name)) ||
      (viewFilter === "Applied" && appliedOpportunities.has(op.name))) &&
    (professorFilter === "All" || op.professor === professorFilter) &&
    (semesterFilter === "All" || op.semester === semesterFilter) &&
    (!highPayOnly || op.pay >= 15) &&
    (
      op.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      op.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      op.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      op.professor.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );
  
  const totalCount = visibleOpportunities.length;
  const savedCount = visibleOpportunities.filter(op => savedOpportunities.has(op.name)).length;
  const appliedCount = visibleOpportunities.filter(op => appliedOpportunities.has(op.name)).length;
  const pinnedCount = visibleOpportunities.filter(op => pinnedOpportunities.has(op.name)).length;
  const avgPay = visibleOpportunities.length > 0
    ? (visibleOpportunities.reduce((sum, op) => sum + op.pay, 0) / visibleOpportunities.length).toFixed(2)
    : "0.00";
  

  return (
<div className={`p-4 transition-all min-h-screen ${darkMode ? "dark bg-gray-900 text-white" : "bg-white text-black"}`}>
      <div className="mb-6 grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-4 text-sm text-gray-700 dark:text-gray-200">
        <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded shadow-sm text-center">
          <div className="font-bold text-xl">{totalCount}</div>
          <div>Total</div>
        </div>
        <div className="bg-yellow-100 dark:bg-yellow-900 p-3 rounded shadow-sm text-center">
          <div className="font-bold text-xl">{savedCount}</div>
          <div>Saved</div>
        </div>
        <div className="bg-green-100 dark:bg-green-900 p-3 rounded shadow-sm text-center">
          <div className="font-bold text-xl">{appliedCount}</div>
          <div>Applied</div>
        </div>
        <div className="bg-blue-100 dark:bg-blue-900 p-3 rounded shadow-sm text-center">
          <div className="font-bold text-xl">{pinnedCount}</div>
          <div>Pinned</div>
        </div>
        <div className="bg-purple-100 dark:bg-purple-900 p-3 rounded shadow-sm text-center">
          <div className="font-bold text-xl">${avgPay}</div>
          <div>Avg Pay</div>
        </div>
      </div>

      <div className="mb-4 flex flex-wrap gap-3 items-center">
        <button
          className="bg-red-100 text-red-800 px-4 py-1 rounded hover:bg-red-200"
          onClick={() => {
            localStorage.removeItem("opportunityNotes");
            setNotes({});
            alert("All notes cleared.");
          }}
        >
          🧹 Clear All Notes
        </button>


        <button
          className="bg-red-200 text-red-800 px-4 py-1 rounded hover:bg-red-300"
          onClick={() => {
            localStorage.removeItem("savedOpportunities");
            setSavedOpportunities(new Set());
            setPinnedOpportunities(new Set());
            setAppliedOpportunities(new Set());
            alert("All tracking (Saved, Applied, Pinned) cleared.");
          }}
        >
          🧹 Clear All Tracked
        </button>

        <button
          className="bg-purple-100 text-purple-800 px-4 py-1 rounded hover:bg-purple-200"
          onClick={() =>
            setViewFilter((prev) => (prev === "Pinned" ? "All" : "Pinned"))
          }
        >
          {viewFilter === "Pinned" ? "Show All" : "Show Only Pinned"}
        </button>

        <button
          className="bg-green-100 text-green-800 px-4 py-1 rounded hover:bg-green-200"
          onClick={() =>
            setViewFilter((prev) => (prev === "Applied" ? "All" : "Applied"))
          }
        >
          {viewFilter === "Applied" ? "Show All" : "Show Only Applied"}
        </button>

        <button
          className="bg-red-100 text-red-800 px-4 py-1 rounded hover:bg-red-200"
          onClick={clearAllApplied}
        >
          ❌ Clear All Applied
        </button>

      </div>

      <button
        className="bg-black text-white px-4 py-1 rounded hover:bg-gray-800"
        onClick={() => {
          localStorage.removeItem("savedOpportunities");
          localStorage.removeItem("opportunityNotes");
          setSavedOpportunities(new Set());
          setPinnedOpportunities(new Set());
          setAppliedOpportunities(new Set());
          setNotes({});
          setSortOrder("asc");
          setSearchQuery("");
          setProfessorFilter("All");
          setSemesterFilter("All");
          setViewSavedOnly(false);
          setHighPayOnly(false);
          setViewFilter("All");
          setDarkMode(false);
          alert("All settings, filters, and tracking cleared.");
        }}
      >
        🔄 Reset Everything
      </button>


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
  
        <div className="flex gap-2 items-center">
          <label className="font-medium">Sort:</label>
          <select
            value={sortField}
            onChange={(e) => {
              const val = e.target.value as "pay" | "name" | "deadline";
              setSortField(val);
              localStorage.setItem("opportunitySortField", val);
            }}
            className="border px-2 py-1 rounded"
          >
            <option value="pay">Pay</option>
            <option value="name">Name</option>
            <option value="deadline">Deadline</option>
          </select>
          <select
            value={sortOrder}
            onChange={(e) => {
              const val = e.target.value as "asc" | "desc";
              setSortOrder(val);
              localStorage.setItem("opportunitySortOrder", val);
            }}
            className="border px-2 py-1 rounded"
          >
            <option value="asc">Asc</option>
            <option value="desc">Desc</option>
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

        <button
          className={`px-4 py-1 rounded font-medium transition-colors ${darkMode
              ? "bg-yellow-300 text-black hover:bg-yellow-400"
              : "bg-gray-800 text-white hover:bg-gray-900"
            }`}
          onClick={() => setDarkMode(prev => !prev)}
        >
          {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
        </button>


  
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

      <div className="mb-4">
        <label className="mr-2 font-medium">Filter by Tracking:</label>
        <select
          value={viewFilter}
          onChange={(e) => setViewFilter(e.target.value as "All" | "Applied" | "Pinned" | "Saved")}
          className="border px-2 py-1 rounded"
        >
          <option value="All">All</option>
          <option value="Applied">Applied</option>
          <option value="Pinned">Pinned</option>
          <option value="Saved">Saved</option>
        </select>
      </div>

      <div className="mb-4">
        <label className="mr-2 font-medium">Pay Filter:</label>
        <label className="inline-flex items-center space-x-2">
          <input
            type="checkbox"
            checked={highPayOnly}
            onChange={() => setHighPayOnly(prev => !prev)}
            className="form-checkbox h-4 w-4 text-blue-600"
          />
          <span className="text-sm">Show $15/hr+ only</span>
        </label>
      </div>

      <div className="mb-4">
        <label className="mr-2 font-medium">Notes Filter:</label>
        <label className="inline-flex items-center space-x-2">
          <input
            type="checkbox"
            checked={viewNotesOnly}
            onChange={() => setViewNotesOnly(prev => !prev)}
            className="form-checkbox h-4 w-4 text-blue-600"
          />
          <span className="text-sm">Show opportunities with notes only</span>
        </label>
      </div>





      <div className="flex gap-3 mt-2">
        <button
          className="bg-gray-300 text-black px-4 py-1 rounded hover:bg-gray-400"
          onClick={resetFilters}
        >
          Reset Filters
        </button>

        <button
          className="bg-blue-100 text-blue-800 px-4 py-1 rounded hover:bg-blue-200"
          onClick={exportToJSON}
        >
          Export Tracked to JSON
        </button>

        <button
          className="bg-yellow-100 text-yellow-800 px-4 py-1 rounded hover:bg-yellow-200"
          onClick={exportNotesToJSON}
        >
          Export Notes to JSON
        </button>

      </div>


      

  
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
        <th className="p-3 text-left border font-semibold uppercase text-sm text-gray-700 dark:text-gray-300 dark:border-gray-700">
        Position</th>
        <th className="p-3 text-left border font-semibold uppercase text-sm text-gray-700 dark:text-gray-300 dark:border-gray-700">
        Description</th>
        <th className="p-3 text-left border font-semibold uppercase text-sm text-gray-700 dark:text-gray-300 dark:border-gray-700">
        Recommended Experience</th>
          <th className="p-3 text-left border font-semibold uppercase text-sm text-gray-700 dark:text-gray-300 dark:border-gray-700">Location</th>
          <th className="p-3 text-left border font-semibold uppercase text-sm text-gray-700 dark:text-gray-300 dark:border-gray-700">Pay</th>
          <th className="p-3 text-left border font-semibold uppercase text-sm text-gray-700 dark:text-gray-300 dark:border-gray-700">Professor</th>
          <th className="p-3 text-left border font-semibold uppercase text-sm text-gray-700 dark:text-gray-300 dark:border-gray-700">Term</th>
          <th className="p-3 text-left border font-semibold uppercase text-sm text-gray-700 dark:text-gray-300 dark:border-gray-700">Action</th>
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
              className={`hover:bg-gray-100 ${getRowColor(opportunity.semester)} border-b border-gray-200 transition-all ${opportunity.pay >= 15 ? "border-l-4 border-green-400" : ""
                }`}
            >
              
              <td className="p-3 border font-medium">
                {opportunity.name}
                {notes[opportunity.name]?.trim() && (
                  <span className={noteTooltip(notes[opportunity.name])}>
                    <span className="absolute hidden group-hover:block bg-black text-white text-xs rounded px-2 py-1 bottom-full mb-1 left-1/2 -translate-x-1/2 z-10 whitespace-nowrap">
                      {notes[opportunity.name].length > 60
                        ? notes[opportunity.name].slice(0, 60) + "..."
                        : notes[opportunity.name]}
                    </span>
                  </span>
                )}
              </td>

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
                      <span className={tooltipContent}>This position pays $15/hr or more</span>

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
                  {appliedOpportunities.has(opportunity.name) && (
                    <span className="inline-block bg-green-200 text-green-800 text-xs px-2 py-0.5 rounded-full mb-1 self-start">
                      ✅ Applied
                    </span>
                  )}

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

                  <button
                    className="bg-green-100 text-green-800 px-4 py-1 rounded hover:bg-green-200"
                    onClick={() => toggleApplied(opportunity.name)}
                  >
                    {appliedOpportunities.has(opportunity.name) ? "Unmark" : "Mark as Applied"}
                  </button>
                  <textarea
                    value={notes[opportunity.name] || ""}
                    onChange={(e) => updateNote(opportunity.name, e.target.value)}
                    placeholder="Notes..."
                    className="mt-2 border rounded px-2 py-1 text-sm w-full dark:bg-gray-800 dark:text-white dark:border-gray-600"
                  />


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
            className={`p-4 rounded border shadow-sm transition-all ${getRowColor(opportunity.semester)
              } ${opportunity.pay >= 15 ? "border-green-400 border-l-4" : "border-gray-300"} dark:border-gray-700`}
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
              {appliedOpportunities.has(opportunity.name) && (
                <span className="inline-block bg-green-200 text-green-800 text-xs px-2 py-0.5 rounded-full mb-2">
                  ✅ Applied
                </span>
              )}

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

              <button
                className="bg-green-100 text-green-800 px-4 py-1 rounded hover:bg-green-200"
                onClick={() => toggleApplied(opportunity.name)}
              >
                {appliedOpportunities.has(opportunity.name) ? "Unmark" : "Mark as Applied"}
              </button>

              <textarea
                value={notes[opportunity.name] || ""}
                onChange={(e) => updateNote(opportunity.name, e.target.value)}
                placeholder="Notes..."
                className="mt-3 border rounded px-2 py-1 text-sm w-full dark:bg-gray-800 dark:text-white dark:border-gray-600"
              />


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