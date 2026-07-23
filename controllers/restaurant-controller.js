const { response } = require("express");
const Restaurant = require("../models/RestaurantModel");

const getRestaurants = async (req, res = response) => {
  try {
    if (req.role !== "ADMIN") {
      return res.status(401).json({
        ok: false,
        msg: "You are not allowed to see the restaurants",
      });
    }

    const restaurant = await Restaurant.find();
    return res.json({
      ok: true,
      event: restaurant,
      msg: "get-restaurants",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: "Error getting the restaurants",
    });
  }
};

const createRestaurant = async (req, res = response) => {
  const restaurant = new Restaurant(req.body);
  try {
    if (req.role !== "ADMIN") {
      return res.status(401).json({
        ok: false,
        msg: "You are not allowed to create a restaurant",
      });
    }
    const newRestaurant = await restaurant.save();
    return res.status(200).json({
      ok: true,
      restaurant: newRestaurant,
      msg: "new-restaurant",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: "Failing creating a restaurant",
    });
  }
};

const updateRestaurant = async (req, res = response) => {
  const restaurantId = req.params.id;
  try {
    const restaurant = await Restaurant.findById(restaurantId);
    if (!restaurant) {
      return res.status(404).json({
        ok: false,
        msg: "The restaurant doesn't exists",
      });
    }
    if (req.role !== "ADMIN") {
      return res.status(401).json({
        ok: false,
        msg: "You are not allowed to update a restaurant",
      });
    }

    const newRestaurant = { ...req.body };

    const updatedRestaurant = await Restaurant.findByIdAndUpdate(
      restaurantId,
      newRestaurant,
      { returnDocument: "after" },
    );
    return res.json({
      ok: true,
      restaurant: updatedRestaurant,
      msg: "update-restaurant",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: "Error updating a restaurant",
    });
  }
};

const deleteRestaurant = async (req, res = response) => {
  const restaurantId = req.params.id;

  try {
    const restaurant = await Restaurant.findById(restaurantId);
    if (!restaurant) {
      return res.status(404).json({
        ok: false,
        msg: "The restaurant doesn't exists",
      });
    }
    if (req.role !== "ADMIN") {
      return res.status(401).json({
        ok: false,
        msg: "You are not allowed to delete a restaurant",
      });
    }

    await Restaurant.findByIdAndDelete(restaurantId);

    return res.json({
      ok: true,
      msg: "delete-restaurant",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: "Error deleting a restaurant",
    });
  }
};
module.exports = {
  getRestaurants,
  createRestaurant,
  updateRestaurant,
  deleteRestaurant,
};
