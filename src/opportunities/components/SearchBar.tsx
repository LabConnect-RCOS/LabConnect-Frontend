import React from "react";
import { CiSearch } from "react-icons/ci";

const SearchBar = () => {
  return (

    <form className="flex items-center gap-2 px-3 py-2 border rounded-md shadow-sm bg-white text-black dark:bg-gray-800 dark:text-white border-gray-300 dark:border-gray-600 w-full max-w-md">
      <CiSearch className="text-xl text-gray-600 dark:text-gray-300" />
      <input
        type="text"
        placeholder="Search"
        className="w-full bg-transparent placeholder-gray-500 dark:placeholder-gray-400 text-black dark:text-white focus:outline-none"
      />
    </form>

  );
  
};

export default SearchBar;