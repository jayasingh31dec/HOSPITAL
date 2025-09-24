const mongoose = require("mongoose");

const StatusSchema = new mongoose.Schema({
  patientId: { type: mongoose.Schema.Types.ObjectId, ref: "Patient", required: true },
  status: { type: String, required: true },
  comment: String,
  staffId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model("StatusUpdate", StatusSchema);
