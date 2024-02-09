import React, { useEffect, useState } from "react";
// import { housesData } from "../data";
import { useParams, Link } from "react-router-dom";
import { BiBed, BiBath, BiArea } from "react-icons/bi";
import SimpleCarousel from "../components/SimpleCarousel";
// import House1Lg from "../assets/img/houses/house1lg.png";
import { ImSpinner2 } from "react-icons/im";
import axios from "axios";

const PropertyDetails = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState(null);

  // const house = housesData.find((house) => {
  //   return formData?.id === parseInt(id);
  // });

  //nIEARMZSSYGIodMC

  const [propertFormData, setPropertyFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    PhoneNum: "",
    interested: "",
    helpMsg: "",
  });

  const handleClick = (click) => {
    window.location.href = click;
  };

  useEffect(() => {
    const oldListing = async () => {
      setLoading(true);
      const listingId = id;
      const res = await fetch(`/api/listing/get/${listingId}`);
      const data = await res.json();
      if (data.success === false) {
        console.log(data);
        return;
      }
      setFormData(data);
      setLoading(false);
    };
    oldListing();
  }, [id]);

  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      propertFormData.PhoneNum === "" &&
      propertFormData.email === "" &&
      propertFormData.firstName === "" &&
      propertFormData.helpMsg === "" &&
      propertFormData.lastName === ""
    ) {
      setError("The required field must be filled!");
      setTimeout(() => {
        setError("");
      }, 3000);
      return;
    }

    const { data } = await axios.post("/api/email/send", {
      from: formData.email,
      to: "Abimbola876@gmail.com",
      subject: "Client Alert!!!(Real Estate Potential Customer)",
      html: `<div><p>My Name is ${propertFormData.lastName} ${propertFormData.firstName}</p><p>My email is: ${propertFormData.email}</p><p>My PhoneNumber is: ${propertFormData.PhoneNum}</p><p>Am Interested In: ${formData.address}</p><p>you can help me with:</p>${propertFormData.helpMsg}<p></p></div>`,
    });

    if (data.status) {
      setSent(true);
      setTimeout(() => {
        setSent("");
      }, 3000);
      setPropertyFormData({
        firstName: "",
        lastName: "",
        email: "",
        PhoneNum: "",
        interested: "",
        helpMsg: "",
      });
    }
  };

  if (loading) {
    return (
      <div className="mb-[12rem] h-[100vh] flex justify-center items-center">
        <ImSpinner2 className="mx-auto animate-spin text-[#65ed5a] text-4xl mt-[200px]" />
      </div>
    );
  }

  return (
    <section className="home__div__main propertydetails__div">
      <div className="container mx-auto min-h-[800px] mb-14">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="text-2xl font-semibold">{formData?.name}</h2>
            <h3 className="mb-4 text-lg">
              {formData?.address}, {formData?.zip}
            </h3>
          </div>
          <div className="flex mb-4 text-sm lg:mb-0 gap-x-2">
            <div className="px-3 text-white bg-green-500 rounded-full">
              {formData?.status.toUpperCase()}
            </div>
            <div className="px-3 text-white rounded-full bg-violet-500">
              {formData?.type}
            </div>
          </div>
          <div className="text-3xl font-semibold text-violet-600">
            ₦
            {formData?.regularPrice
              ? formData.regularPrice.toLocaleString()
              : `${formData?.monthlyPrice.toLocaleString()} /per month`}
          </div>
        </div>
        <div className="property__flex__div">
          <div className="max-w-[768px] items__prop__div">
            <div className="mb-8 w-[100%] property__details__image__div">
              {/* <img src={House1Lg} alt="house" /> */}
              <SimpleCarousel imageUrls={formData?.imageUrls} />
            </div>
            <div className="flex mb-6 gap-x-6 text-violet-700">
              <div className="flex items-center gap-x-2">
                <BiBed className="text-2xl" />
                <div>{formData?.bedrooms}</div>
              </div>
              <div className="flex items-center gap-x-2">
                <BiBath className="text-2xl" />
                <div>{formData?.bathrooms}</div>
              </div>
              <div className="flex items-center gap-x-2">
                <BiArea className="text-2xl" />
                <div>{formData?.area}</div>
              </div>
            </div>
            <div className="formdata__text">{formData?.description}</div>
            <div className="additional__features__div">
              <h1>Additional Features: </h1>
              <p>
                {formData?.elevator ? "Elevator," : ""}
                {formData?.airconditioning ? " Air Conditioning," : ""}
                {formData?.balcony ? " Balcony," : ""}
                {formData?.cctv ? " CCtv," : ""}
                {formData?.furnished ? " Fully Furnished," : ""}
                {formData?.laundry ? " Laundry," : ""}
                {formData?.parking ? " Parking Spot," : ""}
                {formData?.security ? " Security," : ""}
                {formData?.terrace ? " Terrace," : ""}
                {formData?.wifi ? " Wifi," : ""}.
              </p>
            </div>
          </div>
          <div className="flex-1 w-full px-6 py-8 mb-8 bg-white border border-gray-300 rounded-lg">
            <div className="flex items-center mb-8 gap-x-4">
              <div className="w-20 h-20 p-1 border border-gray-300 rounded-full">
                <img
                  src={formData ? formData?.imageUrls[1] : ""}
                  alt=""
                  className="agent__image__div"
                />
              </div>
              <div className="">
                <div className="text-lg font-bold">Bimbola-Properties</div>
                <Link to="" className="text-sm text-violet-700">
                  View Listing
                </Link>
              </div>
            </div>
            <form onSubmit={handleSubmit} className="flex flex-col gap-y-4">
              <input
                type="text"
                className="w-full px-4 text-sm border border-gray-300 rounded outline-none focus:border-violet-700 h-14"
                placeholder="First-Name"
                value={propertFormData.firstName}
                onChange={(e) =>
                  setPropertyFormData((prev) => ({
                    ...prev,
                    firstName: e.target.value,
                  }))
                }
              />
              <input
                type="text"
                className="w-full px-4 text-sm border border-gray-300 rounded outline-none focus:border-violet-700 h-14"
                placeholder="Last-Name"
                value={propertFormData.lastName}
                onChange={(e) =>
                  setPropertyFormData((prev) => ({
                    ...prev,
                    lastName: e.target.value,
                  }))
                }
              />
              <input
                type="text"
                className="w-full px-4 text-sm border border-gray-300 rounded outline-none focus:border-violet-700 h-14"
                placeholder="Email"
                value={propertFormData.email}
                onChange={(e) =>
                  setPropertyFormData((prev) => ({
                    ...prev,
                    email: e.target.value,
                  }))
                }
              />
              <input
                type="number"
                className="w-full px-4 text-sm border border-gray-300 rounded outline-none focus:border-violet-700 h-14"
                placeholder="Phone"
                value={propertFormData.PhoneNum}
                onChange={(e) =>
                  setPropertyFormData((prev) => ({
                    ...prev,
                    PhoneNum: e.target.value,
                  }))
                }
              />
              <textarea
                className="w-full p-4 text-sm text-gray-400 border border-gray-300 rounded outline-none resize-none focus:border-violet-700 h-36"
                placeholder="Message"
                defaultValue="Hellom I am interested in [Modern apartment]"
                value={propertFormData.helpMsg}
                onChange={(e) =>
                  setPropertyFormData((prev) => ({
                    ...prev,
                    helpMsg: e.target.value,
                  }))
                }
              ></textarea>
              <div className="flex gap-x-2">
                <button className="w-full p-4 text-sm text-white transition rounded bg-violet-700 hover:bg-violet-500">
                  Send message
                </button>
                <button
                  type="button"
                  onClick={() => handleClick(`tel:+234-906-272-0704`)}
                  className="w-full p-4 text-sm transition border rounded border-violet-700 text-violet-700 hover:border-violet-500 hover:text-violet-500"
                >
                  Call
                </button>
              </div>
              {error && <div className="error__mesage__output">{error}</div>}
              {sent && (
                <div className="sent__mesage__output">
                  Your Email has been Sent, you will recieve an email from us
                  soon.
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PropertyDetails;
