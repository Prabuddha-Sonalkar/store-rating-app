const db = require("../config/db");

const getDashboardCounts = async () => {

  const [[users]] =
    await db.query(
      "SELECT COUNT(*) totalUsers FROM users"
    );

  const [[stores]] =
    await db.query(
      "SELECT COUNT(*) totalStores FROM stores"
    );

  const [[ratings]] =
    await db.query(
      "SELECT COUNT(*) totalRatings FROM ratings"
    );

  return {
    totalUsers: users.totalUsers,
    totalStores: stores.totalStores,
    totalRatings: ratings.totalRatings
  };
};

const getAllUsers = async (
  search = "",
  sortField = "name",
  sortOrder = "ASC"
) => {

  const allowedFields = [
    "name",
    "email",
    "role"
  ];

  if (
    !allowedFields.includes(
      sortField
    )
  ) {
    sortField = "name";
  }

  if (
    sortOrder !== "ASC" &&
    sortOrder !== "DESC"
  ) {
    sortOrder = "ASC";
  }

  const [rows] = await db.query(
    `
    SELECT
      id,
      name,
      email,
      address,
      role,
      created_at
    FROM users
    WHERE
      name LIKE ?
      OR email LIKE ?
      OR address LIKE ?
      OR role LIKE ?

    ORDER BY ${sortField} ${sortOrder}
    `,
    [
      `%${search}%`,
      `%${search}%`,
      `%${search}%`,
      `%${search}%`
    ]
  );

  return rows;
};

const getUserById = async (id) => {

  const [rows] = await db.query(
    `
    SELECT
      id,
      name,
      email,
      address,
      role
    FROM users
    WHERE id = ?
    `,
    [id]
  );

  return rows[0];
};

module.exports = {
  getDashboardCounts,
  getAllUsers,
  getUserById
};