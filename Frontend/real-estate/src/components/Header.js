import React from "react";
import { Link } from "react-router-dom";
// import Logo from "../assets/img/logo.svg";
import "../index.css";
import Logo from "../assets/img/bimboLogo.png";

const Header = () => {
  const handleClick = (click) => {
    window.location.href = click;
  };
  return (
    <header className="py-6 mt-8 mb-12 header__divv">
      <div className="container flex items-center justify-between mx-auto">
        <Link to="/" className="logo__icon">
          <div>
            <img src={Logo} alt="Logo" />
          </div>
          <p>Bimbola Properties</p>
        </Link>

        <div className="flex items-center gap-6">
          <Link
            to="/contact-us"
            className="text-white transition hover:text-[#0B2850]"
          >
            Contact Us
          </Link>
          <button
            className="px-4 py-3 text-white transition rounded-lg bg-[#65ed5a] hover:bg-violet-800"
            onClick={() => handleClick(`tel:+1-646-679-3851`)}
          >
            Call Me
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
