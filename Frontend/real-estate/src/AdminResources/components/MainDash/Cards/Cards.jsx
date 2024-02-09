import React from "react";
import "./Cards.css";
import { BsHouse, BsClipboard2Data } from "react-icons/bs";
import { GiTakeMyMoney } from "react-icons/gi";

import Card from "../Card/Card";
import { LayoutGroup } from "framer-motion";

const Cards = ({
  totalListingForLastSixMonth,
  totalRentedListingForLastSixMonth,
  totalBoughtListingForLastSixMonth,
  graphData,
}) => {
  const cardsData = [
    {
      title: "Total Listings",
      color: {
        backGround: "linear-gradient(180deg, #bb67ff 0%, #c484f3 100%)",
        boxShadow: "0px 10px 20px 0px #e0c6f5",
      },
      barValue: 100,
      value: `$${totalListingForLastSixMonth.toLocaleString()}`,
      png: BsHouse,
      series: [
        {
          name: "Expected Revenue",
          data: graphData.map((obj) => obj.total),
        },
      ],
    },
    {
      title: "Sale",
      color: {
        backGround: "linear-gradient(180deg, #FF919D 0%, #FC929D 100%)",
        boxShadow: "0px 10px 20px 0px #FDC0C7",
      },
      barValue: Math.round(
        (totalBoughtListingForLastSixMonth / totalListingForLastSixMonth) * 100
      ),
      value: `$${totalBoughtListingForLastSixMonth.toLocaleString()}`,
      png: GiTakeMyMoney,
      series: [
        {
          name: "Expected Revenue",
          data: graphData.map((obj) => obj.boughtListings),
        },
      ],
    },
    {
      title: "Rent",
      color: {
        backGround:
          "linear-gradient(rgb(248, 212, 154) -146.42%, rgb(255 202 113) -46.42%)",
        boxShadow: "0px 10px 20px 0px #F9D59B",
      },
      barValue: Math.round(
        (totalRentedListingForLastSixMonth / totalListingForLastSixMonth) * 100
      ),
      value: `$${totalRentedListingForLastSixMonth.toLocaleString()}`,
      png: BsClipboard2Data,
      series: [
        {
          name: "Expected Revenue",
          data: graphData.map((obj) => obj.rentedListings),
        },
      ],
    },
  ];
  return (
    <div className="Cards">
      {cardsData.map((card, id) => {
        return (
          <LayoutGroup id={`card ${id}`} key={id}>
            <div className="parentContainer">
              <Card
                title={card.title}
                color={card.color}
                barValue={card.barValue}
                value={card.value}
                png={card.png}
                series={card.series}
                graphData={graphData}
              />
            </div>
          </LayoutGroup>
        );
      })}
    </div>
  );
};

export default Cards;
