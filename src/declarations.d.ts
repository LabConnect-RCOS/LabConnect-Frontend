// Declarations file for fixing certain type errors

declare module "*.webp" {
    const value: string;
    export default value;
}

declare type PagesState = {
    pages: string[];
    activePage: string;
}

// Returned from backend route, need more info about what is returned
declare type Job = {
    id?: string;
}

interface AboutItem {
    title: string;
    description: string;
  }