const { check } = require("express-validator");
const { fieldValidator } = require("../middlewares/field-validator");
const { isDate } = require("./isDate");

const calendarValidations = [
  check("customerName", "The customer name is required").not().isEmpty(),
  check("eventTitle", "The event title is required").not().isEmpty(),
  check(
    "reservationDateTime",
    "The reservation date & time is required",
  ).custom(isDate),
  check("numberOfGuests", "The number of guests is required").not().isEmpty(),
  check("numberOfGuests", "The number of guests is required").isInt({
    min: 1,
  }),
  fieldValidator,
];

const registerUserValidations = [
  check("fullName", "The full name is required").not().isEmpty(),
  check("email", "The email is required").not().isEmpty(),
  check("email", "The email is not in the correct format").isEmail(),
  check("password", "The password must be at least 6 chars").isLength({
    min: 6,
  }),
  fieldValidator,
];

const loginUserValidations = [
  check("email", "The email is required").not().isEmpty(),
  check("email", "The email is not in the correct format").isEmail(),
  check("password", "The password must be at least 6 chars").isLength({
    min: 6,
  }),
  fieldValidator,
];

const restaurantValidations = [
  check("restaurantName", "The restaurant name is required").not().isEmpty(),
  check("cuisineType", "The cuisine type is required").not().isEmpty(),
  check("priceRange", "Please select a valid price range").isIn([
    "$ — budget",
    "$$ — moderate",
    "$$$ — expensive",
    "$$$$ — luxury",
  ]),
  check(
    "restaurantPhoneNum",
    "Please provide a valid phone number",
  ).isMobilePhone("any"),
  check("restaurantAddress.street", "The street address is required")
    .not()
    .isEmpty(),
  check("restaurantAddress.city", "The city is required").not().isEmpty(),
  check("restaurantAddress.province", "Please select a valid province").isIn([
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
  ]),
  check(
    "restaurantAddress.postalCode",
    "Please provide a valid Canadian postal code",
  ).matches(/^[A-Za-z]\d[A-Za-z] ?\d[A-Za-z]\d$/),
  check("operatingHours", "Operating hours are required").not().isEmpty(),
  check("maxPartySize", "Max party size must be a positive number").isInt({
    min: 1,
  }),
  check("restaurantDescription", "Description must be under 500 characters")
    .optional()
    .isLength({ max: 500 }),
  fieldValidator,
];

module.exports = {
  calendarValidations,
  registerUserValidations,
  loginUserValidations,
  restaurantValidations,
};
