const express = require("express");
const router = express.Router();
const { listarAvisos, criarAviso } = require("../controllers/avisosController");
const { verifyToken } = require("../middleware/auth");

router.get("/allAvisos", listarAvisos);
router.post("/createAvisos", verifyToken, criarAviso);

module.exports = router;
