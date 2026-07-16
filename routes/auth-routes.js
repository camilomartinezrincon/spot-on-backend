/*
    User routes / Auth
    host + /api/auth
*/
const { Router } = require("express");
const { check } = require("express-validator");
const { fieldValidator } = require("../middlewares/field-validator");
const {
  createClientUser,
  loginUser,
  renewToken,
  createEmployeeUser,
  createAdminUser,
} = require("../controllers/auth-controller");

const registerValidation = [
  check("fullName", "The full name is required").not().isEmpty(),
  check("email", "The email is required").not().isEmpty(),
  check("email", "The email is not in the correct format").isEmail(),
  check("password", "The password must be at least 6 chars").isLength({
    min: 6,
  }),
  fieldValidator,
];

const router = Router();

router.post("/new/client", registerValidation, createClientUser);
router.post("/new/employee", registerValidation, createEmployeeUser);
router.post("/new/admin", registerValidation, createAdminUser);
router.post(
  "/login",
  [
    check("email", "The email is required").not().isEmpty(),
    check("email", "The email is not in the correct format").isEmail(),
    check("password", "The password must be at least 6 chars").isLength({
      min: 6,
    }),
    fieldValidator,
  ],
  loginUser,
);
router.get("/renew", renewToken);

module.exports = router;
