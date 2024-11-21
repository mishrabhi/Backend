const mongoose = require("mongoose");

const operatorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  contact_info: {
    type: String,
  },
  buses: [{ type: mongoose.Schema.Types.ObjectId, ref: "buses" }],
});

module.exports = mongoose.model("operator", operatorSchema);
