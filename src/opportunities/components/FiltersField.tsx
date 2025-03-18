import React from "react";
import SmallTextButton from "./SmallTextButton.tsx";
import SearchBar from "./SearchBar.tsx";
import GroupedComponents from "../../shared/components/UIElements/GroupedComponents";
import HorizontalIconButton from "./HorizontalIconButton.tsx";
import { PiSlidersHorizontal } from "react-icons/pi";
import { MdCancel } from "react-icons/md";

interface FiltersFieldProps {
  resetFilters: () => void;
  deleteFilter: (filter: string) => void;
  filters: string[][];
  setPopUpMenu: () => void;
}

const FiltersField: React.FC<FiltersFieldProps> = ({ resetFilters, deleteFilter, filters, setPopUpMenu }) => {

  return (
    <div>
      <hr />
      <div className="px-3 max-h-20 flex">
        <div className="flex gap-2 w-full">
          <SearchBar />

          <SmallTextButton className="" onClick={setPopUpMenu} special={true}>
            <PiSlidersHorizontal className="pr-1" />
            Change Filters
            <PiSlidersHorizontal className="pl-1" />
          </SmallTextButton>

          {/* Fix rendering with new filters = [ [],[],[] ]*/}
          <GroupedComponents gap={2}>
            {filters[1].map((filter) => {
              return (
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

        <SmallTextButton className="flex flex-right" onClick={resetFilters} special={true}>
          Reset
        </SmallTextButton>
      </div>
      <hr />
    </div>
  );
};

export default FiltersField;
