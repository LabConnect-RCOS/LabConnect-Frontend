import React, { useState } from "react";
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

  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const currentYear = new Date().getFullYear();
  const validYears = Array.from({ length: 4 }, (_, i) => (currentYear + i).toString());

  return (
    <section className="flex flex-col gap-4 bg-white text-black dark:bg-gray-900 dark:text-gray-100 min-h-screen p-4 transition-colors duration-300">
      {/* Dark Mode Toggle */}
      <div className="flex justify-end">
        <DarkModeToggle />
      </div>

      {/* Navigation and Filters */}
      <section className="flex flex-col gap-3 bg-gray-100 dark:bg-gray-800 p-4 rounded-lg shadow-md transition-colors duration-200">
        <PageNavigation title="Jobs" pages={pages} switchPage={switchPage} />
        {pages.activePage === "Search" && <Posts years={validYears} />}
      </section>

      {/* Sorting Controls */}
      <div className="flex justify-end items-center gap-2">
        <label htmlFor="sort" className="text-sm font-medium text-gray-700 dark:text-gray-300">
          Sort by Year:
        </label>
        <select
          id="sort"
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value as "asc" | "desc")}
          className="select select-bordered bg-white dark:bg-gray-800 text-black dark:text-white border-gray-300 dark:border-gray-600"
        >
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </div>

      {/* Opportunities List */}
      <OpportunitiesList sortOrder={sortOrder} />
    </section>
  );
};

export default Jobs;
