const express = require("express");

const app = express();

app.use(express.json());

//Middleware validation
const validateBody = (req, res, next) => {
  const { ID, name, rating, description, genre, cast } = req.body;

  //Validate ID
  if (typeof ID !== "number") {
    return res.status(400).send("Bad Request! ID should be number");
  }

  //Validate Name
  if (typeof name !== "string") {
    return res.status(400).send("Bad Request! Name should be string");
  }

  //validate Rating
  if (typeof rating !== "number") {
    return res.status(400).send("Bad Request! Rating should be number");
  }

  //validate Description
  if (typeof description !== "string") {
    return res.status(400).send("Bad Request! Description should be string");
  }

  //Validate Genre
  if (typeof genre !== "string") {
    return res.status(400).send("Bad Request! Genre should be string");
  }

  //Validate Cast
  if (!Array.isArray(cast)) {
    return res.status(400).send("Bad Request! Cast should be array of string");
  }
  next();
};

app.post("/add-todo", validateBody, (req, res) => {
  res.status(201).send("Todo added successfully");
});

app.listen(3000, () => {
  console.log("Server is up and running on port 3000");
});
