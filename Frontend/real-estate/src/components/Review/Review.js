import React, { useState } from "react";
import {
  RiArrowLeftLine,
  RiArrowRightLine,
  RiDoubleQuotesR,
  RiStarFill,
} from "react-icons/ri";
import { ReviewsData } from "./ReviewsData";
import { motion } from "framer-motion";
import "./Review.css";

const Review = () => {
  const transition = { type: "spring", duration: 3 };
  const [selected, setSelected] = useState(0);
  const rLength = ReviewsData.length;
  return (
    <div>
      <section className="review bg-black">
        <div className="section__container review__container">
          <span>
            <RiDoubleQuotesR />
          </span>
          <div className="review__content">
            <h4>Client Testimonials</h4>
            <motion.p
              key={selected}
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 100 }}
              transition={transition}
            >
              {ReviewsData[selected].reviewText}
            </motion.p>
            <div className="review__rating flex">
              {[...Array(ReviewsData[selected].star).keys()].map(() => (
                <span>
                  <RiStarFill />
                </span>
              ))}
            </div>
            <div className="review__footer">
              <motion.div
                className="review__member"
                key={selected}
                initial={{ opacity: 0, x: -100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 100 }}
                transition={transition}
              >
                <div className="review__member__details">
                  <h4>{ReviewsData[selected].name}</h4>
                  <p>{ReviewsData[selected].status}</p>
                </div>
                <div className="review__nav">
                  <span
                    onClick={() => {
                      selected === 0
                        ? setSelected(rLength - 1)
                        : setSelected((prev) => prev - 1);
                    }}
                  >
                    <RiArrowLeftLine />
                  </span>
                  <span
                    onClick={() => {
                      selected === rLength - 1
                        ? setSelected(0)
                        : setSelected((prev) => prev + 1);
                    }}
                  >
                    <RiArrowRightLine />
                  </span>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Review;
