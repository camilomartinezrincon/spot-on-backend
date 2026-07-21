const { response } = require("express");
const Reservation = require("../models/EventModel");

const getReservations = async (req, res = response) => {
  const reservation = await Reservation.find().populate("user", "email role");
  res.json({
    ok: true,
    event: reservation,
    msg: "get-reservations",
  });
};

const createReservation = async (req, res = response) => {
  const reservation = new Reservation(req.body);
  try {
    reservation.user = req.uid;
    const newReservation = await reservation.save();

    res.status(200).json({
      ok: true,
      event: newReservation,
      msg: "new-reservation",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Failing creating a reservation",
    });
  }
};

const updateReservation = async (req, res = response) => {
  const reservationId = req.params.id;
  const uid = req.uid;

  try {
    const reservation =
      await Reservation.findById(reservationId).populate("user");
    const newReservation = {
      ...req.body,
      user: uid,
    };

    if (!reservation) {
      res.status(404).json({
        ok: false,
        msg: "The event doesn't exists",
      });
    }

    if (
      reservation.user.role !== "EMPLOYEE" &&
      reservation.user.toString() !== uid
    ) {
      return res.status(401).json({
        ok: false,
        msg: "You are not allowed to update this reservation",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Error updating a reservation",
    });
  }
};

const deleteReservation = (req, res = response) => {
  res.json({
    ok: true,
    msg: "delete-reservation",
  });
};

module.exports = {
  getReservations,
  createReservation,
  updateReservation,
  deleteReservation,
};
