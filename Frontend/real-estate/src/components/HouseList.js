import React, { useContext } from "react";
import { HouseContext } from "./HouseContext";
import House from "./House";
import { Link } from "react-router-dom";
import { ImSpinner2 } from "react-icons/im";

const HouseList = () => {
  const { searchData, products, loading } = useContext(HouseContext);

  if (loading) {
    return (
      <div className="mb-[12rem]">
        <ImSpinner2 className="mx-auto animate-spin text-[#65ed5a] text-4xl mt-[200px]" />
      </div>
    );
  } else if (products?.length < 1) {
    return (
      <div className="mt-48 text-3xl text-center text-gray-400">
        Sorry, nothing Found
      </div>
    );
  }

  return (
    <section className="mb-20">
      <div className="container mx-auto">
        <div className="grid gap-4 mb-10 md:grid-cols-2 lg:grid-cols-3 lg:gap-14">
          {products?.slice(0, 8)?.map((house, index) => {
            return (
              <Link to={`/property/${house._id}`} key={index}>
                <House house={house} />
              </Link>
            );
          })}
        </div>
        <Link to="/listings">
          <div className="handle__show__more">
            <button>See More</button>
          </div>
        </Link>
      </div>
    </section>
  );
};

export default HouseList;
