const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("config");
const Joi = require("joi");
const { User } = require("../models/user");
const passport = require("passport");

// Route to initiate Google authentication
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// Callback route after successful authentication
router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => {
    res.redirect("/"); // Redirect to dashboard or any other page
  }
);

router.post("/", async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Invalide email or password");

  const validePassword = await bcrypt.compare(req.body.password, user.password);
  if (!validePassword)
    return res.status(400).send("Invalide email or password");

  const token = jwt.sign(
    { _id: user._id, name: user.name, email: user.email },
    config.get("jwtPrivateKey")
  );

  res.send(token);
});

module.exports = router;
