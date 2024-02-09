import React, { useEffect, useState } from "react";
import "./MainDash.css";
import Cards from "./Cards/Cards";
import Table from "./Table/Table";
import RightSide from "./RigtSide/RightSide";
import axios from "axios";

const MainDash = () => {
  const [totalListingForLastSixMonth, setTotalListingForLastSixMonth] =
    useState("");
  const [
    totalRentedListingForLastSixMonth,
    setTotalRentedListingForLastSixMonth,
  ] = useState("");
  const [
    totalBoughtListingForLastSixMonth,
    setTotalBoughtListingForLastSixMonth,
  ] = useState("");

  const [loading, setLoading] = useState(false);

  const [graphData, setGraphdata] = useState([]);

  const [adminListing, setAdminListing] = useState([]);
  const [adminBlog, setAdminBlog] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const { data } = await axios.get("/api/listing/admindata");
      const totalListingForLastSixMonth = data.reduce(
        (accumulator, currentValue) => {
          return accumulator + currentValue.total;
        },
        0
      );

      const totalRentedListingForLastSixMonth = data.reduce(
        (accumulator, currentValue) => {
          return accumulator + currentValue.rentedListings;
        },
        0
      );

      const totalBoughtListingForLastSixMonth = data.reduce(
        (accumulator, currentValue) => {
          return accumulator + currentValue.boughtListings;
        },
        0
      );
      setGraphdata(data);
      setTotalBoughtListingForLastSixMonth(totalBoughtListingForLastSixMonth);
      setTotalListingForLastSixMonth(totalListingForLastSixMonth);
      setTotalRentedListingForLastSixMonth(totalRentedListingForLastSixMonth);
      const res = await axios.get(`/api/listing`);
      const response = await axios.get(`/api/blog`);

      setAdminListing(res.data);
      setAdminBlog(response.data);
      setLoading(false);

      console.log(res);
    };

    fetchData();
  }, []);

  return (
    <div className="MainDash">
      <div>
        <h1>Dashboard</h1>
        <Cards
          totalListingForLastSixMonth={totalListingForLastSixMonth}
          totalRentedListingForLastSixMonth={totalRentedListingForLastSixMonth}
          totalBoughtListingForLastSixMonth={totalBoughtListingForLastSixMonth}
          graphData={graphData}
        />
        <Table adminListing={adminListing} loading={loading} />
      </div>
      <div>
        <RightSide adminBlog={adminBlog} />
      </div>
    </div>
  );
};

export default MainDash;
