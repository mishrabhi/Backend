const mongoose = require("mongoose");

const routeModelSchema = new mongoose.Schema({
  start_location: {
    type: String,
    required: true,
  },
  end_location: {
    type: String,
    required: true,
  },
  distance: {
    type: Number,
    required: true,
  },
  buses: [{ type: mongoose.Schema.Types.ObjectId, ref: "buses" }],
});

module.exports = mongoose.model("routeModel", routeModelSchema);
