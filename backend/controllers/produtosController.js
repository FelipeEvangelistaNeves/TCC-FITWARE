const { Produto } = require("../models");
const LoggerMessages = require("../loggerMessages");

/**
 * 🔹 Cria um novo produto
 */
const criarProduto = async (req, res) => {
  try {
    const { pd_nome, pd_valor, pd_descricao, pd_status, pd_estoque } = req.body;

    if (!pd_nome || !pd_valor || !pd_status || pd_estoque == null) {
      return res.status(400).json({
        success: false,
        message: "Todos os campos obrigatórios devem ser preenchidos.",
      });
    }

    const novoProduto = await Produto.create({
      pd_nome,
      pd_valor,
      pd_descricao,
      pd_status,
      pd_estoque,
    });

    res.status(201).json({
      success: true,
      message: "Produto criado com sucesso.",
      produto: novoProduto,
    });
  } catch (err) {
    console.error("Erro ao criar produto:", err);
    res.status(500).json({ message: LoggerMessages.SERVER_ERROR });
  }
};

/**
 * 🔹 Lista todos os produtos
 */
const listarProdutos = async (req, res) => {
  try {
    const produtos = await Produto.findAll({
      order: [["pd_nome", "ASC"]],
    });

    res.json({ success: true, produtos });
  } catch (err) {
    console.error("Erro ao listar produtos:", err);
    res.status(500).json({ message: LoggerMessages.SERVER_ERROR });
  }
};

/**
 * 🔹 Busca um produto específico pelo ID
 */
const buscarProdutoPorId = async (req, res) => {
  try {
    const produto = await Produto.findByPk(req.params.id);

    if (!produto) {
      return res.status(404).json({ message: "Produto não encontrado." });
    }

    res.json({ success: true, produto });
  } catch (err) {
    console.error("Erro ao buscar produto:", err);
    res.status(500).json({ message: LoggerMessages.SERVER_ERROR });
  }
};

/**
 * 🔹 Atualiza um produto existente
 */
const atualizarProduto = async (req, res) => {
  try {
    const produto = await Produto.findByPk(req.params.id);

    if (!produto) {
      return res.status(404).json({ message: "Produto não encontrado." });
    }

    await produto.update(req.body);

    res.json({
      success: true,
      message: "Produto atualizado com sucesso.",
      produto,
    });
  } catch (err) {
    console.error("Erro ao atualizar produto:", err);
    res.status(500).json({ message: LoggerMessages.SERVER_ERROR });
  }
};

/**
 * 🔹 Exclui um produto (delete físico)
 */
const deletarProduto = async (req, res) => {
  try {
    const produto = await Produto.findByPk(req.params.id);

    if (!produto) {
      return res.status(404).json({ message: "Produto não encontrado." });
    }

    await produto.destroy();

    res.json({ success: true, message: "Produto excluído com sucesso." });
  } catch (err) {
    console.error("Erro ao excluir produto:", err);
    res.status(500).json({ message: LoggerMessages.SERVER_ERROR });
  }
};

module.exports = {
  criarProduto,
  listarProdutos,
  buscarProdutoPorId,
  atualizarProduto,
  deletarProduto,
};
