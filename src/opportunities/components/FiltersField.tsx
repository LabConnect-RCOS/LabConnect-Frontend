import React, { useState } from "react";
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
  const [showFilters, setShowFilters] = useState(false);

  return (
    <div className="bg-white shadow-md rounded-xl p-4">
      {/* Top row with search + reset only */}
      <div className="flex flex-wrap justify-between items-center gap-3 mb-4">
        <SearchBar className="flex-1 min-w-[200px]" />

        {/* Reset button stays in top bar */}
        <SmallTextButton
          className="px-3 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition"
          onClick={resetFilters}
          special={true}
        >
          Reset
        </SmallTextButton>
      </div>

      {/* Active filters + Change Filters button */}
      <GroupedComponents gap={2}>
        {filters.map((filter) => (
          <HorizontalIconButton
            onClick={() => deleteFilter(filter)}
            icon={<MdCancel />}
            key={filter}
            special={false}
          >
            {filter}
          </HorizontalIconButton>
        ))}

        {/* Change Filters button placed at the end of the chips row */}
        <SmallTextButton
          className="px-3 py-1 rounded-lg border border-gray-300 hover:bg-gray-100 transition flex items-center"
          onClick={() => setShowFilters((prev) => !prev)}
          special={true}
        >
          <PiSlidersHorizontal className="mr-1" />
          {showFilters ? "Hide Filters" : "Change Filters"}
        </SmallTextButton>
      </GroupedComponents>

      {/* Show filters only if toggled */}
      {showFilters && (
        <>
          <hr className="my-4" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
            {/* Class Year */}
            <div>
              <h3 className="font-semibold mb-2">Class Year</h3>
              <select className="w-full border rounded-lg p-2 focus:ring focus:ring-blue-300">
                <option>Freshman</option>
                <option>Sophomore</option>
                <option>Junior</option>
                <option>Senior</option>
              </select>
            </div>

            {/* Credits */}
            <div>
              <h3 className="font-semibold mb-2">Credits</h3>
              <div className="space-y-1">
                {[1, 2, 3, 4].map((num) => (
                  <label key={num} className="flex items-center gap-2">
                    <input type="checkbox" className="form-checkbox" />
                    {num}
                  </label>
                ))}
              </div>
            </div>

            {/* Minimum Hourly Pay */}
            <div>
              <h3 className="font-semibold mb-2">Minimum Hourly Pay</h3>
              <input
                type="number"
                min="0"
                className="w-full border rounded-lg p-2 focus:ring focus:ring-blue-300"
              />
            </div>
          </div>

          <hr className="my-4" />

          {/* Majors */}
          <h3 className="font-semibold mb-2">Majors</h3>
          <div className="h-32 overflow-y-auto border rounded-lg p-2">
            {/* Majors list will go here */}
          </div>
        </>
      )}
    </div>
  );
}
