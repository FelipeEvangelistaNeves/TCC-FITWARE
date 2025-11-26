const { Produto, Aluno, Resgate } = require("../models");
const LoggerMessages = require("../loggerMessages");
const crypto = require("crypto");

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

/**
 * 🔹 Resgatar produto (debita pontos, reduz estoque e cria comprovante)
 */
const resgatarProduto = async (req, res) => {
  try {
    const { produtoId } = req.body;
    const aluno = req.user; // vem do authMiddleware

    if (!produtoId) {
      return res
        .status(400)
        .json({ success: false, message: "ID do produto é obrigatório." });
    }

    // Buscar produto
    const produto = await Produto.findByPk(produtoId);
    if (!produto) {
      return res
        .status(404)
        .json({ success: false, message: "Produto não encontrado." });
    }

    if (produto.pd_estoque <= 0) {
      return res
        .status(400)
        .json({ success: false, message: "Produto indisponível." });
    }

    // Buscar aluno e verificar saldo
    const alunoData = await Aluno.findByPk(aluno.id);

    if (!alunoData) {
      return res
        .status(404)
        .json({ success: false, message: "Aluno não encontrado." });
    }

    if (alunoData.al_pontos < produto.pd_valor) {
      return res
        .status(400)
        .json({ success: false, message: "Pontos insuficientes." });
    }

    // Atualizar saldo e estoque
    alunoData.al_pontos -= produto.pd_valor;
    produto.pd_estoque -= 1;

    await alunoData.save();
    await produto.save();

    // Criar hash único do resgate
    const hash = crypto
      .createHash("sha256")
      .update(`${alunoData.al_id}-${produto.pd_id}-${Date.now()}`)
      .digest("hex")
      .slice(0, 16);

    // Registrar resgate
    const registroResgate = await Resgate.create({
      al_id: alunoData.al_id,
      pd_id: produto.pd_id,
      re_hash: hash,
      re_preco: produto.pd_valor,
    });

    return res.json({
      success: true,
      message: `Produto "${produto.pd_nome}" resgatado com sucesso!`,
      novoSaldo: alunoData.al_pontos,
      comprovante: registroResgate,
    });
  } catch (err) {
    console.error("Erro ao resgatar produto:", err);
    return res.status(500).json({
      success: false,
      message: "Erro interno ao resgatar produto.",
    });
  }
};

// 🔹 Listar resgates do aluno
const listarResgatesdoAluno = async (req, res) => {
  try {
    const alunoId = req.user.id;

    const resgates = await Resgate.findAll({
      where: { al_id: alunoId },
      include: [{ model: Produto, attributes: ["pd_nome", "pd_valor"] }],
      order: [["re_data", "DESC"]],
    });

    return res.status(200).json(resgates);
  } catch (error) {
    console.error("Erro ao listar resgates:", error);
    return res.status(500).json({ error: "Erro ao listar resgates do aluno" });
  }
};

module.exports = {
  criarProduto,
  listarProdutos,
  buscarProdutoPorId,
  atualizarProduto,
  deletarProduto,
  resgatarProduto,
  listarResgatesdoAluno,
};
