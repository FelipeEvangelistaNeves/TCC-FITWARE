const express = require("express");
const router = express.Router();
const { Funcionario } = require("../models");
const { authMiddleware, roleMiddleware } = require("../middleware/auth");

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
router.post("/login/admin", async (req, res) => {
  const { email, password } = req.body;
  try {
    const funcionario = await Funcionario.findByEmail(email);

    if (
      !funcionario ||
      funcionario.fu_senha !== password ||
      funcionario.fu_cargo !== "Secretario"
    ) {
      return res.status(401).json({ message: "Credenciais inválidas" });
    }

    req.session.user = {
      id: funcionario.fu_id,
      email: funcionario.fu_email,
      role: funcionario.fu_cargo,
    };

    res.json({ message: "Login bem-sucedido", user: req.session.user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erro no servidor" });
  }
});

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
  authMiddleware,
  roleMiddleware(["Secretario"]),
  (req, res) => {
    res.json({ message: "Área do admin (Secretário)" });
  }
);

module.exports = router;
