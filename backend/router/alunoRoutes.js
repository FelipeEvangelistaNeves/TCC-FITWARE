const express = require("express");
const router = express.Router();
const {
  dataAluno,
  atualizarAluno,
  dataAlunoConversas,
  dataAlunoMensagem,
  enviarMensagemAluno,
} = require("../controllers/alunoController");
const { authMiddleware } = require("../middleware/auth");

router.get("/", dataAluno);
router.get("/me", authMiddleware(), dataAluno);
router.put("/update", authMiddleware(), atualizarAluno);
router.get("/conversas", authMiddleware(), dataAlunoConversas);
router.get("/mensagens/:id", authMiddleware(), dataAlunoMensagem);
router.post("/mensagens/:id", authMiddleware(), enviarMensagemAluno);
router.patch("/desafios/:id/imagem", upload.single("file"), controllerFunc);

module.exports = router;
