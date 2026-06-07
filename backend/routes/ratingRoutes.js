const express =
require("express");

const router =
express.Router();

const authMiddleware =
require("../middleware/authMiddleware");

const roleMiddleware =
require("../middleware/roleMiddleware");

const {
  addRating
} = require(
  "../controllers/ratingController"
);

router.post(
  "/",
  authMiddleware,
  roleMiddleware("USER"),
  addRating
);

module.exports = router;