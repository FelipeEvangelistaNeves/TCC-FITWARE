const express = require("express");
const router = express.Router();
const { dataAluno, atualizarAluno } = require("../controllers/alunoController");
const { authMiddleware } = require("../middleware/auth");

router.get("/", dataAluno);

router.get("/me", authMiddleware(), dataAluno);

router.put("/update", authMiddleware(), atualizarAluno);
module.exports = router;
