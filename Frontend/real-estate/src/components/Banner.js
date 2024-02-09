import React from "react";
import Image from "../assets/img/house-banner.jpg";
import Search from "../components/Search";

import { motion } from "framer-motion";

const Banner = () => {
  const fadeInVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };
  return (
    <section className="h-full max-h-[640px] mb-8 xl:mb-24">
      <div className="flex flex-col lg:flex-row">
        <div className="lg:ml-8 xl:ml-[135px] flex flex-col items-center lg:items-start text-center lg:text-left justify-center flex-1 px-4 lg:px-0">
          <h1 className="text-4xl lg:text-[58px] font-semibold leading-none mb-6">
            <span className="text-[#f9ac54]">Rent, </span>{" "}
            <span className="text-[#65ed5a]">Buy, </span>
            <span className="text-[#f9ac54]">Lease</span> Your Dream House With
            Us.
          </h1>
          <p className="max-w-[480px] mb-8">
            Discover your dream home today! Explore our exclusive listings,
            unmatched in quality and diversity. From cozy starter homes to
            luxurious estates, we have the perfect property for every lifestyle.
            Don't miss out on the opportunity to find your ideal home with us.
            Take the first step towards homeownership – browse our listings now
            and let us guide you to your perfect property. Your dream home
            awaits, start your journey with us!
          </p>
        </div>
        <motion.div
          className="items-end justify-end flex-1 hidden lg:flex litvak__house__img"
          initial="hidden"
          animate="visible"
          variants={fadeInVariants}
          transition={{ duration: 1 }}
        >
          <img src={Image} alt="" />
        </motion.div>
      </div>
      <Search />
    </section>
  );
};

export default Banner;
