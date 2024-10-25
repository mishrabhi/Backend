const express = require("express");

const app = express();

const userRouter = require("./routes/user.route");
const todoRouter = require("./routes/todo.route");

app.use("/user", userRouter);
app.use("/todos", todoRouter);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(3000, () => {
  console.log("Server is up and running on port 3000");
});
