const express = require("express");
const router = express.Router();

const treinoController = require("../controllers/treinoController");
const { roleMiddleware}  = require("../middleware/auth");

router.get("/", roleMiddleware, treinoController.listar);

module.exports = router;