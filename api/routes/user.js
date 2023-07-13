const express = require("express");
const {
  fetchTickets,
  createTicket,
  fetchSingleTicket,
  updateTicketStatus,
} = require("../controllers/user.js");
const authenticateToken = require("../middleware/authorization");

const router = express.Router();

router.get("/:user_id/tickets", authenticateToken, fetchTickets);
router.post("/:user_id/createticket", authenticateToken, createTicket);
router.get("/:user_id/ticket/:ticket_id", authenticateToken, fetchSingleTicket);
router.put(
  "/:user_id/ticket/:ticket_id/update",
  authenticateToken,
  updateTicketStatus
);

module.exports = router;
