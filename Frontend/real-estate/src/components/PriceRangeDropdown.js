import React, { useState, useContext } from "react";

import {
  RiWallet3Line,
  RiArrowDownSLine,
  RiArrowUpSLine,
} from "react-icons/ri";

import { Menu } from "@headlessui/react";

import { HouseContext } from "./HouseContext";

const PriceRangeDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);

  const { searchData, setSearchData } = useContext(HouseContext);

  const prices = [
    {
      value: "100000-130000",
      optionValue: "$100,000 - $130,000",
    },
    {
      value: "130000-160000",
      optionValue: "$130,000 - $160,000",
    },
    {
      value: "160000-190000",
      optionValue: "$160,000 - $190,000",
    },

    {
      value: "190000 - 220000",
      optionValue: "$190,000 - $220,000",
    },

    {
      value: "220000 - 500000",
      optionValue: "$220,000 - $500,000",
    },

    {
      value: "500000 - 1000000",
      optionValue: "$500,000 - $1,000,000",
    },
    {
      value: "1000000 - 10000000",
      optionValue: "$1,000,000 - $10,000,000",
    },
    {
      value: "10000000 - 100000000",
      optionValue: "$10,000,000 - $100,000,000",
    },
  ];

  return (
    <Menu as="div" className="relative dropdown">
      <Menu.Button
        onClick={() => setIsOpen((prev) => !prev)}
        className="w-full text-left dropdown-btn"
      >
        <RiWallet3Line className="dropdown-icon-primary " />
        <div>
          <div className="text-[15px] font-medium leading-tight">
            {searchData.price}
          </div>
          <div className="text-[13px]">Choose price range</div>
        </div>
        {isOpen ? (
          <RiArrowUpSLine className="dropdown-icon-secondary" />
        ) : (
          <RiArrowDownSLine className="dropdown-icon-secondary" />
        )}
      </Menu.Button>

      <Menu.Items className="dropdown-menu">
        {prices.map((price, index) => {
          return (
            <Menu.Item
              className="transition cursor-pointer hover:text-violet-700"
              as="li"
              key={index}
              onClick={() =>
                setSearchData((prev) => {
                  return {
                    ...prev,
                    price: price.value,
                  };
                })
              }
            >
              {price.optionValue}
            </Menu.Item>
          );
        })}
      </Menu.Items>
    </Menu>
  );
};

export default PriceRangeDropdown;
