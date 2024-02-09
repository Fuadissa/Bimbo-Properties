const mongoose = require("mongoose");

const listingSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    area: {
      type: String,
      required: true,
    },
    zip: {
      type: String,
      required: true,
    },
    regularPrice: {
      type: Number,
      required: true,
    },
    monthlyPrice: {
      type: Number,
      required: true,
    },
    bathrooms: {
      type: Number,
      required: true,
    },
    bedrooms: {
      type: Number,
      required: true,
    },
    furnished: {
      type: Boolean,
    },
    parking: {
      type: Boolean,
    },
    type: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    emergency: {
      type: Boolean,
    },
    wifi: {
      type: Boolean,
    },
    cctv: {
      type: Boolean,
    },
    security: {
      type: Boolean,
    },
    airconditioning: {
      type: Boolean,
    },
    terrace: {
      type: Boolean,
    },
    laundry: {
      type: Boolean,
    },
    elevator: {
      type: Boolean,
    },
    balcony: {
      type: Boolean,
    },
    imageUrls: {
      type: Array,
      required: true,
    },
  },
  { timestamps: true }
);

const Listing = mongoose.model("Listing", listingSchema);

module.exports = Listing;
