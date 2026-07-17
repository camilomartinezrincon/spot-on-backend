const { response } = require("express");
const jwt = require("jsonwebtoken");

const validateJWT = (req, res = response, next) => {
  const token = req.header("x-token");

  console.log(token);

  if (!token) {
    return res.status(401).json({
      ok: false,
      msg: "No existing token",
    });
  }

  try {
    const { uid, fullName } = jwt.verify(token, process.env.JWT_SECRET);
    req.uid = uid;
    req.fullName = fullName;
  } catch (error) {
    return res.status(401).json({
      ok: false,
      msg: "No valid token",
    });
  }

  next();
};

module.exports = {
  validateJWT,
};
