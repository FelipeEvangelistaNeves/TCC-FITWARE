const express = require("express");
const router = express.Router();
const { authMiddleware } = require("../middleware/auth");
const {
  criarAluno,
  listarAlunosAdmin,
  atualizarAlunoAdmin,
  deletarAluno,
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

router.post("/criarAluno", authMiddleware(), criarAluno);
router.get("/allAlunos", authMiddleware(), listarAlunosAdmin);
router.put("/alunos/:id", authMiddleware(), atualizarAlunoAdmin);
router.delete("/alunos/:id", authMiddleware(), deletarAluno);

module.exports = router;
