import React from "react";
import SmallTextButton from "./SmallTextButton.tsx";
import SearchBar from "./SearchBar.tsx";
import GroupedComponents from "../../shared/components/UIElements/GroupedComponents";
import HorizontalIconButton from "./HorizontalIconButton.tsx";
import { PiSlidersHorizontal } from "react-icons/pi";
import { MdCancel } from "react-icons/md";

const FilterPopup = () => {
  return (
    
  )
}

const FiltersField = ({ deleteFilter, filters }) => {
  return (
    <div>
      <hr />
      <div className="filters-template">
        <div className="filters-search">
          <SearchBar />

          <GroupedComponents gap={2}>
            {filters.map((filter) => {
              return (
                <HorizontalIconButton
                  onClick={deleteFilter}
                  icon={<MdCancel />}
                  key={filter}
                  special={false}
                >
                  {filter}
                </HorizontalIconButton>
              );
            })}
          </GroupedComponents>
        </div>

        <SmallTextButton className="all-filters-btn" onClick={FilterPopup} special={true}>
          <PiSlidersHorizontal />
          All Filters
        </SmallTextButton>
      </div>
      <hr />
    </div>
  );
};

export default FiltersField;
