import React from "react";
/*
pages = {
  pages: [Saved, Search]
  active: "Saved"
}

usePageNavigation([Saved, Search, Bookmarks], active)

=> switchPage(string)
    activePage

*/

const PageNavigation = ({ title, pages, switchPage }) => {

  return (

    <div className="flex gap-5 items-center">
      <h1 className="text-2xl font-bold">{title}</h1>

      <nav className="flex gap-4 border-b border-gray-300 dark:border-gray-700">

        {pages.pages.map((page) => {
          const isActive = page === pages.activePage;

          return (
            <button
              key={page}
              onClick={() => switchPage(page)}
              className={`pb-2 text-sm font-medium transition-colors duration-200 border-b-2
                ${
                  isActive
                    ? "border-black text-black dark:border-white dark:text-white"
                    : "border-transparent text-gray-500 hover:text-black dark:text-gray-400 dark:hover:text-white"
                }`}
            >
              {page}
            </button>
          );
          
        })}
      </nav>
    </div>

  );

};

export default PageNavigation;

