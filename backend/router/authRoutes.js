const express = require("express");
const router = express.Router();
const { verifyToken, roleMiddleware } = require("../middleware/auth");
const { protectedRoute, logout } = require("../controllers/authController");

/**
 * @swagger
 * /protected:
 *   get:
 *     summary: Rota protegida (qualquer usuário logado)
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Retorna usuário autenticado
 *       401:
 *         description: Não autorizado
 */
router.get("/protected", verifyToken, protectedRoute);

/**
 * @swagger
 * /logout:
 *   post:
 *     summary: Logout do usuário
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Logout efetuado
 */
router.post("/logout", logout);

module.exports = router;
