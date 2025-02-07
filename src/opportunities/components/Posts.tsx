import React from "react";
import FiltersField from "./FiltersField.tsx";
import PostsField from "./PostsField.tsx";
import { useReducer } from "react";
import { useCallback } from "react";
import { useEffect } from "react";
import CheckBox from "../../staff/components/Checkbox.tsx";

const PopUpMenu = ( setFunction ) => {
  return (
    <section className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div className="fixed inset-0 bg-gray-500/75 transition-opacity" aria-hidden="true"></div>
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-2xl">
            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div className="text-2xl font-semibold text-center">Filters</div>
                <section className="flex justify-center">
                  <CheckBox
                    label="Semester"
                    options={['Summer','Fall','Spring']}
                    errorMessage={"At least one year must be selected"}
                    name={"years"}
                    type="checkbox"
                  />
                  <CheckBox
                    label="Semester"
                    options={['Summer','Fall','Spring']}
                    errorMessage={"At least one year must be selected"}
                    name={"years"}
                    type="checkbox"
                  />
                  <CheckBox
                    label="Semester"
                    options={['Summer','Fall','Spring']}
                    errorMessage={"At least one year must be selected"}
                    name={"years"}
                    type="checkbox"
                  />
                </section>

              <button type="button" onClick={setFunction} className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 shadow-xs ring-gray-300 ring-inset hover:bg-gray-50 sm:mt-0 sm:w-auto">Cancel</button>
            </div>
          </div>
        </div>
      </div>
    </section>

  );
}

const Posts = () => {
  const [popUpMenu, setPopUpMenu] = React.useState(false);

  const reducer = (state, action) => {
    switch (action.type) {
      case "REMOVE_FILTER":
        if (action.filter) {
          state.filters = state.filters.filter((item) => item !== action.filter);
        }
        return { ...state };
      case "ADD_FILTER":
        if (action.filter) {
          state.filters.push(action.filter);
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

  var [jobState, dispatch] = useReducer(reducer, {
    filters: ["Fall", "Credit", "Remote"],
    activeId: "",
    jobs: [],
  });

  const removeFilter = useCallback((name) => {
    dispatch({ type: "REMOVE_FILTER", filter: name });
  }, []);

  const addFilter = useCallback((name) => {
    dispatch({ type: "ADD_FILTER", filter: name });
  }, []);

  const setActiveId = useCallback((val) => {
    console.log(val);
    dispatch({ type: "SET_ACTIVE_ID", id: val });
  }, []);

  const fetchOpportunities = async () => {
    const url = `${process.env.REACT_APP_BACKEND_SERVER}/getOpportunityCards`;

    const response = await fetch(url);

    if (!response.ok) {
      console.log("Error fetching opportunities");
    } else {
      let data = await response.json();
      data = data.data;
      // console.log(data);
      dispatch({ type: "SET_JOBS", jobs: data });
      console.log(jobState.jobs);
    }
  };

  useEffect(() => {
    fetchOpportunities();
  }, []);

  return (
    <section>
      <FiltersField deleteFilter={removeFilter} filters={jobState.filters} setFunction={()=>setPopUpMenu(!popUpMenu)}/>
      {popUpMenu && PopUpMenu(()=>setPopUpMenu(!popUpMenu))}
      <PostsField
        activeId={jobState.activeId}
        setActive={setActiveId}
        opportunities={jobState.jobs}
      />
    </section>
  );
};

export default Posts;
