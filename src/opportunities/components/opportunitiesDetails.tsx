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
    description: "Examine technology’s impact on social behavior.",
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
    description: "Study attack vectors and encryption protocols.",
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
  
  
  

  return (
    <div className="p-4">
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
      </div>
      <div className="mb-4">
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
      <div className="overflow-x-auto border border-gray-300 bg-white shadow-sm rounded p-4">
        {savedOpportunities.size > 0 && (
          <div className="mb-4 text-sm text-gray-700 italic">
            Saved {savedOpportunities.size} opportunit{savedOpportunities.size > 1 ? "ies" : "y"}
          </div>
        )}

        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100">
            <th className="p-3 text-left border font-semibold uppercase text-sm text-gray-700">Position</th>
            <th className="p-3 text-left border font-semibold uppercase text-sm text-gray-700">Description</th>

              <th className="p-3 text-left border font-semibold uppercase text-sm text-gray-700">Recommended Experience </th>

            <th className="p-3 text-left border font-semibold uppercase text-sm text-gray-700">Location</th>
            <th className="p-3 text-left border font-semibold uppercase text-sm text-gray-700">Pay</th>
            <th className="p-3 text-left border font-semibold uppercase text-sm text-gray-700">Professor</th>
            <th className="p-3 text-left border font-semibold uppercase text-sm text-gray-700">Term</th>
            <th className="p-3 text-left border font-semibold uppercase text-sm text-gray-700">Action</th>
            </tr>
          </thead>
          <tbody>
            {sortedOpportunities
              .filter(op => !viewSavedOnly || savedOpportunities.has(op.name))
              .map((opportunity, index) => (

                
                <tr
                  key={index} className={`hover:bg-gray-100 ${getRowColor(opportunity.semester)} border-b border-gray-200 transition-all`}>


                <td className="p-3 border font-medium">{opportunity.name}</td>
                <td className="p-3 border">{opportunity.description}</td>
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
                  {opportunity.semester} {opportunity.year}
                  <br />
                  <span className="text-sm text-gray-500">
                    Due: {opportunity.application_due.toLocaleDateString()}
                  </span>
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
                      className={`px-4 py-1 rounded ${savedOpportunities.has(opportunity.name)
                          ? "bg-yellow-400 text-black hover:bg-yellow-500"
                          : "bg-gray-300 text-gray-800 hover:bg-gray-400"
                        }`}
                      onClick={() => toggleSave(opportunity.name)}
                    >
                      {savedOpportunities.has(opportunity.name) ? "Unsave" : "Save"}
                    </button>
                      <button
                        className="bg-gray-200 text-black px-4 py-1 rounded hover:bg-gray-300"
                        onClick={() => handleCopy(opportunity)}>
                        Copy
                      </button>

                  </div>


                </td>
              </tr>
            ))}
          </tbody>

        </table>
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