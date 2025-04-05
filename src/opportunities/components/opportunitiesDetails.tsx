import React from "react";
import { OpportunityList } from "../../types/opportunities.ts";

const sampleOpportunities: OpportunityList[] = [
  {
    id: 1,
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
    id: 2,
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
    id: 3,
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
    id: 4,
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
    id: 5,
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
    id: 6,
    name: "Climate Modeling Research Intern",
    description: "Simulate climate patterns using advanced modeling techniques.",
    recommended_experience: "Python, MATLAB, or climate science coursework",
    pay: 14.50,
    semester: "Summer",
    year: 2025,
    application_due: new Date("2025-03-15"),
    location: "Troy Building",
    professor: "Dr. John Reynolds"
  }
];


// This component returns a 'list' of all the opportunities 

const OpportunitiesList = () => {
  return (
    <div className="p-4">
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            {/* Column Headers */}
            <tr className="bg-gray-100">
              <th className="p-3 text-left border">Position</th>
              <th className="p-3 text-left border">Description</th>
              <th className="p-3 text-left border">Location</th>
              <th className="p-3 text-left border">Pay</th>
              <th className="p-3 text-left border">Professor</th>
              <th className="p-3 text-left border">Term</th>
              <th className="p-3 text-left border">Action</th>
            </tr>
          </thead>
          <tbody>
            {/* Info about the opportunities */}
            {sampleOpportunities.length > 0 ? (
              sampleOpportunities.map((opportunity) => (
                <tr key={opportunity.id} className="hover:bg-gray-50">
                  <td className="p-3 border font-medium">{opportunity.name}</td>
                  <td className="p-3 border">{opportunity.description}</td>
                  <td className="p-3 border">{opportunity.location}</td>
                  <td className="p-3 border">${opportunity.pay}/hr</td>
                  <td className="p-3 border">{opportunity.professor}</td>
                  <td className="p-3 border">
                    {opportunity.semester} {opportunity.year}
                  </td>
                  <td className="p-3 border">
                    <button className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600">
                      Apply
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} className="p-3 border text-center">
                  No results found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OpportunitiesList;
