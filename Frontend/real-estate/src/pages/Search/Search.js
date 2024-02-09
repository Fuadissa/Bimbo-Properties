import React, { useEffect, useState } from "react";
import "./Search.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import House from "../../components/House";
import { ImSpinner2 } from "react-icons/im";
// import { motion } from "framer-motion";

const Search = () => {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [skip, setSkip] = useState(0);
  const [loading, setLoading] = useState(false);

  const fetchProducts = async () => {
    try {
      if (!skip) {
        setLoading(true);
      }
      const response = await axios.get(
        `/api/listing?search=${searchData.query || ""}&sort=${
          searchData.sort || ""
        }&price=${searchData.price || ""}&status=${
          searchData.status || ""
        }&skip=${skip}`
      );
      const newProducts = response.data;
      if (!skip) {
        setProducts(newProducts);
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      } else {
        if (!newProducts.length) {
          setSkip(0);
        }
        setProducts((prevProducts) => [...prevProducts, ...newProducts]);
        setSkipLoader(false);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [skip]);

  const [searchData, setSearchData] = useState({
    query: "",
    status: "",
    price: "",
    sort: "",
  });

  const filterSearchDatas = (e) => {
    e.preventDefault();
    // navigate(
    //   `/admin/all-listing/${searchData.query || ""}/${searchData.sort || ""}/${
    //     searchData.price || ""
    //   }/${searchData.state || ""}`
    // );
    setSkip(0);
    fetchProducts();
  };

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

  // const fadeInVariants = {
  //   hidden: { opacity: 0 },
  //   visible: { opacity: 1 },
  // };

  const [skipLoader, setSkipLoader] = useState(false);

  const skipBtn = () => {
    setSkipLoader(true);
    setSkip((prev) => prev + 20);
  };

  return (
    <div className="">
      <div className="contact-us__div__image">
        <div></div>
        <p>Our Listings.</p>
      </div>
      <form
        className="all-listing__firstDiv all-listing-search__firstDiv"
        onSubmit={filterSearchDatas}
      >
        <div>
          <input
            placeholder="Enter Your Keyboard..."
            onChange={(e) =>
              setSearchData({ ...searchData, query: e.target.value })
            }
            value={searchData.query}
          />
        </div>
        <div>
          <select
            onChange={(e) =>
              setSearchData({ ...searchData, status: e.target.value })
            }
            value={searchData.state}
          >
            <option hidden>Type (Any)</option>
            <option value="rent">Rent</option>
            <option value="buy">Buy</option>
            <option value="lease">Lease</option>
          </select>
        </div>
        <div>
          <select
            onChange={(e) =>
              setSearchData({ ...searchData, sort: e.target.value })
            }
            value={searchData.sort}
          >
            <option hidden>Sort (Any)</option>
            <option value="-1">New Listings</option>
            <option value="1">Standard listing</option>
          </select>
        </div>
        <div>
          <select
            onChange={(e) =>
              setSearchData({ ...searchData, price: e.target.value })
            }
            value={searchData.price}
          >
            <option hidden>Price (Any)</option>
            {prices.map((price, index) => (
              <option key={index} value={price.value}>
                {price.optionValue}
              </option>
            ))}
          </select>
        </div>
        <button className="bg-[#65ed5a]">Search</button>
      </form>
      {loading ? (
        <div className="mb-[12rem] h-[80vh] flex justify-center items-center">
          <ImSpinner2 className="mx-auto animate-spin text-[#65ed5a] text-4xl mt-[200px]" />
        </div>
      ) : products.length < 1 ? (
        <div className="mt-48 text-3xl text-center text-gray-400">
          Sorry, nothing Found
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-14">
          {products?.map((house, index) => {
            return (
              <Link to={`/property/${house._id}`} key={index}>
                <House house={house} />
              </Link>
            );
          })}
        </div>
      )}

      {skipLoader ? (
        <div className="mb-[12rem] h-[30vh] flex justify-center items-center">
          <ImSpinner2 className="mx-auto animate-spin text-[#65ed5a] text-4xl mt-[200px]" />
        </div>
      ) : (
        ""
      )}
      {skipLoader ? (
        <div className="mb-[12rem] h-[30vh] flex justify-center items-center">
          <ImSpinner2 className="mx-auto animate-spin text-[#65ed5a] text-4xl mt-[200px]" />
        </div>
      ) : (
        ""
      )}
      <div className="handle__show__more">
        <button
          disabled={skipLoader}
          onClick={() => skipBtn()}
          className="hover:opacity-95 disabled:opacity-80"
        >
          {skipLoader ? "Loading..." : "Show More"}
        </button>
      </div>
    </div>
  );
};

export default Search;
