export type Opportunity = {
    id: string;
    name: string;
    description: string;
    recommended_experience?: string;
    pay?: number;
    credits?: string;
    semester: string;
    year: number;
    application_due: string;
    active: boolean;
    location: string;
}