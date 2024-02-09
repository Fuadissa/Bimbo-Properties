const User = require("../models/userModel.js");
const { errorHandler } = require("../utils/error.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const adminLogin = async (req, res, next) => {
  const { email, password } = req.body.formData || req.body;

  try {
    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      const token = jwt.sign({ userId: user._id }, "your-secret-key", {
        expiresIn: "1h",
      });

      res.cookie("token", token, { httpOnly: true, secure: true });
      res.json({ success: true, message: "Login successful", token });
    } else {
      return res
        .status(404)
        .json({ success: false, message: "Invalid credentials!" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const admin = async (req, res) => {
  res.json({ success: true, message: "Welcome to the admin panel!" });
};

// Register route
const adminRegister = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return next(errorHandler(400, "User with this email already exists"));
    }

    // Hash the password before saving it to the database
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    res.json({ success: true, newUser, message: "Registration successful" });
  } catch (error) {
    console.error("Error during registration:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

module.exports = { adminLogin, admin, adminRegister };
