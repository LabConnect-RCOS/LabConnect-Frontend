import React, { useState } from "react";
import JobsNavigation from "../components/JobsNavigation";
import Posts from "../components/Posts";
import SavedJobs from "../components/SavedJobs";
import PageNavigation from "../../shared/components/Navigation/PageNavigation";
import usePageNavigation from "../../shared/hooks/page-navigation-hook";

import {Opportunity} from "../components/opportunitiesDetails";
import OpportunitiesList from "../components/opportunitiesDetails.tsx";

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
  }
];

interface PageNavigationType {
  activePage: string;
  pages: string[];
}

const Jobs: React.FC = () => {
  
  const [pages, switchPage] = usePageNavigation(["Search", "Saved"], "Search") as [
    PageNavigationType,
    (page: string) => void
  ];

  return (
    <section className="flex flex-col h-screen justify-between gap-3">
      <section className="flex2 gap-3">
        <section>
          <PageNavigation title="Jobs" pages={pages} switchPage={switchPage} />

          {pages.activePage === "Search" && <Posts />}
          
        </section>
      </section>
      <OpportunitiesList></OpportunitiesList>
    </section>
    
    
  );
};

export default Jobs;
