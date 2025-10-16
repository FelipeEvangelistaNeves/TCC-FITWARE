const express = require("express");
const router = express.Router();

const treinoController = require("../controllers/treinoController");
const { roleMiddleware}  = require("../middleware/auth");

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
router.get("/", roleMiddleware, treinoController.listar);

module.exports = router;