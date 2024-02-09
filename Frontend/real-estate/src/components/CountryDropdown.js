import React, { useState, useContext } from "react";

import { RiMapPinLine, RiArrowDownSLine, RiArrowUpSLine } from "react-icons/ri";

import { Menu } from "@headlessui/react";

import { HouseContext } from "./HouseContext";

const CountryDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);

  const { searchData, setSearchData } = useContext(HouseContext);
  return (
    <Menu as="div" className="relative dropdown">
      <Menu.Button
        onClick={() => setIsOpen((prev) => !prev)}
        className="w-full text-left dropdown-btn"
      >
        <RiMapPinLine className="dropdown-icon-primary " />
        <div>
          <div className="text-[15px] font-medium leading-tight">
            {searchData.country}
          </div>
          <div className="text-[13px]">Sort (Any)</div>
        </div>
        {isOpen ? (
          <RiArrowUpSLine className="dropdown-icon-secondary" />
        ) : (
          <RiArrowDownSLine className="dropdown-icon-secondary" />
        )}
      </Menu.Button>

      <Menu.Items className="dropdown-menu">
        {[
          { value: 1, name: "New Listings" },
          { value: -1, name: "Standard Listings" },
        ].map((sort, index) => {
          return (
            <Menu.Item
              className="transition cursor-pointer hover:text-violet-700"
              as="li"
              key={index}
              onClick={() =>
                setSearchData((prev) => {
                  return {
                    ...prev,
                    sort: sort,
                  };
                })
              }
            >
              {sort.name}
            </Menu.Item>
          );
        })}
      </Menu.Items>
    </Menu>
  );
};

export default CountryDropdown;
