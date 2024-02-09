import React, { useEffect, useState } from "react";
import "./About.css";
import { Link } from "react-router-dom";
import AboutMini from "./AboutMini";

import { motion } from "framer-motion";

const AboutUs = () => {
  const [videoWidth, setVideoWidth] = useState(640); // Default width
  const [videoHeight, setVideoHeight] = useState(360); // Default height

  useEffect(() => {
    // Function to update video dimensions based on screen width
    const updateVideoDimensions = () => {
      const screenWidth = window.innerWidth;

      // Adjust dimensions based on your requirements
      if (screenWidth < 600) {
        setVideoWidth(300);
        setVideoHeight(200);
      } else if (screenWidth < 1200) {
        setVideoWidth(640);
        setVideoHeight(360);
      } else {
        setVideoWidth(640);
        setVideoHeight(360);
      }
    };

    // Attach the event listener to update dimensions when the window is resized
    window.addEventListener("resize", updateVideoDimensions);

    // Initial call to set dimensions based on the screen size
    updateVideoDimensions();

    // Cleanup: remove the event listener when the component unmounts
    return () => {
      window.removeEventListener("resize", updateVideoDimensions);
    };
  }, []); // Empty dependency array ensures that the effect runs only once on mount

  const fadeInVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  return (
    <div>
      <motion.div
        className="about__div__image"
        initial="hidden"
        animate="visible"
        variants={fadeInVariants}
        transition={{ duration: 1 }}
      >
        <div></div>
        <p className="z-50">How It All Started....</p>
      </motion.div>
      <div className="about__writeup__div">
        <div className="about__whoisLitvat">
          <p>What is Bimbola Properties?</p>
        </div>
        <p>
          Bimbola Properties is a dynamic and forward-thinking real estate
          agency and consultancy firm dedicated to serving the diverse needs of
          our clients. Founded by a team of seasoned professionals with
          extensive experience in the real estate industry, we bring a wealth of
          knowledge, insight, and innovation to every transaction.
        </p>
        <h2 className="about__litvak__leader">Our Mission:</h2>
        <p>
          Our mission is simple yet profound: to empower our clients to make
          informed decisions, achieve their real estate goals, and unlock the
          full potential of their investments. We accomplish this by delivering
          exceptional service, fostering strong relationships, and staying ahead
          of market trends and developments.
        </p>
        <h2 className="about__litvak__leader">What We Do:</h2>
        <p>
          We offer a comprehensive range of services tailored to meet the unique
          needs of each client. Whether you're buying, selling, renting, or
          investing in residential, commercial, or industrial properties, we
          have the expertise and resources to guide you every step of the way.
          Our services include: Residential Sales, Purchases Commercial Leasing,
          Sales Property Management Investment Consultancy Market Analysis,
          Research Real Estate Development Consulting Relocation Services Legal
          and Financial Advisory
        </p>
        <p>
          With a proven track record of quick lease-ups and repairing large
          vacancies, the team is also sourced by major landlords to assist with
          ground-up construction, maximizing rental portfolios, and revamping
          consumer exposure.
        </p>
        <h2 className="about__litvak__leader">Why Choose Us:</h2>
        <p>
          Choosing the right real estate partner can make all the difference in
          the success of your property endeavors. Here are a few reasons why
          clients continue to choose Bimbola Properties: Expertise: Our team
          consists of highly skilled professionals with in-depth knowledge of
          the local and regional real estate markets. Personalized Service: We
          take the time to understand each client's unique objectives and tailor
          our services to meet their specific needs and preferences. Integrity:
          Honesty, transparency, and integrity are at the core of everything we
          do. Clients can trust us to always act in their best interests.
          Innovation: We leverage cutting-edge technology and innovative
          strategies to stay ahead of the curve and deliver superior results.
          Client-Centric Approach: Our clients are our top priority, and we go
          above and beyond to ensure their satisfaction and success
        </p>
      </div>
      <AboutMini />
    </div>
  );
};

export default AboutUs;
