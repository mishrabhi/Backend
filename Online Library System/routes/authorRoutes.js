const express = require("express");
const Author = require("../schema/author.model");
const Book = require("../schema/book.model");

const router = express.Router();

//Add new Author
router.post("/", async (req, res) => {
  try {
    const newAuthor = new Author(req.body);
    await newAuthor.save();
    res.status(201).json(newAuthor);
  } catch (error) {
    res.status(400).json({ error: err.message });
  }
});

// List books by a specific author
router.get("/:authorId/books", async (req, res) => {
  try {
    const author = await Author.findById(req.params.authorId).populate("books");
    if (!author) return res.status(404).send("Author not found.");
    res.json(author.books);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
