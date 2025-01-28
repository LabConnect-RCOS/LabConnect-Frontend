import React from "react";

interface Opportunity {
  name: string;
  description: string;
  recommended_experience: string;
  pay: number;
  semester: string;
  year: number;
  application_due: Date;
  location: string;
}

const sampleOpportunities: Opportunity[] = [
  {
    name: "Research Assistant - Machine Learning Lab",
    description: "Work on cutting-edge ML projects",
    recommended_experience: "Python, Machine Learning basics",
    pay: 15.00,
    semester: "Fall",
    year: 2024,
    application_due: new Date("2024-08-01"),
    location: "DCC"
  }
];

const OpportunitiesList = () => {
  return (
    <div className="p-4">
      <h1 className="text-2xl mb-4">Research Opportunities</h1>
      
      <div className="space-y-4">
        {sampleOpportunities.map((opportunity, index) => (
          <div key={index} className="border p-4 rounded">
            <h2 className="font-bold">{opportunity.name}</h2>
            <p className="mt-2">{opportunity.description}</p>
            
            <div className="mt-2">
              <p>Location: {opportunity.location}</p>
              <p>Pay: ${opportunity.pay}/hr</p>
              <p>Term: {opportunity.semester} {opportunity.year}</p>
            </div>

            <button className="mt-2 bg-blue-500 text-white px-4 py-1 rounded">
              Apply
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OpportunitiesList;