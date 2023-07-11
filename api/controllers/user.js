const Ticket = require("../models/ticketModel");

const fetchTickets = async (req, res) => {
  try {
    // Get the user ID from the request object
    const { user_id } = req.params;
    // console.log("Finally", user_id, "===", req.userId); // debug
    // Verify that the user ID matches the authenticated user, we are setting req.userId = payload.userId during authentication.
    if (user_id !== req.userId) {
      // console.log("Hitting !=="); // debug
      return res.sendStatus(401); // Forbidden if user ID doesn't match
    }

    // Fetch the user's tickets from the database and send the response
    const tickets = await Ticket.find({ id: user_id });
    res.json({ status: 200, tickets });
  } catch (error) {
    res.json({ status: "error", error: "Failed to fetch tickets" });
  }
};

module.exports = { fetchTickets };
