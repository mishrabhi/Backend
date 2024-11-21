const mongoose = require("mongoose");

const passengerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: String,
  },
  reservations: { type: mongoose.Schema.Types.ObjectId, ref: "reservation" },
});

module.exports = mongoose.model("passenger", passengerSchema);
