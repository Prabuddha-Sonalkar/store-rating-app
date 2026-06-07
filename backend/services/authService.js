const db = require("../config/db");

const findUserByEmail = async (email) => {
  const [rows] = await db.query(
    "SELECT * FROM users WHERE email = ?",
    [email]
  );

  return rows[0];
};

const createUser = async (userData) => {

  const {
    name,
    email,
    password,
    address,
    role
  } = userData;

  const [result] = await db.query(
    `
    INSERT INTO users
    (name,email,password,address,role)
    VALUES (?,?,?,?,?)
    `,
    [
      name,
      email,
      password,
      address,
      role
    ]
  );

  return result.insertId;
};

module.exports = {
  findUserByEmail,
  createUser
};