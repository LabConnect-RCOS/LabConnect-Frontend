import React, { useState } from "react";
import JobsNavigation from "../components/JobsNavigation";
import Posts from "../components/Posts.tsx";
import SavedJobs from "../components/SavedJobs";
import PageNavigation from "../../shared/components/Navigation/PageNavigation";
import usePageNavigation from "../../shared/hooks/page-navigation-hook";
import { useParams } from "react-router";
import { useAuth } from "../../context/AuthContext.tsx";

const Jobs = () => {
  const { auth } = useAuth();
  const { postID } = useParams();
  const [loading, setLoading] = useState<string | boolean>(false);
  const [years, setYears] = useState<string[]>(["2025","2026","2027","2028"]);

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
  var [pages, switchPage] = usePageNavigation(["Search", "Saved"], "Search");

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
