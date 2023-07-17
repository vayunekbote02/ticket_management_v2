const express = require("express");
const { fetchTickets, assignRole } = require("../controllers/admin.js");
const authenticateToken = require("../middleware/authorization");

const router = express.Router();

router.get("/:user_id/tickets", authenticateToken, fetchTickets);
router.put("/:user_id/create_engineer", authenticateToken, assignRole);

module.exports = router;
