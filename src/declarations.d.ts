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
declare interface opportunityCardData {
    "id": string,
    "title": string,
    "professor": string,
    "season": stringr,
    "location": string,
    "year": string,
}

// FOr about section idk what this is tbh
declare interface AboutItem {
    title: string;
    description: string;
}

// This the result returned from 'packageOpportunityCard' in opportunity_routes.py in backend
declare interface opportunityCardData {
    "id": string,
    "title": string,
    "professor": string,
    "season": stringr,
    "location": string,
    "year": string,
}

// This the result returned from 'packageIndividualOpportunity' in opportunity_routes.py in backend
declare interface opportunityData {
    "id": string;
    "name": string;
    "description": string;
    "recommended_experience": string;
    "authors": string;
    "authorProfile": string;
    "department": string;
    "pay": string;
    "credits"?: string;
    "semester": string
    "application_due": string;
    "recommended_class_years": string;
}