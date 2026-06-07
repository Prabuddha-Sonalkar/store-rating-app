const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const adminRoutes = require("./routes/adminRoutes");
const storeRoutes = require("./routes/storeRoutes");
const ratingRoutes = require("./routes/ratingRoutes");
const storeOwnerRoutes = require("./routes/storeOwnerRoutes");

const app = express();

// ✅ MUST BE FIRST
app.use(cors({
  origin: "http://localhost:3000", // change if different frontend port
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/stores", storeRoutes);
app.use("/api/ratings", ratingRoutes);
app.use("/api/store-owner", storeOwnerRoutes);

app.get("/", (req, res) => {
  res.json({ message: "Store Rating API Running" });
});

module.exports = app;