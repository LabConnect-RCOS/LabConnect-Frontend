import React, { useState } from "react";
import Posts from "../components/Posts.tsx";
import PageNavigation from "../../shared/components/Navigation/PageNavigation";
import usePageNavigation from "../../shared/hooks/page-navigation-hook";

const Jobs = () => {
  const [loading, setLoading] = useState<string | boolean>(false);
  const [years, setYears] = useState<string[]>([]);

  async function fetchYears() {
    const response = await fetch(`${process.env.REACT_APP_BACKEND_SERVER}/years`);

    if (response.ok) {
      const data = await response.json();
      setYears(data);
    } else {
      console.log("No response for years");
      setLoading("no response");
    }
  }
  fetchYears()
  
  const [pages, switchPage] = usePageNavigation(["Search", "Saved"], "Search");

  return loading === false && years != null ? (
    <section className="flex flex-col h-screen justify-between gap-3 p-1">
      <section className="flex2 gap-3">
        <section>
          <PageNavigation title="Jobs" pages={pages} switchPage={switchPage} />
          {pages.activePage === "Search" && <Posts years={years}/>}
        </section>
      </section>
    </section>
  ) : loading === "no response" ? (
    <h1>There was no response</h1>
  ) : (
    <h1>Loading...</h1>
  );
};

export default Jobs;
