const express = require("express");
const { fetchTickets } = require("../controllers/user.js");
const authenticateToken = require("../middleware/authorization");

const router = express.Router();

router.get("/:user_id/tickets", authenticateToken, fetchTickets);

module.exports = router;
