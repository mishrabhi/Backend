const express = require("express");
const router = express.Router();

//Get User Profile
router.get("/profile", (req, res) => {
  res.send("User Profile");
});

//Update User by id
router.put("/:id", (req, res) => {
  const userId = req.params.id;
  const updatedData = req.body;
  res.send(`User with ID ${userId} updated with data: ${updatedData}`);
});

//Delete user by id
router.delete("/:id", (req, res) => {
  const userId = req.params.id;
  res.send(`User with ID ${userId} deleted`);
});

module.exports = router;
