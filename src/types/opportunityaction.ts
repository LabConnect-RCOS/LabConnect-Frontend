import { Filters } from "./filters.ts";
import { Opportunity } from "./opportunity.ts";

export type OpportunityAction =
    | { type: "SET_QUERY"; query: string }
    | { type: "SET_FILTERS"; activeFilters: string[]; filterMap: Filters }
    | { type: "RESET_FILTERS" }
    | { type: "REMOVE_FILTER"; filter: string }
    | { type: "SET_OPPORTUNITIES"; opportunities: Opportunity[] };