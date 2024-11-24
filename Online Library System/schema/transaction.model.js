const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
  book: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Book",
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  borrow_date: {
    type: Date,
    default: Date.now,
  },
  return_date: {
    type: Date,
  },
});

module.exports = mongoose.model("Transaction", transactionSchema);
