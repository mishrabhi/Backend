const express = require("express");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

const app = express();

app.get("/", (req, res) => {
  res.status(200).send("");
});

app.listen(3000, () => {
  console.log("Server is up and running on port 3000");
});
