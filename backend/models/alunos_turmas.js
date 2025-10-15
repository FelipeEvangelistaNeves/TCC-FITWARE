module.exports = (sequelize, DataTypes) => {
  const AlunoTurma = sequelize.define(
    "AlunoTurma",
    {
      al_id: { type: Datatypes.INTEGER, primaryKey: true, references: { model: "alunos", key: "al_id" }},
      tu_id: { type: DataTypes.INTEGER, primaryKey: true, references: { model: "turmas", key: "tu_id" }},
    },
    {
      tableName: "alunos_turmas",
      timestamps: false,
    }
  );

  return AlunoTurma;
};
