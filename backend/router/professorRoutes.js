const express = require("express");
const router = express.Router();
const { Funcionario } = require("../models");
const { authMiddleware, roleMiddleware } = require("../middleware/auth");

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
router.post("/login/professor", async (req, res) => {
  const { email, password } = req.body;
  try {
    const funcionario = await Funcionario.findByEmail(email);

    if (
      !funcionario ||
      funcionario.fu_senha !== password ||
      funcionario.fu_cargo !== "Professor"
    ) {
      return res.status(401).json({ message: LoggerMessages.LOGIN_FAILED });
    }

    req.session.user = {
      id: funcionario.fu_id,
      email: funcionario.fu_email,
      role: funcionario.fu_cargo,
    };

    res.json({ message: LoggerMessages.LOGIN_SUCESS, user: req.session.user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: LoggerMessages.SERVER_ERROR });
  }
});

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
  "/professor",
  authMiddleware,
  roleMiddleware(["Professor"]),
  (req, res) => {
    res.json({ message: "Área do professor" });
  }
);

module.exports = router;
