const express = require("express");
const {
  fetchTickets,
  assignRole,
  fetchEngineers,
  setEngineer,
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

module.exports = router;
