const e = require("express");
const express = require("express");
const router = express.Router();
const db = require("../models");

router.post("/register", async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  try {
    const user = await db.user.create({
      firstName,
      lastName,
      email,
      password,
    });
    res.status(200).json({ message: "user is created", user });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await db.user.findOne({
      where: {
        email: email,
      },
    });
    if (!user) {
      res.status(404).json({ message: "incorrect email" });
      return;
    }
    const isValidPassword = user.validatePassword(password);
    if (!isValidPassword) {
      res.status(404).json({ message: "incorrect password" });
      return;
    }
    // req.session.email = user.email;
    res.cookie("token", "asdfghjkl").status(200).json({ message: "user is authenciated" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.get("/checksession", async (req, res) => {
  if (req?.session?.email) {
    const user = await db.user.findOne({
      where: {
        email: req.session.email,
      },
    });
    res.status(200).json({ message: "session is active", user });
  } else {
    res.status(404).json({ message: "session not existed" });
  }
});

module.exports = router;
