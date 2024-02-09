import React from "react";
import Banner from "../components/Banner";
import HouseList from "../components/HouseList";
import AboutMini from "./About/AboutMini";

const Home = () => {
  return (
    <div className="min-h-[1800px] home__div__main">
      <Banner />
      <HouseList />
      <AboutMini />
    </div>
  );
};

export default Home;
