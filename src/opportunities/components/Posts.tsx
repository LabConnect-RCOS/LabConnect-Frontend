import FiltersField from "./FiltersField.tsx";
import React, { useReducer, useCallback, useEffect, useState } from "react";
import OpportunitiesList from "./OpportunitiesDetails.tsx";
import PopUpMenu from "./PopUpMenu.tsx";


const Posts = () => {
  const [popUpMenu, setPopUpMenu] = React.useState(false);

  const date = new Date();
  const month = date.getMonth();
  const currSem = (0 <= month && month <= 5) ? "Spring" : (5 < month && month <= 8) ? "Summer" : "Fall";
  const currYr = date.getFullYear();

  const reducer = (state, action) => {
    switch (action.type) {
      case "CLEAR_FILTERS":
        state.filters = [[], []];
        return { ...state };
      case "RESET_FILTERS":
        state.filters = [[[currSem], [currYr], [], [], []], [currSem, currYr]];
        return { ...state };
      case "REMOVE_FILTER":
        if (action.filter) {
          state.filters[1] = state.filters[1].filter((item) => item !== action.filter);
          state.filters[0].map((list, index) => {
            state.filters[0][index] = list.filter((item) => item !== action.filter);
          })
        }
        return { ...state };
      case "ADD_FILTER":
        if (action.filter) {
          state.filters[0] = [...state.filters[0], action.filter];
          state.filters[1] = [...state.filters[1], ...action.filter];
          console.log(state.filters)
        }
        return { ...state };
      case "SET_ACTIVE_ID":
        if (action.id) {
          if (state.jobs.find((job) => job.id === action.id)) {
            state.activeId = action.id;
          }
        }
        return { ...state };
      case "SET_JOBS":
        if (action.jobs) {
          state.jobs = action.jobs;
        }
        return { ...state };
      default:
        return state;
    }
  };

  const [jobState, dispatch] = useReducer(reducer, {
    filters: [[[currSem], [currYr], [], [], []], [currSem, currYr]],
    activeId: "",
    jobs: [],
  });

  const clearFilters = useCallback(() => {
    dispatch({ type: "CLEAR_FILTERS" });
  }, []);

  const resetFilters = useCallback(() => {
    dispatch({ type: "RESET_FILTERS" });
  }, []);

  const removeFilter = useCallback((name) => {
    dispatch({ type: "REMOVE_FILTER", filter: name });
  }, []);

  const addFilter = useCallback((name) => {
    dispatch({ type: "ADD_FILTER", filter: name });
  }, []);

  // const setActiveId = useCallback((val) => {
  //   dispatch({ type: "SET_ACTIVE_ID", id: val });
  // }, []);

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
      <FiltersField resetFilters={resetFilters} deleteFilter={removeFilter} filters={jobState.filters} setPopUpMenu={() => setPopUpMenu(!popUpMenu)} />
      {popUpMenu && <PopUpMenu setFunction={() => setPopUpMenu(!popUpMenu)} clear={clearFilters} add={addFilter} reset={resetFilters} />}
      <OpportunitiesList />
    </section>
  );
};

export default Posts;
