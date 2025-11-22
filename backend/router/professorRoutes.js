// routes/professorRoutes.js
const express = require("express");
const router = express.Router();
const { verifyToken } = require("../middleware/auth");

const {
  loginProfessor,
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
} = require("../controllers/professorController");

// LOGIN
router.post("/login", loginProfessor);

// PERFIL
router.get("/me", verifyToken, dataProfessor);
router.put("/update", verifyToken, atualizarProfessor);

// CRUD PROFESSORES
router.get("/crud/listar", verifyToken, listarProfessores);
router.post("/crud/criar", verifyToken, criarProfessor);
router.put("/crud/editar/:id", verifyToken, editarProfessor);
router.delete("/crud/deletar/:id", verifyToken, deletarProfessor);

// DASHBOARD + ALUNOS + CHAT + TREINOS
router.get("/dashboard",verifyToken, dataProfDashboard);
router.get("/allAlunos", verifyToken, dataProfAlunos);
router.get("/conversas", verifyToken, dataProfConversas);
router.get("/mensagens/:id", verifyToken, dataProfMensagens);
router.post("/mensagens/:id", verifyToken, enviarMensagemProfessor);
router.get("/alunos/:al_id/treinos", verifyToken, dataProfTreinosAluno);
router.get("/avisos/recentes", verifyToken, dataProfUltimosAvisos);
module.exports = router;
