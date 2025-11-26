const express = require("express");
const router = express.Router();
const { authMiddleware } = require("../middleware/auth");
const {
  listarResgates,
  deletarResgate,
} = require("../controllers/resgatesController");

// CRUD Resgates (admin)
router.get("/crud/listar", authMiddleware(), listarResgates);
router.delete("/crud/deletar/:id", authMiddleware(), deletarResgate);

module.exports = router;
