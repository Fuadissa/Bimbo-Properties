// GoogleMap.js
import React from "react";

const GoogleMapComponent = () => {
  //vrhj bklz ninh nscy
  return (
    <iframe
      title={`Google Map Litvak@Compass`}
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3964.1221551424505!2d3.5821792!3d6.506217699999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103bfa75e5f4bee3%3A0x2f2671178b683d2d!2s14%20Abel%20Abayomi%20Street%2C%20Lambasa%2C%20Lekki%20106104%2C%20Lagos!5e0!3m2!1sen!2sng!4v1707413267108!5m2!1sen!2sng"
      width="600"
      height="450"
      style={{ border: 0 }}
      allowFullScreen=""
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
      className="litvak__map"
    ></iframe>
  );
};

export default GoogleMapComponent;
