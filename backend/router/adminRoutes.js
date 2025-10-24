const express = require("express");
const router = express.Router();
const { Funcionario } = require("../models");
const { roleMiddleware, verifyToken } = require("../middleware/auth");
const { loginAdmin } = require("../controllers/adminController");
const LoggerMessages = require("../loggerMessages");

/**
 * @swagger
 * tags:
 *   name: Admin
 *   description: Rotas de autenticação e área do administrador (Secretário)
 */

/**
 * @swagger
 * /login/admin:
 *   post:
 *     summary: Login de administrador (Secretário)
 *     tags: [Admin]
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
router.post("/", loginAdmin);
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
  verifyToken, // middleware que valida JWT no cookie e popula req.user
  roleMiddleware(["Secretario"]), // garante que req.user.role === "Professor"
  (req, res) => {
    res.json({
      message: LoggerMessages.ADMIN_SUCCESS || "Acesso autorizado",
    });
  }
);
module.exports = router;
