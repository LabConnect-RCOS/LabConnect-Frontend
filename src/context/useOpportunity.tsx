import { useContext } from "react";
import { OpportunityContext } from "./OpportunityContext";

export const useOpportunity = () => {
  return useContext(OpportunityContext);
};