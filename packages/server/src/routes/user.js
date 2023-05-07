const express = require("express");
const User = require("../models/User");
const { v4: uuidv4 } = require("uuid");
const jwt = require("jsonwebtoken");
const { jwtSecret } = require("../config/jwt-config");
const passport = require("../services/jwt-auth");

const router = express.Router();

const {
  hashPassword,
  comparePasswords,
} = require("../services/password-crypt");
const Token = require("../models/Token");

router.post("/register", async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;

    // Check if user with email already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res
        .status(409)
        .json({ message: "User with this email already exists" });
    }

    // Hash password
    const hashedPassword = await hashPassword(password); // hash password

    const userId = uuidv4();
    // Create user
    const user = await User.create({
      userId,
      name,
      email,
      password: hashedPassword,
      phone,
    });

    // Generate JWT token
    const token = jwt.sign({ email: user.email }, "test-secret-10-02-2023", {
      expiresIn: "1h",
    });

    // Save token to database
    await Token.create({ token, userId: user.id });

    // Return user and token data

    res.status(200).json({ user: user.id, token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const users = await User.findAll();
      res.json(users);
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal server error");
    }
  }
);

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ where: { email } });
  if (!user) {
    return res.status(401).json({ message: "Invalid email or password" });
  }
  const passwordMatch = await comparePasswords(password, user.password);
  if (!passwordMatch) {
    return res.status(401).json({ message: "Invalid email or password" });
  }
  const token = jwt.sign({ email: user.email }, "test-secret-10-02-2023", {
    expiresIn: "1h",
  });
  return res.status(200).json({
    message: "Login successful",
    token,
    id: user.id,
    username: user.name,
  });
});

// Use passport to authenticate requests
router.get(
  "/logout",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      // Retrieve the value of the Authorization header
      const authHeader = req.header("Authorization");

      // Check if the header is present and starts with "Bearer"
      if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      // Extract the token from the header
      const token = authHeader.split(" ")[1];

      Token.destroy({
        where: { token },
      });
      res.json(token);
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal server error");
    }
  }
);

module.exports = router;
