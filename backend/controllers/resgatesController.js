const { Resgate } = require("../models");

/**
 * Lista todos os resgates (para tabela admin)
 */
const listarResgates = async (req, res) => {
  try {
    const resgates = await Resgate.findAll({ order: [["re_id", "DESC"]] });
    return res.json(resgates);
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
