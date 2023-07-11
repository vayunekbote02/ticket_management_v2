// Imports
require("dotenv").config();
const jwt = require("jsonwebtoken");
const UserData = require("../models/userModel");
const bcrypt = require("bcrypt");

// Constants
const SALTROUNDS = 10;

// Auth Functions
const register = async (req, res) => {
  try {
    // Generate a salt and hash the password
    const hashedPassword = await bcrypt.hash(req.body.password, SALTROUNDS);

    // Create a new user object with the encrypted password
    const newUser = new UserData({
      userId: req.body.userId,
      email: req.body.email,
      name: req.body.name,
      password: hashedPassword,
    });

    // Save the new user to the database
    await newUser.save();

    // Successful status to frontend
    res.json({ status: 200 });
  } catch (error) {
    if (error.code === 11000) {
      // Duplicate email address
      res.json({ status: 11000, error: "Duplicate email address" });
    } else {
      res.json({ status: 404, error: "Signup failed" });
    }
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the user by email
    const user = await UserData.findOne({ email });

    if (!user) {
      return res.json({ status: 404, error: "User not found" });
    }

    // Compare the provided password with the hashed password in the database
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (passwordMatch) {
      // Generate a JWT token with user data
      const token = jwt.sign(
        { userId: user.userId },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "1h" }
      );

      return res
        .cookie("access_token", token, {
          httpOnly: true,
          domain: "localhost",
          sameSite: "none",
        })
        .status(200)
        .json({
          message: "Logged in successfully 😊 👌",
          id: user.userId,
        });

      //   return res.json({
      //     status: "ok",
      //     user: { userId: user.userId, token: token },
      //   });
      // } else {
      //   return res.json({ status: 401, error: "Invalid credentials" });
      // }
    } else {
      return res.json({ status: 401, error: "Invalid credentials" });
    }
  } catch (error) {
    res.json({ status: 404, error: "Login failed" });
  }
};

const logout = (req, res) => {
  return res
    .clearCookie("access_token")
    .status(200)
    .json({ message: "Successfully logged out 😏 🍀" });
};

module.exports = { register, login, logout };
