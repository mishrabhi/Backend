const mongoose = require("mongoose");

const reservationSchema = new mongoose.Schema({
  bus: { type: mongoose.Schema.Types.ObjectId, ref: "bus" },
  passenger: { type: mongoose.Schema.Types.ObjectId, ref: "passenger" },
  seat_number: {
    type: Number,
    required: true,
  },
  reservation_date: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("reservation", reservationSchema);
