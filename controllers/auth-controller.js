const { response } = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/UserModel");
const { genJWT } = require("../helpers/jwt");

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

    const token = await genJWT(usr.id, usr.fullName, usr.role);

    res.status(201).json({
      ok: true,
      uid: usr.id,
      token,
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

    const token = await genJWT(usr.id, usr.fullName, usr.role);

    res.status(201).json({
      ok: true,
      uid: usr.id,
      token,
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

    const token = await genJWT(usr.id, usr.fullName, usr.role);

    res.status(201).json({
      ok: true,
      uid: usr.id,
      token,
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
    if (!usr) {
      return res.status(400).json({
        ok: false,
        msg: "The User doesn't exist with that Email",
      });
    }

    const validPass = bcrypt.compareSync(password, usr.password);
    if (!validPass) {
      return res.status(400).json({
        ok: false,
        msg: "Incorrect Password",
      });
    }

    const token = await genJWT(usr.id, usr.fullName, usr.role);

    res.json({
      ok: true,
      uid: usr.id,
      token,
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

const renewToken = async (req, res = response) => {
  const { uid, fullNamem, role } = req;

  const token = await genJWT(uid, fullName, role);

  res.json({
    ok: true,
    token,
    msg: "renew-token",
  });
};

module.exports = {
  createClientUser,
  createEmployeeUser,
  createAdminUser,
  loginUser,
  renewToken,
};
