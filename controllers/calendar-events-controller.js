const { response } = require("express");
const Reservation = require("../models/EventModel");

const getReservations = async (req, res = response) => {
  const uid = req.uid;
  try {
    let filter;
    if (req.role === "ADMIN") {
      filter = {};
    } else if (req.role === "EMPLOYEE") {
      filter = { restaurant: req.restaurant };
    } else {
      filter = { user: uid };
    }

    const reservation = await Reservation.find(filter)
      .populate("user", "fullName email role")
      .populate(
        "restaurant",
        "restaurantName restaurantAddress restaurantPhoneNum",
      );
    return res.json({
      ok: true,
      event: reservation,
      msg: "get-reservations",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: "Error getting the reservations",
    });
  }
};

const createReservation = async (req, res = response) => {
  const reservation = new Reservation(req.body);
  try {
    reservation.user = req.uid;
    const newReservation = await reservation.save();

    return res.status(200).json({
      ok: true,
      event: newReservation,
      msg: "new-reservation",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: "Failing creating a reservation",
    });
  }
};

const updateReservation = async (req, res = response) => {
  const reservationId = req.params.id;
  const uid = req.uid;

  try {
    const reservation = await Reservation.findById(reservationId);
    const isOwnerReservation = reservation.user.toString() === uid;
    const isRestaurantEmployee =
      req.role === "EMPLOYEE" &&
      reservation.restaurant.toString() === req.restaurant;

    if (!reservation) {
      return res.status(404).json({
        ok: false,
        msg: "The event doesn't exists",
      });
    }

    if (!isOwnerReservation && !isRestaurantEmployee) {
      return res.status(401).json({
        ok: false,
        msg: "You are not allowed to update this reservation",
      });
    }

    const newReservation = { ...req.body };
    // prevent to change the user id in the reservation
    delete newReservation.user;

    const updatedReservation = await Reservation.findByIdAndUpdate(
      reservationId,
      newReservation,
      { returnDocument: "after" },
    );

    return res.json({
      ok: true,
      reservation: updatedReservation,
      msg: "update-reservation",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: "Error updating a reservation",
    });
  }
};

const deleteReservation = async (req, res = response) => {
  const reservationId = req.params.id;
  const uid = req.uid;

  try {
    const reservation = await Reservation.findById(reservationId);
    const isOwnerReservation = reservation.user.toString() === uid;
    const isRestaurantEmployee =
      req.role === "EMPLOYEE" &&
      reservation.restaurant.toString() === req.restaurant;

    if (!reservation) {
      return res.status(404).json({
        ok: false,
        msg: "The event doesn't exists",
      });
    }

    if (!isOwnerReservation && !isRestaurantEmployee) {
      return res.status(401).json({
        ok: false,
        msg: "You are not allowed to delete this reservation",
      });
    }

    await Reservation.findByIdAndDelete(reservationId);

    return res.json({
      ok: true,
      msg: "delete-reservation",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: "Error deleting a reservation",
    });
  }
};

module.exports = {
  getReservations,
  createReservation,
  updateReservation,
  deleteReservation,
};
