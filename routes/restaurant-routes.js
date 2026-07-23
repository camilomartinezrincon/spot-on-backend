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

router.get("/restautants", getRestaurants);
router.post("/new/restautant", restaurantValidations, createRestaurant);
router.put("/update/restautant/:id", updateRestaurant);
router.delete("/delete/restautant/:id", deleteRestaurant);

module.exports = router;
