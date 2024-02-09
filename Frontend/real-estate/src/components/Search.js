import React, { useContext } from "react";
import CountryDropdown from "./CountryDropdown";
import PropertyDropdown from "./PropertyDropdown";
import PriceRangeDropdown from "./PriceRangeDropdown";
import { RiSearch2Line } from "react-icons/ri";
import { HouseContext } from "./HouseContext";

const Search = () => {
  const { searchData, filterSearchDatas } = useContext(HouseContext);
  const { houses } = searchData;
  return (
    <div
      className="px-[30px] py-6 max-w-[1170px] mx-auto flex flex-col lg:flex-row justify-between gap-4 lg:gap-x-3 relative lg:-top-4 shadow-1
    bg-white lg:bg-transparent lg:backdrop-blur rounded-lg"
    >
      <CountryDropdown />
      <PropertyDropdown />
      <PriceRangeDropdown />
      <button
        className="bg-[#65ed5a] hover:bg-[#8bdd85] transition w-full lg:max-w-[162px] h-16 rounded-lg flex justify-center items-center
      text-white text-lg"
        onClick={(e) => filterSearchDatas(e)}
      >
        <RiSearch2Line />
      </button>
    </div>
  );
};

export default Search;
