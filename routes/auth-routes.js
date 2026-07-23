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
const {
  registerUserValidations,
  loginUserValidations,
} = require("../helpers/validations");

const router = Router();

router.get("/users", validateJWT, getUsers);
router.post("/new/client", registerUserValidations, createClientUser);
router.post("/new/employee", registerUserValidations, createEmployeeUser);
router.post("/new/admin", registerUserValidations, createAdminUser);
router.post("/login", loginUserValidations, loginUser);
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
