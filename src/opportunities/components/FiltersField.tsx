import React from "react";
import SmallTextButton from "./SmallTextButton.tsx";
import SearchBar from "./SearchBar.tsx";
import GroupedComponents from "../../shared/components/UIElements/GroupedComponents";
import HorizontalIconButton from "./HorizontalIconButton.tsx";
import { PiSlidersHorizontal } from "react-icons/pi";
import { MdCancel } from "react-icons/md";
import PropTypes from "prop-types";

const FiltersField = ({ resetFilters, deleteFilter, filters, setPopUpMenu }) => {
  return (
    <div className="bg-gray-50 dark:bg-gray-900 rounded-xl px-4 py-4 mb-4 shadow-sm transition-all">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
          {/* Search Input */}
          <div className="w-full sm:w-auto">
            <SearchBar />
          </div>

          {/* Change Filters Button */}
          <SmallTextButton
            onClick={setPopUpMenu}
            className="text-blue-600 dark:text-blue-400 hover:underline transition"
            special={true}
          >
            <PiSlidersHorizontal className="text-lg mr-1" />
            Change Filters
          </SmallTextButton>

          {/* Active Filter Badges */}
          <GroupedComponents gap={2}>
            {filters[1].map((filter) => (
              <HorizontalIconButton
                onClick={() => deleteFilter(filter)}
                icon={<MdCancel />}
                key={filter}
                special={false}
                className="bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 px-3 py-1 rounded-full text-sm flex items-center"
              >
                {filter}
              </HorizontalIconButton>
            ))}
          </GroupedComponents>
        </div>

        {/* Reset Button */}
        <SmallTextButton
          onClick={resetFilters}
          className="text-sm text-gray-600 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 transition"
          special={false}
        >
          Reset
        </SmallTextButton>

      </div>
    </div>
  );
};

FiltersField.propTypes = {
  resetFilters: PropTypes.func.isRequired,
  deleteFilter: PropTypes.func.isRequired,
  filters: PropTypes.arrayOf(PropTypes.array),
  setPopUpMenu: PropTypes.func.isRequired,
};

export default FiltersField;
