const express = require("express");

const router = express.Router();

const authMiddleware =
  require("../middleware/authMiddleware");

const {
  register,
  login,
  updatePassword
} = require("../controllers/authController");

router.post("/register", register);

router.post("/login", login);

router.put(
  "/password",
  authMiddleware,
  updatePassword
);

module.exports = router;