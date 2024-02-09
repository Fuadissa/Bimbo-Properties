import React, { useRef, useState } from "react";
import "./ContactUs.css";
import { Link } from "react-router-dom";
import GoogleMapComponent from "./GoogleMaps";
import axios from "axios";

const ContactUs = () => {
  const handleClick = (click) => {
    window.location.href = click;
  };

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    PhoneNum: "",
    interested: "",
    helpMsg: "",
  });

  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  const form = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      formData.PhoneNum === "" &&
      formData.email === "" &&
      formData.firstName === "" &&
      formData.helpMsg === "" &&
      formData.lastName === ""
    ) {
      setError("The required field must be filled!");
      setTimeout(() => {
        setError("");
      }, 3000);
      return;
    }

    const { data } = await axios.post("/api/email/send", {
      from: formData.email,
      to: "thelitvakteam@compass.com",
      subject: "Client Alert!!!(Real Estate Potential Customer)",
      html: `<div><p>My Name is ${formData.lastName} ${formData.firstName}</p><p>My email is: ${formData.email}</p><p>My PhoneNumber is: ${formData.PhoneNum}</p><p>Am Interested In: ${formData.interested}</p><p>you can help me with:</p>${formData.helpMsg}<p></p></div>`,
    });

    if (data.status) {
      setSent(true);
      setTimeout(() => {
        setSent("");
      }, 3000);
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        PhoneNum: "",
        interested: "",
        helpMsg: "",
      });
    }
  };

  return (
    <div className="contact-us__div">
      <div className="contact-us__div__image">
        <div></div>
        <p>Get in Touch</p>
      </div>
      <div className="contactUs__writeUp">
        <div className="contactUs__writeUp__first__div">
          <h1>Got a Question?</h1>
          <p>Contact The-Litvak-Team.</p>
          <form className="contactUs__form" onSubmit={handleSubmit} ref={form}>
            <div>
              <p>
                Name <span>(required)</span>
              </p>
              <div>
                <div>
                  <p>First Name</p>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        firstName: e.target.value,
                      }))
                    }
                  />
                </div>
                <div>
                  <p>Last Name</p>
                  <input
                    type="text"
                    name="lasttName"
                    value={formData.lastName}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        lastName: e.target.value,
                      }))
                    }
                  />
                </div>
              </div>
            </div>
            <div>
              <p>
                Phone Number <span>(required)</span>
              </p>
              <input
                type="number"
                name="phoneNum"
                value={formData.PhoneNum}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    PhoneNum: e.target.value,
                  }))
                }
              />
            </div>
            <div>
              <p>
                Email <span>(required)</span>
              </p>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    email: e.target.value,
                  }))
                }
              />
            </div>
            <div className="input__radio__btn">
              <p>I'm Interested In:</p>
              <div>
                <input
                  type="radio"
                  name="Selling"
                  value="Selling"
                  checked={formData.interested === "Selling"}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      interested: e.target.value,
                    }))
                  }
                ></input>
                <p>Selling</p>
              </div>
              <div>
                <input
                  type="radio"
                  name="Buying"
                  value="Buying"
                  checked={formData.interested === "Buying"}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      interested: e.target.value,
                    }))
                  }
                ></input>
                <p>Buying</p>
              </div>
              <div>
                <input
                  type="radio"
                  name="Investing"
                  value="Investing"
                  checked={formData.interested === "Investing"}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      interested: e.target.value,
                    }))
                  }
                ></input>
                <p>Investing</p>
              </div>
              <div>
                <input
                  type="radio"
                  name="SomethingElse"
                  value="Something Else"
                  checked={formData.interested === "Something Else"}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      interested: e.target.value,
                    }))
                  }
                ></input>
                <p>Something-Else</p>
              </div>
            </div>
            <div className="contactUs__textarea">
              <p>
                How Can We Help? <span>(required)</span>
              </p>
              <textarea
                type="text"
                name="helpMsg"
                value={formData.helpMsg}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    helpMsg: e.target.value,
                  }))
                }
              />
            </div>
            {error && <div className="error__mesage__output">{error}</div>}
            {sent && (
              <div className="sent__mesage__output">
                Your Email has been Sent, you will recieve an email from us
                soon.
              </div>
            )}
            <button className="sendmsg__btn">Send Message</button>
          </form>
        </div>
        <div className="contactUs__second__div">
          <h1>Our Office</h1>
          <div>
            <button onClick={() => handleClick(`tel:+234-906-272-0704`)}>
              Call: <p>09062720704</p>
            </button>
            <button onClick={() => handleClick(`mailto:Abimbola876@gmail.com`)}>
              Email: <p>Abimbola876@gmail.com</p>
            </button>
            <Link to=""></Link>
            <p> 14 Abel Abayomi Street , Lambasa, Lekki 106104, Lagos</p>
          </div>{" "}
          <GoogleMapComponent />
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
