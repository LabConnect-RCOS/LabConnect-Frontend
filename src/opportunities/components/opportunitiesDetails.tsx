import React from "react";


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
    name: "AI Ethics Fellowship – Interdisciplinary Lab",
    description: "Explore ethical implications of AI across different cultures.",
    recommended_experience: "None required – interest in AI ethics preferred.",
    pay: 20.00,
    semester: "Spring",
    year: 2025,
    application_due: new Date("2025-01-01"),
    location: "Sage Labs",
    professor: "Dr. Lara Singh"
  },

  {
    name: "Cybersecurity Analyst - Red Team",
    description: "Simulate attacks and help test system vulnerabilities.",
    recommended_experience: "Linux, Kali, Metasploit",
    pay: 18.75,
    semester: "Summer",
    year: 2027,
    application_due: new Date("2027-07-01"),
    location: "Voorhees Computing Center",
    professor: "Dr. Kevin Marshall"
  },
  {
    name: "Quantum Computing Research Assistant",
    description: "Contribute to experiments in qubit entanglement and algorithms.",
    recommended_experience: "Linear Algebra, Qiskit or quantum mechanics knowledge",
    pay: 22.00,
    semester: "Summer",
    year: 2026,
    application_due: new Date("2026-06-20"),
    location: "Physics Building",
    professor: "Dr. Isabelle Zhou"
  },
  {
    name: "Social Impact Intern – Sustainability Initiative",
    description: "Partner with nonprofits to design eco-friendly tech solutions.",
    recommended_experience: "",
    pay: 10.00,
    semester: "Summer",
    year: 2026,
    application_due: new Date("2026-05-05"),
    location: "Downtown Troy",
    professor: "Dr. Omar Farah"
  },
  {
    name: "Biotech Innovation Intern",
    description: "Work with startups developing cutting-edge biotech products.",
    recommended_experience: "Biology, Chemistry, or Biomed Engineering",
    pay: 25.00,
    semester: "Spring",
    year: 2026,
    application_due: new Date("2026-02-25"),
    location: "Incubator – Biotech Hub",
    professor: "Dr. Hannah Cho"
  },

  {
    name: "Remote UX Research Assistant",
    description: "Conduct user interviews and evaluate interface usability from home.",
    recommended_experience: "Surveys, Figma, Zoom",
    pay: 17.50,
    semester: "Spring",
    year: 2027,
    application_due: new Date("2027-03-15"),
    location: "Remote",
    professor: "Dr. Alex Ramirez"
  },
  {
    name: "Augmented Reality Developer - Interactive Arts",
    description: "Build immersive AR experiences for museum exhibits.",
    recommended_experience: "Unity, ARKit/ARCore",
    pay: 21.00,
    semester: "Fall",
    year: 2028,
    application_due: new Date("2028-10-10"),
    location: "EMPAC",
    professor: "Dr. Fiona Greene"
  },
  {
    name: "Language Processing Research - NLP Group",
    description: "Analyze sentiment and trends in multilingual social media data.",
    recommended_experience: "Python, NLTK/spaCy, multilingual data",
    pay: 19.00,
    semester: "Fall",
    year: 2028,
    application_due: new Date("2028-08-29"),
    location: "Darrin Communications Center",
    professor: "Dr. Javier Montes"
  },
  {
    name: "Autonomous Vehicles Intern",
    description: "Test and improve autonomous navigation algorithms.",
    recommended_experience: "ROS, C++, Lidar integration",
    pay: 23.00,
    semester: "Summer",
    year: 2028,
    application_due: new Date("2028-07-18"),
    location: "Tech Park",
    professor: "Dr. Priya Raman"
  },
  {
    name: "Music & Machine Learning Collaboration",
    description: "Compose AI-generated music and evaluate human interaction.",
    recommended_experience: "Music theory, Python, or Max/MSP",
    pay: 15.75,
    semester: "Fall",
    year: 2024,
    application_due: new Date("2024-11-10"),
    location: "West Hall",
    professor: "Dr. Neil Tran"
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
            {sampleOpportunities.map((opportunity, index) => (
              <tr key={index} className="hover:bg-gray-50">
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
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OpportunitiesList;
