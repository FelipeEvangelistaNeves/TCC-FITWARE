module.exports = (sequelize, DataTypes) => {
  const AlunoTreino = sequelize.define(
    "AlunoTreino",
    {
      al_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: { model: "alunos", key: "al_id" },
      },
      tr_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: { model: "treinos", key: "tr_id" },
      },
      at_data_conclusao: {
        type: DataTypes.DATE,
        allowNull: true,
        comment: "Data quando o aluno completou o treino",
      },
    },
    {
      tableName: "alunos_treinos",
      timestamps: false,
    }
  );

  return AlunoTreino;
};
