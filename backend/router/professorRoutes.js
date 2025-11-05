// routes/professorRoutes.js
const express = require("express");
const router = express.Router();
const { verifyToken, roleMiddleware } = require("../middleware/auth");
const { loginProfessor } = require("../controllers/professorController");
const LoggerMessages = require("../loggerMessages");

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

router.get(
  "/fetch",
  verifyToken, // middleware que valida JWT no cookie e popula req.user
  roleMiddleware(["Professor"]), // garante que req.user.role === "Professor"
  (req, res) => {
    res.json({
      message: LoggerMessages.PROFESSOR_SUCCESS || "Acesso autorizado",
    });
  }
);

module.exports = router;
