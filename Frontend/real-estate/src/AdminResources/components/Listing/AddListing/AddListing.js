import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { app } from "../../../firebase";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import "./AddListing.css";
import axios from "axios";

const AddListing = () => {
  const navigate = useNavigate();
  const [files, setFiles] = useState([]);
  const [formData, setFormData] = useState({
    imageUrls: [],
    name: "",
    description: "",
    address: "",
    zip: "",
    type: "",
    status: "rent",
    bedrooms: 1,
    bathrooms: 1,
    area: "",
    regularPrice: 0,
    monthlyPrice: 0,
    parking: false,
    furnished: false,
    emergency: false,
    cctv: false,
    wifi: false,
    security: false,
    airconditioning: false,
    terrace: false,
    laundry: false,
    balcony: false,
    elevator: false,
  });

  const [imageUploadError, setImageUploadError] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleImageSubmit = (e) => {
    e.preventDefault();
    console.log(files);
    if (files.length > 0 && files.length + formData.imageUrls.length < 7) {
      setUploading(true);
      setImageUploadError(false);
      const promises = [];

      for (let i = 0; i < files.length; i++) {
        promises.push(storeImage(files[i]));
      }
      Promise.all(promises)
        .then((urls) => {
          setFormData({
            ...formData,
            imageUrls: formData.imageUrls.concat(urls),
          });
          setImageUploadError(false);
          setUploading(false);
        })
        .catch((err) => {
          setImageUploadError("Image upload failed (2 mb max per image)");
          setUploading(false);
          console.log(err);
        });
    } else {
      setImageUploadError("You can only upload 6 images per listing");
      setUploading(false);
    }
  };

  const storeImage = async (file) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`Upload is ${progress}% done`);
        },
        (error) => {
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL);
          });
        }
      );
    });
  };

  const handleRemoveImage = (index) => {
    setFormData({
      ...formData,
      imageUrls: formData.imageUrls.filter((_, i) => i !== index),
    });
  };

  const handleChange = (e) => {
    if (e.target.name === "status") {
      setFormData({
        ...formData,
        status: e.target.value,
      });
    }

    if (e.target.name === "premiere") {
      setFormData({
        ...formData,
        premeire: e.target.value,
      });
    }

    if (
      e.target.name === "parking" ||
      e.target.name === "furnished" ||
      e.target.name === "balcony" ||
      e.target.name === "terrace" ||
      e.target.name === "laundry" ||
      e.target.name === "elevator" ||
      e.target.name === "emergency" ||
      e.target.name === "airconditioning" ||
      e.target.name === "cctv" ||
      e.target.name === "wifi" ||
      e.target.name === "security"
    ) {
      setFormData({
        ...formData,
        [e.target.name]: e.target.checked,
      });
    }

    if (
      e.target.type === "number" ||
      e.target.type === "text" ||
      e.target.type === "textarea"
    ) {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (formData.imageUrls.length < 1)
        return setError("You must upload at least one image");
      setLoading(true);
      setError(false);
      const res = await axios.post("/api/listing/create", {
        headers: {
          "Content-Type": "application/json",
        },
        body: {
          ...formData,
        },
      });
      setLoading(false);
      if (res.success === false) {
        setError(res.message);
      }
      navigate(`/property/${res.data.listing._id}`);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  return (
    <div className="add-listing__div__cont">
      <h2>Create Listing</h2>
      <form className="add-listing__Div" onSubmit={handleSubmit}>
        <div className="add-listing__inputDiv">
          <div>
            <h3>Property Name</h3>
            <input
              placeholder="Property Big House"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </div>
          <div>
            <h3>Property Type</h3>
            <input
              placeholder="office,villa,apartment,house"
              value={formData.type}
              onChange={handleChange}
              type="text"
              name="type"
            />
          </div>
          <div>
            <h3>Property Status</h3>
            <select
              value={formData.status}
              name="status"
              onChange={handleChange}
            >
              <option value="rent">Rent</option>
              <option value="buy">Buy</option>
              <option value="lease">Lease</option>
            </select>
          </div>
          {formData?.status === "buy" || formData?.status === "lease" ? (
            <div>
              <h3>Property Price</h3>
              <input
                placeholder=" ₦20,0000,000"
                type="number"
                value={formData.regularPrice}
                onChange={handleChange}
                name="regularPrice"
              />
            </div>
          ) : (
            ""
          )}
          <div>
            <h3>Beds</h3>
            <input
              type="number"
              placeholder="1"
              value={formData.bedrooms}
              onChange={handleChange}
              name="bedrooms"
            />
          </div>
          <div>
            <h3>Baths</h3>
            <input
              type="number"
              placeholder="1"
              value={formData.bathrooms}
              onChange={handleChange}
              name="bathrooms"
            />
          </div>
          <div>
            <h3>Area</h3>
            <input
              placeholder="90Sq Ft"
              type="text"
              value={formData.area}
              name="area"
              onChange={handleChange}
            />
          </div>
          {/* <div>
            <h3>Premiere</h3>
            <select
              name="premiere"
              value={formData.premeire}
              onChange={handleChange}
            >
              <option value="blue_sky">Blue Sky</option>
            </select>
          </div> */}

          {formData?.status === "rent" ? (
            <div>
              <h3>Regular Price  ₦ / month</h3>
              <input
                placeholder=" ₦20,000"
                type="number"
                name="monthlyPrice"
                value={formData.monthlyPrice}
                onChange={handleChange}
              />
            </div>
          ) : (
            ""
          )}
        </div>
        <div className="add-listing__inputDiv__textarea">
          <h3>Description</h3>
          <textarea
            value={formData.description}
            name="description"
            placeholder="Message goes here..."
            onChange={handleChange}
          />
        </div>
        <div className="add-listing__inputDiv__secondList">
          <div>
            <h3>Address</h3>
            <input
              placeholder="Address Of Your Property"
              type="text"
              value={formData.address}
              name="address"
              onChange={handleChange}
            />
          </div>
          <div>
            <h3>Zip-Code</h3>
            <input
              placeholder="Enter Pin"
              type="text"
              value={formData.zip}
              name="zip"
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="add-listing__image">
          <h3>Add Image **</h3>
          <div className="flex gap-4">
            <input
              onChange={(e) => setFiles(e.target.files)}
              className="w-full p-3 border border-gray-300 rounded"
              type="file"
              id="images"
              accept="image/*"
              multiple
            />
            <button
              type="button"
              disabled={uploading}
              onClick={handleImageSubmit}
              className="p-3 text-blue-900 uppercase border border-blue-900 rounded hover:shadow-lg disabled:opacity-80"
            >
              {uploading ? "Uploading..." : "Upload"}
            </button>
          </div>
        </div>

        {formData.imageUrls.length > 0 &&
          formData.imageUrls.map((url, index) => (
            <div
              key={url}
              className="flex items-center justify-between px-[2.5rem] border"
            >
              <img
                src={url}
                alt="listing imag"
                className="object-contain w-20 h-20 rounded-lg"
              />
              <button
                type="button"
                onClick={() => handleRemoveImage(index)}
                className="p-3 text-red-700 uppercase rounded-lg hover:opacity-75"
              >
                Delete
              </button>
            </div>
          ))}
        <div className="add-listing__checkboxDiv__cont">
          <h3>Addition Features</h3>
          <div className="add-listing__checkboxDiv">
            <div>
              <input
                type="checkbox"
                name="emergency"
                onChange={handleChange}
                checked={formData.emergency}
              />
              <h4>Emergency Exit</h4>
            </div>
            <div>
              <input
                type="checkbox"
                name="cctv"
                onChange={handleChange}
                checked={formData.cctv}
              />
              <h4>CCTV</h4>
            </div>
            <div>
              <input
                type="checkbox"
                name="wifi"
                onChange={handleChange}
                checked={formData.wifi}
              />
              <h4>Free Wi-Fi</h4>
            </div>
            <div>
              <input
                type="checkbox"
                name="parking"
                onChange={handleChange}
                checked={formData.parking}
              />
              <h4>Free Parking in The Area</h4>
            </div>
            <div>
              <input
                type="checkbox"
                name="airconditioning"
                onChange={handleChange}
                checked={formData.airconditioning}
              />
              <h4>Air Conditioning</h4>
            </div>
            <div>
              <input
                type="checkbox"
                name="security"
                onChange={handleChange}
                checked={formData.security}
              />
              <h4>Security Guard</h4>
            </div>
            <div>
              <input
                type="checkbox"
                name="terrace"
                onChange={handleChange}
                checked={formData.terrace}
              />
              <h4>Terrace</h4>
            </div>
            <div>
              <input
                type="checkbox"
                name="laundry"
                onChange={handleChange}
                checked={formData.laundry}
              />
              <h4>Laundry Service</h4>
            </div>
            <div>
              <input
                type="checkbox"
                name="elevator"
                onChange={handleChange}
                checked={formData.elevator}
              />
              <h4>Elevator Lift</h4>
            </div>
            <div>
              <input
                type="checkbox"
                name="balcony"
                onChange={handleChange}
                checked={formData.balcony}
              />
              <h4>Balcony</h4>
            </div>
            <div>
              <input
                type="checkbox"
                name="furnished"
                onChange={handleChange}
                checked={formData.furnished}
              />
              <h4>Furnished</h4>
            </div>
          </div>
        </div>

        {error && <p className="text-sm text-red-700 p-[2.5rem]">{error}</p>}
        <div className="add-listing__buttons">
          <button disabled={loading || uploading}>Create Listing</button>
          <button>Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default AddListing;
