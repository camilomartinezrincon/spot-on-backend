const { response } = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/UserModel");

const createClientUser = async (req, res = response) => {
  const { email, password } = req.body;
  try {
    let usr = await User.findOne({ email });

    if (usr) {
      return res.status(400).json({
        ok: false,
        msg: "This Email is already in use",
      });
    }
    const role = "CLIENT";
    usr = new User({ ...req.body, role });

    const salt = bcrypt.genSaltSync();
    usr.password = bcrypt.hashSync(password, salt);

    await usr.save();

    res.status(201).json({
      ok: true,
      uid: usr.id,
      msg: "register-client",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Please contact support",
    });
  }
};

const createEmployeeUser = async (req, res = response) => {
  const { password } = req.body;
  try {
    const role = "EMPLOYEE";
    const usr = new User({ ...req.body, role });

    const salt = bcrypt.genSaltSync();
    usr.password = bcrypt.hashSync(password, salt);

    await usr.save();

    res.status(201).json({
      ok: true,
      uid: usr.id,
      msg: "register-employee",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: error,
    });
  }
};

const createAdminUser = async (req, res = response) => {
  const { password } = req.body;
  try {
    const role = "ADMIN";
    const usr = new User({ ...req.body, role });

    const salt = bcrypt.genSaltSync();
    usr.password = bcrypt.hashSync(password, salt);

    await usr.save();

    res.status(201).json({
      ok: true,
      uid: usr.id,
      msg: "register-admin",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: error,
    });
  }
};

const loginUser = async (req, res = response) => {
  const { email, password } = req.body;

  try {
    const usr = await User.findOne({ email });
    const validPass = bcrypt.compareSync(password, usr.password);

    if (!usr) {
      return res.status(400).json({
        ok: false,
        msg: "The User doesn't exist with that Email",
      });
    }

    if (!validPass) {
      return res.status(400).json({
        ok: false,
        msg: "Incorrect Password",
      });
    }

    //ToDo: Generate JWT

    res.json({
      ok: true,
      uid: usr.id,
      msg: "login",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Please contact support",
    });
  }
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
