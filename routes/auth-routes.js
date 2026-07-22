const { Router } = require("express");
const { check } = require("express-validator");
const { fieldValidator } = require("../middlewares/field-validator");
const { validateJWT } = require("../middlewares/jwt-validator");
const {
  createClientUser,
  loginUser,
  renewToken,
  createEmployeeUser,
  createAdminUser,
  getUsers,
  updateUser,
  updateUserPassword,
  deleteUser,
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

router.get("/users", validateJWT, getUsers);
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
router.put("/update/user/:id", validateJWT, updateUser);
router.put(
  "/update/user/password/:id",
  validateJWT,
  [
    check("password", "The password must be at least 6 chars").isLength({
      min: 6,
    }),
    fieldValidator,
  ],
  updateUserPassword,
);
router.delete("/delete/user/:id", validateJWT, deleteUser);
router.get("/renew", validateJWT, renewToken);

module.exports = router;
