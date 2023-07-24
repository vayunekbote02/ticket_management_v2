const Ticket = require("../models/ticketModel");
const UserData = require("../models/userModel");

const fetchTickets = async (req, res) => {
  try {
    const { user_id } = req.params;

    if (user_id !== req.userId) {
      return res.sendStatus(403);
    }

    // Fetch all users tickets from the database
    const tickets = await Ticket.find();
    res.json({ status: 200, tickets });
  } catch (error) {
    res.json({ status: "error", error: "Failed to fetch tickets" });
  }
};

const fetchEngineers = async (req, res) => {
  try {
    const { user_id } = req.params;

    if (user_id !== req.userId) {
      return res.sendStatus(403);
    }

    // Fetch all users tickets from the database
    const engineers = await UserData.find({ role: "engineer" });
    res.json({ status: 200, engineers });
  } catch (error) {
    res.json({ status: "error", error: "Failed to fetch engineers" });
  }
};

const assignRole = async (req, res) => {
  const { user_id } = req.params;

  if (user_id !== req.userId) {
    return res.sendStatus(403);
  }
  // Find user who matches the email address and set to engineer
  const user = await UserData.findOneAndUpdate(
    { email: req.body.email },
    { role: "engineer" },
    { new: true }
  );
  if (!user) {
    return res.json({ status: 501, text: "User not found" });
  }
  return res.json({ status: 200 });
};

const setEngineer = async (req, res) => {
  const { user_id } = req.params;
  const { ticket_id } = req.params;
  if (user_id !== req.userId) {
    return res.sendStatus(403);
  }

  const ticket = await Ticket.findOneAndUpdate(
    { id: ticket_id },
    { assignedEngineer: req.body.engineerId },
    { new: true }
  );
  if (!ticket) {
    return res.json({ status: 501, text: "Error in assigning engineer" });
  }
  return res.json({ status: 200 });
};

const acceptTicket = async (req, res) => {
  const { user_id } = req.params;
  const { ticket_id } = req.params;
  if (user_id !== req.userId) {
    return res.sendStatus(403);
  }

  const ticket = await Ticket.findOneAndUpdate(
    { id: ticket_id },
    { accepted: 1 },
    { new: true }
  );

  if (!ticket) {
    return res.json({ status: 501, text: "Error in accepting the ticket." });
  }
  return res.json({ status: 200 });
};

module.exports = {
  fetchTickets,
  fetchEngineers,
  assignRole,
  setEngineer,
  acceptTicket,
};
