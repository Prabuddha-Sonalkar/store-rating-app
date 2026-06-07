const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { findUserByEmail, createUser } = require("../services/authService");
const { validateSignup } = require("../validators/authValidator");


const register = async (req, res) => {
  try {
    const { name, email, password, address } = req.body;

    console.log("REGISTER BODY:", req.body);
    console.log({ name, email, password, address });

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields",
      });
    }

    const errors = validateSignup(req.body);

    if (errors.length > 0) {
      return res.status(400).json({
        success: false,
        errors,
      });
    }

    const existingUser = await findUserByEmail(email);

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Email already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // ✅ FIXED CALL (correct function signature)
    const userId = await createUser({
      name,
      email,
      password: hashedPassword,
      address,
      role: "USER",
    });

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      userId,
    });

  } catch (error) {
    console.error("Register Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
///

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await findUserByEmail(email);

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    const isMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    const token = jwt.sign(
      {
        id: user.id,
        role: user.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );

    return res.status(200).json({
      success: true,
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Login Error:", error);

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

const updatePassword = async (req, res) => {
  try {
    const {
      oldPassword,
      newPassword,
    } = req.body;

    const db = require("../config/db");

    const [rows] = await db.query(
      `
      SELECT *
      FROM users
      WHERE id = ?
      `,
      [req.user.id]
    );

    const user = rows[0];

    const isMatch = await bcrypt.compare(
      oldPassword,
      user.password
    );

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Old password incorrect",
      });
    }

    const hashedPassword = await bcrypt.hash(
      newPassword,
      10
    );

    await db.query(
      `
      UPDATE users
      SET password = ?
      WHERE id = ?
      `,
      [
        hashedPassword,
        req.user.id,
      ]
    );

    return res.json({
      success: true,
      message: "Password updated",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  register,
  login,
  updatePassword,
};