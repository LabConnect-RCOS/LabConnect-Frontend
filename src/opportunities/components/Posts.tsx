import { useCallback, useEffect, useState } from "react";
import FiltersField from "./FiltersField.tsx";
import OpportunitiesList from "./OpportunitiesList.tsx";
import PopUpMenu from "./PopUpMenu.tsx";
import { useOpportunity } from "../../context/OpportunityContext.tsx";


const Posts = () => {
  const [popUpMenu, setPopUpMenu] = useState(false);
  // replace currYr with user year

  const { filterMap, setOpportunities } = useOpportunity();

  

  const fetchOpportunities = useCallback(async () => {
    const queryParams = new URLSearchParams(
      Object.entries(filterMap)
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
        setOpportunities([]);
      } else {
        const data = await response.json();
        setOpportunities(data);
        console.log(data);
      }
    } catch (error) {
      console.error("Error fetching opportunities:", error);
      setOpportunities([]);
    }
  }, [filterMap, setOpportunities]);

  useEffect(() => {
    fetchOpportunities();
  }, [fetchOpportunities]);

  return (
    <section>
      <FiltersField setPopUpMenu={() => setPopUpMenu(!popUpMenu)} />
      {popUpMenu && <PopUpMenu setOpen={() => setPopUpMenu(!popUpMenu)} />}
      <OpportunitiesList />
    </section>
  );
};

export default Posts;
