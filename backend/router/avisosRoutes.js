const express = require("express");
const router = express.Router();
const { listarAvisos, criarAviso } = require("../controllers/avisosController");
const { authMiddleware } = require("../middleware/auth");

router.get("/allAvisos", listarAvisos);
router.post("/createAvisos", authMiddleware(), criarAviso);

module.exports = router;
