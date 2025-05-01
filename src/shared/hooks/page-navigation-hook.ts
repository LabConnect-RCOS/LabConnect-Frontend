import { useState } from "react";

type SwitchPage = (view: string) => void;

const usePageNavigation = (views: string[], activeView: string): [PagesState, SwitchPage] => {
  const [pages, setPages] = useState<PagesState>({ pages: views, activePage: activeView });

  const switchPage: SwitchPage = (view) => {
    setPages(() => {
      return { ...pages, activePage: view };
    });
  };

  return [pages, switchPage];
};

export default usePageNavigation;
