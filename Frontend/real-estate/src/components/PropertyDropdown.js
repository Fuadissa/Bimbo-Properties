import React, { useState, useContext } from "react";

import { RiHome5Line, RiArrowDownSLine, RiArrowUpSLine } from "react-icons/ri";

import { Menu } from "@headlessui/react";

import { HouseContext } from "./HouseContext";

const PropertyDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);

  const { searchData, setSearchData } = useContext(HouseContext);
  return (
    <Menu as="div" className="relative dropdown">
      <Menu.Button
        onClick={() => setIsOpen((prev) => !prev)}
        className="w-full text-left dropdown-btn"
      >
        <RiHome5Line className="dropdown-icon-primary" />
        <div>
          <div className="text-[15px] font-medium leading-tight">
            {searchData.property}
          </div>
          <div className="text-[13px]">Select Property Type (Any)</div>
        </div>
        {isOpen ? (
          <RiArrowUpSLine className="dropdown-icon-secondary" />
        ) : (
          <RiArrowDownSLine className="dropdown-icon-secondary" />
        )}
      </Menu.Button>

      <Menu.Items className="dropdown-menu">
        {["buy", "rent", "lease"].map((property, index) => {
          return (
            <Menu.Item
              className="transition cursor-pointer hover:text-violet-700"
              as="li"
              key={index}
              onClick={() =>
                setSearchData((prev) => {
                  return {
                    ...prev,
                    status: property,
                  };
                })
              }
            >
              {property}
            </Menu.Item>
          );
        })}
      </Menu.Items>
    </Menu>
  );
};

export default PropertyDropdown;
