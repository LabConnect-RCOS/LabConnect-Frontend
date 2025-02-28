import React, {useState, useEffect} from "react";
import SmallTextButton from "./SmallTextButton.tsx";
import SearchBar from "./SearchBar.tsx";
import GroupedComponents from "../../shared/components/UIElements/GroupedComponents";
import HorizontalIconButton from "./HorizontalIconButton.tsx";
import { PiSlidersHorizontal } from "react-icons/pi";
import { MdCancel } from "react-icons/md";

const FiltersField = ({ clearFilters, deleteFilter, filters, setPopUpMenu}) => {
  const [linkedFilters, setLinkedFilters] = useState([]);

  // Use useEffect to update linkedFilters whenever filters change
  useEffect(() => {
    // Logic to update linkedFilters based on the filters array
    const updatedLinkedFilters = filters.flat().filter(element => element !== ""); // Flatten the nested arrays
    setLinkedFilters(updatedLinkedFilters); // Update the linkedFilters state
  }, [filters]); // This effect runs whenever filters change
  
  return (
    <div>
      <hr />
      <div className="px-3 max-h-20 flex">
        <div className="flex gap-2 w-full">
          <SearchBar />

          <SmallTextButton className="" onClick={setPopUpMenu} special={true}>
            <PiSlidersHorizontal />
            All Filters
            <PiSlidersHorizontal />
          </SmallTextButton>

          {/* Fix rendering with new filters = [ [],[],[] ]*/}
          <GroupedComponents gap={2}>
            {linkedFilters.map((filter) => {
              return(
                <HorizontalIconButton
                  onClick={deleteFilter}
                  icon={<MdCancel />}
                  key={filter}
                  special={false}
                >
                  {filter}
                </HorizontalIconButton>
              )
            })}
          </GroupedComponents>
        </div>

        <SmallTextButton className="flex flex-right" onClick={clearFilters} special={true}>
          Clear
        </SmallTextButton>
      </div>
      <hr />
    </div>
  );
};

export default FiltersField;
