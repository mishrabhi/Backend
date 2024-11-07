const express = require("express");
const User = require("../schema/user");

const router = express.Router();

//Create a new User
router.post("/", async (req, res) => {
  const { name, age, email } = req.body;

  //Check if user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ message: `User already exists` });
  }

  try {
    const newUser = new User({ name, email, age });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ message: `Error creating user`, error });
  }
});

//Read all users
router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: `Error finding users`, error });
  }
});

//Updating User
router.put("/:id", async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: `Error Updating User`, error });
  }
});

//Delete User
router.delete("/:id", async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: `User deleted successfully` });
  } catch (error) {
    res.status(500).json({ message: `Error deleting user`, error });
  }
});

module.exports = router;
