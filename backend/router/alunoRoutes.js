const express = require("express");
const router = express.Router();
const { loginAluno, dataAluno } = require("../controllers/alunoController");

/**
 * @swagger
 * /login/aluno:
 *   post:
 *     summary: Login de aluno
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: aluno@email.com
 *               password:
 *                 type: string
 *                 example: senha123
 *     responses:
 *       200:
 *         description: Login bem-sucedido
 *       401:
 *         description: Credenciais inválidas
 */
router.post("/login", loginAluno);

router.get("/", dataAluno);

// router.get("/avisos", dataAvisos);

module.exports = router;
