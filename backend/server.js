// require("dotenv").config();

// const app = require("./app");

// const PORT = process.env.PORT || 5000;

// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });

// server.js

require("dotenv").config();

const app = require("./app");
const db = require("./config/db");

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await db.query("SELECT 1");

    console.log("Database Connected Successfully");

    app.listen(PORT, () => {
      console.log(`Server Running On Port ${PORT}`);
    });

  } catch (error) {
    console.error("Database Connection Failed");
    console.error(error.message);
  }
};

startServer();