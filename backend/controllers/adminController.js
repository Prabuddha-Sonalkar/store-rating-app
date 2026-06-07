const bcrypt = require("bcryptjs");

const db =
require("../config/db");

const {
  getDashboardCounts,
  getAllUsers,
  getUserById
} = require(
  "../services/adminService"
);

const dashboard = async (
  req,
  res
) => {

  try {

    const data =
      await getDashboardCounts();

    res.json({
      success: true,
      data
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
};

const addUser = async (
  req,
  res
) => {

  try {

    const {
      name,
      email,
      password,
      address,
      role
    } = req.body;

    const hashedPassword =
      await bcrypt.hash(
        password,
        10
      );

    const [result] =
      await db.query(
        `
        INSERT INTO users
        (
          name,
          email,
          password,
          address,
          role
        )
        VALUES
        (
          ?,?,?,?,?
        )
        `,
        [
          name,
          email,
          hashedPassword,
          address,
          role
        ]
      );

    res.status(201).json({
      success: true,
      message: "User Created",
      userId: result.insertId
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
};

const getUsers = async (
  req,
  res
) => {

  try {

    const search =
      req.query.search || "";

    const sortField =
      req.query.sortField || "name";

    const sortOrder =
      req.query.sortOrder || "ASC";

    const users =
      await getAllUsers(
        search,
        sortField,
        sortOrder
      );

    res.json({
      success: true,
      users
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
};

const userDetails = async (
  req,
  res
) => {

  try {

    const user =
      await getUserById(
        req.params.id
      );

    if (!user) {

      return res.status(404).json({
        success: false,
        message:
          "User not found"
      });

    }

    if (
      user.role ===
      "STORE_OWNER"
    ) {

      const [[ratingData]] =
        await db.query(
          `
          SELECT
            AVG(r.rating)
            AS averageRating
          FROM stores s
          LEFT JOIN ratings r
          ON s.id = r.store_id
          WHERE s.owner_id = ?
          `,
          [user.id]
        );

      user.averageRating =
        ratingData.averageRating;
    }

    res.json({
      success: true,
      user
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message:
        error.message
    });

  }
};

module.exports = {
  dashboard,
  addUser,
  getUsers,
  userDetails
};