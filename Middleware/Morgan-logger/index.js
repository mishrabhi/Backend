const express = require("express");
const morgan = require("morgan");

const app = express();

app.use(express.json());
app.use(morgan("combined"));

//Routes
app.get("/", (req, res) => {
  res.status(200).send("This is get request");
});

app.get("/get-users", (req, res) => {
  res.status(200).send("This is get-user route");
});

app.post("/add-user", (req, res) => {
  res.status(201).send("User has been added");
});

app.put("/user/:id", (req, res) => {
  res.status(201).send("update successful");
});

app.delete("/user/:id", (req, res) => {
  res.status(201).send("successfully deleted");
});

app.listen(3000, () => {
  console.log("Server up and running on port 3000");
});
