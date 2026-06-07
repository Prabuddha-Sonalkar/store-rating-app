const jwt = require("jsonwebtoken");

const login = async (req, res) => {

  try {

    const {
      email,
      password
    } = req.body;

    const user =
      await authService.findUserByEmail(email);

    if (!user) {
      return res.status(401).json({
        message: "Invalid Credentials"
      });
    }

    const isMatch =
      await bcrypt.compare(
        password,
        user.password
      );

    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid Credentials"
      });
    }

    const token = jwt.sign(
      {
        id: user.id,
        role: user.role
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d"
      }
    );

    res.status(200).json({
      token,
      role: user.role,
      name: user.name
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Server Error"
    });
  }
};