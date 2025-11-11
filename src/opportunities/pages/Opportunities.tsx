import React from "react";
import Posts from "../components/Posts";
import usePageNavigation from "../../shared/hooks/page-navigation-hook.ts";
import SavedPage from "../../individuals/pages/Saved.tsx";
import { OpportunityProvider } from "../../context/OpportunityContext.tsx";

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

  const activeLink = "text-black py-3 border-b-2 border-black text-lg";
  const normalLink = "text-gray-600 py-3 text-lg border-black hover:border-b-2 hover:text-black";

  // displaying opportunities list component
  return (
    <OpportunityProvider>
      <section className="flex flex-col h-screen justify-between gap-3">
        <section className="flex flex-col gap-3">
          <section>
            <div className="flex gap-5" style={{ alignItems: "center" }}>
              <h1 className="text-2xl font-bold">Opportunities</h1>

              <nav className="text-base flex gap-4 justify-items-center font-semibold" style={{ alignItems: "center" }}>
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
            {pages.activePage === "Saved" && <SavedPage />}
            
          </section>
        </section>
      </section>
    </OpportunityProvider>
  );
};

export default Opportunities;
