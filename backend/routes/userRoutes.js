const express = require("express");
const { User, validate } = require("../models/user");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("config");
const auth = require("../middleware/auth");

// GET all users - Secured with auth middleware
router.get("/", auth, async (req, res) => {
  console.log("Fetching users for:", req.user); // Log the authenticated user
  try {
    const users = await User.find().sort("name");
    console.log("Users fetched:", users); // Log fetched users
    res.send(users); // Send the list of users
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).send("Error fetching users.");
  }
});

// POST new user - Register a new user
router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send("User already registered");

  user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  await user.save();

  const token = jwt.sign(
    { _id: user._id, name: user.name, email: user.email },
    config.get("jwtPrivateKey")
  );

  res.header("x-auth-token", token).send({
    name: user.name,
    email: user.email,
  });
});

// DELETE user by ID - Secured with auth middleware
router.delete("/:id", auth, async (req, res) => {
  try {
    const user = await User.findByIdAndRemove(req.params.id);
    if (!user) return res.status(404).send("User not found");
    res.send({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).send("Something went wrong");
  }
});

module.exports = router;
