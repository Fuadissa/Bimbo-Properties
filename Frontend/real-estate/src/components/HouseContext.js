import React, { useState, useEffect, createContext } from "react";
import { housesData } from "../data";
import axios from "axios";

export const HouseContext = createContext();

const HouseContextProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [skip, setSkip] = useState(0);
  const [loading, setLoading] = useState(false);

  const fetchProducts = async () => {
    try {
      setLoading(true);
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
        }, 2000);
      } else {
        if (!newProducts.length) {
          setSkip(0);
        }
        setProducts((prevProducts) => [...prevProducts, ...newProducts]);
        setTimeout(() => {
          setLoading(false);
        }, 2000);
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

  const handleClick = () => {
    setSearchData((prev) => {
      return {
        ...prev,
        loading: true,
      };
    });

    const isDefault = (str) => {
      return str.split(" ").includes("(any)");
    };
    const minPrice = parseInt(searchData?.price.split(" ")[0]);
    const maxPrice = parseInt(searchData?.price.split(" ")[2]);

    const newHouses = housesData.filter((house) => {
      const housePrice = parseInt(house.price);
      if (
        house.country === searchData.country &&
        house.type === searchData.property &&
        housePrice >= minPrice &&
        housePrice <= maxPrice
      ) {
        return house;
      }
      if (
        isDefault(searchData.country) &&
        isDefault(searchData.property) &&
        isDefault(searchData.price)
      ) {
        return house;
      }
      if (
        !isDefault(searchData.country) &&
        isDefault(searchData.property) &&
        isDefault(searchData.price)
      ) {
        return house.country === searchData.country;
      }
      if (
        !isDefault(searchData.property) &&
        isDefault(searchData.country) &&
        isDefault(searchData.price)
      ) {
        return house.type === searchData.property;
      }
      if (
        !isDefault(searchData.price) &&
        isDefault(searchData.property) &&
        isDefault(searchData.country)
      ) {
        if (housePrice >= minPrice && housePrice <= maxPrice) {
          return house;
        }
      }
      if (
        !isDefault(searchData.country) &&
        !isDefault(searchData.property) &&
        isDefault(searchData.price)
      ) {
        return (
          house.country === searchData.country &&
          house.type === searchData.property
        );
      }
      if (
        !isDefault(searchData.country) &&
        !isDefault(searchData.price) &&
        isDefault(searchData.property)
      ) {
        if (housePrice >= minPrice && housePrice <= maxPrice) {
          return house.country === searchData.country;
        }
      }
      if (
        isDefault(searchData.country) &&
        !isDefault(searchData.price) &&
        !isDefault(searchData.property)
      ) {
        if (housePrice >= minPrice && housePrice <= maxPrice) {
          return house.type === searchData.property;
        }
      }
    });
    console.log(newHouses);

    setTimeout(() => {
      return newHouses.length < 1
        ? setSearchData((prev) => {
            return {
              ...prev,
              houses: [],
              loading: false,
            };
          })
        : setSearchData((prev) => {
            return {
              ...prev,
              houses: newHouses,
              loading: false,
            };
          });
    }, 1000);
  };

  return (
    <HouseContext.Provider
      value={{
        searchData,
        setSearchData,
        filterSearchDatas,
        products,
        loading,
      }}
    >
      {children}
    </HouseContext.Provider>
  );
};

export default HouseContextProvider;
