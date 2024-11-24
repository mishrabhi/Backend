const express = require("express");
const Transaction = require("../schema/transaction.model");
const Book = require("../schema/book.model");

const router = express.Router();

//Borrow Book
router.post("/borrow", async (req, res) => {
  try {
    const transaction = new Transaction(req.body);
    await transaction.save();
    res.status(201).json(transaction);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Return a book
router.post("/return/:id", async (req, res) => {
  try {
    const transaction = await Transaction.findById(req.params.id);
    if (!transaction) return res.status(404).send("Transaction not found.");
    transaction.return_date = new Date();
    await transaction.save();
    res.send("Book returned.");
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
