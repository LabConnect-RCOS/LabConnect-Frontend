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

interface getOpportunityData {
    "id": string;
    "name": string;
    "description": string;
    "recommended_experience": string;
    "authors": string;
    "department": string;
    "pay": string;
    "credits"?: string;
    "semester": string
    "application_due": string;
    "recommended_class_years": string;
}