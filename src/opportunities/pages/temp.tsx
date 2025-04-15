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

  const activeLink = "active-link";
  const normalLink = "normal-link hover:border-b-2 hover:text-black";

  // displaying opportunities list component
  return (
    <section className="flex flex-col h-screen justify-between gap-3">
      <section className="flex2 gap-3">
        <section>
          <div className="flex gap-5" style={{ alignItems: "center" }}>
            <h1 className="text-2xl font-bold">Opportunities</h1>

            <nav className="pagenav" style={{ alignItems: "center" }}>
              {pages.pages.map((page) => {
                return (
                  <button
                    key={page}
                    onClick={() => {
                      switchPage(page);
                    }}
                    className={page === pages.activePage ? activeLink : normalLink}
                  >
                    {page}
                  </button>
                );
              })}
            </nav>
          </div>

          {pages.activePage === "Search" && <Posts />}

        </section>
      </section>
    </section>
  );
};

export default Opportunities;
