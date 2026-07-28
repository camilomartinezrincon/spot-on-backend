const { Router } = require("express");
const { validateJWT } = require("../middlewares/jwt-validator");
const { restaurantValidations } = require("../helpers/validations");
const {
  getRestaurants,
  createRestaurant,
  updateRestaurant,
  deleteRestaurant,
} = require("../controllers/restaurant-controller");

const router = Router();

router.use(validateJWT);

router.get("/restaurants", getRestaurants);
router.get("/restaurant/:id", getRestaurant);
router.post("/new/restaurant", restaurantValidations, createRestaurant);
router.put("/update/restaurant/:id", updateRestaurant);
router.delete("/delete/restaurant/:id", deleteRestaurant);

module.exports = router;
