// Declarations file for fixing certain type errors

declare module "*.webp" {
    const value: string;
    export default value;
}

declare type PagesState = {
    pages: string[];
    activePage: string;
}

// FOr about section idk what this is tbh
declare interface AboutItem {
    title: string;
    description: string;
}

// This the result returned from 'packageOpportunityCard' in opportunity_routes.py in backend
declare interface OpportunityCardData {
    "id": string,
    "title": string,
    "professor": string,
    "season": stringr,
    "location": string,
    "year": string,
}

// This the result returned from 'packageIndividualOpportunity' in opportunity_routes.py in backend
declare interface OpportunityData {
    "id": string;
    "name": string;
    "description": string;
    "recommended_experience": string;
    "author": string;
    "authorProfile": string;
    "department": string;
    "pay": string;
    "credits"?: string;
    "semester": string
    "application_due": string;
    "recommended_class_years": string;
}
