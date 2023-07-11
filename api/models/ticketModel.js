const mongoose = require("mongoose");

const ticketSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  landlineNumber: String,
  issue: String,
  classification: String,
  channel: String,
  remarks: String,
  createdAt: { type: Date, default: Date.now },
  resolved: { type: Boolean, default: false },
  priority: { type: String, default: "low" },
  assignedEngineer: String,
});

const Ticket = mongoose.model("Ticket", ticketSchema);

module.exports = Ticket;