const express = require("express");
const Book = require("../schema/book.model");
const Author = require("../schema/author.model");

const router = express.Router();

//Add a new Book
router.post("/", async (req, res) => {
  try {
    const book = new Book(req.body);
    await book.save();

    //Add the book to the author's book list
    if (req.body.author) {
      const author = await Author.findById(req.body.author);
      author.books.push(book._id);
      await author.save();
    }
    res.status(201).json(book);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

//Update a book
router.put("/:id", async (req, res) => {
  try {
    const book = await Book.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(book);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete a book (only if no active transactions)
router.delete("/:id", async (req, res) => {
  try {
    const transactions = await Transaction.find({ book: req.params.id });
    if (transactions.length > 0)
      return res
        .status(400)
        .send("Cannot delete a book with active transactions");
    await Book.findByIdAndDelete(req.params.id);
    res.send("Book deleted");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
