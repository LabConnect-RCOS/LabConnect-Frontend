export type Opportunity = {
  id: number;
  name: string;
  description: string;
  recommended_experience: string;
  pay: number;
  credits: string;
  semester: string;
  year: number;
  application_due: Date;
  location: string;
  lab_managers: string
  saved: boolean;
}