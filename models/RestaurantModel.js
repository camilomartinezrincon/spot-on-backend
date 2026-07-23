const { Schema, model } = require("mongoose");

const RestaurantSchema = Schema({
  restaurantName: {
    type: String,
    required: true,
  },
  cuisineType: {
    type: String,
    required: true,
  },
  priceRange: {
    type: String,
    enum: ["$ — budget", "$$ — moderate", "$$$ — expensive", "$$$$ — luxury"],
    required: true,
  },
  restaurantPhoneNum: {
    type: String,
    required: true,
  },
  restaurantAddress: {
    street: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    province: {
      type: String,
      required: true,
      enum: [
        "AB",
        "BC",
        "MB",
        "NB",
        "NL",
        "NS",
        "NT",
        "NU",
        "ON",
        "PE",
        "QC",
        "SK",
        "YT",
      ],
    },
    postalCode: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      default: "Canada",
    },
  },
  operatingHours: {
    type: String,
    required: true,
  },
  maxPartySize: {
    type: Number,
    required: true,
  },
  restaurantDescription: {
    type: String,
    trim: true,
    maxLength: 500,
  },
  restaurantStatus: {
    type: String,
    enum: ["ACTIVE", "INACTIVE", "CLOSED"],
    default: "ACTIVE",
  },
});

module.exports = model("Restaurant", RestaurantSchema);
