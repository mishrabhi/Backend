const express = require("express");
const User = require("../schema/user.model");
const router = express.Router();

//Add a new user
router.post("/", async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

//List borrowed books by a user
router.get("/:userId/borrowed", async (req, res) => {
  try {
    const user = await User.findById(req.params.userId).populate(
      "borrowed_books"
    );
    if (!user) return res.status(404).send("user not found");
    res.json(user.borrowed_books);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
