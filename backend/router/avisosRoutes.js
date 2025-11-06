const express = require("express");
const router = express.Router();
const { listarAvisos } = require("../controllers/avisosController");

router.get("/", listarAvisos);

module.exports = router;
