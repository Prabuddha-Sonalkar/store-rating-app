const express =
require("express");

const router =
express.Router();

const authMiddleware =
require("../middleware/authMiddleware");

const roleMiddleware =
require("../middleware/roleMiddleware");

const {
  addStore,
  getAllStores
} = require(
  "../controllers/storeController"
);

router.get(
  "/",
  authMiddleware,
  getAllStores
);

router.post(
  "/",
  authMiddleware,
  roleMiddleware("ADMIN"),
  addStore
);

module.exports = router;