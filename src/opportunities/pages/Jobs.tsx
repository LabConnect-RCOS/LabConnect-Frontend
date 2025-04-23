import React from "react";
import Posts from "../components/Posts";
import PageNavigation from "../../shared/components/Navigation/PageNavigation";
import usePageNavigation from "../../shared/hooks/page-navigation-hook";
import OpportunitiesList from "../components/opportunitiesDetails";
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
      {/* Dark Mode Toggle Button */}
      <div className="flex justify-end">
        <DarkModeToggle />
      </div>

      {/* Page Navigation + Posts */}
      <section className="flex flex-col gap-3 bg-gray-100 dark:bg-gray-800 p-4 rounded-lg shadow-md transition-colors duration-200">
        <PageNavigation title="Jobs" pages={pages} switchPage={switchPage} />
        {pages.activePage === "Search" && <Posts years={validYears} />}
      </section>

      {/* Opportunities Table */}
      <OpportunitiesList />
    </section>
  );
};

export default Jobs;
