import React from "react";
import {
  RiCompass4Line,
  RiFacebookFill,
  RiInstagramFill,
  RiTwitterFill,
  RiWhatsappFill,
} from "react-icons/ri";
import Logo from "../assets/img/bimboLogo.png";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="bg-[#00ff6a]">
      <footer className="section__container footer__container">
        <div className="footer__col">
          <Link to="/">
            <div className="footer__logo">
              <img src={Logo} alt="logo" />
            </div>
          </Link>
          <p>
            Take the first step towards becoming a home owner, by buying,
            selling or leaseing with us. Let win, achieve, and conquer together!
          </p>
          <div className="footer__socials">
            <Link to="https://l.instagram.com/?u=https%3A%2F%2Fwa.me%2F2349036494088&e=AT1A2RQLmgOb4RCZA5713BTqLYUSooVk6RhCtYNmPCtLxrsZnu6iDqZeCYNOcNg8y1BGneaCiRZwpG-G-p9K3yKBMvsu71p0">
              <li>
                <RiWhatsappFill />
              </li>
            </Link>
            <Link to="https://www.instagram.com/bimbolaproperties/">
              <li>
                <RiInstagramFill />
              </li>
            </Link>
          </div>
        </div>
        <div className="footer__col">
          <h4>Company</h4>
          <Link to="https://www.compass.com/agents/litvak-team/">
            <li>Compass</li>
          </Link>
          <Link to="https://www.facebook.com/thelitvakteam/">
            <li>Facebook</li>
          </Link>
          <Link to="https://www.instagram.com/thelitvakteam/">
            <li>Instagram</li>
          </Link>
        </div>
        <div className="footer__col">
          <h4>About</h4>
          <Link to="/about">
            <li>About-Us</li>
          </Link>
          <Link to="blogs">
            <li>Blogs</li>
          </Link>
        </div>
        <div className="footer__col">
          <h4>Contact</h4>
          <Link to="/contact-us">
            <li>Contact Us</li>
          </Link>
          <Link to="/listings">
            <li>Search</li>
          </Link>
        </div>
      </footer>
      <div className="footer__bar">
        {" "}
        Copyright & copy; 2022. All rights reserved.
      </div>
    </div>
  );
};

export default Footer;
