import FiltersField from "./FiltersField.tsx";
import React, { useReducer, useCallback, useEffect, useState } from "react";
import OpportunitiesList from "./OpportunitiesDetails.tsx";
import PopUpMenu from "./PopUpMenu.tsx";
import { Filters, OpportunityList } from "../../types/opportunities.ts";


const Posts = () => {
  const [popUpMenu, setPopUpMenu] = useState(false);

  const date = new Date();
  const currYr = date.getFullYear();
  // replace currYr with user year

  interface OpportunityState {
    filters: {
      activeFilters: string[];
      filterMap: Filters;
    };
    activeId: string;
    opportunities: OpportunityList[];
  }

  type OpportunityAction =
    | { type: "SET_FILTERS"; activeFilters: string[]; filterMap: Filters }
    | { type: "RESET_FILTERS" }
    | { type: "REMOVE_FILTER"; filter: string }
    | { type: "SET_OPPORTUNITIES"; opportunities: OpportunityList[] };

  const reducer: React.Reducer<OpportunityState, OpportunityAction> = (state, action) => {
    switch (action.type) {
      case "SET_FILTERS":
        if (!action.activeFilters || !action.filterMap) return state;

        return {
          ...state,
          filters: {
            activeFilters: action.activeFilters,
            filterMap: action.filterMap,
          },
        };

      case "RESET_FILTERS": {
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
      }

      case "REMOVE_FILTER": {
        if (!action.filter) return state;

        const newActiveFilters = state.filters.activeFilters.filter((filter) => filter !== action.filter);
        const newFilterMap = {
          ...state.filters.filterMap,
          years: state.filters.filterMap.years.filter((year) => year !== parseInt(action.filter)),
          credits: action.filter.includes("Credit") ? [] : state.filters.filterMap.credits,
          majors: state.filters.filterMap.majors.filter((major) => major !== action.filter),
          hourlyPay: action.filter.includes("$") ? 0 : state.filters.filterMap.hourlyPay,
        };

        return {
          ...state,
          filters: {
            activeFilters: newActiveFilters,
            filterMap: newFilterMap,
          },
        };
      }

      case "SET_OPPORTUNITIES":
        if (!action.opportunities) return state;

        return {
          ...state,
          opportunities: action.opportunities,
        };

      default:
        return state;
    }
  };

  const [opportunityState, dispatch] = useReducer(reducer, {
    filters: {
      activeFilters: [currYr.toString()],
      filterMap: {
        years: [currYr],
        credits: [],
        hourlyPay: 0,
        majors: [],
      },
    },
    activeId: "",
    opportunities: [],
  });

  // Action dispatchers
  const resetFilters = useCallback(() => {
    dispatch({ type: "RESET_FILTERS" });
  }, []);

  const removeFilter = useCallback((name: string) => {
    dispatch({ type: "REMOVE_FILTER", filter: name });
  }, []);

  const setFilters = useCallback((activeFilters: string[], filterMap: Filters) => {
    dispatch({ type: "SET_FILTERS", activeFilters, filterMap });
  }, []);


  const fetchOpportunities = useCallback(async () => {
    const queryParams = new URLSearchParams(
      Object.entries(opportunityState.filters.filterMap)
        .filter(([, value]) => {
          if (Array.isArray(value)) return value.length > 0;
          return value !== 0 && value !== null && value !== undefined;
        })
        .reduce((acc, [key, value]) => {
          if (Array.isArray(value)) {
            acc[key] = value.join(",");
          } else {
            acc[key] = value.toString();
          }
          return acc;
        }, {} as Record<string, string>)
    );

    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_SERVER}/opportunity/filter?${queryParams.toString()}`, {
        method: "GET",
        credentials: "include",
      });

      if (!response.ok) {
        console.log("Error fetching opportunities", response.status);
        dispatch({ type: "SET_OPPORTUNITIES", opportunities: [] });
      } else {
        const data = await response.json();
        dispatch({ type: "SET_OPPORTUNITIES", opportunities: data });
        console.log(data);
      }
    } catch (error) {
      console.error("Error fetching opportunities:", error);
      dispatch({ type: "SET_OPPORTUNITIES", opportunities: [] });
    }
  }, [opportunityState.filters.filterMap, dispatch]);

  useEffect(() => {
    fetchOpportunities();
  }, [fetchOpportunities]);

  return (
    <section>
      <FiltersField resetFilters={resetFilters} deleteFilter={removeFilter} filters={opportunityState.filters.activeFilters} setPopUpMenu={() => setPopUpMenu(!popUpMenu)} />
      {popUpMenu && <PopUpMenu setFunction={() => setPopUpMenu(!popUpMenu)} filters={opportunityState.filters.filterMap} reset={resetFilters} setFilters={setFilters} />}
      <OpportunitiesList opportunities={opportunityState.opportunities} />
    </section>
  );
};

export default Posts;
