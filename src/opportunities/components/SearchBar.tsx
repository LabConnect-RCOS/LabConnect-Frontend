import React from "react";
import { CiSearch } from "react-icons/ci";

const SearchBar = () => {
  return (
    <form className="flex p-2 px-3 border rounded-3xl align-items-center border-gray-400">
      <input type="text" placeholder="Search" className="outline-none" />
      <CiSearch className="text-lg" />
    </form>
  );
};

export default SearchBar;
