const { Schema, model } = require("mongoose");

const EventSchema = Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  customerName: {
    type: String,
    required: true,
  },
  eventTitle: {
    type: String,
    required: true,
  },
  reservationDateTime: {
    type: Date,
    required: true,
  },
  endReservationDateTime: {
    type: Date,
  },
  numberOfGuests: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    default: "New Reservation",
  },
  notes: {
    type: String,
  },
  tableNumber: {
    type: Number,
  },
});

EventSchema.pre("save", function () {
  if (this.reservationDateTime) {
    const start = new Date(this.reservationDateTime);
    this.endReservationDateTime = new Date(
      start.getTime() + 2 * 60 * 60 * 1000,
    );
  }
});

module.exports = model("Reservation", EventSchema);
