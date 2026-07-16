const { response } = require("express");

const createClientUser = (req, res = response) => {
  const { fullName, email, password } = req.body;
  const role = "CLIENT";
  const dateEnrollment = new Date();

  res.status(201).json({
    ok: true,
    msg: "register",
    fullName,
    email,
    password,
    role,
    dateEnrollment,
  });
};

const createEmployeeUser = (req, res = response) => {
  const { fullName, email, password } = req.body;
  const role = "EMPLOYEE";
  const dateEnrollment = new Date();

  res.status(201).json({
    ok: true,
    msg: "register",
    fullName,
    email,
    password,
    role,
    dateEnrollment,
  });
};

const createAdminUser = (req, res = response) => {
  const { fullName, email, password } = req.body;
  const role = "ADMIN";
  const dateEnrollment = new Date();

  res.status(201).json({
    ok: true,
    msg: "register",
    fullName,
    email,
    password,
    role,
    dateEnrollment,
  });
};

const loginUser = (req, res = response) => {
  const { email, password } = req.body;

  res.json({
    ok: true,
    msg: "login",
    email,
    password,
  });
};

const renewToken = (req, res = response) => {
  res.json({
    ok: true,
    msg: "renew",
  });
};

module.exports = {
  createClientUser,
  createEmployeeUser,
  createAdminUser,
  loginUser,
  renewToken,
};
