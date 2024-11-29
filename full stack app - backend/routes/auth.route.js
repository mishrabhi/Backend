const express = require("express");
const jwt = require("jwt");
const bcrypt = require("brcypt");
const User = require("../Schema/user.model");

const router = express.Router();

//Register user
router.post("/signup", async (req, res) => {
  const { username, password, email } = req.body;
  try {
    //check if user already exists
    const existingUser = await User.find({ username });
    if (existingUser)
      return res.status(400).json({ message: "User already exists" });

    //create new user
    const newUser = new User({ username, password, email });
    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

//Login
router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    //find user
    const user = await User.findOne({ username });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });
    //match hashedpassword
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });
    //generate token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;
