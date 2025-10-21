import React from "react";
import SmallTextButton from "./SmallTextButton.tsx";
import SearchBar from "./SearchBar.tsx";
import GroupedComponents from "../../shared/components/UIElements/GroupedComponents.jsx";
import HorizontalIconButton from "./HorizontalIconButton.tsx";
import { PiSlidersHorizontal } from "react-icons/pi";
import { MdCancel } from "react-icons/md";

interface FiltersFieldProps {
  resetFilters: () => void;
  deleteFilter: (filter: string) => void;
  filters: string[];
  setPopUpMenu: () => void;
}

export default function FiltersField({
  resetFilters,
  deleteFilter,
  filters,
  setPopUpMenu,
}: FiltersFieldProps) {
  return (
    <div className="text-gray-800 dark:text-gray-200">
      <hr className="border-gray-300 dark:border-gray-700" />

      <div className="px-3 max-h-20 flex">
        <div className="flex gap-2 w-full">
          {/* Make sure SearchBar forwards className to the actual <input> */}
          <SearchBar />

          <SmallTextButton

            onClick={setPopUpMenu}
            special={true}
          >
            <PiSlidersHorizontal className="pr-1" />
            Change Filters
            <PiSlidersHorizontal className="pl-1" />
          </SmallTextButton>

          {/* Filter “chips” */}
          <GroupedComponents gap={2}>
            {filters.map((filter) => (
              <HorizontalIconButton
                key={filter}
                onClick={deleteFilter}
                icon={<MdCancel />}
                special={false}
                
              >
                {filter}
              </HorizontalIconButton>
            ))}
          </GroupedComponents>
        </div>

        <SmallTextButton
          onClick={resetFilters}
          special={true}
        >
          Reset
        </SmallTextButton>
      </div>

      <hr className="border-gray-300 dark:border-gray-700" />
    </div>
  );
}

