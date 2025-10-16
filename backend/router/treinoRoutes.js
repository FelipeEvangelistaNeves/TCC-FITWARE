const express = require("express");
const router = express.Router();

const { listarTreinos } = require("../controllers/treinoController");
const { roleMiddleware } = require("../middleware/auth");

/**
 * @swagger
 * /api/treinos:
 * 
 * 
 *     responses:
 *       200:
 *         description: Fetch bem-sucedido
 *       500:
 *         description: Erro ao buscar treinos
 */
router.get("/", roleMiddleware, listarTreinos);

module.exports = router;
