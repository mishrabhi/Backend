const mongoose = require("mongoose");

const registrationSchema = new mongoose.Schema({
  event: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Event",
    required: true,
  },
  attendee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Attendee",
    required: true,
  },
  registration_date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Registration", registrationSchema);
