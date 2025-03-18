import React from "react";
import { CiSearch } from "react-icons/ci";

const SearchBar = () => {
  return (
    <form className="searchbar border-gray-400">
      <input type="text" placeholder="Search" className="outline-none"/>
      <CiSearch className="text-lg" />
    </form>
  );
};

export default SearchBar;
