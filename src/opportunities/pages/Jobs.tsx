import React from "react";
import Posts from "../components/Posts";
import PageNavigation from "../../shared/components/Navigation/PageNavigation";
import usePageNavigation from "../../shared/hooks/page-navigation-hook";
import OpportunitiesList from "../components/opportunitiesDetails.tsx";
import DarkModeToggle from "../components/DarkModeToggle";

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
    <section className="flex flex-col gap-4 bg-white text-black dark:bg-gray-900 dark:text-gray-100 min-h-screen p-4 transition-colors duration-300">
      <div className="flex justify-end">
        <DarkModeToggle />
      </div>

      <section className="flex2 gap-3">
        <section className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg shadow-md">
          <PageNavigation title="Jobs" pages={pages} switchPage={switchPage} />
          {pages.activePage === "Search" && <Posts years={validYears} />}
        </section>
      </section>

      <section className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg shadow">
        <OpportunitiesList />
      </section>
    </section>
  );
};

export default Jobs;
