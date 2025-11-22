const express = require("express");
const router = express.Router();
const {
  loginAluno,
  loginProfessor,
  loginAdmin,
  logout,
} = require("../controllers/authController");

/**
 * @swagger
 * /login/aluno:
 *   post:
 *     summary: Login do aluno
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Retorna usuário autenticado
 *       401:
 *         description: Não autorizado
 */
router.post("/login/aluno", loginAluno);

/**
 * @swagger
 * /login/professor:
 *  post:
 *    summary: Login do professor
 *   tags: [Auth]
 *   responses:
 *    200:
 *     description: Retorna usuário autenticado
 *   401:
 *    description: Não autorizado
 */
router.post("/login/professor", loginProfessor);

/**
 * @swagger
 * /login/admin:
 *  post:
 *   summary: Login do admin
 *  tags: [Auth]
 *  responses:
 *   200:
 *    description: Retorna usuário autenticado
 *  401:
 *   description: Não autorizado
 */
router.post("/login/admin", loginAdmin);

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
