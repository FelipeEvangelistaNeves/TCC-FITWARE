const LoggerMessages = require("../loggerMessages");
const { Treino, Funcionario, Exercicio } = require("../models");

const listarTreinos = async (req, res) => {
  try {
    const treinos = await Treino.findAll({
      // include: [
      //   { model: Funcionario, attributes: ["fu_id", "fu_nome"] },
      //   {
      //     model: Exercicio,
      //     through: { attributes: [] },
      //     attributes: ["ex_id", "ex_nome", "ex_grupo_muscular"],
      //   },
      // ],
    });

    return res.status(200).json(treinos);
  } catch (error) {
    console.error("Erro ao buscar treinos:", error); // colocar logger messages
    return res.status(500).json({ error: "Erro ao buscar treinos" }); // colocar logger messages
  }
};

module.exports = {
  listarTreinos,
};
