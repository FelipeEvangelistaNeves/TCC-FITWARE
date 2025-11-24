const express = require("express");
const router = express.Router();

const {
  dataDesafio,
  updateDesafio,
  criarDesafio,
  uploadImageDesafio,
  deletarDesafio,
} = require("../controllers/desafioController");
const { authMiddleware } = require("../middleware/auth");
const ROLES = require("../constants/roles");

// Rota GET para /api/desafios
router.get("/", async (req, res) => {
  try {
    const desafios = await dataDesafio();

    return res.status(200).json(desafios);
  } catch (error) {
    console.error("Erro na rota GET /desafios:", error);
    return res.status(500).json({ error: "Erro interno do servidor." });
  }
});

// Atualizar desafio (admin/secretario)
router.put("/:id", authMiddleware([ROLES.secretario]), async (req, res) => {
  try {
    return updateDesafio(req, res);
  } catch (error) {
    console.error("Erro na rota PUT /desafios/:id", error);
    return res.status(500).json({ error: "Erro interno do servidor." });
  }
});
router.patch(
  "/:desafioId/imagem",
  authMiddleware([ROLES.aluno]),
  async (req, res) => {
    try {
      return uploadImageDesafio(req, res);
    } catch (error) {
      console.error("Erro na rota PATCH /desafios/:desafioId/imagem", error);
      return res.status(500).json({ error: "Erro interno do servidor." });
    }
  }
);

// Criar desafio (admin/secretario)
router.post("/", authMiddleware([ROLES.secretario]), async (req, res) => {
  try {
    return criarDesafio(req, res);
  } catch (error) {
    console.error("Erro na rota POST /desafios:", error);
    return res.status(500).json({ error: "Erro interno do servidor." });
  }
});

// Deletar desafio (admin/secretario)
router.delete("/:id", authMiddleware([ROLES.secretario]), async (req, res) => {
  try {
    return deletarDesafio(req, res);
  } catch (error) {
    console.error("Erro na rota DELETE /desafios/:id", error);
    return res.status(500).json({ error: "Erro interno do servidor." });
  }
});

module.exports = router;
