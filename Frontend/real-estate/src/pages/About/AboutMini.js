import React from "react";
import { Link } from "react-router-dom";

const AboutMini = () => {
  return (
    <div>
      <div className="content__litvak">
        <section></section>
        <div>
          <h1>₦1B+</h1>
          <h2>Closed Sales Volume All Time</h2>
          <p>
            Bimbola-Properties has sold over 1 Billion naira worth of real
            estate, and has passed along over 1,100 keys to new renters and
            homeowners.
          </p>
        </div>
        <div>
          <h1>10+</h1>
          <h2>Years Of Seling</h2>
          <p>
            With over 1 decades of experience, Bimbola-Properties is highly
            experienced and knowledgeable. Whatever your situation,
            BimboProperties ensures you're in good hands.
          </p>
        </div>
        <div>
          <h1>1,100+</h1>
          <h2>Homes Sold</h2>
          <p>
            Thousands of Bimbola-Properties clients have been created since its
            inception, and the count continues to grow.
          </p>
        </div>
      </div>
      <div className="litvakist__table__about">
        <div>
          <h2>Ready to be the Next Home Owner?</h2>
        </div>
        <p>Contact Bimbola Properties today.</p>
        <Link to="/contact-us">
          <div className="about__contact__button">SCHEDULE APPOINTMENT </div>
        </Link>
      </div>
    </div>
  );
};

export default AboutMini;
