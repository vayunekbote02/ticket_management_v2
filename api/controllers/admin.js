const Ticket = require("../models/ticketModel");
const UserData = require("../models/userModel");
const CsvParser = require("json2csv").Parser;

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

const exportTickets = async (req, res) => {
  try {
    const { user_id } = req.params;

    if (user_id !== req.userId) {
      return res.sendStatus(403);
    }
    let ticket_headers = [];
    const tickets = await Ticket.find({});
    tickets.forEach((ticket) => {
      const { name, email, issue, classification, resolved } = ticket;
      ticket_headers.push({ name, email, issue, classification, resolved });
    });
    const csvFields = ["Name", "Email", "Issue", "Classification", "Resolved"];
    const csvParser = new CsvParser({ csvFields });
    const csvData = csvParser.parse(ticket_headers);

    res.setHeader("Content-Type", "text/csv");
    res.setHeader("Content-Disposition", "attachment: filename=tickets.csv");
    res.status(200).end(csvData);
  } catch (err) {
    res.json({ status: 400, error: err.message });
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

const setPriority = async (req, res) => {
  const { user_id } = req.params;
  const { ticket_id } = req.params;
  const { priority } = req.body;
  if (user_id !== req.userId) {
    return res.sendStatus(403);
  }

  const ticket = await Ticket.findOneAndUpdate(
    { id: ticket_id },
    { priority: priority },
    { new: true }
  );

  if (!ticket) {
    return res.json({ status: 501, text: "Error in setting priority." });
  }
  return res.json({ status: 200 });
};

const addMessage = async (req, res) => {
  const { user_id } = req.params;
  const { ticket_id } = req.params;
  const { userRole, textMessage } = req.body;

  if (user_id !== req.userId) {
    return res.sendStatus(403);
  }

  const updatedTicket = await Ticket.findOneAndUpdate(
    { id: ticket_id },
    {
      $push: {
        logs: {
          timestamp: Date.now(),
          userRole: userRole,
          message: textMessage,
        },
      },
    },
    { new: true } // This option returns the updated ticket after the update
  );
  // console.log(ticket.logs);
  res.json({ status: 200 });
};

const deleteTicket = async (req, res) => {
  const { user_id, ticket_id } = req.params;
  if (user_id !== req.userId) {
    return res.sendStatus(403);
  }

  const ticket = await Ticket.findOneAndDelete({ id: ticket_id });

  if (!ticket) {
    res.json({ status: 401 });
  }
  res.json({ status: 200 });
};

module.exports = {
  fetchTickets,
  exportTickets,
  fetchEngineers,
  assignRole,
  setEngineer,
  acceptTicket,
  setPriority,
  addMessage,
  deleteTicket,
};
