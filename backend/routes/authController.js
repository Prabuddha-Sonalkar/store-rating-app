const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { findUserByEmail, createUser } = require("../services/authService");
const { validateSignup } = require("../validators/authValidator");

const register = async (req, res) => {
  try {
    const { name, email, password, address } = req.body;

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

    const userId = await createUser(
      name,
      email,
      hashedPassword,
      address,
      "USER"
    );

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      userId,
    });
  } catch (error) {
    console.error("Register Error:", error);

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

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

exports.register = register;