import React, { useState } from "react";
import {
  AiOutlineCalculator,
  AiOutlineHome,
  AiOutlineMoneyCollect,
  AiOutlineUser,
} from "react-icons/ai";
import { FaRegMessage } from 'react-icons/fa6';
import { IoCallOutline, IoSearch } from "react-icons/io5";
import { Link } from "react-router-dom";

const Nav = () => {
  const [activeNav, setActiveNav] = useState("/");
  return (
    <div className="navbar__div">
      <Link
        to="/"
        className={activeNav === "/" ? "active" : ""}
        onClick={() => setActiveNav("/")}
      >
        <AiOutlineHome />
      </Link>
      
      <Link
        to="/listings"
        className={activeNav === "/listings" ? "active" : ""}
        onClick={() => setActiveNav("/listings")}
      >
        <IoSearch />
      </Link>

      
      <Link
        to="/contact-us"
        className={activeNav === "contact-us" ? "active" : ""}
        onClick={() => setActiveNav("contact-us")}
      >
        <IoCallOutline />
      </Link>

      <Link
        to="/about"
        className={activeNav === "/about" ? "active" : ""}
        onClick={() => setActiveNav("/about")}
      >
        <AiOutlineUser />
      </Link>

      <Link
        to="/blogs"
        className={activeNav === "/blogs" ? "active" : ""}
        onClick={() => setActiveNav("/blogs")}
      >
        <FaRegMessage />
      </Link>
    </div>
  );
};

export default Nav;
