const express = require("express");
const router = express.Router();

//Get todo
router.get("/todo", (req, res) => {
  res.send("Todo Page");
});

module.exports = router;
