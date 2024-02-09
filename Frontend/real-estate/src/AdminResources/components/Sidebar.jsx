import React, { useState } from "react";
import "./Sidebar.css";
import Logo from "../../assets/img/bimboLogo.png";
import { IoIosLogOut } from "react-icons/io";
import { SidebarData } from "../Data/Data";
import { motion } from "framer-motion";
import { FaBarsStaggered } from "react-icons/fa6";
import { RiArrowDownSLine, RiArrowUpSLine } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";

const MenuItems = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [subSelected, setSubSelected] = useState(-1);

  const upIcon = isOpen ? <RiArrowUpSLine /> : <RiArrowDownSLine />;
  return (
    <>
      {!props?.item.subHeadings ? (
        <div
          className={
            props.selected === props.index
              ? "menuItem sidebar__active"
              : "menuItem"
          }
          key={props.index}
          onClick={() => props.setSelected(props.index)}
        >
          <Link to={props.item.path}>
            <props.item.icon />
            <span
              className="menu__headings"
              onClick={() => setIsOpen((prev) => !prev)}
            >
              {props?.item.heading} {props?.item.subHeadings ? upIcon : ""}
            </span>
          </Link>
        </div>
      ) : (
        <div
          className={
            props.selected === props.index
              ? "menuItem sidebar__active"
              : "menuItem"
          }
          key={props.index}
          onClick={() => props.setSelected(props.index)}
        >
          <props.item.icon onClick={() => setIsOpen((prev) => !prev)} />
          <span
            className="menu__headings"
            onClick={() => setIsOpen((prev) => !prev)}
          >
            {props?.item.heading} {props?.item.subHeadings ? upIcon : ""}
          </span>
        </div>
      )}

      {props?.item.subHeadings && isOpen ? (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 10, transition: { duration: 1 } }}
          exit={{ opacity: 0, y: -10, transition: { duration: 1 } }}
          className="menu__subheading__div"
        >
          {props?.item.subHeadings.map((subheading, index) => {
            return (
              <Link
                to={subheading.path}
                onClick={() => props.setSelected(props.index)}
                key={index}
              >
                <motion.span
                  whileHover={{ scale: 1.1 }}
                  className={
                    subSelected === index
                      ? "menu__subheadings subMenu__active"
                      : "menu__subheadings"
                  }
                  onClick={() => setSubSelected(index)}
                >
                  {subheading.name}
                </motion.span>
              </Link>
            );
          })}
        </motion.div>
      ) : (
        ""
      )}
    </>
  );
};

const Sidebar = () => {
  const [selected, setSelected] = useState(0);

  const [expanded, setExpaned] = useState(true);

  const sidebarVariants = {
    true: {
      left: "0",
    },
    false: {
      left: "-60%",
    },
  };

  const navigate = useNavigate();

  const LogOut = async () => {
    localStorage.removeItem("token");

    setTimeout(() => {
      navigate("/");
    }, 200);
  };
  return (
    <>
      <div
        className="bars"
        style={expanded ? { left: "60%" } : { left: "5%" }}
        onClick={() => setExpaned(!expanded)}
      >
        <FaBarsStaggered />
      </div>
      <motion.div
        className="sidebar"
        variants={sidebarVariants}
        animate={window.innerWidth <= 768 ? `${expanded}` : ""}
      >
        {/* logo */}
        <div className="logo">
          <img src={Logo} alt="logo" />
          <span>
            Bimbola <span>Properties</span>
          </span>
        </div>

        <div className="menu">
          {SidebarData.map((item, index) => {
            return (
              <MenuItems
                item={item}
                index={index}
                selected={selected}
                setSelected={setSelected}
                key={index}
              />
            );
          })}
          {/* signoutIcon */}
          <div className="menuItem" onClick={() => LogOut()}>
            <IoIosLogOut className="admin__logOut__opt" />
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default Sidebar;
