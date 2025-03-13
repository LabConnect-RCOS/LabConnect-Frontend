import React from "react";
import FiltersField from "./FiltersField.tsx";
import PostsField from "./PostsField.tsx";
import { useReducer } from "react";
import { useCallback } from "react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import CheckBox from "../../staff/components/Checkbox.tsx";
import PropTypes from "prop-types";
import Input from "../../staff/components/Input";

const PopUpMenu = ( {setFunction, validYears, clear, add, reset} ) => {
  const checkboxes = [["Semester",["Summer","Fall","Spring"],"semesters"],
                ["Eligible Years",validYears,"years"],
                ["Credits", ["1","2","3","4"],"credits"]]
  const majors = [["ARCH", "LGHT", "BMED", "CHME", "CIVL", "ECSE", "ENGR", "ENVE", "ECSI", "ISYE"],
                  ["MANE", "MTLE", "ARTS", "COMM", "IHSS", "INQR", "LANG", "LITR", "PHIL"],
                  ["STDO", "WRIT", "COGS", "ECON", "GSAS", "PSYC", "ITWS", "MGMT", "ASTR"],
                  ["BCBP", "BIOL", "CHEM", "CSCI", "ISCI", "ERTH", "MATH", "MATP", "PHYS"]]
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      semesters: [],
      years: [],
      credits: [],
      hourlyPay: 0,
      majors: []
    },
  });

  interface FormData {
    semesters: string[],
    years: string[],
    credits: string[],
    hourlyPay: string,
    majors: string[]
  }

  function submitHandler(data: FormData) {
    const { semesters, years, credits, hourlyPay, majors} = data;
    clear();
    add(semesters)
    add(years)
    add(credits)
    if (hourlyPay == "0") {
      add([])
    } else {
      add([hourlyPay])
    }
    add(majors)
    setFunction()
  };

  return (
    <section className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div className="fixed inset-0 bg-gray-500/75 transition-opacity" aria-hidden="true"></div>
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-2xl">
            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4 border-4">
              <div className="text-2xl font-semibold text-center pb-3">Filters</div>
                <section className="flex flex-col">
                  <form
                    onSubmit={handleSubmit((data) => {
                      submitHandler(data);
                    })}
                    className="form-container" 
                  > <section className="flex flex-col max-h-96 overflow-y-auto"> {/* Added max-height and overflow-y-auto */}
                      <section className="flex justify-center">
                        { checkboxes.map((filter) => (
                            <div className="w-1/3" key={filter[2]}>
                              <CheckBox
                                errors={errors}
                                errorMessage={filter[2] + " checkbox failed"}
                                label={filter[0]}
                                options={filter[1]}
                                formHook={{ ...register(filter[2], {}) }}
                                name={filter[2]}
                                type="checkbox"
                              />
                            </div>
                          )) }
                      </section>
                      <section className="flex justify-center">
                        <Input
                        errors={errors}
                        label="Minimum Hourly Pay"
                        name={"hourlyPay"}
                        errorMessage={"Hourly pay must be at least 0"}
                        formHook={{ ...register("hourlyPay", {}) }}
                        type="number"
                        options={[]}
                        placeHolder="Enter minimum hourly pay"
                        />
                      </section>
                      
                      <section className="pt-7 flex flex-col justify-center">
                        <h1 className="font-semibold text-lg text-center">Majors</h1>
                        <section className="flex justify-center">
                          { majors.map((list, index) => (
                              <div className="w-1/4 pl-7 pr-7" key={"majors" + index}>
                                <CheckBox
                                  errors={errors}
                                  errorMessage={"majors" + index + " checkbox failed"}
                                  options={list}
                                  formHook={{ ...register("majors", {}) }}
                                  name={"majors" + index}
                                  type="checkbox"
                                />
                              </div>
                            )) }
                      </section>
                      </section>
                    </section>
                    
                    <section className="flex flex-row justify-center">
                      <div className="w-1/3 flex justify-center">
                        <button type="button" onClick={setFunction} className="btn btn-primary border-black text-gray-700 bg-white w-1/2 hover:text-gray-900 hover:bg-gray-200 hover:border-black focus:text-gray-900 focus:bg-gray-100 focus:border-black">Cancel</button>
                      </div>
                      <div className="w-1/3 flex justify-center">
                        <button type="button" onClick={() => {reset(); setFunction();}} className="btn btn-primary border-black text-gray-700 bg-white w-1/2 hover:text-gray-900 hover:bg-gray-200 hover:border-black focus:text-gray-900 focus:bg-gray-100 focus:border-black">Reset</button>
                      </div>
                      <div className="w-1/3 flex justify-center">
                        <input type="submit" value="Search" className="btn btn-primary bg-blue-700 text-gray-100 w-1/2 hover:bg-blue-800 focus:bg-blue-800" />
                      </div>
                    </section>

                  </form>
                </section>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

PopUpMenu.propTypes = {
  setFunction: PropTypes.func.isRequired,
  validYears: PropTypes.arrayOf(PropTypes.string),
  clear: PropTypes.func.isRequired,
  add: PropTypes.func.isRequired,
  reset: PropTypes.func.isRequired
};

const Posts = ( {years} ) => {
  const [popUpMenu, setPopUpMenu] = React.useState(false);

  const date = new Date();
  const month = date.getMonth();
  const currSem = (0 <= month && month <= 5) ? "Spring" : (5 < month && month <= 8) ? "Summer" : "Fall";
  const currYr = date.getFullYear();

  const reducer = (state, action) => {
    switch (action.type) {
      case "CLEAR_FILTERS":
        state.filters = [[],[]];
        return { ...state };
      case "RESET_FILTERS":
        state.filters = [[[currSem],[currYr],[],[],[]],[currSem, currYr]];
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
    filters: [[[currSem],[currYr],[],[],[]],[currSem, currYr]],
    activeId: "",
    jobs: [],
  });

  const clearFilters = useCallback(() => {
    dispatch({ type: "CLEAR_FILTERS"});
  }, []);

  const resetFilters = useCallback(() => {
    dispatch({ type: "RESET_FILTERS"});
  }, []);

  const removeFilter = useCallback((name) => {
    dispatch({ type: "REMOVE_FILTER", filter: name });
  }, []);

  const addFilter = useCallback((name) => {
    dispatch({ type: "ADD_FILTER", filter: name });
  }, []);

  const setActiveId = useCallback((val) => {
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
      dispatch({ type: "SET_JOBS", jobs: data });
      console.log(jobState.jobs);
    }
  };

  useEffect(() => {
    fetchOpportunities();
  }, []);

  console.log()
  return (
    <section>
      <FiltersField resetFilters={resetFilters} deleteFilter={removeFilter} filters={jobState.filters} setPopUpMenu={()=>setPopUpMenu(!popUpMenu)} />
      {popUpMenu && <PopUpMenu setFunction={() => setPopUpMenu(!popUpMenu)} validYears={years} clear={clearFilters} add={addFilter} reset={resetFilters}/>}
      <PostsField
        activeId={jobState.activeId}
        setActive={setActiveId}
        opportunities={jobState.jobs}
      />
    </section>
  );
};

Posts.propTypes = {
  years: PropTypes.arrayOf(PropTypes.string),
};

export default Posts;
