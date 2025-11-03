import React from "react";
import Posts from "../components/Posts";
import usePageNavigation from "../../shared/hooks/page-navigation-hook.ts";

interface PageNavigationType {
  activePage: string;
  pages: string[];
}

const Opportunities: React.FC = () => {
  // navigation bar
  const [pages, switchPage] = usePageNavigation(["Search", "Saved"], "Search") as [
    PageNavigationType,
    (page: string) => void
  ];

  // Tailwind classes with dark variants
  const activeLink =
    "py-3 text-lg font-semibold border-b-2 " +
    "text-black dark:text-gray-100 " +
    "border-black dark:border-gray-100";

  const normalLink =
    "py-3 text-lg font-semibold border-b-2 border-transparent " +
    "text-gray-600 dark:text-gray-300 " +
    "hover:text-black dark:hover:text-white " +
    "hover:border-black dark:hover:border-gray-100";

  return (
    <section className="flex flex-col h-screen justify-between gap-3 text-gray-900 dark:text-gray-100">
      <section className="flex flex-col gap-3">
        <section>
          <div className="flex gap-5 items-center">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              Opportunities
            </h1>

            <nav className="text-base flex gap-4 items-center">
              {pages.pages.map((page) => (
                <button
                  key={page}
                  onClick={() => switchPage(page)}
                  className={page === pages.activePage ? activeLink : normalLink}
                >
                  {page}
                </button>
              ))}
            </nav>
          </div>

          {pages.activePage === "Search" && <Posts />}
          {pages.activePage === "Saved" && <Posts />} {/* keep same component if that’s intended */}
        </section>
      </section>
    </section>
  );
};

export default Opportunities;
