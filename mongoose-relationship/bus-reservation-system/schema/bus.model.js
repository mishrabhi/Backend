const mongoose = require("mongoose");

const busSchema = new mongoose.Schema({
  bus_number: {
    type: String,
    required: true,
    unique: true,
  },
  capacity: {
    type: Number,
    required: true,
  },
  operator: { type: mongoose.Schema.Types.ObjectId, ref: "operator" },
  route: { type: mongoose.Schema.Types.ObjectId, ref: "routes" },
  reservation: { type: mongoose.Schema.Types.ObjectId, ref: "reservation" },
});

module.exports = mongoose.model("bus", busSchema);
