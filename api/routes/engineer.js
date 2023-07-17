const express = require("express");
const { fetchEngineerTickets } = require("../controllers/engineer.js");
const authenticateToken = require("../middleware/authorization");

const router = express.Router();

router.get("/:user_id/tickets", authenticateToken, fetchEngineerTickets);

module.exports = router;
