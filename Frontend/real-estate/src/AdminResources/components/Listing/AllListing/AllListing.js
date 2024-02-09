import React, { useEffect, useState } from "react";
import "./AllListing.css";
import House5Lg from "../../../../assets/img/TLTLogoinvert.png";
import { IoIosBed } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import { BiSolidMessageSquareEdit } from "react-icons/bi";
import { FaSquare } from "react-icons/fa";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { ImSpinner2 } from "react-icons/im";

const AllListing = () => {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [skip, setSkip] = useState(0);
  const [loading, setLoading] = useState(false);

  const fetchProducts = async () => {
    if (!skip) {
      setLoading(true);
    }
    try {
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
        setLoading(false);
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

  const deleteListing = async (deleteId) => {
    const { data } = await axios.delete(`/api/listing/delete/${deleteId}`);
    if (data.status) {
      const updatedItems = products.filter((item) => item._id !== deleteId);
      setProducts(updatedItems);
    }
  };

  const [skipLoader, setSkipLoader] = useState(false);

  const skipBtn = () => {
    setSkipLoader(true);
    setSkip((prev) => prev + 20);
  };

  return (
    <div className="all-listing__div">
      <h2>All Listing</h2>
      <form className="all-listing__firstDiv" onSubmit={filterSearchDatas}>
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
        <button>Search</button>
      </form>
      {loading ? (
        <div className="mb-[12rem] h-[40vh] flex justify-center items-center">
          <ImSpinner2 className="mx-auto animate-spin text-[#0b2850] text-4xl mt-[200px]" />
        </div>
      ) : (
        <div className="all-listing__imageCard__grid">
          {products?.map((product, index) => (
            <div key={index} className="all-listing__imageCard">
              <img src={product.imageUrls[1]} alt="" />
              <div>
                <h2 className="all-listing__header2">
                  ₦
                  {product?.regularPrice
                    ? product?.regularPrice.toLocaleString()
                    : `${product?.monthlyPrice.toLocaleString()} /per month`}
                </h2>
                <div className="all-listing__card__icons">
                  <div>
                    <IoIosBed /> {product.bedrooms} Beds
                  </div>
                  <div>
                    <IoIosBed /> {product.bathrooms} Bath
                  </div>
                  <div>
                    <FaSquare /> {product.area}
                  </div>
                </div>
                <div className="all-listing__card__descrip">
                  {product.description}
                </div>
                <div className="all-listing__card__bottom">
                  <div>
                    <div className="all-listing__card__avatar">
                      <img src={House5Lg} alt="" />
                    </div>
                    <h3>Litvak Teams</h3>
                  </div>
                  <div className="all-blog__icons">
                    <div>
                      <Link to={`/admin/update-listing/${product._id}`}>
                        <BiSolidMessageSquareEdit />
                      </Link>
                    </div>
                    <div>
                      <MdDelete onClick={() => deleteListing(product._id)} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      {skipLoader ? (
        <div className="mb-[12rem] h-[10vh] flex justify-center items-center">
          <ImSpinner2 className="mx-auto animate-spin text-[#0b2850] text-4xl mt-[200px]" />
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

export default AllListing;
