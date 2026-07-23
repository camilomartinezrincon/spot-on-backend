const { response } = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/UserModel");
const { genJWT } = require("../helpers/jwt");

const getUsers = async (req, res = response) => {
  if (req.role !== "ADMIN") {
    return res.status(401).json({
      ok: false,
      msg: "You are not allowed to view the users list",
    });
  }

  const user = await User.find();
  return res.json({
    ok: true,
    usr: user,
    msg: "get-users",
  });
};

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

    return res.status(201).json({
      ok: true,
      uid: usr.id,
      token,
      msg: "register-client",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
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

    const token = await genJWT(usr.id, usr.fullName, usr.role, usr.restaurant);

    return res.status(201).json({
      ok: true,
      uid: usr.id,
      token,
      msg: "register-employee",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: "Please contact support",
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

    return res.status(201).json({
      ok: true,
      uid: usr.id,
      token,
      msg: "register-admin",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
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

    const token = await genJWT(usr.id, usr.fullName, usr.role, usr.restaurant);

    return res.json({
      ok: true,
      uid: usr.id,
      token,
      msg: "login",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: "Please contact support",
    });
  }
};

const renewToken = async (req, res = response) => {
  const { uid, fullName, role, restaurant } = req;

  const token = await genJWT(uid, fullName, role, restaurant);

  return res.json({
    ok: true,
    token,
    msg: "renew-token",
  });
};

const updateUser = async (req, res = response) => {
  const userId = req.params.id;

  try {
    const usr = await User.findById(userId);
    if (!usr) {
      return res.status(404).json({
        ok: false,
        msg: "The user doesn't exists",
      });
    }

    if (req.role !== "ADMIN") {
      return res.status(401).json({
        ok: false,
        msg: "You are not allowed to update an user",
      });
    }
    const newUser = { ...req.body };
    delete newUser.password;

    const updatedUser = await User.findByIdAndUpdate(userId, newUser, {
      returnDocument: "after",
    });

    return res.json({
      ok: true,
      userId: updatedUser,
      msg: "update-user",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: "Error updating the user",
    });
  }
};

const updateUserPassword = async (req, res = response) => {
  const userId = req.params.id;
  const { password } = req.body;

  try {
    const usr = await User.findById(userId);

    if (!usr) {
      return res.status(404).json({
        ok: false,
        msg: "The user doesn't exists",
      });
    }

    if (req.role !== "ADMIN") {
      return res.status(401).json({
        ok: false,
        msg: "You are not allowed to update an user password",
      });
    }
    const salt = bcrypt.genSaltSync();
    usr.password = bcrypt.hashSync(password, salt);

    await usr.save();

    return res.json({
      ok: true,
      msg: "update-user-password",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: "Error updating the user password",
    });
  }
};

const deleteUser = async (req, res = response) => {
  const userId = req.params.id;

  try {
    const usr = await User.findById(userId);
    if (!usr) {
      return res.status(404).json({
        ok: false,
        msg: "The user doesn't exists",
      });
    }

    if (req.role !== "ADMIN") {
      return res.status(401).json({
        ok: false,
        msg: "You are not allowed to delete an user",
      });
    }

    await User.findByIdAndDelete(userId);

    return res.json({
      ok: true,
      msg: "delete-user",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: "Error deleting the user",
    });
  }
};

module.exports = {
  getUsers,
  createClientUser,
  createEmployeeUser,
  createAdminUser,
  loginUser,
  renewToken,
  updateUser,
  updateUserPassword,
  deleteUser,
};
