import React, { useState } from "react";
import JobsNavigation from "../components/JobsNavigation";
import Posts from "../components/Posts";
import SavedJobs from "../components/SavedJobs";
import PageNavigation from "../../shared/components/Navigation/PageNavigation";
import usePageNavigation from "../../shared/hooks/page-navigation-hook";

import {Opportunity} from "../components/opportunitiesDetails";
import OpportunitiesList from "../components/opportunitiesDetails.tsx";


interface PageNavigationType {
  activePage: string;
  pages: string[];
}

const Jobs: React.FC = () => {
  
  // navigation bar
  const [pages, switchPage] = usePageNavigation(["Search", "Saved"], "Search") as [
    PageNavigationType,
    (page: string) => void
  ];

  // displaying opportunities list component
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
