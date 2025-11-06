const express = require("express");
const router = express.Router();
const { verifyToken } = require("../middleware/auth");
const {
  criarProduto,
  listarProdutos,
  buscarProdutoPorId,
  atualizarProduto,
  deletarProduto,
} = require("../controllers/produtosController");
// ✅ Todas as rotas protegidas com JWT
router.post("/", verifyToken, criarProduto);
router.get("/", verifyToken, listarProdutos);
router.get("/:id", verifyToken, buscarProdutoPorId);
router.put("/:id", verifyToken, atualizarProduto);
router.delete("/:id", verifyToken, deletarProduto);

module.exports = router;
