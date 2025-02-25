import React from "react";
import SmallTextButton from "./SmallTextButton.tsx";
import SearchBar from "./SearchBar.tsx";
import GroupedComponents from "../../shared/components/UIElements/GroupedComponents";
import HorizontalIconButton from "./HorizontalIconButton.tsx";
import { PiSlidersHorizontal } from "react-icons/pi";
import { MdCancel } from "react-icons/md";

const FiltersField = ({ clearFilters, deleteFilter, filters, setPopUpMenu}) => {
  const lists = ['S', 'Y', 'C', 'P']

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
            {filters.map((filterList) => {
              <div>
                {filterList.map((filterItem) => {
                    return(
                  <HorizontalIconButton
                    onClick={deleteFilter}
                    icon={<MdCancel />}
                    key={filterItem}
                    special={false}
                  >
                    {filterItem} 
                  </HorizontalIconButton>
                    )
                })}
              </div>
               
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
