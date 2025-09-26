module.exports = (sequelize, DataTypes) => {
  const AlunoTurma = sequelize.define(
    "AlunoTurma",
    {
      al_id: { type: DataTypes.INTEGER, primaryKey: true },
      tu_id: { type: DataTypes.INTEGER, primaryKey: true },
    },
    {
      tableName: "alunos_turmas",
      timestamps: false,
    }
  );

  return AlunoTurma;
};
