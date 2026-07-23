const { Router } = require("express");
const { validateJWT } = require("../middlewares/jwt-validator");
const { fieldValidator } = require("../middlewares/field-validator");
const { isDate } = require("../helpers/isDate");
const {
  getReservations,
  createReservation,
  updateReservation,
  deleteReservation,
} = require("../controllers/calendar-events-controller");
const { calendarValidations } = require("../helpers/validations");

const router = Router();

router.use(validateJWT);

router.get("/reservations", getReservations);
router.post("/new/reservation", calendarValidations, createReservation);
router.put("/update/reservation/:id", updateReservation);
router.delete("/delete/reservation/:id", deleteReservation);

module.exports = router;
