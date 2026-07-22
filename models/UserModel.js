const { Schema, model } = require("mongoose");

const UserSchema = Schema({
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
    enum: ["CLIENT", "EMPLOYEE", "ADMIN"],
  },
  dateEnrollment: {
    type: Date,
    default: Date.now,
  },
});

module.exports = model("User", UserSchema);
