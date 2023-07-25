const express = require("express");
const {
  fetchTickets,
  assignRole,
  fetchEngineers,
  setEngineer,
  acceptTicket,
  setPriority,
} = require("../controllers/admin.js");
const authenticateToken = require("../middleware/authorization");

const router = express.Router();

router.get("/:user_id/tickets", authenticateToken, fetchTickets);
router.get("/:user_id/engineers", authenticateToken, fetchEngineers);
router.put("/:user_id/create_engineer", authenticateToken, assignRole);
router.put(
  "/:user_id/ticket/:ticket_id/set_engineer",
  authenticateToken,
  setEngineer
);
router.put(
  "/:user_id/ticket/:ticket_id/accept_ticket",
  authenticateToken,
  acceptTicket
);
router.put(
  "/:user_id/ticket/:ticket_id/set_priority",
  authenticateToken,
  setPriority
);

module.exports = router;
