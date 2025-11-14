import React from "react";
import SmallTextButton from "./SmallTextButton.tsx";
import GroupedComponents from "../../shared/components/UIElements/GroupedComponents.jsx";
import HorizontalIconButton from "./HorizontalIconButton.tsx";
import { PiSlidersHorizontal } from "react-icons/pi";
import { MdCancel } from "react-icons/md";
import { CiSearch } from "react-icons/ci";
import { useOpportunity } from "../../context/useOpportunity.tsx";

interface FiltersFieldProps {
  setPopUpMenu: () => void;
}


export default function FiltersField({ setPopUpMenu }: FiltersFieldProps) {
  const { activeFilters, resetFilters, removeFilter, setQuery } = useOpportunity();
  const [newQuery, setNewQuery] = React.useState("");
  return (
    <div>
      <hr />
      <div className="px-3 max-h-20 flex">
        <div className="flex gap-2 w-full">
          <form onSubmit={(e) => { e.preventDefault(); setQuery(newQuery); }} className="flex p-2 px-3 border rounded-3xl align-items-center border-gray-400" >
            <input
                type="search"
                placeholder="Search"
                className="bg-white px-0 border-none focus-visible:ring-0 focus-visible:outline-none"
                value={newQuery}
                onChange={(e) => setNewQuery(e.target.value)}
            />
            <CiSearch className="text-lg" />
          </form>

          <SmallTextButton className="" onClick={setPopUpMenu} special={true}>
            <PiSlidersHorizontal className="pr-1" />
            Change Filters
            <PiSlidersHorizontal className="pl-1" />
          </SmallTextButton>

          {/* Fix rendering with new filters = [ [],[],[] ]*/}
          <GroupedComponents gap={2}>
            {activeFilters.map((filter) => {
              return (
                <HorizontalIconButton
                  onClick={() => removeFilter(filter)}
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
