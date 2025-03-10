import React, { useState } from "react";
import JobsNavigation from "../components/JobsNavigation";
import Posts from "../components/Posts";
import SavedJobs from "../components/SavedJobs";
import PageNavigation from "../../shared/components/Navigation/PageNavigation";
import usePageNavigation from "../../shared/hooks/page-navigation-hook";

const Jobs = () => {
  var [pages, switchPage] = usePageNavigation(["Search", "Saved"], "Search");

  return (
    <section className="flex flex-col h-screen justify-between gap-3 p-1">
      <section className="flex2 gap-3">
        <section>
          <PageNavigation title="Jobs" pages={pages} switchPage={switchPage} />

          {pages.activePage === "Search" && <Posts />}
        </section>
      </section>
    </section>
  );
};

export default Jobs;
