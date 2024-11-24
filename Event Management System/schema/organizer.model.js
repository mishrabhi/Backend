const mongoose = require("mongoose");

const organizerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  contact_info: {
    type: String,
  },
  events: [{ type: mongoose.Schema.Types.ObjectId, ref: "Event" }],
});

module.export = mongoose.model("Organizer", organizerSchema);
