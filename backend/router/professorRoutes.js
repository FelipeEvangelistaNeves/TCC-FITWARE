// routes/professorRoutes.js
const express = require("express");
const router = express.Router();
const { authMiddleware } = require("../middleware/auth");

const {
  dataProfessor,

  listarProfessores,
  criarProfessor,
  editarProfessor,
  deletarProfessor,

  atualizarProfessor,
  dataProfAlunos,
  dataProfConversas,
  dataProfMensagens,
  enviarMensagemProfessor,
  dataProfTreinosAluno,
  dataProfDashboard,
  dataProfUltimosAvisos,
  dataProfAvisos,
} = require("../controllers/professorController");

// PERFIL
router.get("/me", authMiddleware(), dataProfessor);
router.put("/update", authMiddleware(), atualizarProfessor);

// CRUD PROFESSORES
router.get("/crud/listar", authMiddleware(), listarProfessores);
router.post("/crud/criar", authMiddleware(), criarProfessor);
router.put("/crud/editar/:id", authMiddleware(), editarProfessor);
router.delete("/crud/deletar/:id", authMiddleware(), deletarProfessor);

// DASHBOARD + ALUNOS + CHAT + TREINOS
router.get("/dashboard", authMiddleware(), dataProfDashboard);
router.get("/allAlunos", authMiddleware(), dataProfAlunos);
router.get("/conversas", authMiddleware(), dataProfConversas);
router.get("/mensagens/:id", authMiddleware(), dataProfMensagens);
router.post("/mensagens/:id", authMiddleware(), enviarMensagemProfessor);
router.get("/alunos/:al_id/treinos", authMiddleware(), dataProfTreinosAluno);
router.get("/avisosRecent", authMiddleware(), dataProfUltimosAvisos);
router.get("/allAvisos", authMiddleware(), dataProfAvisos);

module.exports = router;
