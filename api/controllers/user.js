const Ticket = require("../models/ticketModel");
const { v4: uuidv4 } = require("uuid");

const fetchTickets = async (req, res) => {
  try {
    // Get the user ID from the request object
    const { user_id } = req.params;
    // console.log("Finally", user_id, "===", req.userId); // debug
    // Verify that the user ID matches the authenticated user, we are setting req.userId = payload.userId during authentication.
    if (user_id !== req.userId) {
      // console.log("Hitting !=="); // debug
      return res.sendStatus(403); // Forbidden if user ID doesn't match
    }

    // Fetch the user's tickets from the database and send the response
    const tickets = await Ticket.find({ byUser: user_id });
    res.json({ status: 200, tickets });
  } catch (error) {
    res.json({ status: "error", error: "Failed to fetch tickets" });
  }
};

const createTicket = async (req, res) => {
  try {
    const { user_id } = req.params;
    const newId = uuidv4();

    if (user_id !== req.userId) {
      return res.sendStatus(403); // Forbidden if user ID doesn't match
    }
    const {
      //req.params was not working for some reason, so using the user_id received from frontend
      name,
      email,
      phoneNumber,
      landlineNumber,
      issue,
      classification,
      channel,
      remarks,
      resolved,
      priority,
      assignedEngineer,
    } = req.body;

    // Create a new ticket document
    const ticket = new Ticket({
      id: newId,
      byUser: user_id,
      name,
      email,
      phoneNumber,
      landlineNumber,
      issue,
      classification,
      channel,
      remarks,
      resolved,
      priority,
      assignedEngineer,
    });
    // Save the ticket to the database
    await ticket.save();

    res.json({ status: 200 });
  } catch (error) {
    res.status(500).json({ status: "error", error: "Failed to create ticket" });
  }
};

module.exports = { fetchTickets, createTicket };
