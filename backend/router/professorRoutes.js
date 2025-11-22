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
router.get("/dashboard",verifyToken, dataProfDashboard);
router.get("/allAlunos", verifyToken, dataProfAlunos);
router.get("/conversas", verifyToken, dataProfConversas);
router.get("/mensagens/:id", verifyToken, dataProfMensagens);
router.post("/mensagens/:id", verifyToken, enviarMensagemProfessor);
router.get("/alunos/:al_id/treinos", verifyToken, dataProfTreinosAluno);
router.get("/avisosRecent", verifyToken, dataProfUltimosAvisos);
router.get("/allAvisos", verifyToken, dataProfAvisos);

module.exports = router;
