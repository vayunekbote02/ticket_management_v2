const express = require("express");
const { fetchTickets, createTicket } = require("../controllers/user.js");
const authenticateToken = require("../middleware/authorization");

const router = express.Router();

router.get("/:user_id/tickets", authenticateToken, fetchTickets);
router.post("/:user_id/createticket", authenticateToken, createTicket);

module.exports = router;
