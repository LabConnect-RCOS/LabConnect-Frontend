import React from "react";
import Posts from "../components/Posts";
import PageNavigation from "../../shared/components/Navigation/PageNavigation";
import usePageNavigation from "../../shared/hooks/page-navigation-hook";
import OpportunitiesList from "../components/opportunitiesDetails.tsx";

interface PageNavigationType {
  activePage: string;
  pages: string[];
}

const Jobs: React.FC = () => {
  const [pages, switchPage] = usePageNavigation(["Search", "Saved"], "Search") as [
    PageNavigationType,
    (page: string) => void
  ];

  const currentYear = new Date().getFullYear();
  const validYears = Array.from({ length: 4 }, (_, i) => (currentYear + i).toString());

  return (
    <section className="flex flex-col gap-3">
      <section className="flex2 gap-3">
        <section>
          <PageNavigation title="Jobs" pages={pages} switchPage={switchPage} />
          {pages.activePage === "Search" && <Posts years={validYears} />}
        </section>
      </section>
      <OpportunitiesList />
    </section>
  );
};

export default Jobs;
