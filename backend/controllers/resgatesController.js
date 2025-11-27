const { Resgate, Aluno, Produto } = require("../models");

/**
 * Lista todos os resgates (para tabela admin)
 */
const listarResgates = async (req, res) => {
  try {
    const resgatesRaw = await Resgate.findAll({
      order: [["re_id", "DESC"]],
    });

    const resgates = await Promise.all(
      resgatesRaw.map(async (re) => {
        const alunoNome = await Aluno.findNameByPk(re.al_id);
        const produtoNome = await Produto.findNameByPk(re.pd_id);

        return {
          id: re.re_id,
          alunoNome,
          produtoNome,
          hash: re.re_hash,
          preco: re.re_preco,
          data: re.re_data,
          status: re.re_status,
        };
      })
    );

    return res.json({ resgates });
  } catch (err) {
    console.error("Erro ao listar resgates:", err);
    return res.status(500).json({ message: "Erro ao listar resgates." });
  }
};

/**
 * Deleta um resgate por ID
 */
const deletarResgate = async (req, res) => {
  try {
    const { id } = req.params;
    const registro = await Resgate.findByPk(id);
    if (!registro)
      return res.status(404).json({ message: "Resgate não encontrado." });

    await registro.destroy();
    return res.json({ message: "Resgate excluído com sucesso." });
  } catch (err) {
    console.error("Erro ao deletar resgate:", err);
    return res.status(500).json({ message: "Erro ao excluir resgate." });
  }
};

module.exports = {
  listarResgates,
  deletarResgate,
};
