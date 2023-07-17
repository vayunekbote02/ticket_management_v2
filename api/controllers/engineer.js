const Ticket = require("../models/ticketModel");

const fetchEngineerTickets = async (req, res) => {
  try {
    const { user_id } = req.params;

    if (user_id !== req.userId) {
      return res.sendStatus(403);
    }

    // complete this function to return all the tickets that have an assigned engineer as the logged in engineer. Will assigning, save the user_id of the assigned engineer in the ticket.
    const tickets = await Ticket.find({ assignedEngineer: user_id });
    res.json({ status: 200, tickets });
  } catch (err) {
    res.json({ err });
  }
};

module.exports = { fetchEngineerTickets };
