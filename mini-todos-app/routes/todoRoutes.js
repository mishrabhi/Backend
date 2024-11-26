const express = require("express");
const Todo = require("../schema/todo.model");

const router = express.Router();

//Create new todo
router.post("/", async (req, res) => {
  try {
    const todo = await Todo.create({ ...req.body, userId: req.user.userId });
    res.status(201).json(todo);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

//Get all todos
router.get("/", async (req, res) => {
  try {
    const todos = await Todo.find({
      $or: [{ userId: req.user.userId }, { isPublic: true }],
    });
    res.json(todos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//Update a todo
router.put("/:id", async (req, res) => {
  try {
    const todo = await Todo.findOneAndUpdate(
      {
        _id: req.params.id,
        userId: req.user.userId,
      },
      req.body,
      { new: true }
    );
    if (!todo) return res.status(404).json({ message: "Todo not found" });
    res.json(todo);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

//Delete a todo
router.delete("/:id", async (req, res) => {
  try {
    const todo = await Todo.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.userId,
    });
    if (!todo) return res.status(404).json({ message: "Todo not found" });
    res.json({ message: "Todo deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
