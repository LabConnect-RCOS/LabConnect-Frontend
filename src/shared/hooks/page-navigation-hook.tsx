import { useState } from "react";

type PagesState = {
  pages: string[];
  activePage: string;
};

const usePageNavigation = (views: string[], activeView: string) => {
  const [pages, setPages] = useState<PagesState>({ pages: views, activePage: activeView });

  const switchPage = (view: string) => {
    setPages((prevState) => ({
      ...prevState,
      activePage: view
    }));
  };

  return [pages, switchPage] as const;
};

export default usePageNavigation;
