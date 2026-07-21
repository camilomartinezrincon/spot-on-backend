const { Router } = require("express");
const { validateJWT } = require("../middlewares/jwt-validator");
const { check } = require("express-validator");
const { fieldValidator } = require("../middlewares/field-validator");
const { isDate } = require("../helpers/isDate");
const {
  getReservations,
  createReservation,
  updateReservation,
  deleteReservation,
} = require("../controllers/calendar-events-controller");

const router = Router();

router.use(validateJWT);

router.get("/reservations", getReservations);
router.post(
  "/new/reservation",
  [
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
  ],
  createReservation,
);
router.put("/update/reservation/:id", updateReservation);
router.delete("/delete/reservation/:id", deleteReservation);

module.exports = router;
