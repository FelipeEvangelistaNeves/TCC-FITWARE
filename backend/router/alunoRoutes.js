const express = require("express");
const router = express.Router();
const {
  dataAluno,
  atualizarAluno,
  dataAlunoConversas,
  dataAlunoMensagem,
  enviarMensagemAluno,
  historicodoAluno,
  registrarTreinoConcluido,
  startAlunoConversa
} = require("../controllers/alunoController");
const { authMiddleware } = require("../middleware/auth");

router.get("/", dataAluno);
router.get("/me", authMiddleware(), dataAluno);
router.get("/historico", authMiddleware(), historicodoAluno);
router.put("/update", authMiddleware(), atualizarAluno);
router.get("/conversas", authMiddleware(), dataAlunoConversas);
router.post("/conversas", authMiddleware(), startAlunoConversa);
router.get("/mensagens/:id", authMiddleware(), dataAlunoMensagem);
router.post("/mensagens/:id", authMiddleware(), enviarMensagemAluno);
router.post("/treino/concluido", authMiddleware(), registrarTreinoConcluido);

module.exports = router;
