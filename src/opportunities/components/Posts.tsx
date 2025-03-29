import FiltersField from "./FiltersField.tsx";
import React, { useReducer, useCallback, useEffect, useState } from "react";
import OpportunitiesList from "./OpportunitiesDetails.tsx";
import PopUpMenu from "./PopUpMenu.tsx";


const Posts = () => {
  const [popUpMenu, setPopUpMenu] = useState(false);

  const date = new Date();
  const month = date.getMonth();
  const currSem = (0 <= month && month <= 5) ? "Spring" : (5 < month && month <= 8) ? "Summer" : "Fall";
  const currYr = date.getFullYear();

  const reducer = (state, action) => {
    switch (action.type) {
      // case "CLEAR_FILTERS":
      //   return {
      //     ...state,
      //     filters: {
      //       activeFilters: [],
      //       filterMap: {
      //         semesters: currSem,
      //         years: currYr,
      //         credits: [],
      //         hourlyPay: "0",
      //         majors: [],
      //       },
      //     },
      //   };

      case "RESET_FILTERS": {
        const newFilterMap = {
          semesters: [currSem],
          years: [currYr],
          credits: [],
          hourlyPay: "0",
          majors: [],
        };

        return {
          ...state,
          filters: {
            activeFilters: [currSem, currYr],
            filterMap: newFilterMap,
          },
        };
      }

      case "REMOVE_FILTER": {
        const newFilterMap = { ...state.filters.filterMap };
        let newActiveFilters = state.filters.activeFilters.filter((item) => item !== action.filter);

        Object.keys(newFilterMap).forEach((key) => {
          newFilterMap[key] = newFilterMap[key].filter((item) => item !== action.filter);
          if (newFilterMap[key].length === 0) {
            delete newFilterMap[key]; // Remove empty categories
          }
        });

        return {
          ...state,
          filters: {
            activeFilters: newActiveFilters,
            filterMap: newFilterMap,
          },
        };
      }

      case "ADD_FILTER": {
        if (!action.filter || !action.category) return state;

        const newFilterMap = { ...state.filters.filterMap };
        if (!newFilterMap[action.category]) {
          newFilterMap[action.category] = [];
        }
        if (!newFilterMap[action.category].includes(action.filter)) {
          newFilterMap[action.category] = [...newFilterMap[action.category], action.filter];
        }

        return {
          ...state,
          filters: {
            activeFilters: Array.from(new Set([...state.filters.activeFilters, action.filter])),
            filterMap: newFilterMap,
          },
        };
      }

      case "SET_ACTIVE_ID":
        return state.jobs.some((job) => job.id === action.id)
          ? { ...state, activeId: action.id }
          : state;

      case "SET_JOBS":
        return action.jobs ? { ...state, jobs: action.jobs } : state;

      default:
        return state;
    }
  };

  const [jobState, dispatch] = useReducer(reducer, {
    filters: {
      activeFilters: [currSem, currYr],
      filterMap: {
        semesters: [currSem],
        years: [currYr],
        credits: [],
        hourlyPay: "0",
        majors: [],
      },
    },
    activeId: "",
    jobs: [],
  });

  // Action dispatchers
  const clearFilters = useCallback(() => {
    dispatch({ type: "CLEAR_FILTERS" });
  }, []);

  const resetFilters = useCallback(() => {
    dispatch({ type: "RESET_FILTERS" });
  }, []);

  const removeFilter = useCallback((name) => {
    dispatch({ type: "REMOVE_FILTER", filter: name });
  }, []);

  const addFilter = useCallback((name, category) => {
    dispatch({ type: "ADD_FILTER", filter: name, category });
  }, []);

  const setActiveId = useCallback((val) => {
    dispatch({ type: "SET_ACTIVE_ID", id: val });
  }, []);


  const fetchOpportunities = async () => {
    const url = `${process.env.REACT_APP_BACKEND_SERVER}/getOpportunityCards`;

    // const response = await fetch(url);

    // if (!response.ok) {
    //   console.log("Error fetching opportunities");
    // } else {
    //   let data = await response.json();
    //   data = data.data;
    //   dispatch({ type: "SET_JOBS", jobs: data });
    //   console.log(jobState.jobs);
    // }
  };

  useEffect(() => {
    fetchOpportunities();
  }, []);

  return (
    <section>
      <FiltersField resetFilters={resetFilters} deleteFilter={removeFilter} filters={jobState.filters.activeFilters} setPopUpMenu={() => setPopUpMenu(!popUpMenu)} />
      {popUpMenu && <PopUpMenu setFunction={() => setPopUpMenu(!popUpMenu)} filters={jobState.filters.filterMap} clear={clearFilters} add={addFilter} reset={resetFilters} />}
      <OpportunitiesList />
    </section>
  );
};

export default Posts;
