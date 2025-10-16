const express = require("express");
const router = express.Router();

const { listarTreinos } = require("../controllers/treinoController");
const { roleMiddleware } = require("../middleware/auth");

router.get("/", roleMiddleware, listarTreinos);

module.exports = router;
