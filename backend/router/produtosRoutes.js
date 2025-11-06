const express = require("express");
const router = express.Router();
const { verifyToken } = require("../middleware/auth");
const {
  criarProduto,
  listarProdutos,
  buscarProdutoPorId,
  atualizarProduto,
  deletarProduto,
  resgatarProduto,
} = require("../controllers/produtosController");

router.post("/resgatar", verifyToken, resgatarProduto);

router.post("/create", verifyToken, criarProduto);
router.get("/all", verifyToken, listarProdutos);
router.get("/search/:id", verifyToken, buscarProdutoPorId);
router.put("/update/:id", verifyToken, atualizarProduto);
router.delete("/delete/:id", verifyToken, deletarProduto);

module.exports = router;
