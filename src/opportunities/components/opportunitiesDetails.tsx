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
      
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            {/* <tr className="bg-gray-100">
              <th className="p-3 text-left border">Position</th>
              <th className="p-3 text-left border">Description</th>
              <th className="p-3 text-left border">Location</th>
              <th className="p-3 text-left border">Pay</th>
              <th className="p-3 text-left border">Term</th>
              <th className="p-3 text-left border">Action</th>
            </tr> */}
          </thead>
          <tbody>
            {sampleOpportunities.map((opportunity, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="p-3 border font-medium">{opportunity.name}</td>
                <td className="p-3 border">{opportunity.description}</td>
                <td className="p-3 border">{opportunity.location}</td>
                <td className="p-3 border">${opportunity.pay}/hr</td>
                <td className="p-3 border">
                  {opportunity.semester} {opportunity.year}
                </td>
                <td className="p-3 border">
                  <button className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600">
                    Apply
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OpportunitiesList;