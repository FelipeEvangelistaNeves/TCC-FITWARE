const express = require("express");
const router = express.Router();
const { authMiddleware } = require("../middleware/auth");
const {
  criarAluno,
  listarAlunosAdmin,
  atualizarAlunoAdmin,
  deletarAluno,
  atualizarExercicioAdmin,
  deletarExercicioAdmin,
  getAdminProfile,
  updateAdminProfile,
  getAtividadesRecentes,
  getDashboardStats,
} = require("../controllers/adminController");
const LoggerMessages = require("../loggerMessages");

/**
 * @swagger
 * tags:
 *   name: Admin
 *   description: Rotas de autenticação e área do administrador (Secretário)
 */

/**
 * @swagger
 * /admin:
 *   get:
 *     summary: Área exclusiva do administrador
 *     tags: [Admin]
 *     responses:
 *       200:
 *         description: Acesso autorizado
 *       401:
 *         description: Não autorizado
 */
router.get(
  "/admin",
  authMiddleware(),
  authMiddleware(["Secretario"]),
  (req, res) => {
    res.json({
      message: LoggerMessages.ADMIN_SUCCESS || "Acesso autorizado",
    });
  }
);

// ======= PERFIL DO ADMIN =======

// Perfil do admin (GET /admin/profile - retorna dados do funcionario logado)
router.get("/profile", authMiddleware(["Secretario"]), async (req, res) => {
  try {
    return getAdminProfile(req, res);
  } catch (error) {
    console.error("Erro na rota GET /admin/profile:", error);
    return res.status(500).json({ error: "Erro interno do servidor." });
  }
});

// Atualizar perfil do admin
router.put("/profile", authMiddleware(["Secretario"]), async (req, res) => {
  try {
    return updateAdminProfile(req, res);
  } catch (error) {
    console.error("Erro na rota PUT /admin/profile:", error);
    return res.status(500).json({ error: "Erro interno do servidor." });
  }
});

// ======= DASHBOARD ADMIN =======

// Rota unificada para estatísticas do dashboard (NOVA)
router.get(
  "/dashboard/stats",
  authMiddleware(["Secretario"]),
  async (req, res) => {
    try {
      return getDashboardStats(req, res);
    } catch (e) {
      console.error("Erro ao buscar stats do dashboard:", e);
      return res.status(500).json({ error: "Erro interno" });
    }
  }
);

// Atividades recentes
router.get(
  "/dashboard/atividades",
  authMiddleware(["Secretario"]),
  async (req, res) => {
    try {
      return getAtividadesRecentes(req, res);
    } catch (e) {
      console.error("Erro ao buscar atividades:", e);
      return res.status(500).json({ error: "Erro interno" });
    }
  }
);

// ======= CRUD ALUNOS =======

router.post("/criarAluno", authMiddleware(["Secretario"]), criarAluno);
router.get("/allAlunos", authMiddleware(["Secretario"]), listarAlunosAdmin);
router.put("/alunos/:id", authMiddleware(["Secretario"]), atualizarAlunoAdmin);
router.delete("/alunos/:id", authMiddleware(["Secretario"]), deletarAluno);

// ======= CRUD EXERCÍCIOS =======

router.put(
  "/exercicios/:id",
  authMiddleware(["Secretario"]),
  atualizarExercicioAdmin
);
router.delete(
  "/exercicios/:id",
  authMiddleware(["Secretario"]),
  deletarExercicioAdmin
);

module.exports = router;
