// src/context/OpportunityContext.tsx
import React, { createContext, useReducer, useCallback } from "react";
import { OpportunityAction } from "../types/opportunityaction";
import { Opportunity } from "../types/opportunity";
import { Filters } from "../types/filters";

const currYr = new Date().getFullYear();

interface OpportunityState {
  filters: {
    activeFilters: string[];
    filterMap: Filters;
  };
  query: string;
  activeId: string;
  opportunities: Opportunity[];
}

const initialState: OpportunityState = {
  filters: {
    activeFilters: ["2025"],
    filterMap: { years: [2025], credits: [], hourlyPay: 0, majors: [] },
  },
  query: "",
  activeId: "",
  opportunities: [],
};

export interface OpportunityContextType {
  activeFilters: OpportunityState["filters"]["activeFilters"];
  filterMap: OpportunityState["filters"]["filterMap"];
  opportunities: OpportunityState["opportunities"];
  resetFilters: () => void;
  removeFilter: (name: string) => void;
  setFilters: (activeFilters: string[], filterMap: Filters) => void;
  setQuery: (query: string) => void;
  setOpportunities: (opportunities: Opportunity[]) => void;
}

// Stable default values for HMR-safe context
const noop = () => {};

export const OpportunityContext = createContext<OpportunityContextType>({
  activeFilters: initialState.filters.activeFilters,
  filterMap: initialState.filters.filterMap,
  opportunities: initialState.opportunities,
  resetFilters: noop,
  removeFilter: noop,
  setFilters: noop,
  setQuery: noop,
  setOpportunities: noop,
});

export const OpportunityProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [opportunityState, dispatch] = useReducer(
    (state: OpportunityState, action: OpportunityAction) => {
      switch (action.type) {
        case "SET_QUERY":
          return { ...state, query: action.query };

        case "SET_FILTERS":
          if (!action.activeFilters || !action.filterMap) return state;
          return {
            ...state,
            filters: {
              activeFilters: action.activeFilters,
              filterMap: action.filterMap,
            },
          };

        case "RESET_FILTERS":
          return {
            ...state,
            filters: {
              activeFilters: [currYr.toString()],
              filterMap: {
                years: [currYr],
                credits: [],
                hourlyPay: 0,
                majors: [],
              },
            },
          };

        case "REMOVE_FILTER":
          if (!action.filter) return state;
          const newActiveFilters = state.filters.activeFilters.filter(
            (filter) => filter !== action.filter
          );
          const newFilterMap = {
            ...state.filters.filterMap,
            years: state.filters.filterMap.years.filter(
              (year) => year !== parseInt(action.filter)
            ),
            credits: action.filter.includes("Credit")
              ? []
              : state.filters.filterMap.credits,
            majors: state.filters.filterMap.majors.filter(
              (major) => major !== action.filter
            ),
            hourlyPay: action.filter.includes("$")
              ? 0
              : state.filters.filterMap.hourlyPay,
          };
          return {
            ...state,
            filters: {
              activeFilters: newActiveFilters,
              filterMap: newFilterMap,
            },
          };

        case "SET_OPPORTUNITIES":
          if (!action.opportunities) return state;
          return { ...state, opportunities: action.opportunities };

        default:
          return state;
      }
    },
    initialState
  );

  const resetFilters = useCallback(
    () => dispatch({ type: "RESET_FILTERS" }),
    []
  );

  const removeFilter = useCallback(
    (name: string) => dispatch({ type: "REMOVE_FILTER", filter: name }),
    []
  );

  const setFilters = useCallback(
    (activeFilters: string[], filterMap: Filters) =>
      dispatch({ type: "SET_FILTERS", activeFilters, filterMap }),
    []
  );

  const setQuery = useCallback(
    (query: string) => dispatch({ type: "SET_QUERY", query }),
    []
  );

  const setOpportunities = useCallback(
    (opportunities: Opportunity[]) =>
      dispatch({ type: "SET_OPPORTUNITIES", opportunities }),
    []
  );

  return (
    <OpportunityContext.Provider
      value={{
        activeFilters: opportunityState.filters.activeFilters,
        filterMap: opportunityState.filters.filterMap,
        opportunities: opportunityState.opportunities,
        resetFilters,
        removeFilter,
        setFilters,
        setQuery,
        setOpportunities,
      }}
    >
      {children}
    </OpportunityContext.Provider>
  );
};