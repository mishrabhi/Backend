const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.send("Welcome to the Express.js server");
});

app.get("/about", (req, res) => {
  res.send("This is a simple web server build using Express.js");
});

app.get("/contact", (req, res) => {
  res.json({
    email: "student@example.com",
    phone: "123-456-789",
  });
});

app.get("/random", (req, res) => {
  const randomNumber = Math.floor(Math.random() * 100) + 1;
  res.json({
    randomNumber: randomNumber,
  });
});

app.use((req, res) => {
  res.status(404).send("Page not found");
});

app.listen(3000, () => {
  console.log("Server up and running on port 3000");
});
