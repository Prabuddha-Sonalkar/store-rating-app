const express =
require("express");

const router =
express.Router();

const authMiddleware =
require("../middleware/authMiddleware");

const roleMiddleware =
require("../middleware/roleMiddleware");

const {
  dashboard,
  addUser,
  getUsers,
  userDetails
} = require(
  "../controllers/adminController"
);

router.use(
  authMiddleware
);

router.use(
  roleMiddleware("ADMIN")
);

router.get(
  "/dashboard",
  dashboard
);

router.post(
  "/users",
  addUser
);

router.get(
  "/users",
  getUsers
);

router.get(
  "/users/:id",
  userDetails
);

module.exports = router;