const express = require("express");
const fs = require("fs");

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hey from Express Server");
});

//Read db.json file
const readTodos = () => {
  const data = fs.readFileSync("db.json");
  return JSON.parse(data).todos;
};

//Write to db.json file
const writeTodos = (todos) => {
  fs.writeFileSync("db.json", JSON.stringify({ todos }));
};

//Get all todos
app.get("/todos", (req, res) => {
  const todos = readTodos();
  res.json(todos);
});

//Adding New Todo
app.post("/todos", (req, res) => {
  const todos = readTodos();
  const newTodo = {
    id: todos.length + 1,
    title: req.body.title,
    status: req.body.status || false,
  };
  todos.push(newTodo);
  writeTodos(todos);
  res.json(201).json({ message: "New todo created" });
});

// Update the status of all todos with even ID from false to true
app.patch("/todos/update-even", (req, res) => {
  const todos = readTodos();

  todos.forEach((todo) => {
    if (todo.id % 2 === 0 && todo.status === false) {
      todo.status = true;
    }
  });
  writeTodos(todos);
  res.json({ message: "Todo with even Ids are updated" });
});

// Delete all todos whose status is true
app.delete("/todos/delete-true", (req, res) => {
  let todos = readTodos();

  todos = todos.filter((todo) => todo.status !== true);
  writeTodos(todos);
  res.json({ message: "Todos with status true are deleted" });
});

app.listen(3000, () => {
  console.log("Server is up and running on port 3000");
});
