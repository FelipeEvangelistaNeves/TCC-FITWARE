const express = require("express");
const router = express.Router();

const { authMiddleware } = require("../middleware/auth");

const {
  dataTreinosDoProfessor,
  dataTreinosDoAluno,
  dataDetalhesDoTreino,
} = require("../controllers/treinoController");
const ROLES = require("../constants/roles");

/**
 * @swagger
 * /treinos/professor:
 *   get:
 *     tags:
 *       - Professor
 *     summary: Lista todos os treinos do professor logado
 *     description: Retorna uma lista de treinos associados ao professor autenticado.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Lista de treinos obtida com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   nome:
 *                     type: string
 *                     example: "Treino de força"
 *                   aluno:
 *                     type: string
 *                     example: "João"
 *                   data:
 *                     type: string
 *                     format: date
 *                     example: "2025-10-16"
 *       '401':
 *         description: Token inválido ou não autorizado
 *       '403':
 *         description: Acesso negado (usuário não é professor)
 *       '500':
 *         description: Erro ao buscar treinos
 */
router.get(
  "/professor",
  authMiddleware([ROLES.professor]),
  dataTreinosDoProfessor
);

/**
 * @swagger
 * /treinos/aluno:
 *   get:
 *     tags:
 *       - Aluno
 *     summary: Lista os treinos do aluno logado
 *     description: Retorna uma lista de treinos associados ao aluno autenticado.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Lista de treinos do aluno obtida com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   nome:
 *                     type: string
 *                     example: "Treino de resistência"
 *                   professor:
 *                     type: string
 *                     example: "Maria"
 *                   data:
 *                     type: string
 *                     format: date
 *                     example: "2025-11-01"
 *       '401':
 *         description: Token inválido ou não autorizado
 *       '403':
 *         description: Acesso negado (usuário não é aluno)
 *       '500':
 *         description: Erro ao buscar treinos
 */
router.get("/aluno", authMiddleware([ROLES.aluno]), dataTreinosDoAluno);
// 🔹 NOVA ROTA → detalhes do treino
router.get("/detalhes/:id", dataDetalhesDoTreino);

module.exports = router;
