import React from "react";
import "./Table.css";
import { IoIosBed } from "react-icons/io";
import { FaToilet } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { ImSpinner2 } from "react-icons/im";

const Table = ({ adminListing, loading }) => {
  return (
    <div className="Table__div">
      <h2>Recent Property</h2>

      {loading ? (
        <div className="mb-[12rem] h-[40vh] flex justify-center items-center">
          <ImSpinner2 className="mx-auto animate-spin text-[#0b2850] text-4xl mt-[200px]" />
        </div>
      ) : (
        <div className="Table__div__inner">
          {adminListing.slice(0, 5).map((listing) => (
            <div className="table__property__card" key={listing._id}>
              <div className="table__property__card__img">
                <img src={listing.imageUrls[0]} alt="" />
              </div>
              <div className="table__property__card__title">
                <h2>
                  ₦
                  {listing?.regularPrice
                    ? listing?.regularPrice?.toLocaleString()
                    : `${listing?.monthlyPrice?.toLocaleString()} /per month`}
                </h2>
                <h4>{listing.name}</h4>
              </div>
              <div className="table__property__card__icon">
                <div>
                  <IoIosBed /> {listing.bedrooms}
                </div>
                <div>
                  <FaToilet /> {listing.bathrooms}
                </div>
                <div>
                  <FaToilet /> {listing.area}
                </div>
              </div>
              <div className="table__property__card__descrip">
                {listing.description}
              </div>
            </div>
          ))}
        </div>
      )}

      <Link to="/admin/all-listing" className="handle__show__more__admin">
        <div>See More</div>
      </Link>
    </div>
  );
};

export default Table;
