const { Funcionario } = require("./funcionarios");
const { Exercicio } = require("./exercicios");

module.exports = (sequelize, DataTypes) => {
  const Treino = sequelize.define(
    "Treino",
    {
      tr_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      tr_prof_id: { type: DataTypes.INTEGER, allowNull: false },
      tr_nome: { type: DataTypes.STRING(80), allowNull: false },
      tr_descricao: { type: DataTypes.STRING(150) },
      tr_repeticoes: { type: DataTypes.STRING(4) },
    },
    {
      tableName: "treinos",
      timestamps: false,
    }
  );

  Treino.findByProfId = async function (profId) {
    return await Treino.findAll({
      where: { tr_prof_id: profId },
      include: [
        { model: Funcionario, attributes: ["fu_id", "fu_nome"] },
        {
          model: Exercicio,
          through: { attributes: [] },
          attributes: ["ex_id", "ex_nome", "ex_grupo_muscular"],
        },
      ],
    });
  };

  return Treino;
};
