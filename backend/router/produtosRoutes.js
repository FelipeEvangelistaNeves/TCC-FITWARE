const express = require("express");
const router = express.Router();
const { authMiddleware } = require("../middleware/auth");
const {
  criarProduto,
  listarProdutos,
  buscarProdutoPorId,
  atualizarProduto,
  deletarProduto,
  resgatarProduto,
  listarResgatesdoAluno,
} = require("../controllers/produtosController");

router.post("/resgatar", authMiddleware(), resgatarProduto);
router.get("/meus-resgates", authMiddleware(), listarResgatesdoAluno);

router.post("/create", authMiddleware(), criarProduto);
router.get("/all", authMiddleware(), listarProdutos);
router.get("/search/:id", authMiddleware(), buscarProdutoPorId);
router.put("/update/:id", authMiddleware(), atualizarProduto);
router.delete("/delete/:id", authMiddleware(), deletarProduto);

module.exports = router;
