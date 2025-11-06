// routes/professorRoutes.js
const express = require("express");
const router = express.Router();
const { verifyToken, roleMiddleware } = require("../middleware/auth");
const {
  loginProfessor,
  dataProfessor,
  atualizarProfessor,
} = require("../controllers/professorController");

/**
 * @swagger
 * tags:
 *   name: Professor
 *   description: Rotas de autenticação e área do professor
 */

/**
 * @swagger
 * /login/professor:
 *   post:
 *     summary: Login de professor
 *     tags: [Professor]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login bem-sucedido
 *       401:
 *         description: Credenciais inválidas
 */

// controller trata todo o fluxo de login
router.post("/login", loginProfessor);

/**
 * @swagger
 * /professor:
 *   get:
 *     summary: Área exclusiva do professor
 *     tags: [Professor]
 *     responses:
 *       200:
 *         description: Acesso autorizado
 *       401:
 *         description: Não autorizado
 */

router.get("/fetch", verifyToken, roleMiddleware(["Professor"]), dataProfessor);

router.get("/me", dataProfessor);
router.put("/update", verifyToken, atualizarProfessor);
module.exports = router;
