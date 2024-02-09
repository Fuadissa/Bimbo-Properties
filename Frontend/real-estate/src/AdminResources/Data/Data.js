// Sidebar imports

import { RxDashboard } from "react-icons/rx";
import { BsHouses, BsHouse, BsClipboard2Data } from "react-icons/bs";
import { FaRegMessage, FaRegUser } from "react-icons/fa6";
import { LuPencil } from "react-icons/lu";
import { GiTakeMyMoney } from "react-icons/gi";

// Analytics Cards imports

// Recent Card Imports
import img1 from "../imgs/img1.png";
import img2 from "../imgs/img2.png";
import img3 from "../imgs/img3.png";

// Sidebar Data
export const SidebarData = [
  {
    icon: RxDashboard,
    heading: "Dashboard",
    path: "/admin",
  },
  {
    icon: BsHouses,
    heading: "Listings",
    subHeadings: [
      {
        name: "All Listings",
        path: "/admin/all-listing",
      },
      {
        name: "Create Listing",
        path: "/admin/add-listing",
      },
    ],
  },
  {
    icon: LuPencil,
    heading: "Blogs",
    subHeadings: [
      {
        name: "All Blogs",
        path: "/admin/all-blog",
      },
      {
        name: "Create Blogs",
        path: "/admin/add-blog",
      },
    ],
  },
  {
    icon: FaRegMessage,
    heading: "Messages",
    path: "/admin/messages",
  },
  {
    icon: FaRegUser,
    heading: "Agents",
    path: "/admin/agents",
  },
];

// Analytics Cards Data
export const cardsData = [
  {
    title: "Total Listings",
    color: {
      backGround: "linear-gradient(180deg, #bb67ff 0%, #c484f3 100%)",
      boxShadow: "0px 10px 20px 0px #e0c6f5",
    },
    barValue: 100,
    value: "25,970",
    png: BsHouse,
    series: [
      {
        name: "Sales",
        data: [31, 40, 28, 51, 42, 109, 100],
      },
    ],
  },
  {
    title: "Sale",
    color: {
      backGround: "linear-gradient(180deg, #FF919D 0%, #FC929D 100%)",
      boxShadow: "0px 10px 20px 0px #FDC0C7",
    },
    barValue: 80,
    value: "14,270",
    png: GiTakeMyMoney,
    series: [
      {
        name: "Revenue",
        data: [10, 100, 50, 70, 80, 30, 40],
      },
    ],
  },
  {
    title: "Rent",
    color: {
      backGround:
        "linear-gradient(rgb(248, 212, 154) -146.42%, rgb(255 202 113) -46.42%)",
      boxShadow: "0px 10px 20px 0px #F9D59B",
    },
    barValue: 60,
    value: "4,270",
    png: BsClipboard2Data,
    series: [
      {
        name: "Expenses",
        data: [10, 25, 15, 30, 12, 15, 20],
      },
    ],
  },
];

// Recent Update Card Data
export const UpdatesData = [
  {
    img: img1,
    name: "Andrew Thomas",
    noti: "has ordered Apple smart watch 2500mh battery.",
    time: "25 seconds ago",
  },
  {
    img: img2,
    name: "James Bond",
    noti: "has received Samsung gadget for charging battery.",
    time: "30 minutes ago",
  },
  {
    img: img3,
    name: "Iron Man",
    noti: "has ordered Apple smart watch, samsung Gear 2500mh battery.",
    time: "2 hours ago",
  },
];
