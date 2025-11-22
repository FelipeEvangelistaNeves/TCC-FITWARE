const express = require("express");
const router = express.Router();

const { authMiddleware } = require("../middleware/auth");

const {
  dataTreinosDoProfessor,
  dataTreinosDoAluno,
} = require("../controllers/treinoController");
const ROLES = require("../constants/roles");

/**
 * @swagger
 * /treinos:
 *   get:
 *     tags:
 *       - Professor
 *     summary: Lista todos os treinos cadastrados (somente professor)
 *     description: Retorna uma lista de treinos associados ao professor logado.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de treinos obtida com sucesso
 *         content:
 *           application/json:
 *             example:
 *               - id: 1
 *                 nome: "Treino de força"
 *                 aluno: "João"
 *                 data: "2025-10-16"
 *       401:
 *         description: Token inválido ou não autorizado
 *       500:
 *         description: Erro ao buscar treinos
 */
router.get(
  "/professor",
  authMiddleware([ROLES.professor]),
  dataTreinosDoProfessor
);

router.get("/aluno", authMiddleware([ROLES.aluno]), dataTreinosDoAluno);

module.exports = router;
